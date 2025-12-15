import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid"; 

const app = express();
const PORT = 3000;

const db_url = 'http://db:5984/hard-drive-db'

// Pour accepter les requêtes depuis le front
app.use(cors());
app.use(express.json());

// Dossier où on stocke les fichiers uploadés
const uploadDir = path.join(process.cwd(), "files", "documents");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Config multer pour enregistrer les fichiers dans /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

async function purgeExpiredDocuments() {
  const now = new Date().toISOString();

  console.log("⏳ Démarrage de la purge des documents expirés...");
  console.log(`Heure actuelle: ${now}`);

  // Récupérer les documents expirés
  const res = await fetch(`${db_url}/_find`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      selector: { delete_at: { "$lte": now } },
      fields: ["_id", "_rev", "title", "file_type", "delete_at"],
      limit: 4000
    })
  });

  

  const data = await res.json();

  console.log(
    "Docs retournés par CouchDB:",
    data.docs.map(d => ({ title: d.title, delete_at: d.delete_at }))
  );
  const expiredDocs = data.docs.filter(doc => {
    if (!doc.delete_at) return false;
    return new Date(doc.delete_at).getTime() <= Date.now();
  });

  if (!expiredDocs.length) return;

  // Supprimer les fichiers physiques
  expiredDocs.forEach(doc => {
    const filePath = path.join(uploadDir, `${doc.title}.${doc.file_type}`);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  });

  // Supprimer les documents CouchDB
  await fetch(`${db_url}/_bulk_docs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      docs: expiredDocs.map(d => ({ ...d, _deleted: true }))
    })
  });
  console.log('les fichiers supprimés sont :');
  for (const doc of expiredDocs) {
    console.log(`- ${doc.title}.${doc.file_type}`);
  }

  console.log(`✅ Purge terminée: ${expiredDocs.length} fichiers supprimés`);

  await fetch(`${db_url}/_compact`, { method: "POST" });
}


app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

// --- Endpoint 1: Upload ---
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: "Aucun fichier reçu." });

  try {
    // Récupération du folder_id envoyé par le front
    let { folder_id, retention } = req.body;
    if (!folder_id || folder_id === "null") {
        folder_id = null;
    }
    let delete_at = null;
    
    // for the retention it can be "1m", "1h", "1d", "1y"
    if (retention) {
      const unit = retention.slice(-1);
      const value = parseInt(retention.slice(0, -1));
      const now = new Date();
      switch (unit) {
        case 'm':
          now.setMinutes(now.getMinutes() + value);
          break;
        case 'h':
          now.setHours(now.getHours() + value);
          break;
        case 'd':
          now.setDate(now.getDate() + value);
          break;
        case 'y':
          now.setFullYear(now.getFullYear() + value);
          break;
        default:
          break;
      }
      delete_at = now.toISOString();
    }

    const doc = {
      id: uuidv4(),
      title: path.parse(req.file.originalname).name,
      type: 'doc',
      created_at: new Date().toISOString(),
      delete_at: delete_at,
      retention: retention,
      size: req.file.size,
      folder_id: folder_id || null, // le folder_id du front ou null
      file_type: path.extname(req.file.originalname).replace(".", ""),
    };

    const response = await fetch(`${db_url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doc),
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Erreur CouchDB" });
    }

    const result = await response.json();

    res.json({
      message: "Document enregistré avec succès",
      id: result.id,
      rev: result.rev,
      document: doc,
    });

  } catch (error) {
    console.error("Erreur lors de la mise à jour du JSON :", error);
    res.status(500).json({ error: "Erreur serveur pendant l’upload." });
  }
});


// --- Endpoint 2: Export ---
app.get("/export", async (req, res) => {
  const selector = JSON.parse(req.query.selector);
  const limit = parseInt(req.query.limit) || 10;
  const skip = parseInt(req.query.skip) || 0;
  try {
    const dbResponse = await fetch(`${db_url}/_find`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ selector }),
    });

    if (!dbResponse.ok) return res.status(500).json({ error: "Erreur API DB." });

    const data = await dbResponse.json();
    const folders = data.docs.filter(d => d.type === "folder");
    const documents = data.docs.filter(d => d.type === "doc");
    
    // Pagination côté serveur
    const allItems = [...folders, ...documents];
    const pagedItems = allItems.slice(skip, skip + limit);

    // Séparer à nouveau pour garder la structure
    const pagedFolders = pagedItems.filter(d => d.type === "folder");
    const pagedDocuments = pagedItems.filter(d => d.type === "doc");

    res.json({ 
      folders: pagedFolders, 
      documents: pagedDocuments, 
      total: allItems.length 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de l’appel API." });
  }
});

// --- Endpoint 2: Export specific file---
app.get("/export/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const dbResponse = await fetch(`${db_url}/${uid}`);
    const doc = await dbResponse.json();

    // Construire le chemin physique vers le fichier
    const fileName = `${doc.title}.${doc.file_type}`;
    const filePath = path.join(uploadDir, fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Fichier physique introuvable." });
    }

    // Envoyer le fichier pour téléchargement
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors du téléchargement." });
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// --- Endpoint 3: Delete specific file---
app.delete("/delete/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    // Récupérer le document depuis CouchDB
    const dbResponse = await fetch(`${db_url}/${uid}`);
    if (!dbResponse.ok) {
      return res.status(404).json({ error: "Document introuvable." });
    }
    const doc = await dbResponse.json();

    // Supprimer le fichier physique
    const filePath = path.join(uploadDir, `${doc.title}.${doc.file_type}`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Supprimer le document CouchDB
    await fetch(`${db_url}/${uid}?rev=${doc._rev}`, {
      method: "DELETE",
    });

    res.json({ message: "Fichier et document supprimés avec succès." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur." });
  }
});


function startServer() {
  // Lancer la purge périodique
  setInterval(() => purgeExpiredDocuments().catch(console.error), 2 * 60 * 1000);

  // Lancer le serveur
  app.listen(PORT, () => {
    console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);
  });
}

startServer();

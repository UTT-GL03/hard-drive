import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Document, Packer, Paragraph, TextRun } from "docx";
import PDFDocument from "pdfkit";

// Config
const AMOUNT_FOLDERS = 5;
const AMOUNT_DOCUMENTS = 20;
const DOCUMENT_IN_FOLDER = 0.5;
const FOLDER_IN_FOLDER = 0.3;

const ASSETS_PATH = "files"
const DATA_FILE_NAME = "sample_data.json"
const DOC_PATH = "documents";

const DOCUMENT_IS_DOCX = 0.5;

if (fs.existsSync(`${ASSETS_PATH}/${DOC_PATH}`)) {
  fs.rmSync(`${ASSETS_PATH}/${DOC_PATH}`, { recursive: true, force: true });
  console.log(`🗑️ Ancien dossier ${DOC_PATH} supprimé.`);
}

// Crée les dossiers si manquants
fs.mkdirSync(`${ASSETS_PATH}/${DOC_PATH}`, { recursive: true });

// Utilitaire
function randomChoice() {
  if(Math.random() < DOCUMENT_IS_DOCX) return "docx";
  else return "pdf";
}

// --- Génération des dossiers ---
const folders = Array.from({ length: AMOUNT_FOLDERS }, (_, i) => ({
  id: uuidv4(),
  name: `Folder ${i}`,
  created_at: new Date(Date.now() - Math.floor(Math.random() * 31536000000)).toISOString(),
  parent_id: null,
}));

folders.forEach((folder, i) => {
  if (Math.random() < FOLDER_IN_FOLDER && i > 0) {
    const parentFolder = folders[Math.floor(Math.random() * i)];
    folder.parent_id = parentFolder.id;
  }
});

// --- Génération des documents ---
const documents = [];

async function generateDocuments() {
  for (let i = 0; i < AMOUNT_DOCUMENTS; i++) {
    const hasFolder = Math.random() > DOCUMENT_IN_FOLDER;
    const folder_id = hasFolder ? folders[Math.floor(Math.random() * folders.length)].id : null;
    const title = `Document_${i}`;

    const type = await createRandomFile(title);

    documents.push({
      id: uuidv4(),
      title,
      created_at: new Date(Date.now() - Math.floor(Math.random() * 31536000000)).toISOString(),
      size: Math.floor(Math.random() * (200000 - 1000 + 1)) + 1000,
      folder_id,
      type: type,
    });
  }

  // Sauvegarde JSON
  const data = { folders, documents };
  fs.writeFileSync(`${ASSETS_PATH}/${DATA_FILE_NAME}`, JSON.stringify(data, null, 2));
  console.log(`✅ ${DATA_FILE_NAME} generated at ${ASSETS_PATH}/${DATA_FILE_NAME}`);
}

// --- Création fichier DOCX ou PDF ---
async function createRandomFile(title) {
  const type = randomChoice();
  const filepath = path.join(ASSETS_PATH, DOC_PATH, title);

  if (type === "docx") {
    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({
            children: [new TextRun("Fichier DOCX généré aléatoirement.")],
          }),
        ],
      }],
    });
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(`${filepath}.docx`, buffer);
    console.log(`📄 DOCX créé : ${title}.docx`);
  } else {
    const pdf = new PDFDocument();
    pdf.pipe(fs.createWriteStream(`${filepath}.pdf`));
    pdf.text("Fichier PDF généré aléatoirement.");
    pdf.end();
    console.log(`📄 PDF créé : ${title}.pdf`);
  }
  return type;
}

// Lancement
generateDocuments();

import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Conf
const AMOUT_FOLDERS = 5;
const AMOUT_DOCUMENTS = 20;

const DOCUMENT_IN_FOLDER = 0.5;
const FOLDER_IN_FOLDER = 0.3;

const ASSETS_PATH = "assets"
const DATA_FILE_NAME = "sample_data.json"


// Data generation

const folders = Array.from({ length: AMOUT_FOLDERS }, (_, i) => ({
  id: uuidv4(),
  name: `Folder ${i}`,
  created_at: new Date(
    Date.now() - Math.floor(Math.random() * 31536000000)
  ).toISOString(),
  parent_id: null
}));

folders.forEach((folder, i) => {
  if (Math.random() < FOLDER_IN_FOLDER && i > 0) {
    const parentFolder = folders[Math.floor(Math.random() * i)];
    folder.parent_id = parentFolder.id;
  }
});

const documents = Array.from({ length: AMOUT_DOCUMENTS }, (_, i) => {
  const hasFolder = Math.random() > DOCUMENT_IN_FOLDER;
  const folder_id = hasFolder
    ? folders[Math.floor(Math.random() * folders.length)].id
    : null;

  return {
    id: uuidv4(),
    title: `Document ${i}`,
    created_at: new Date(
      Date.now() - Math.floor(Math.random() * 31536000000)
    ).toISOString(),
    size: Math.floor(Math.random() * (200000 - 1000 + 1)) + 1000,
    folder_id,
  };
});

const data = { folders, documents };

fs.writeFileSync(`${ASSETS_PATH}/${DATA_FILE_NAME}`, JSON.stringify(data, null, 2));

console.log(`${DATA_FILE_NAME} generated at ${ASSETS_PATH}/${DATA_FILE_NAME}`);

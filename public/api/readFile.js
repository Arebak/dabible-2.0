// pages/api/readfile.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'public', "bible","Acts", 'Acts_001_en.txt'); // Adjust the file path as needed

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    res.status(200).json({ content: fileContent });
  } catch (err) {
    res.status(500).json({ error: 'Error reading file' });
  }
}

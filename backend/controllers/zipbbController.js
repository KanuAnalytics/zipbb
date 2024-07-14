// controllers/zipbbController.js

const fs = require('fs');
const path = require('path');

const getZipbbContent = (req, res) => {
  const filePath = path.resolve(__dirname, '../../zipbb/.zipbb');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.json({ exists: false });
      } else {
        console.error(err);
        return res.status(500).send('Failed to read the file.');
      }
    }
    res.json({ exists: true, content: data });
  });
};

const runZipbb = (req, res) => {
  const chars = req.query.chars;
  const command = chars ? `zipbb zip -m ${chars}` : 'zipbb zip';
  const zipbbPath = path.resolve(__dirname, '../../zipbb');

  require('child_process').exec(command, { cwd: zipbbPath }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Failed to run the zipbb command.');
    }
    res.send({ message: stdout });
  });
};

const getScriptsData = (req, res) => {
  const filePath = path.resolve(__dirname, '../../zipbb/scripts_data.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.json({ exists: false });
      } else {
        console.error(err);
        return res.status(500).send('Failed to read the file.');
      }
    }
    res.json({ exists: true, content: data });
  });
};

module.exports = {
  getZipbbContent,
  runZipbb,
  getScriptsData,
};

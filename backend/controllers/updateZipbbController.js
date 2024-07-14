const fs = require('fs');
const path = require('path');

const updateZipbbFile = (req, res) => {
  const content = req.body.content.join('\n');
  const filePath = path.resolve(__dirname, '../../zipbb/.zipbb');

  fs.appendFile(filePath, `\n${content}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to update the file.');
    }
    res.send('File updated successfully.');
  });
};

const clearZipbbFile = (req, res) => {
  const filePath = path.resolve(__dirname, '../../zipbb/.zipbb');

  fs.writeFile(filePath, '', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to clear the file.');
    }
    res.send('File cleared successfully.');
  });
};

module.exports = {
  updateZipbbFile,
  clearZipbbFile,
};

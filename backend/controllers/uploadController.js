const uploadZipbbFile = (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    res.send('File uploaded successfully.');
  };
  
  module.exports = {
    uploadZipbbFile,
  };
  
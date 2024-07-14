const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 5000;
const uploadRoutes = require('./routes/uploadRoutes');
const updateZipbbRoutes = require('./routes/updateZipbbRoutes');
const zipbbRoutes = require('./routes/zipbbRoutes');

app.use(cors());
app.use(express.json());
app.use('/api', uploadRoutes);
app.use('/api', updateZipbbRoutes);
app.use('/api', zipbbRoutes);

app.get('/zipbb-quickstart', (req, res) => {
  const zipbbPath = path.resolve(__dirname, '../zipbb');
  require('child_process').exec('zipbb quickstart', { cwd: zipbbPath }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(`Error: ${error.message}`);
    }
    res.send(`stdout: ${stdout}`);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

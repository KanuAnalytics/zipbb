import React, { useState } from 'react';
import { uploadZipbbFile } from '../services/api';

const UploadButton = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    uploadZipbbFile(formData)
      .then((response) => {
        console.log(response.data);
        alert('File uploaded successfully');
      })
      .catch((error) => {
        console.error(error);
        alert('File upload failed');
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload .zipbb File</button>
    </div>
  );
};

export default UploadButton;

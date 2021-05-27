import React, { useState } from 'react';
import { uploadFile } from 'react-s3';

const config = {
  bucketName: '',
  dirName: '',
  region: '',
  accessKeyId: '',
  secretAccessKey: '',
};

function App() {
  const [selectedFile, setSelectedFile] = useState();

  const [isSelected, setIsSelected] = useState(false);


  const browseClick = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const uploadClick = () => {

    config.dirName = Date.now();

    uploadFile(selectedFile, config)
      .then((data) => {
        console.log(`https://${config.bucketName}.s3.${config.region}.amazonaws.com/${config.dirName}/${selectedFile.name}`);
      })
      .catch(
        (err) => { alert(err) }
      )

    setIsSelected(false);
    setSelectedFile();

  }





  return (
    <div>
      <input type="file" name="file" onChange={browseClick} title="" />
      {isSelected ? (
        <div>

          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={uploadClick}>Submit</button>
      </div>
    </div>
  );

}


export default App;
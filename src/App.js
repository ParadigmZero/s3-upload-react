import React, { useState } from 'react';
// import { uploadFile } from 'react-s3';
import AWS from 'aws-sdk'
// import {S3} from '@aws-sdk/client-s3';


// const {
//   REACT_APP_BUCKETNAME,
//   REACT_APP_REGION,
//   REACT_APP_ACCESS_KEY_ID,
//   REACT_APP_SECRET_ACCESS_KEY,
// } = process.env;


// const config = {
//   bucketName: REACT_APP_BUCKETNAME,
//   region: REACT_APP_REGION,
//   accessKeyId: REACT_APP_ACCESS_KEY_ID,
//   secretAccessKey: REACT_APP_SECRET_ACCESS_KEY,
// };

const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY,
});


function App() {
  const [selectedFile, setSelectedFile] = useState();

  const [isSelected, setIsSelected] = useState(false);

  const [url, setUrl] = useState("");


  const browseClick = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  async function uploadClick() {

    // we are putting the file in a directory that is a very simple form of timestamp
    // config.dirName = Date.now();

    // uploadFile(selectedFile, config)
    //   .then((data) => {
    //     setUrl(`https://${config.bucketName}.s3.${config.region}.amazonaws.com/${config.dirName}/${selectedFile.name}`)
    //   })
    //   .catch(
    //     (err) => { alert(err) }
    //   )

    console.log(selectedFile.type);
    console.log(process.env);

    const uploadedImage = await s3.upload({
        Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
        ContentType: selectedFile.type,
        ACL: 'public-read',
        Key: selectedFile.name,
        Body: selectedFile,
      }).promise();


      console.log("results from s3");
    //   console.log(typeof(uploadedImage));
    // console.log(uploadedImage);


    // const uploadedImage = await s3.upload({
    //   Bucket: process.env.AWS_S3_BUCKET_NAME,
    //   Key: req.files[0].originalFilename,
    //   Body: blob,
    // }).promise();

    console.log(uploadedImage);


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

      <button onClick={uploadClick} disabled={!isSelected}>Submit</button>
      {(url !== "") ? (
        <>
          <br />
        file uploaded to:<br />
          {url}
        </>
      ) : <></>
      }
    </div>
  );

}


export default App;
# Description

A deliberately simple example of a file upload to an Amazon AWS S3 bucket in REACT JS.

The purpose of this example is to simply upload to AWS S3 and return a URL for that file back.

This uses the `react-s3` library.

# Setup

You will need Node and npm installed.

Run:
`npm i`

## Running

`npm start`


# Environmental variables for AWS S3 upload

You will need to input the following environmental variables into a .env file ( root directory).

These relate to an Amazon AWS S3 bucket. For security reasons these cannot be given, and you will need to create your own.

(Place them after the = sign )

```
REACT_APP_BUCKETNAME=
REACT_APP_REGION=
REACT_APP_ACCESS_KEY_ID=
REACT_APP_SECRET_ACCESS_KEY=
```
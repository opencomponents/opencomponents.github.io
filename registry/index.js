require('dotenv').config()
const oc = require('oc');

const configuration = {
  verbosity: 0,
  baseUrl: process.env.BASEURL,
  port: process.env.PORT,
  tempDir: './temp/',
  refreshInterval: 600,
  pollingInterval: 5,
  discovery: true,
  s3: {
    key: process.env.S3KEY,
    secret: process.env.S3SECRET,
    bucket: process.env.S3BUCKET,
    region: process.env.S3REGION,
    path: `//s3.${process.env.S3REGION}.amazonaws.com/${process.env.S3BUCKET}/`,
    componentsDir: 'components'
  },
  env: { name: 'production' }
};

const registry = new oc.Registry(configuration);

registry.start(function(err, app){
  if(err){
    console.log('Registry not started: ', err);
    process.exit(1);
  }
});

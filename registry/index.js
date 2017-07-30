const oc = require('oc');

const configuration = {
  verbosity: 0,
  baseUrl: 'https://opencomponents-site-registry.herokuapp.com/',
  port: process.env.PORT || 3000,
  tempDir: './temp/',
  refreshInterval: 600,
  pollingInterval: 5,
  s3: {
    key: process.env.S3KEY,
    secret: process.env.S3SECRET,
    bucket: process.env.S3BUCKET,
    region: process.env.S3REGION,
    path: `//s3.amazonaws.com/${process.env.S3BUCKET}/`,
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

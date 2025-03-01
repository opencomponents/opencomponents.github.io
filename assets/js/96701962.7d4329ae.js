"use strict";(self.webpackChunkoc_website=self.webpackChunkoc_website||[]).push([[8373],{1382:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>d,default:()=>a,frontMatter:()=>i,metadata:()=>c,toc:()=>o});var r=s(4848),t=s(8453);const i={sidebar_position:1},d="Registry configuration",c={id:"registry/registry-configuration",title:"Registry configuration",description:"Introduction",source:"@site/docs/registry/registry-configuration.md",sourceDirName:"registry",slug:"/registry/registry-configuration",permalink:"/docs/registry/registry-configuration",draft:!1,unlisted:!1,editUrl:"https://github.com/opencomponents/opencomponents.github.io/tree/master/website/docs/registry/registry-configuration.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Batch endpoint",permalink:"/docs/consumers/batch-endpoint"},next:{title:"Registry using Google Storage",permalink:"/docs/registry/registry-using-google-storage"}},l={},o=[{value:"Introduction",id:"introduction",level:2},{value:"Setup",id:"setup",level:2},{value:"API",id:"api",level:2},{value:"var registry = new oc.Registry(configuration);",id:"var-registry--new-ocregistryconfiguration",level:3},{value:"registry.start(callback)",id:"registrystartcallback",level:3},{value:"registry.off(eventName, callback);",id:"registryoffeventname-callback",level:3},{value:"registry.on(eventName, callback);",id:"registryoneventname-callback",level:3},{value:"registry.register(plugin [, callback]);",id:"registryregisterplugin--callback",level:3},{value:"registry.reset(eventName);",id:"registryreseteventname",level:3},{value:"Registry configuration",id:"registry-configuration-1",level:2},{value:"Publish validation example",id:"publish-validation-example",level:3},{value:"Routes example",id:"routes-example",level:3},{value:"Registry events",id:"registry-events",level:2},{value:"Plugins",id:"plugins",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"registry-configuration",children:"Registry configuration"}),"\n",(0,r.jsx)(n.h2,{id:"introduction",children:"Introduction"}),"\n",(0,r.jsx)(n.p,{children:"The registry is a REST api that serves the components. You can have multiple registries connected to a library, but you can't have multiple libraries connected to a registry."}),"\n",(0,r.jsx)(n.h2,{id:"setup",children:"Setup"}),"\n",(0,r.jsx)(n.p,{children:"First, create a dir and install oc:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"mkdir oc-registry && cd oc-registry\nnpm init\nnpm install oc --save\ntouch index.js\n"})}),"\n",(0,r.jsxs)(n.p,{children:["For Google Storage registry configuration's documentation, ",(0,r.jsx)(n.a,{href:"/docs/registry/registry-using-google-storage",children:"look at this page"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["This is the ",(0,r.jsx)(n.code,{children:"index.js"})," content:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:'var oc = require("oc");\n\nvar configuration = {\n  verbosity: 0,\n  baseUrl: "https://my-components-registry.mydomain.com/",\n  port: 3000,\n  tempDir: "./temp/",\n  refreshInterval: 600,\n  pollingInterval: 5,\n  s3: {\n    key: "your-s3-key",\n    secret: "your-s3-secret",\n    bucket: "your-s3-bucket",\n    region: "your-s3-region",\n    path: "//s3.amazonaws.com/your-s3-bucket/",\n    componentsDir: "components",\n  },\n  env: { name: "production" },\n};\n\nvar registry = new oc.Registry(configuration);\n\nregistry.start(function (err, app) {\n  if (err) {\n    console.log("Registry not started: ", err);\n    process.exit(1);\n  }\n});\n'})}),"\n",(0,r.jsx)(n.h2,{id:"api",children:"API"}),"\n",(0,r.jsx)(n.h3,{id:"var-registry--new-ocregistryconfiguration",children:"var registry = new oc.Registry(configuration);"}),"\n",(0,r.jsxs)(n.p,{children:["Creates an instance of the registry. ",(0,r.jsx)(n.a,{href:"#registry-configuration",children:"Configuration"})," is an object that contains the registry configuration parameters."]}),"\n",(0,r.jsx)(n.h3,{id:"registrystartcallback",children:"registry.start(callback)"}),"\n",(0,r.jsx)(n.p,{children:"Starts the registry."}),"\n",(0,r.jsx)(n.h3,{id:"registryoffeventname-callback",children:"registry.off(eventName, callback);"}),"\n",(0,r.jsxs)(n.p,{children:["For unsubscribing to an ",(0,r.jsx)(n.a,{href:"#registry-events",children:"event"}),"."]}),"\n",(0,r.jsx)(n.h3,{id:"registryoneventname-callback",children:"registry.on(eventName, callback);"}),"\n",(0,r.jsxs)(n.p,{children:["For subscribing to an ",(0,r.jsx)(n.a,{href:"#registry-events",children:"event"}),"."]}),"\n",(0,r.jsx)(n.h3,{id:"registryregisterplugin--callback",children:"registry.register(plugin [, callback]);"}),"\n",(0,r.jsxs)(n.p,{children:["Register a ",(0,r.jsx)(n.a,{href:"#plugins",children:"plugin"}),".\nThe plugin parameter has to be a ",(0,r.jsx)(n.a,{href:"#plugins",children:"valid plugin"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:'registry.register({\n  name: "doSomething",\n  register: require("my-oc-plugin"),\n  options: {\n    configuration: "value",\n  },\n});\n'})}),"\n",(0,r.jsx)(n.h3,{id:"registryreseteventname",children:"registry.reset(eventName);"}),"\n",(0,r.jsxs)(n.p,{children:["For unsuscribing to all ",(0,r.jsx)(n.a,{href:"#registry-events",children:"events"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"registry-configuration-1",children:"Registry configuration"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Parameter"}),(0,r.jsx)(n.th,{children:"Type"}),(0,r.jsx)(n.th,{children:"Mandatory"}),(0,r.jsx)(n.th,{children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"baseUrl"})}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"yes"}),(0,r.jsx)(n.td,{children:"sets the URL which will be used to compose the components' URLs. This needs to be the registry's public url"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"customHeadersToSkipOnWeakVersion"})}),(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"array"})}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsx)(n.td,{children:"the custom headers to skip when serving a component requested by a weak version (eg. 1.x.x rather than 1.2.3). This is useful, for instance, in case of components that have quite static logic, setting cache headers - so that it makes sense in order to implement reactive consumers' caches"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"dependencies"})}),(0,r.jsx)(n.td,{children:"array"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsx)(n.td,{children:"the npm modules available for components logic"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"discovery"})}),(0,r.jsx)(n.td,{children:"boolean"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsx)(n.td,{children:"Enable registry UI. Default: true"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"env"})}),(0,r.jsx)(n.td,{children:"object"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsx)(n.td,{children:"sets the registry environment"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"env.name"})}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsx)(n.td,{children:"sets the environment name"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"executionTimeout"})}),(0,r.jsx)(n.td,{children:"number (seconds)"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsx)(n.td,{children:"timeout for component's server execution time"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"fallbackRegistryUrl"})}),(0,r.jsx)(n.td,{children:"string (url)"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsx)(n.td,{children:"Url to another registry which will be used by current registry when component cannot be found in current registry"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"keepAliveTimeout"})}),(0,r.jsx)(n.td,{children:"number (milliseconds)"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsxs)(n.td,{children:["Keep Alive Timeout for HTTP server. Default: ",(0,r.jsx)(n.code,{children:"5000"})]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"pollingInterval"})}),(0,r.jsx)(n.td,{children:"number (seconds)"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsx)(n.td,{children:"When the components' list cache will be refreshed. This is required for distributing the components on each registry instance. Given the polling mechanism is quite efficient, this number should be very low. Suggested is around 5-10 seconds."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"port"})}),(0,r.jsx)(n.td,{children:"number"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsxs)(n.td,{children:["default ",(0,r.jsx)(n.code,{children:"3000"}),", sets the port where to start the registry"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"postRequestPayloadSize"})}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsxs)(n.td,{children:["Sets the limit for the post body size. Example: ",(0,r.jsx)(n.code,{children:"50mb"}),". When unset, the limit is 100KB"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"prefix"})}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsxs)(n.td,{children:["sets the href prefix, for example: ",(0,r.jsx)(n.code,{children:"/v2/"})]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"publishAuth"})}),(0,r.jsx)(n.td,{children:"object"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsxs)(n.td,{children:["sets the authentication parameters for publishing a component to the registry. When ",(0,r.jsx)(n.code,{children:"undefined"}),", no authorisation is required."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"publishAuth.type"})}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsxs)(n.td,{children:["The authorisation type. Only ",(0,r.jsx)(n.code,{children:"basic"})," is supported at the moment."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"publishAuth.username"})}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsx)(n.td,{children:"sets the user name"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"publishAuth.password"})}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsx)(n.td,{children:"sets the user password"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"publishValidation"})}),(0,r.jsx)(n.td,{children:"function"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsxs)(n.td,{children:["Used to validate package.json when components is published. ",(0,r.jsx)(n.a,{href:"#publish-validation-example",children:"Look at the example"})]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"refreshInterval"})}),(0,r.jsx)(n.td,{children:"number (seconds)"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsx)(n.td,{children:"When the components' data cache will be refreshed. Given the data is immutable, this should be high and just for robustness."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"routes"})}),(0,r.jsx)(n.td,{children:"array of objects"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsx)(n.td,{children:"sets additional actions via URL mapping to specific action handlers"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"routes[index].route"})}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsxs)(n.td,{children:["sets URL pattern. Routes should be outside of the components' namespace (which you can set by using the ",(0,r.jsx)(n.code,{children:"prefix"})," parameter.)"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"routes[index].method"})}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsx)(n.td,{children:"sets verb"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"routes[index].handler"})}),(0,r.jsx)(n.td,{children:"function"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsxs)(n.td,{children:["sets function handler for routed action ",(0,r.jsx)(n.a,{href:"#routes-example",children:"Look at the example"})]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"s3"})}),(0,r.jsx)(n.td,{children:"object"}),(0,r.jsx)(n.td,{children:"yes"}),(0,r.jsx)(n.td,{children:"sets the Amazon S3 credentials"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"s3.agentProxy"})}),(0,r.jsx)(n.td,{children:"instance of http agent"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsxs)(n.td,{children:["allows to interact with aws API via a custom agent and a proxy. Usage: ",(0,r.jsx)(n.code,{children:"agentProxy = require('proxy-agent')('https://yourproxy.com');"})]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"s3.bucket"})}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"yes"}),(0,r.jsx)(n.td,{children:"sets S3 bucket"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"s3.componentsDir"})}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"yes"}),(0,r.jsx)(n.td,{children:"the path where the data will be saved inside the bucket"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"s3.key"})}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsx)(n.td,{children:"sets S3 access key. User should either specify both key/secret or skip both when leveraging IAM Role based S3 access from EC2"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"s3.path"})}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"yes"}),(0,r.jsxs)(n.td,{children:["sets the path that will be used for composing static resources' urls. Can be the s3 url, or, when using cloudfront, it can be ",(0,r.jsx)(n.code,{children:"//cloudfront-id.cloudfront.net/"}),". Signature should not include the protocol"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"s3.region"})}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"yes"}),(0,r.jsx)(n.td,{children:"sets S3 region"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"s3.secret"})}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsx)(n.td,{children:"sets S3 secret. User should either specify both key/secret or skip both when leveraging IAM Role based S3 access from EC2"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"s3.timeout"})}),(0,r.jsx)(n.td,{children:"number (milliseconds)"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsxs)(n.td,{children:["default ",(0,r.jsx)(n.code,{children:"10000"}),", optionally sets the timeout for s3 requests."]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"tempDir"})}),(0,r.jsx)(n.td,{children:"string"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsxs)(n.td,{children:["default ",(0,r.jsx)(n.code,{children:"./temp/"}),", sets the directory where the components' packages are temporarily stored during the publishing phase inside the registry box"]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"templates"})}),(0,r.jsx)(n.td,{children:"array"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsx)(n.td,{children:"the templates available allowed on the registry. Will extend the default base templates of [require('oc-template-jade'), require('oc-template-handlebars')]"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"timeout"})}),(0,r.jsx)(n.td,{children:"number (milliseconds)"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsxs)(n.td,{children:["Socket timeout for HTTP server. Default: ",(0,r.jsx)(n.code,{children:"0"})]})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)("sub",{children:"verbosity"})}),(0,r.jsx)(n.td,{children:"number"}),(0,r.jsx)(n.td,{children:"no"}),(0,r.jsxs)(n.td,{children:["default ",(0,r.jsx)(n.code,{children:"0"}),", sets the ",(0,r.jsx)(n.code,{children:"console.log"})," verbosity during the execution"]})]})]})]}),"\n",(0,r.jsx)(n.h3,{id:"publish-validation-example",children:"Publish validation example"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:'options.publishValidation = function (package) {\n  var isValid =\n    !!package.author && !!package.repository && !!package.description;\n\n  if (isValid) {\n    // Can return boolean\n    return true;\n  } else {\n    // Can return object with error so that it will be propagated to the user\n    return {\n      isValid: false,\n      error:\n        "Package.json is missing mandatory params: author, repository, description",\n    };\n  }\n};\n'})}),"\n",(0,r.jsx)(n.h3,{id:"routes-example",children:"Routes example"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:'options.routes = [\n  {\n    route: "/example-route",\n    method: "get",\n    handler: function (req, res) {\n      // Handling function content\n    },\n  },\n];\n'})}),"\n",(0,r.jsx)(n.h2,{id:"registry-events",children:"Registry events"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"Event name"}),(0,r.jsx)(n.th,{children:"Callback Data Type"}),(0,r.jsx)(n.th,{children:"Description"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"cache-poll"}),(0,r.jsx)(n.td,{children:"object"}),(0,r.jsx)(n.td,{children:"Fired when the components list is refreshed. The callback data contains the last edit unix utc timestamp."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"component-retrieved"}),(0,r.jsx)(n.td,{children:"object"}),(0,r.jsx)(n.td,{children:"Fired when the component is retrieved. This includes the component's validation, data gathering and execution, view retrieving, and (when requested) rendering. The callback data contains the duration, component details, and, in case, the error details."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"error"}),(0,r.jsx)(n.td,{children:"object"}),(0,r.jsx)(n.td,{children:"Fired when an internal operation errors."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"request"}),(0,r.jsx)(n.td,{children:"object"}),(0,r.jsx)(n.td,{children:"Fired every time the registry receives a request. The callback data contains some request and response details."})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"start"}),(0,r.jsx)(n.td,{children:"undefined"}),(0,r.jsx)(n.td,{children:"Fired when the registry starts"})]})]})]}),"\n",(0,r.jsx)(n.h2,{id:"plugins",children:"Plugins"}),"\n",(0,r.jsx)(n.p,{children:"Plugins are a way to extend registry's context allowing components to inherit custom functionalities."}),"\n",(0,r.jsx)(n.p,{children:"This is a plugin example:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:'// ./registry/oc-plugins/hobknob.js\nvar connection,\n  client = require("./hobknob-client");\n\nmodule.exports.register = function (options, dependencies, next) {\n  client.connect(options.connectionString, function (err, conn) {\n    connection = conn;\n    next();\n  });\n};\n\nmodule.exports.execute = function (featureName) {\n  return connection.get(featureName);\n};\n'})}),"\n",(0,r.jsx)(n.p,{children:"This is how to register it in a registry:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"// ./registry/init.js\n...\nvar registry = new oc.Registry(configuration);\n\nregistry.register({\n  name: 'getFeatureSwitch',\n  register: require('./oc-plugins/hobknob'),\n  options: {\n      connectionString: connectionString\n  }\n});\n...\n"})}),"\n",(0,r.jsx)(n.p,{children:"This is how to use a plugin from a component:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:'// ./my-component/server.js\nmodule.exports.data = function (context, callback) {\n  callback(null, {\n    variable: context.plugins.getFeatureSwitch("AbTestHomePage"),\n  });\n};\n'})}),"\n",(0,r.jsx)(n.p,{children:"This is how to depend on (and use) other plugins:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:'// ./registry/oc-plugins/hobknob.js\nvar connection,\n  client = require("./hobknob-client");\n\nmodule.exports.dependencies = ["log", "otherplugin"];\n\nmodule.exports.register = function (options, dependencies, next) {\n  // this register function is only called after all dependencies are registered\n  client.connect(options.connectionString, function (err, conn) {\n    connection = conn;\n    dependencies.log("hobknob client initialised");\n    next();\n  });\n};\n\nmodule.exports.execute = function (featureName) {\n  return connection.get(featureName);\n};\n'})})]})}function a(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>d,x:()=>c});var r=s(6540);const t={},i=r.createContext(t);function d(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:d(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);
"use strict";(self.webpackChunkoc_website=self.webpackChunkoc_website||[]).push([[3976],{1512:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>c,toc:()=>a});var s=t(4848),o=t(8453);const i={sidebar_position:1},r="Introduction",c={id:"intro",title:"Introduction",description:"OpenComponents involves two parts:",source:"@site/docs/intro.md",sourceDirName:".",slug:"/intro",permalink:"/docs/intro",draft:!1,unlisted:!1,editUrl:"https://github.com/opencomponents/opencomponents.github.io/tree/master/website/docs/intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Client-side operations",permalink:"/docs/components/client-side-operations"},next:{title:"Client-side rendering",permalink:"/docs/consumers/client-side-rendering"}},l={},a=[{value:"Components management",id:"components-management",level:2},{value:"Creation",id:"creation",level:2},{value:"Editing, debugging, testing",id:"editing-debugging-testing",level:2},{value:"Publishing to a registry",id:"publishing-to-a-registry",level:2},{value:"Client-side rendering",id:"client-side-rendering",level:2},{value:"Server-side rendering",id:"server-side-rendering",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"introduction",children:"Introduction"}),"\n",(0,s.jsx)(n.p,{children:"OpenComponents involves two parts:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.a,{href:"#components-management",children:(0,s.jsx)(n.code,{children:"components"})})," are small units of isomorphic code mainly consisting of html, javascript, css. They can optionally contain some logic, allowing a server-side node.js application to compose a model that is used to render the view. After rendering they are pieces of pure html to be injected in any html page."]}),"\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.a,{href:"#consuming-components",children:(0,s.jsx)(n.code,{children:"consumers"})})," are websites or microsites (",(0,s.jsx)(n.a,{href:"http://tech.opentable.co.uk/blog/2015/02/09/dismantling-the-monolith-microsites-at-opentable/",children:"small independently deployable web sites all connected by a front-door service or any routing mechanism"}),") that need components for rendering partial contents in their web pages."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"The framework consists mainly of three parts."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.a,{href:"#install-the-cli",children:(0,s.jsx)(n.code,{children:"cli"})})," allows developers to create, develop, test, and publish components."]}),"\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.a,{href:"#setup-a-library",children:(0,s.jsx)(n.code,{children:"library"})})," is where the components are stored after the publishing. When components depend on static resources (such as images, css files, etc.) these are stored, during packaging and publishing, in a publicly-exposed part of the library that serves as cdn."]}),"\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.a,{href:"#setup-a-registry",children:(0,s.jsx)(n.code,{children:"registry"})})," is a rest api that is used to consume, retrieve, and publish components. Since they are immutable, the registry is the entity that handles the traffic between the library and the consumers."]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"components-management",children:"Components management"}),"\n",(0,s.jsx)(n.p,{children:"A component is a directory composed by"}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"File"}),(0,s.jsx)(n.th,{children:"Description"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"package"})}),(0,s.jsx)(n.td,{children:"The component definition, dependencies, and more."})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"view"})}),(0,s.jsxs)(n.td,{children:["The view in charge to output the final markup. OC support ",(0,s.jsx)(n.code,{children:"Handlebars"})," and ",(0,s.jsx)(n.code,{children:"Jade"})," out of the box, but come with a powerful template system to support components built with any javascript UI framework like ",(0,s.jsx)(n.code,{children:"React"}),", ",(0,s.jsx)(n.code,{children:"Angular"}),", ",(0,s.jsx)(n.code,{children:"Vue"}),"..."]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsxs)(n.td,{children:[(0,s.jsx)(n.code,{children:"server"})," (optional)"]}),(0,s.jsx)(n.td,{children:"If the component need logic, including consuming services, this is the entity that will produce the view-model to compile the view."})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"static assets (optional)"}),(0,s.jsx)(n.td,{children:"Images, Javascript, and files to be uploaded to the CDN and referenced in the HTML markup."})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"*"}),(0,s.jsx)(n.td,{children:"Any other files that will be useful for the development such as tests, docs, etc."})]})]})]}),"\n",(0,s.jsx)(n.p,{children:"After publishing, components are immutable and semantic versioned."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/docs/components/getting-started",children:"Getting started with components"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"/docs/components/the-server.js",children:"Working on the server"})}),"\n",(0,s.jsx)(n.h2,{id:"creation",children:"Creation"}),"\n",(0,s.jsx)(n.p,{children:"To create a folder containing the component:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"npm install oc -g\noc init hello-world\n"})}),"\n",(0,s.jsx)(n.h2,{id:"editing-debugging-testing",children:"Editing, debugging, testing"}),"\n",(0,s.jsx)(n.p,{children:"To start a local test registry using a components' folder as a library with a watcher:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"oc dev . 3030\n"})}),"\n",(0,s.jsx)(n.p,{children:"To see how the component looks like when consuming it:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"oc preview http://localhost:3030/hello-world\n"})}),"\n",(0,s.jsx)(n.p,{children:"As soon as you make changes on the component, you will be able to refresh this page and see how it looks."}),"\n",(0,s.jsx)(n.h2,{id:"publishing-to-a-registry",children:"Publishing to a registry"}),"\n",(0,s.jsx)(n.p,{children:"You will need an online registry connected to a library. A component with the same name and version cannot already exist on that registry."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"# you have to do the registry config first, just once\noc registry add http://my-components-registry.mydomain.com\n\n# then, ship it\noc publish hello-world/\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Now, it should be available at ",(0,s.jsx)(n.code,{children:"http://my-components-registry.mydomain.com/hello-world"}),"."]}),"\n",(0,s.jsx)(n.h1,{id:"consuming-components",children:"Consuming components"}),"\n",(0,s.jsx)(n.p,{children:"From a consumer's perspective, a component is an HTML fragment. You can render components just on the client-side, just on the server-side, or use the client-side rendering as failover strategy for when the server-side rendering fails (for example because the registry is not responding quickly or is down)."}),"\n",(0,s.jsx)(n.p,{children:"You don't need node.js to consume components on the server-side. The registry can provide you rendered components so that you can consume them using any tech stack."}),"\n",(0,s.jsx)(n.p,{children:"When published, components are immutable and semantic versioned. The registry allows consumers to get any version of the component: the latest patch, or minor version, etc."}),"\n",(0,s.jsx)(n.h2,{id:"client-side-rendering",children:"Client-side rendering"}),"\n",(0,s.jsx)(n.p,{children:"To make this happen, your components registry has to be publicly available.\nThis is all you need:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'<html>\n  <head></head>\n  <body>\n    <oc-component\n      href="http://my-components-registry.mydomain.com/hello-world/1.X.X"\n    ></oc-component>\n    <script src="http://my-components-registry.mydomain.com/oc-client/client.js"><\/script>\n  </body>\n</html>\n'})}),"\n",(0,s.jsxs)(n.p,{children:["For more information about client-side operations, look at ",(0,s.jsx)(n.a,{href:"/docs/components/client-side-operations",children:"this page"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"server-side-rendering",children:"Server-side rendering"}),"\n",(0,s.jsx)(n.p,{children:"You can get rendered components via the registry rest api."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:'curl http://my-components-registry.mydomain.com/hello-world\n\n{\n  "href": "https://my-components-registry.mydomain.com/hello-world",\n  "version": "1.0.0",\n  "requestVersion": "",\n  "html": "<oc-component href=\\"https://my-components-registry.mydomain.com/hello-world\\" data-hash=\\"cad2a9671257d5033d2abfd739b1660993021d02\\" id=\\"2890594349\\" data-rendered=\\"true\\" data-version=\\"1.0.13\\">Hello John doe!</oc-component>",\n  "type": "oc-component",\n  "renderMode": "rendered"\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Nevertheless, for improving caching and response size, when using the ",(0,s.jsx)(n.code,{children:"node.js"})," client or any language capable of executing server-side javascript the request will look more like:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:' curl http://my-components-registry.mydomain.com/hello-world/~1.0.0 -H Accept:application/vnd.oc.unrendered+json\n\n{\n  "href": "https://my-components-registry.mydomain.com/hello-world/~1.0.0",\n  "version": "1.0.0",\n  "requestVersion": "~1.0.0",\n  "data": {\n    "name": "John doe"\n  },\n  "template": {\n    "src": "https://s3.amazonaws.com/your-s3-bucket/components/hello-world/1.0.0/template.js",\n    "type": "handlebars",\n    "key": "cad2a9671257d5033d2abfd739b1660993021d02"\n  },\n  "type": "oc-component",\n  "renderMode": "unrendered"\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"In this case you get the compiled view + the data, and you can do the rendering, eventually, interpolating the view-model data and rendering the compiled view with it."}),"\n",(0,s.jsxs)(n.p,{children:["When retrieving multiple components, a ",(0,s.jsx)(n.a,{href:"/docs/consumers/batch-endpoint",children:"batch POST endpoint"})," allows to make a single request to the API."]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/opencomponents/oc-client-browser",children:"Javascript browser client"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/opencomponents/oc-client-node",children:"Javascript Node.js client"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/opencomponents/oc-client-php",children:"PHP client"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/opencomponents/ruby-oc",children:"Ruby client"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/opencomponents/opencomponents-rails",children:"Rails client"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/opencomponents/sinatra-opencomponents",children:"Sinatra client"})}),"\n"]}),"\n",(0,s.jsx)(n.h1,{id:"install-the-cli",children:"Install the cli"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"npm install oc -g\n# to see available commands:\noc\n"})}),"\n",(0,s.jsx)(n.h1,{id:"setup-a-library",children:"Setup a library"}),"\n",(0,s.jsx)(n.p,{children:"At the moment the only supported libraries are Amazon S3 & Google Storage."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"S3 - Create an account and for S3 get the API credentials; you will need them while setting up the registry."}),"\n",(0,s.jsxs)(n.li,{children:["Google Storage - Create an account and setup your ",(0,s.jsx)(n.a,{href:"https://cloud.google.com/sdk/docs/#install_the_latest_cloud_tools_version_cloudsdk_current_version",children:"gcloud"})," cli."]}),"\n"]}),"\n",(0,s.jsx)(n.h1,{id:"setup-a-registry",children:"Setup a registry"}),"\n",(0,s.jsx)(n.p,{children:"The registry is a node.js express app that serves the components. You can have multiple registries connected to a library, but you can't have multiple libraries connected to a registry.\nFirst, create a dir and install oc:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"mkdir oc-registry && cd oc-registry\nnpm init\nnpm install oc --save\n"})}),"\n",(0,s.jsxs)(n.p,{children:["For Google Storage registry configuration's documentation, ",(0,s.jsx)(n.a,{href:"/docs/registry/registry-using-google-storage",children:"look at this page"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Then on the entry point, what you need on an ",(0,s.jsx)(n.code,{children:"index.js"})," file is:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'var oc = require("oc");\n\nvar configuration = {\n  verbosity: 0,\n  baseUrl: "https://my-components-registry.mydomain.com/",\n  port: 3000,\n  tempDir: "./temp/",\n  refreshInterval: 600,\n  pollingInterval: 5,\n  s3: {\n    key: "your-s3-key",\n    secret: "your-s3-secret",\n    bucket: "your-s3-bucket",\n    region: "your-s3-region",\n    path: "//s3.amazonaws.com/your-s3-bucket/",\n    componentsDir: "components",\n  },\n  env: { name: "production" },\n};\n\nvar registry = oc.Registry(configuration);\n\nregistry.start(function (err, app) {\n  if (err) {\n    console.log("Registry not started: ", err);\n    process.exit(1);\n  }\n});\n'})}),"\n",(0,s.jsxs)(n.p,{children:["For the registry configuration's documentation, ",(0,s.jsx)(n.a,{href:"/docs/registry/registry-configuration",children:"look at this page"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>c});var s=t(6540);const o={},i=s.createContext(o);function r(e){const n=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),s.createElement(i.Provider,{value:n},e.children)}}}]);
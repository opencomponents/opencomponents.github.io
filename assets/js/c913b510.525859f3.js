"use strict";(self.webpackChunkoc_website=self.webpackChunkoc_website||[]).push([[2751],{7635:(e,n,d)=>{d.r(n),d.d(n,{assets:()=>o,contentTitle:()=>c,default:()=>a,frontMatter:()=>r,metadata:()=>i,toc:()=>l});var s=d(4848),t=d(8453);const r={sidebar_position:3},c="Structure of package.json",i={id:"components/package.json-structure",title:"Structure of package.json",description:"The basic package file package.json looks as follows:",source:"@site/docs/components/package.json-structure.md",sourceDirName:"components",slug:"/components/package.json-structure",permalink:"/docs/components/package.json-structure",draft:!1,unlisted:!1,editUrl:"https://github.com/opencomponents/opencomponents.github.io/tree/master/website/docs/components/package.json-structure.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Command Line Tool",permalink:"/docs/components/cli"},next:{title:"The server.js",permalink:"/docs/components/the-server.js"}},o={},l=[];function h(e){const n={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"structure-of-packagejson",children:"Structure of package.json"}),"\n",(0,s.jsxs)(n.p,{children:["The basic package file ",(0,s.jsx)(n.code,{children:"package.json"})," looks as follows:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'{\n  "name": "hello-world",\n  "description": "description of my hello-world component",\n  "version": "1.0.0",\n  "oc": {\n    "files": {\n      "data": "server.js",\n      "template": {\n        "src": "template.hbs",\n        "type": "oc-template-handlebars"\n      }\n    }\n  },\n  "devDependencies": {\n    "oc-template-handlebars-compiler": "6.0.8"\n  }\n}\n'})}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"Parameter"}),(0,s.jsx)(n.th,{children:"Type"}),(0,s.jsx)(n.th,{children:"Description"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"name"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"string"})}),(0,s.jsx)(n.td,{children:"the component's name, by default the name of initialised component"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"description"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"string"})}),(0,s.jsx)(n.td,{children:"the component's description, by default an empty string"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"version"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"string"})}),(0,s.jsxs)(n.td,{children:["the component's version, by default ",(0,s.jsx)(n.code,{children:"1.0.0"})]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"author"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"string"})}),(0,s.jsxs)(n.td,{children:["the component's author - suggested format is ",(0,s.jsx)(n.code,{children:"John Doe <john@doe.com>"})]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"repository"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"string"})}),(0,s.jsx)(n.td,{children:"the component's repository"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"dependencies"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"object"})}),(0,s.jsx)(n.td,{children:"the npm modules the component requires"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"devDependencies"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"object"})}),(0,s.jsx)(n.td,{children:"the npm modules the component requires in order to be developed. By convention a component of templateTypeX will require a devDependency called templateTypeX-compiler to work"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"oc"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"object"})}),(0,s.jsx)(n.td,{children:"the data involved with the component"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"oc.container"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"boolean"})}),(0,s.jsxs)(n.td,{children:["forces the component to be server-side rendered without being wrapped inside the ",(0,s.jsx)(n.code,{children:"<oc-component />"})," tag."]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"oc.files"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"object"})}),(0,s.jsx)(n.td,{children:"non-static component files"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"oc.files.env"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"object"})}),(0,s.jsx)(n.td,{children:"optional path for a .env file with environment variables"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"oc.files.data"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"string"})}),(0,s.jsxs)(n.td,{children:["the model provider's filename, by default ",(0,s.jsx)(n.code,{children:"server.js"})]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"oc.files.template"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"object"})}),(0,s.jsx)(n.td,{children:"represents the data involved with template - view, template engine"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"oc.files.template.src"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"string"})}),(0,s.jsx)(n.td,{children:"the view's filename, by default template.html"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"oc.files.template.type"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"string"})}),(0,s.jsxs)(n.td,{children:["the template engine's type, by default ",(0,s.jsx)(n.code,{children:"handlebars"})]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"oc.files.static"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"array of strings"})}),(0,s.jsx)(n.td,{children:"An array of directories that contain static resources referenced from the component's markup"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"oc.minify"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"boolean"})}),(0,s.jsxs)(n.td,{children:["Default ",(0,s.jsx)(n.code,{children:"true"}),", will minify static css and js files during publishing"]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"oc.parameters"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"object"})}),(0,s.jsxs)(n.td,{children:["Describes the component's api. Used to auto-generate documentation and get requests validation. Each ",(0,s.jsx)(n.code,{children:"key"})," is the parameter name"]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"oc.parameters[key].mandatory"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"boolean"})}),(0,s.jsxs)(n.td,{children:["Default ",(0,s.jsx)(n.code,{children:"false"}),", if ",(0,s.jsx)(n.code,{children:"true"}),", any request that does not include a valid value will be rejected with a ",(0,s.jsx)(n.code,{children:"400"})," code."]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"oc.parameters[key].type"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"string"})}),(0,s.jsxs)(n.td,{children:["Type of parameter, used for a basic validation check Allowed types are ",(0,s.jsx)(n.code,{children:"string"}),", ",(0,s.jsx)(n.code,{children:"boolean"}),", ",(0,s.jsx)(n.code,{children:"number"}),". When parameter is not valid, request will be rejected with a ",(0,s.jsx)(n.code,{children:"400"})," code"]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"oc.parameters[key].description"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"string"})}),(0,s.jsx)(n.td,{children:"Used for auto-generated documentation"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"oc.parameters[key].example"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"string"})}),(0,s.jsx)(n.td,{children:"Used for auto-generated documentation"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"oc.parameters[key].default"}),(0,s.jsx)(n.td,{children:"*"}),(0,s.jsx)(n.td,{children:"Default value of optional parameter - applied when value is not specified in the request"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"oc.plugins"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"array of strings"})}),(0,s.jsxs)(n.td,{children:["the ",(0,s.jsx)(n.a,{href:"/docs/registry/registry-configuration#plugins",children:"plugins"})," the component requires"]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"oc.renderInfo"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"boolean"})}),(0,s.jsxs)(n.td,{children:["Default ",(0,s.jsx)(n.code,{children:"true"}),", appends script, which adds rendered component information (name and version) to the ",(0,s.jsx)(n.code,{children:"oc.renderedComponents"})," object"]})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"oc.state"})}),(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"string"})}),(0,s.jsxs)(n.td,{children:["Describes the state of the component with a keyword. Suggested values are ",(0,s.jsx)(n.code,{children:"active"}),", ",(0,s.jsx)(n.code,{children:"experimental"}),", ",(0,s.jsx)(n.code,{children:"deprecated"})]})]})]})]})]})}function a(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},8453:(e,n,d)=>{d.d(n,{R:()=>c,x:()=>i});var s=d(6540);const t={},r=s.createContext(t);function c(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);
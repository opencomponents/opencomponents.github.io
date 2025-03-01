"use strict";(self.webpackChunkoc_website=self.webpackChunkoc_website||[]).push([[8961],{1785:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>r,toc:()=>a});var s=n(4848),i=n(8453);const o={sidebar_position:2},l="Template system",r={id:"miscellaneous/template-system",title:"Template system",description:"Introduction",source:"@site/docs/miscellaneous/template-system.md",sourceDirName:"miscellaneous",slug:"/miscellaneous/template-system",permalink:"/docs/miscellaneous/template-system",draft:!1,unlisted:!1,editUrl:"https://github.com/opencomponents/opencomponents.github.io/tree/master/website/docs/miscellaneous/template-system.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Architecture overview",permalink:"/docs/miscellaneous/architecture-overview"},next:{title:"Debugging",permalink:"/docs/miscellaneous/debugging"}},c={},a=[{value:"Introduction",id:"introduction",level:2},{value:"Using templates",id:"using-templates",level:2},{value:"With the CLI",id:"with-the-cli",level:3},{value:"On the Registry",id:"on-the-registry",level:3},{value:"Client-side rendering",id:"client-side-rendering",level:3},{value:"templates exposed in context",id:"templates-exposed-in-context",level:4},{value:"Server-side rendering",id:"server-side-rendering",level:3},{value:"Building templates",id:"building-templates",level:2}];function d(e){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{id:"template-system",children:"Template system"}),"\n",(0,s.jsx)(t.h2,{id:"introduction",children:"Introduction"}),"\n",(0,s.jsx)(t.p,{children:"The template system enable building components with richer client-side libraries other than the currently supported engines (handlebars and jade). One of the goal of this API is to make react a first class citizen of OC without having to lock the platform around it but allowing other technologies to be easily swapped in the future if wanted/needed."}),"\n",(0,s.jsx)(t.p,{children:"Ideally component creators should only care of handling data in order to provide a viewModel within the dataProvider and build the viewLayer using a specific library/fw (i.e. react). The template should hide all the complexity away in order to compile/optimize the client bundle, perform server-side-rendering, and all the related wiring. In order to do so, templates have full access over the whole compilation/packaging phase and provide the information needed for clients to consume and handle such components."}),"\n",(0,s.jsx)(t.h2,{id:"using-templates",children:"Using templates"}),"\n",(0,s.jsxs)(t.p,{children:["Within the component's ",(0,s.jsx)(t.code,{children:"package.json"})," a template type need to be specified together with its related compiler declared within devDependencies."]}),"\n",(0,s.jsxs)(t.blockquote,{children:["\n",(0,s.jsxs)(t.p,{children:["By convention the compiler need to follow the naming structure: ",(0,s.jsx)(t.strong,{children:(0,s.jsx)(t.code,{children:"<template-type>-compiler"})}),"."]}),"\n"]}),"\n",(0,s.jsxs)(t.p,{children:["For example a component of type: ",(0,s.jsx)(t.code,{children:"oc-template-handlebars"})," will need a compiler named ",(0,s.jsx)(t.code,{children:"oc-template-handlebars-compiler"})," in order to be correctly packaged and published:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-json",children:'...\n"oc": {\n  "files": {\n    "template": {\n      "src": "template.hbs",\n      "type": "oc-template-handlebars"\n    }\n  }\n},\n"devDependencies": {\n  "oc-template-handlebars-compiler": "6.0.8"\n},\n...\n'})}),"\n",(0,s.jsx)(t.h3,{id:"with-the-cli",children:"With the CLI"}),"\n",(0,s.jsxs)(t.p,{children:["The CLI allow to bootstrap a new component with the ",(0,s.jsx)(t.code,{children:"init"})," command. By default if no ",(0,s.jsx)(t.code,{children:"templateType"})," is passed to the command a component of type ",(0,s.jsx)(t.code,{children:"oc-template-handlebars"})," is created. Optionally you can pass any valid template as long as it follow the conventions mentioned above."]}),"\n",(0,s.jsx)(t.p,{children:"Usage:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:"$ oc init myComponent oc-template-jade\n"})}),"\n",(0,s.jsxs)(t.p,{children:["Check the ",(0,s.jsx)(t.a,{href:"/docs/components/cli",children:"CLI documentation"})," for more details."]}),"\n",(0,s.jsx)(t.h3,{id:"on-the-registry",children:"On the Registry"}),"\n",(0,s.jsx)(t.p,{children:"The registry need to be configured with the templates you want to allow:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:"const configuration = {\n...\ntemplates: [require('oc-template-extra'), require('oc-template-plus')]\n...\n}\n"})}),"\n",(0,s.jsxs)(t.p,{children:["Check the ",(0,s.jsx)(t.a,{href:"/docs/registry/registry-configuration#registry-configuration",children:"registry configuration guide"})," for more details."]}),"\n",(0,s.jsx)(t.h3,{id:"client-side-rendering",children:"Client-side rendering"}),"\n",(0,s.jsxs)(t.p,{children:["Client-side rendering is done via the ",(0,s.jsx)(t.code,{children:"oc-client.js"})," library. The library can now be dynamically updated to support client-side rendering of different templates:"]}),"\n",(0,s.jsx)(t.p,{children:"via configuration API:"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:'<script> var oc = {\n  conf: {\n    templates: [\n      {\n        "type": "oc-template-jade","externals": [\n          {"global": "jade","url": "https://unpkg.com/jade-legacy@1.11.1/runtime.js"}\n        ]\n      }\n    ]\n  }\n};\n<script src="//registry.components.com/oc-client/client.js"><\/script>\n'})}),"\n",(0,s.jsxs)(t.p,{children:["via ",(0,s.jsx)(t.code,{children:"registerTemplates()"})," API:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-js",children:'cons templates = oc.registerTemplates([{\n  "type": "custom-react-template",\n  "externals": [{\n    "global": "React",\n    "url": "https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.min.js"\n  }]\n}]);\n'})}),"\n",(0,s.jsxs)(t.p,{children:["Check the ",(0,s.jsx)(t.a,{href:"/docs/components/client-side-operations",children:"browser client documentation"})," for more details."]}),"\n",(0,s.jsx)(t.h4,{id:"templates-exposed-in-context",children:"templates exposed in context"}),"\n",(0,s.jsxs)(t.p,{children:["As a note, supported templates on the registry are now exposed via ",(0,s.jsx)(t.code,{children:"context.templates"})," on the dataProvider, this allow for example, for components to be able to dynamically configure the browser client. See the ",(0,s.jsx)(t.a,{href:"https://github.com/opentable/oc/blob/master/src/components/oc-client/server.js#L4-L5",children:"oc-client code"})," as an example."]}),"\n",(0,s.jsx)(t.h3,{id:"server-side-rendering",children:"Server-side rendering"}),"\n",(0,s.jsxs)(t.p,{children:["At the moment ",(0,s.jsx)(t.code,{children:"oc-template-handlebars"}),", ",(0,s.jsx)(t.code,{children:"oc-template-jade"})," and ",(0,s.jsx)(t.code,{children:"oc-template-react"})," support server-side rendering (SSR) as you would expect for the legacy ",(0,s.jsx)(t.code,{children:"handlebars"})," and ",(0,s.jsx)(t.code,{children:"jade"})," components."]}),"\n",(0,s.jsx)(t.h2,{id:"building-templates",children:"Building templates"}),"\n",(0,s.jsxs)(t.p,{children:["At the moment OC come with ",(0,s.jsx)(t.code,{children:"oc-template-jade"})," and ",(0,s.jsx)(t.code,{children:"oc-template-handlebars"})," as default. But you can fork any of those template, or the ",(0,s.jsx)(t.code,{children:"oc-template-react"}),", or simply build your own from scratch in case you need a custom template. Please check the following templates as a reference:"]}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://github.com/opencomponents/base-templates/tree/master/packages/oc-template-jade",children:"oc-template-jade"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://github.com/opencomponents/base-templates/tree/master/packages/oc-template-handlebars",children:"oc-template-handlebars"})}),"\n",(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:"https://github.com/opencomponents/oc-template-react",children:"oc-template-react"})}),"\n"]})]})}function p(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>l,x:()=>r});var s=n(6540);const i={},o=s.createContext(i);function l(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);
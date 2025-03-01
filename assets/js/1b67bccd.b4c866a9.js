"use strict";(self.webpackChunkoc_website=self.webpackChunkoc_website||[]).push([[1523],{4613:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>d});var i=t(4848),s=t(8453);const o={sidebar_position:4},r="F.A.Q.",a={id:"miscellaneous/faq",title:"F.A.Q.",description:"What's the difference between rendered and un-rendered components?",source:"@site/docs/miscellaneous/faq.md",sourceDirName:"miscellaneous",slug:"/miscellaneous/faq",permalink:"/docs/miscellaneous/faq",draft:!1,unlisted:!1,editUrl:"https://github.com/opencomponents/opencomponents.github.io/tree/master/website/docs/miscellaneous/faq.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Debugging",permalink:"/docs/miscellaneous/debugging"}},c={},d=[{value:"What&#39;s the difference between rendered and un-rendered components?",id:"whats-the-difference-between-rendered-and-un-rendered-components",level:2},{value:"What happens when a publish is made?",id:"what-happens-when-a-publish-is-made",level:2},{value:"How the distribution works?",id:"how-the-distribution-works",level:2},{value:"Can I link a CDN on top of the S3 bucket?",id:"can-i-link-a-cdn-on-top-of-the-s3-bucket",level:2},{value:"Can I avoid using S3?",id:"can-i-avoid-using-s3",level:2},{value:"I already use S3 to save my assets via a consolidated build pipeline. Can I reference this files from my OC components?",id:"i-already-use-s3-to-save-my-assets-via-a-consolidated-build-pipeline-can-i-reference-this-files-from-my-oc-components",level:2},{value:"I&#39;ve successfully published a component on the registry, what if I want to remove it?",id:"ive-successfully-published-a-component-on-the-registry-what-if-i-want-to-remove-it",level:2},{value:"Where can i find the logs for oc registry?",id:"where-can-i-find-the-logs-for-oc-registry",level:2},{value:"Can I setup a debugger with Visual Studio Code?",id:"can-i-setup-a-debugger-with-visual-studio-code",level:2}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"faq",children:"F.A.Q."}),"\n",(0,i.jsx)(n.h2,{id:"whats-the-difference-between-rendered-and-un-rendered-components",children:"What's the difference between rendered and un-rendered components?"}),"\n",(0,i.jsxs)(n.p,{children:["Un-rendered components delegate the rendering to the clients. This is useful for performance and cacheability.\n",(0,i.jsx)(n.a,{href:"architecture-overview#consuming-rendered-components",children:"More details about rendered components"})," and about ",(0,i.jsx)(n.a,{href:"architecture-overview#consuming-un-rendered-components",children:"un-rendered components"})]}),"\n",(0,i.jsx)(n.h2,{id:"what-happens-when-a-publish-is-made",children:"What happens when a publish is made?"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"architecture-overview#what-happens-when-a-publish-is-made",children:"Look at this page"})}),"\n",(0,i.jsx)(n.h2,{id:"how-the-distribution-works",children:"How the distribution works?"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"architecture-overview#how-distribution-works",children:"Look at this page"})}),"\n",(0,i.jsx)(n.h2,{id:"can-i-link-a-cdn-on-top-of-the-s3-bucket",children:"Can I link a CDN on top of the S3 bucket?"}),"\n",(0,i.jsxs)(n.p,{children:["Yes! Either you use Cloudfront or any other vendor's on top of the S3, you will get a url, for instance ",(0,i.jsx)(n.code,{children:"https://123456789.cloudfront.org/..."})," or ",(0,i.jsx)(n.code,{children:"https://my-cdn.my-company.com"}),". Then set the ",(0,i.jsx)(n.code,{children:"s3.path"})," property in the ",(0,i.jsx)(n.a,{href:"/docs/registry/registry-configuration#registry-configuration",children:"registry configuration"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"can-i-avoid-using-s3",children:"Can I avoid using S3?"}),"\n",(0,i.jsxs)(n.p,{children:["Yes! There is support for ",(0,i.jsx)(n.a,{href:"../registry/registry-using-google-storage",children:"Google Storage"}),", Microsoft Azure and more. For more storage adapters and creating new ones, please join the conversation in this repo: ",(0,i.jsx)(n.a,{href:"https://github.com/opencomponents/storage-adapters",children:"https://github.com/opencomponents/storage-adapters"})]}),"\n",(0,i.jsx)(n.h2,{id:"i-already-use-s3-to-save-my-assets-via-a-consolidated-build-pipeline-can-i-reference-this-files-from-my-oc-components",children:"I already use S3 to save my assets via a consolidated build pipeline. Can I reference this files from my OC components?"}),"\n",(0,i.jsx)(n.p,{children:"Yes. OC allows you to bundle all the resources a component needs inside itself (and takes care of putting all the stuff in place during the publishing), but you are free to link (absolutely) any other static asset inside your components' markup. OC will still need S3 for saving its stuff though: if you decide to share the same S3 bucket (probably because you already got a configured CDN on top of it) be careful! In particular,"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"OC heavily relies on S3 for its operations. Dedicating its own bucket is a good measure for limiting it to interfere with any other application."}),"\n",(0,i.jsx)(n.li,{children:"OC saves some files with different ACL policies when a component is published. If your bucket is already configured to be completely public (it may be the case if you use it for hosting a static site), this may not be good for OC as you may not want to expose some private stuff. In this case, you may need to get a separate bucket so that you can apply the appropriate configuration."}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"ive-successfully-published-a-component-on-the-registry-what-if-i-want-to-remove-it",children:"I've successfully published a component on the registry, what if I want to remove it?"}),"\n",(0,i.jsx)(n.p,{children:"Removing a component manually in s3 is tricky because oc relies on immutability for keeping infinite caches on many layers (clients, registry, and cdn - if there's any). That's why publishing a new version is always the recommended approach to easily invalidate all the caches. If you are doing it in an experimental phase is fine, but we ultimately wouldn't recommend it in production."}),"\n",(0,i.jsx)(n.h2,{id:"where-can-i-find-the-logs-for-oc-registry",children:"Where can i find the logs for oc registry?"}),"\n",(0,i.jsxs)(n.p,{children:["logs are not automatically saved as text files anywhere as the registry is supposed to be stateless and distributed. When instantiating the registry app, the registry ",(0,i.jsx)(n.a,{href:"../registry/registry-configuration#registryoneventname-callback",children:"exposes a set of events"})," that you can use to connect to your logging infrastructure"]}),"\n",(0,i.jsx)(n.p,{children:"For example, at OpenTable we do logging with the ELK stack for business metrics, and Graphite/Graphana for system metrics - so in real time we can profile resources, performance, and behaviour when we have millions of requests/hour(and connect those metrics to monitoring and alerting)"}),"\n",(0,i.jsx)(n.h2,{id:"can-i-setup-a-debugger-with-visual-studio-code",children:"Can I setup a debugger with Visual Studio Code?"}),"\n",(0,i.jsxs)(n.p,{children:["Yes, ",(0,i.jsx)(n.a,{href:"debugging",children:"look at this page"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>a});var i=t(6540);const s={},o=i.createContext(s);function r(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);
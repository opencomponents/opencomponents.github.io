import React from "react";

const GettingStarted = () => {
  return (
    <article>
      <header>
        <h1>Get started with OpenComponents</h1>
      </header>
      <p>
        Before starting make sure you have:
        <br />
      </p>
      <ul>
        <li>
          A cloud storage solution such as:
          <ul>
            <li>
              <a href="https://aws.amazon.com/s3" target="_blank">
                AWS S3
              </a>
            </li>
            <li>
              <a href="https://azure.microsoft.com/en-us/services/storage/blobs/" target="_blank">
                Azure Blob Storage
              </a>
            </li>
            <li>
              <a href="https://cloud.google.com/storage" target="_blank">
                Google Cloud Storage
              </a>
            </li>
          </ul>
        </li>
        <li>
          A Node.js hosting platform (Vercel, Netlify, Railway, DigitalOcean, AWS, Azure, Google Cloud, or any VPS)
        </li>
      </ul>
      <p></p>
      <h3>#1 - Deploy the registry</h3>
      <p>
        Deploy your OpenComponents registry to any Node.js hosting platform. You can use the{" "}
        <a
          href="https://github.com/opencomponents/starter-kit"
          target="_blank"
        >
          starter kit
        </a>{" "}
        as a foundation and deploy it to platforms like Vercel, Netlify, Railway, or any cloud provider that supports Node.js applications.
      </p>
      <h3>#2 - Build your first component</h3>
      <p>Install the OpenComponents CLI</p>
      <pre>$ npm install -g oc</pre>
      <p>Create your first component</p>
      <pre>$ oc init my-first-component</pre>
      <p>Develop/test locally by starting a local dev registry</p>
      <pre>$ oc dev . 3030</pre>
      <p>Your component will be available at:</p>
      <ul>
        <li>
          endpoint:{" "}
          <a href="http://localhost:3030/my-first-component" target="_blank">
            http://localhost:3030/my-first-component
          </a>
        </li>
        <li>
          info:{" "}
          <a
            href="http://localhost:3030/my-first-component/~info"
            target="_blank"
          >
            http://localhost:3030/my-first-component/~info
          </a>
        </li>
        <li>
          preview:{" "}
          <a
            href="http://localhost:3030/my-first-component/~preview"
            target="_blank"
          >
            http://localhost:3030/my-first-component/~preview
          </a>
        </li>
      </ul>
      <h3>#3 Publish the component to the registry</h3>
      <p>Add the registry using the CLI</p>
      <pre>$ oc registry add https://your-registry-domain.com/</pre>
      <p>Publish your component</p>
      <pre>
        $ oc publish my-first-component --username=YOURVALUEHERE
        --password=YOURVALUEHERE
      </pre>
      <p>
        Your component is now published:{" "}
        <a
          href="https://your-registry-domain.com/my-first-component"
          target="_blank"
        >
          https://your-registry-domain.com/my-first-component
        </a>
      </p>
    </article>
  );
};

export default GettingStarted;

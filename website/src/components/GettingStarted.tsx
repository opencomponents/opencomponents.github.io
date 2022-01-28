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
          An account on{" "}
          <a href="https://signup.heroku.com/" target="_blank">
            Heroku
          </a>
        </li>
        <li>
          An{" "}
          <a href="https://aws.amazon.com/s3" target="_blank">
            S3
          </a>{" "}
          bucket on AWS
        </li>
      </ul>
      <p></p>
      <h3>#1 - Deploy the registry to Heroku</h3>
      <p>
        <a
          className="button secondary"
          href="https://heroku.com/deploy?template=https://github.com/opencomponents/starter-kit"
          target="_blank"
        >
          Click to deploy to Heroku
        </a>{" "}
        - deploy your OpenComponents registry
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
      <pre>$ oc registry add http://my-registry.on.herokuapp.com/</pre>
      <p>Publish your component</p>
      <pre>
        $ oc publish my-first-component --username=YOURVALUEHERE
        --password=YOURVALUEHERE
      </pre>
      <p>
        Your component is now published:{" "}
        <a
          href="http://my-registry.on.herokuapp.com/my-first-component"
          target="_blank"
        >
          http://my-registry.on.herokuapp.com/my-first-component
        </a>
      </p>
    </article>
  );
};

export default GettingStarted;

import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";
import Link from "@docusaurus/Link";
import GettingStarted from "./GettingStarted";
import Users from "./Users";
import Separator from "./Separator";

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Components",
    image: "/img/home/components.png",
    description: (
      <>
        <p>
          <strong>Independent, reusable UI pieces</strong> that teams can
          develop and deploy separately. Components are self-contained with
          their own HTML, CSS, and JavaScript, making them easy to maintain and
          update without affecting other parts of your application.
        </p>
        <Link to="/docs/intro#components-management">Learn more</Link>
      </>
    ),
  },
  {
    title: "Template system",
    image: "/img/home/template-system.png",
    description: (
      <>
        <p>
          <strong>Use any frontend technology</strong> - React, Vue, Angular, or
          vanilla JavaScript. The template system handles the complexity of
          supporting multiple frameworks, so teams can choose the best tool for
          their needs without being locked into a single technology stack.
        </p>
        <Link to="/docs/building/template-system">Learn more</Link>
      </>
    ),
  },
  {
    title: "Registry",
    image: "/img/home/registry.png",
    description: (
      <>
        <p>
          <strong>Centralized component distribution</strong> with built-in
          versioning and CDN capabilities. The registry provides REST APIs for
          consuming and publishing components, with automatic static asset
          management for images, CSS, and other resources.
        </p>
        <Link to="/docs/registry/registry-configuration">Learn more</Link>
      </>
    ),
  },
  {
    title: "CLI",
    image: "/img/home/cli.png",
    description: (
      <>
        <p>
          The CLI tool allows developers to create, develop, and test components
          locally.
        </p>
        <p> It also allows publishing of components to your registry.</p>
        <Link to="/docs/components/cli">Learn more</Link>
      </>
    ),
  },
  {
    title: "Client libraries",
    image: "/img/home/clients.png",
    description: (
      <>
        <p>
          Multiple libraries are available, allowing clients to consume
          components on different environments and platforms. Depending on the
          library, clients are normally able to consume both unrendered
          components and rendered components.
        </p>
        <Link
          to="https://github.com/opencomponents/oc-client-node#oc-client"
          target="_blank"
        >
          Learn more
        </Link>
      </>
    ),
  },
  {
    title: "Open-source",
    image: "/img/home/opensource.svg",
    description: (
      <>
        <p>
          OpenComponents is an open-source, "batteries included" micro frontends
          framework. Born at OpenTable in 2014, it matured over the years into a
          battle tested solution currently used to deliver micro frontends at
          scale by fast growing companies around the world.
        </p>
      </>
    ),
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img
          className={styles.featureSvg}
          alt={title}
          src={useBaseUrl(image)}
        />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row margin-bottom--xl">
          <h2>Why OpenComponents?</h2>
          <p>
            <strong>Scale your frontend development</strong> by enabling
            multiple teams to work independently on different parts of your
            application. Each team can own their components end-to-end - from
            development to deployment.
          </p>
          <p>
            <strong>Avoid the monolith trap.</strong> As applications grow,
            frontend codebases become difficult to maintain and deploy.
            OpenComponents lets you break your UI into independently deployable
            pieces that can be composed at runtime.
          </p>
          <p>
            <strong>Technology freedom.</strong> Teams can choose their
            preferred frontend stack (React, Vue, vanilla JS) while still
            contributing to the same application. No more framework lock-in or
            migration headaches.
          </p>
          <div className="margin-top--lg">
            <h3>Perfect for:</h3>
            <ul>
              <li>
                <strong>Growing engineering teams</strong> that need to work
                independently
              </li>
              <li>
                <strong>Large applications</strong> with multiple feature areas
              </li>
              <li>
                <strong>Organizations</strong> wanting to avoid frontend
                monoliths
              </li>
              <li>
                <strong>Teams</strong> using different frontend technologies
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <div className="hr">
          <img src="/img/home/cube-small.png" />
        </div>

        <GettingStarted />

        <Separator />

        <Users />
      </div>
    </section>
  );
}

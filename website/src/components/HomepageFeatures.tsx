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
          Small, immutable, units of universal code mainly consisting of html,
          javascript and css. They can optionally contain some logic, allowing a
          server-side node.js application to compose a model that is used to
          render the view. After rendering they are pieces of pure html to be
          injected into any html page.
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
          OC is unopinionated about components and their underlying client-side
          JavaScript stack. The template system allows for support of any
          client-side technology, hiding away all the configuration complexity
          while avoiding specific UI framework lock-in.
        </p>
        <Link to="/docs/miscellaneous/template-system">Learn more</Link>
      </>
    ),
  },
  {
    title: "Registry",
    image: "/img/home/registry.png",
    description: (
      <>
        <p>
          The registry provides a rest API to consume, retrieve, and publish
          components to a library. When components depend on static resources
          (such as images, css files, etc.) these are stored, during packaging
          and publishing, in a publicly-exposed part of the library that serves
          as a CDN.
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
          <h2>Building web applications together, faster.</h2>
          <p>
            While microservice architectures allowed teams to scale delivery of
            independently deployable services, most frontend layers are still
            run as monolithic applications. Similar to server-side applications,
            frontend layers often grow into large monoliths that are difficult
            to maintain and evolve.
          </p>
          <p>
            The idea behind{" "}
            <Link
              to="https://www.thoughtworks.com/radar/techniques/micro-frontends"
              target="_blank"
            >
              micro frontends
            </Link>{" "}
            is to enable multiple teams to work seamlessy together by fostering
            end-to-end ownership of independently developed, tested and deployed
            features.
          </p>
          <p>
            Think about UI as the composition of features which are maintained
            by independent teams. These teams could be cross-functional allowing
            them to develop such features end-to-end, from a database to user
            interface and independently deploy them.
          </p>
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

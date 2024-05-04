import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";
import LogoUrl from "@site/static/img/logo.png";
import UwuLogoUrl from "@site/static/img/uwulogo.png";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const uwu = window.location.search.includes("uwu");

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        {uwu ? (
          <img alt="OC uwu logo" src={UwuLogoUrl} />
        ) : (
          <h1 className="hero__title">{siteConfig.title}</h1>
        )}
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Getting Started
          </Link>
          <Link
            className="button button--secondary button--lg m-l-20"
            to="https://gitter.im/opentable/oc"
          >
            Ask the team
          </Link>
        </div>
        <img src={LogoUrl} className="big-logo" />
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout description="Open ">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

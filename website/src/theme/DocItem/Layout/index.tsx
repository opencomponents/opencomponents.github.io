import React, { type ReactNode } from "react";
import Layout from "@theme-original/DocItem/Layout";
import type LayoutType from "@theme/DocItem/Layout";
import type { WrapperProps } from "@docusaurus/types";
import ViewMarkdownButton from "@site/src/components/ViewMarkdownButton";

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
  return (
    <>
      <Layout {...props} />
      <div style={{ marginTop: "2rem", padding: "0 2rem" }}>
        <ViewMarkdownButton />
      </div>
    </>
  );
}

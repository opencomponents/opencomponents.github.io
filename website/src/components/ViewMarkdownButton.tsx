import React from "react";
import { useLocation } from "@docusaurus/router";

/**
 * Button component that links to the original markdown file for the current page
 */
export default function ViewMarkdownButton(): JSX.Element | null {
  const location = useLocation();

  // Only show on docs pages (not on blog or other pages)
  if (!location.pathname.startsWith("/docs/")) {
    return null;
  }

  // Convert the current path to the markdown file path
  // Example: /docs/concepts/why-opencomponents -> /docs/concepts/why-opencomponents.md
  const markdownPath = location.pathname.replace(/\/$/, "") + ".md";

  return (
    <a
      href={markdownPath}
      target="_blank"
      rel="noopener noreferrer"
      className="view-markdown-button"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 1rem",
        backgroundColor: "var(--ifm-color-primary)",
        color: "white",
        textDecoration: "none",
        borderRadius: "0.375rem",
        fontSize: "0.875rem",
        fontWeight: "500",
        transition: "all 0.2s ease",
        marginTop: "1rem",
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--ifm-color-primary-dark)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--ifm-color-primary)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
      View in Markdown
    </a>
  );
}

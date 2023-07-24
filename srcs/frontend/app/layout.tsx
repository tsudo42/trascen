import "../styles/globals.css";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

const RootRayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootRayout;
import RootLayout from "@layouts/RootLayout";
import { getPersistedAuthToken } from "@persistance";
import { variants } from "@variants";
import React from "react";

const ErrorPageLayout = ({ children }) => {
  const navbarVariant = getPersistedAuthToken() ? "" : variants.authNavbar;
  return <RootLayout navbarVariant={navbarVariant}>{children}</RootLayout>;
};

export default ErrorPageLayout;

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const pagesBase = repositoryName ? `/${repositoryName}/` : "/";

  return {
    base: mode === "production" ? process.env.VITE_BASE_PATH || pagesBase : "/",
    plugins: [react()]
  };
});

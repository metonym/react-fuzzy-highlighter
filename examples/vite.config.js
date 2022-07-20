import react from "@vitejs/plugin-react";
import { ghPages } from "vite-plugin-gh-pages";

/** @type {import('vite').UserConfig} */
export default {
  base: "/react-fuzzy-highlighter/",
  plugins: [react(), ghPages()],
};

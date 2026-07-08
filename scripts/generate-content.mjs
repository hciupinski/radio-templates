import path from "node:path";
import { writeGeneratedContent } from "./content-utils.mjs";

const root = process.cwd();
const { bundle, contentFileName } = writeGeneratedContent(root);

console.log(
  `OK: wygenerowano ${path.join("public", contentFileName)} i public/content-manifest.json (${bundle.contentVersion}).`
);

import { loadValidatedContent } from "./content-utils.mjs";

const { templates, sources } = loadValidatedContent(process.cwd());

console.log(`OK: zwalidowano ${templates.length} szablonów i ${sources.length} źródeł.`);

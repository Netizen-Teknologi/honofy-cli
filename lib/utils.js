import fs from "fs";
import chalk from "chalk";

/**
 * Convert string to PascalCase
 * e.g. "user_profile" -> "UserProfile"
 */

export function pascalToCamel(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function toPascalCase(str) {
  return str
    .replace(/[-_]/g, " ")
    .replace(/\s(.)/g, (_, group1) => group1.toUpperCase())
    .replace(/\s/g, "")
    .replace(/^(.)/, (_, group1) => group1.toUpperCase());
}

/**
 * Create directory recursively if it doesn't exist
 */
export function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Write file from template with {{key}} replacement
 * - Will overwrite file unless options.overwrite is false
 */
export function writeFileFromTemplate(
  targetPath,
  templateContent,
  replaceMap = {},
  options = { overwrite: true }
) {
  if (!options.overwrite && fs.existsSync(targetPath)) {
    console.log(chalk.yellow(`⚠ File ${targetPath} already exists. Skipped.`));
    return;
  }

  let content = templateContent;
  for (const [key, value] of Object.entries(replaceMap)) {
    content = content.replace(new RegExp(`{{${key}}}`, "g"), value);
  }

  fs.writeFileSync(targetPath, content, "utf8");
  console.log(chalk.green(`✔ Created ${targetPath}`));
}

import fs from "fs";
import path from "path";
import { pascalToCamel } from "./utils.js";

export const generateService = (name, type = "api") => {
  const baseDir = `app/services/${type}/v1`;
  const filePath = path.join(baseDir, `${name}.ts`);
  const camelName = pascalToCamel(name.replace("Controller", ""));

  if (fs.existsSync(filePath)) {
    console.log(`⚠️ File ${filePath} already exists. Generation cancelled.`);
    return; // skip overwrite
  }

  const content = `
import type { Context } from 'hono'

export const ${camelName} = (c: Context) => {
  return c.json({ message: '${name} working!' })
}
`;
  fs.mkdirSync(baseDir, { recursive: true });
  fs.writeFileSync(filePath, content.trim());
  console.log(`✅ Created ${filePath}`);
};

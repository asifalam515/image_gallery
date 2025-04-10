import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginTs from "@typescript-eslint/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": eslintPluginTs,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Disable the unused-vars rule globally
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;

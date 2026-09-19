import { build } from "esbuild";
import { mkdirSync } from "node:fs";
import { execSync } from "node:child_process";

mkdirSync("dist-bundle", { recursive: true });

await build({
  entryPoints: ["src/lambda.ts"],
  outfile: "dist-bundle/lambda.js",
  bundle: true,
  platform: "node",
  target: "node20",
  format: "cjs",
  sourcemap: false,
  external: [
    "@aws-sdk/*"
  ]
});

// zip only bundled output
execSync("cd dist-bundle && zip -r ../api.zip lambda.js", { stdio: "inherit" });
console.log("Bundled and zipped: services/api/api.zip");

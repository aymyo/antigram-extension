const esbuild = require("esbuild");
const vite = require("vite");
const glob = require("glob");
const fs = require("fs-extra");
const solidPlugin = require("vite-plugin-solid");

async function getFiles() {
  return new Promise((resolve, reject) =>
    glob("src/extension/**/*.*(ts|css)", (error, matches) => {
      if (error != null) reject(error);
      else resolve(matches);
    })
  );
}

async function build() {
  await fs.rm("build", { recursive: true });
  await vite.build({
    plugins: [solidPlugin()],
    server: { port: 3000 },
    build: {
      target: "esnext",
      outDir: "../../build",
      emptyOutDir: true
    },
    root: "src/app"
  });

  await esbuild.build({
    entryPoints: await getFiles(),
    bundle: true,
    outdir: "build",
    minify: true
  });
  await fs.copy("src/manifest.json", "build/manifest.json");
  await fs.copy("LICENSE", "build/LICENSE");
  await fs.copy("src/images", "build/images");
}

build();

const esbuild = require("esbuild");
const glob = require("glob");
const fs = require("fs-extra");

async function getFiles() {
  const files = new Promise((resolve, reject) =>
    glob("src/**/*.*(ts|css)", (error, matches) => {
      if (error != null) reject(error);
      else resolve(matches);
    })
  );
  return files;
}

async function build() {
  await esbuild.build({
    entryPoints: await getFiles(),
    bundle: true,
    outdir: "build",
    minify: true
  });
  await fs.copy("src/app/options.html", "build/app/options.html");
  await fs.copy("src/manifest.json", "build/manifest.json");
  await fs.copy("LICENSE", "build/LICENSE");
  await fs.copy("src/images", "build/images");
}

build();

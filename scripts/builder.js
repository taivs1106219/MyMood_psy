const os = require("node:os");
const cp = require("child_process");
const { stderr } = require("node:process");
const { shell } = require("electron");
// const util = require("node:util");
// const exec = util.promisify(cp.exec);
let npx = process.platform == "win32" ? "npx.cmd" : "npx";

const cp_spawn = (command, arguments, options) => {
  return new Promise((resolve, reject) => {
    const process = cp.spawn(command, arguments, options);
    process.stdout.on("data", (data) => {
      console.log(`${data}`);
    });

    process.stderr.on("data", (data) => {
      console.error(`${data}`);
    });

    process.on("close", (code) => {
      // console.log(`child process exited with code ${code}`);
      if (code) {
        reject(code);
      } else {
        resolve(code);
      }
    });
  });
};

async function main() {
  await cp_spawn(npx, ["webpack", "--mode", "development"], { shell: true });
  await cp_spawn(npx, ["electron-builder"], { shell: true });
}

main();

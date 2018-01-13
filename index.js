#!/usr/bin/env node

const exec = require("child_process").exec;
const { version } = require("./package.json");
const { parallel } = require("async");
const getSize = require("get-folder-size");

if (process.argv.includes("-v") || process.argv.includes("--version")) {
  process.stdout.write(`${version}\n`);
  process.exit(0);
}

process.on('exit', code => {
  if (code !== 0) {
    process.stderr.write(`toad_modules🐛${version}\n`);
  }
});

let [ target ] = process.argv.slice(2);
if (!target) {
  target = process.cwd();
}
if (target[target.length - 1] === "/") {
  target = target.substring(0, target.length - 1);
}

const command = `find ${target} -type d -name "node_modules"`;

const line = (mb, label) => `${("" + Math.round(mb)).padStart(5)}M ${label}\n`;

exec(command, (error, stdout, stderr) => {
  const roots = stdout.split("\n").filter(path => {
    const hasTwo = !!path.match(/node_modules.*node_modules/);
    return path !== "" && !hasTwo;
  });

  const labels = roots.map(path => path.substring(target.length + 1));
  const callbacks = roots.map((path, i) => {
    return cb => {
      getSize(path, (error, size) => {
        process.stdout.write(line(size / 1024 / 1024, labels[i]));
        cb(null, size);
      });
    };
  });

  parallel(callbacks, (error, results) => {
    const total = results.reduce((acc, curr) => acc + curr);
    process.stdout.write(line(total / 1024 / 1024, "TOTAL");
  });
});


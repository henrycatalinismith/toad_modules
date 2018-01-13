#!/usr/bin/env node

const exec = require("child_process").exec;
const { parallel } = require("async");
const getSize = require("get-folder-size");
const { sprintf } = require("sprintf");

let [ target ] = process.argv.slice(2);
if (!target) {
  target = process.cwd();
}
if (target[target.length - 1] === "/") {
  target = target.substring(0, target.length - 1);
}

const command = `find ${target} -type d -name "node_modules"`;

exec(command, (error, stdout, stderr) => {
  const roots = stdout.split("\n").filter(path => {
    const hasTwo = !!path.match(/node_modules.*node_modules/);
    return path !== "" && !hasTwo;
  });

  const labels = roots.map(path => path.substring(target.length + 1));
  const callbacks = roots.map((path, i) => {
    return cb => {
      getSize(path, (error, size) => {
        console.log(sprintf(`%5dM %s`, size / 1024 / 1024, labels[i]));
        cb(null, size);
      });
    };
  });

  parallel(callbacks, (error, results) => {
    const total = results.reduce((acc, curr) => acc + curr);
    console.log(sprintf(`%5dM %s`, total / 1024 / 1024, "TOTAL"));
  });
});


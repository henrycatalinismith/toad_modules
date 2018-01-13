#!/usr/bin/env node
const exec = require("child_process").exec;
const getSize = require("get-folder-size");
const { sprintf } = require("sprintf");

let [ target ] = process.argv.slice(2);
if (target[target.length - 1] === "/") {
  target = target.substring(0, target.length - 1);
}

const regex = 'node_modules$';
const command = `find ${target} -type d | grep "${regex}"`;

exec(command, (error, stdout, stderr) => {
  const roots = stdout.split("\n").filter(path => {
    const hasTwo = !!path.match(/node_modules.*node_modules/);
    return path !== "" && !hasTwo;
  });

  const labels = roots.map(path => path.substring(target.length + 1));

  const longest = labels.reduce((prev,cur) => {
    return prev.length > cur.length ? prev : cur;
  }, "");

  roots.forEach((path, i) => {
    getSize(path, (error, size) => {
      console.log(sprintf(`%-${longest.length}s %dM`, labels[i], size / 1024 / 1024));
    });
  });
});


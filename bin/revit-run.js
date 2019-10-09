#!/usr/bin/env node

const shell = require('shelljs');
var spawn = require('child_process').spawn;

var fs = require("fs");

const args = process.argv.slice(2)
const init = args[0]

const path = './.revrc';

var revisionNumber;

try {
    if (fs.existsSync(path)) {
        revisionNumber = parseInt(fs.readFileSync("./.revrc", "utf-8").trim());
    } else {
        if (!init || init !== "i")
          shell.exit(".revrc was not found in this directory.\nTo proceed, create an empty .revrc in the root of your project, or run: revit i");
        else
        {
          revisionNumber = 0;
          shell.exec("echo " + revisionNumber + " > " + path, { silent: true });
        }
    }
    const addcommit = "git add . && git commit -m \"rev. " + revisionNumber + "\"";

    shell.exec(addcommit, { silent: false })

    revisionNumber++;

    shell.exec("echo " + revisionNumber + " > " + path, { silent: true });

    spawn('git', ['push', '-u', 'origin', 'master'], { stdio: 'inherit' });

} catch (err) {
    shell.exec("git reset", { silent: true });

    shell.exec("echo " + (revisionNumber-1) + " > " + path, { silent: true });

    shell.exec("echo Revision was not iterated");
}
#!/usr/bin/env node

const shell = require('shelljs');
var spawn = require('child_process').spawn;

var fs = require("fs");

const args = process.argv.slice(2)
const setRevisionNumber = args[0]

const path = './.revrc';

var revisionNumber;

try {
    if (fs.existsSync(path)) {
        revisionNumber = parseInt(fs.readFileSync("./.revrc", "utf-8").trim());
    } else {
        if (!setRevisionNumber)
            shell.exit(".revrc was found in this directory.\nTo set the current revision and proceed with the iteration, run: \"revit REVISION\"\nExample: revit 0");
        else
            revisionNumber = setRevisionNumber;
    }
    revisionNumber++;

    const addcommit = "git add . && git commit -m \"rev. " + revisionNumber + "\"";

    shell.exec(addcommit, { silent: false })

    //fs.writeFileSync(path, revisionNumber, { encoding: 'utf8', flag: 'w' });
    shell.exec("echo " + revisionNumber + " > " + path, { silent: true });

    spawn('git', ['push', '-u', 'origin', 'master'], { stdio: 'inherit' });

} catch (err) {
    shell.exec("git reset", { silent: true });

    shell.exec("echo " + (revisionNumber-1) + " > " + path, { silent: true });

    shell.exec("echo Revision was not iterated");
}
//shell.exec("echo Current revision is '" + revisionNumber +"'");
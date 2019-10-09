#!/usr/bin/env node
const shell = require('shelljs');
var spawn = require('child_process').spawn;

var fs = require("fs");

const args = process.argv.slice(2)
const setRevisionNumber = args[0]

const path = './.revrc';

var revisionNumber;

try
{
  if (fs.existsSync(path))
  {
    revisionNumber = parseInt(fs.readFileSync("./.revrc", "utf-8").trim());
  }
  else
  {
    if(!setRevisionNumber)
      shell.exit(".revrc was found in this directory.\nTo set the current revision and push to master, run: \"revit REVISION\"\nExample: revit 0");
    else
      revisionNumber = setRevisionNumber;
  }
  revisionNumber++;
  
  const addcommit = "git add . && git commit -m \"rev. " + revisionNumber + "\"";

  shell.exec(addcommit, { silent: false })

  shell.exec("cp " + path + " " + path + ".process", { silent: true });

  fs.writeFileSync(path, revisionNumber, {encoding:'utf8', flag:'w'});

  spawn('git', ['push', '-u', 'origin', 'master'], {stdio: 'inherit'});

} catch(err) {
  shell.exec("git reset", { silent: true });
  shell.exec("rm " + path, { silent: true });
  shell.exec("mv " + path + ".process " + path, { silent: true });
  shell.exec("echo Revision was not iterated");
}

shell.exec("echo Current revision is '" + revisionNumber +"'");

shell.exec("rm " + path + ".process", { silent: true });
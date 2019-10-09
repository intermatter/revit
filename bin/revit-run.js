#!/usr/bin/env node

const shell = require('shelljs');
var spawn = require('child_process');

var fs = require("fs");

const args = process.argv.slice(2)
const init = args[0]

const path = './.revrc';

var revisionNumber;

if (fs.existsSync(path))
  if(init == "i")
  {
    shell.exec("Echo Ignoring the initialization flag since a .revrc file already exists in the current directory. To reset this project, run `revit if`. If you intend to process an iteration, run `revit`.");
    shell.exit(0);
  }
  else
    if(init == "if")
    {
      revisionNumber = 0;
      shell.exec("echo " + revisionNumber + " > " + path, { silent: true });
      shell.exec("Echo The project was reset successfully. To process an iteration, run `revit`.");
      shell.exit(0);
    }
  else
    revisionNumber = parseInt(fs.readFileSync(path, "utf-8").trim());
else 
  if (init != "i" || init == "if")
  {
    shell.exec("Echo Error: A .revrc file was not found in this directory. To proceed, run `revit i` or create an empty .revrc file in the root of your project.");
    shell.exit(0);
  }
  else
  {
    revisionNumber = 0;
    shell.exec("echo " + revisionNumber + " > " + path, { silent: true });
    shell.exec("Echo The prsoject was initialized successfully. To process an iteration, run `revit`.");
    shell.exit(0);
  }
  
if(!revisionNumber)
  revisionNumber = 0;

revisionNumber++;

shell.exec("echo " + revisionNumber + " > " + path, { silent: true });

const addcommit = "git add . && git commit -m \"rev. " + revisionNumber + "\"";

try
{
  shell.exec(addcommit, { silent: false });
  spawn.execFileSync('git', ['push', '-u', 'origin', 'master'], { stdio: 'inherit' });
}
catch (err)
{
  shell.exec("git reset", { silent: true });

  shell.exec("echo " + (revisionNumber-1) + " > " + path, { silent: true });

  shell.exec("echo Revision was not iterated.");
}
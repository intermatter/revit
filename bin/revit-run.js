#!/usr/bin/env node
const shell = require('shelljs');
const { spawn } = require('child_process');

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
  const script = "cd " + process.cwd() + " && git add . && git commit -m \"rev. " + revisionNumber + "\"";

  const { code } = shell.exec(script, { silent: false })

  spawn('git', ['push', '-u', 'origin', 'master'], {stdio: 'inherit'});

  if(code && code !== 0)
  {
    shell.exec("git reset");
    shell.exec("echo Revision iteration was not successful.,..... Current revision is at 'rev. " + (revisionNumber-1) +"'.");
  }
  else
  {
    shell.exec("echo Current revision is '" + revisionNumber +"'.");
    fs.writeFile('.revrc', revisionNumber);
  }
    shell.exec("echo " + code);

} catch(err) {
  shell.exit(err)
}

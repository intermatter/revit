#!/usr/bin/env node
const shell = require('shelljs');
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
  if(shell.exec("git add . && git commit -m \"rev. " + revisionNumber + "\" && git push -u origin master"))
    shell.exec("echo Success");
  else
    shell.exec("echo Failed");

  fs.writeFile('.revrc', revisionNumber);
} catch(err) {
  shell.exit(err)
}




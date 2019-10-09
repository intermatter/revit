#!/usr/bin/env node

const shell = require('shelljs');
var spawn = require('child_process');
var fs = require("fs");
const args = process.argv.slice(2);
var message = args[0];
if(!message)
  message = "";

const addcommit = "git add . && git commit -m \"" + message + "\" --allow-empty-message";

try
{
  shell.exec(addcommit, { silent: false });

  spawn.execFileSync('git', ['push', '-u', 'origin', 'master'], { stdio: 'inherit' });
}
catch (err)
{
  shell.exec("echo Revision was not iterated.");
}
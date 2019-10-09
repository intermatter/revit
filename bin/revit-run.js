#!/usr/bin/env node
const shell = require('shelljs')
shell.exec("rev=$(cat .revrc) && rev=$((rev+1)) && echo \"${rev}\" > .revrc &&  git add . && git commit -m \"rev. ${rev}\" && git push -u origin master")
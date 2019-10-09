#!/usr/bin/env node
import {windows} from 'platform-detect/os.mjs';
const shell = require('shelljs');
if(windows)
shell.exec("cd ..");
else
shell.exec("rev=$(cat .revrc) && rev=$((rev+1)) && echo \"${rev}\" > .revrc &&  git add . && git commit -m \"rev. ${rev}\" && git push -u origin master");
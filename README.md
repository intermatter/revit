# Revit
NPM package to enable revisionary iterations.

This module acts as an alias for "git add . && git commit -m "rev. REVISION_ID" && git push -u origin master", where REVISION_ID is auto-incremented with a local .revrc file.

## Installation
````
npm -i -g revit
````

## Usage
To create an iteration, run:
````
revit
````
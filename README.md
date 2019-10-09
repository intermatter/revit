# Revit

This module acts as an alias for "git add . && git commit -m "rev. REVISION_ID" && git push -u origin master", where REVISION_ID is auto-incremented with a local .revrc file.

## Installation
````
npm i -g revit
````

## Usage
To create an iteration, run:
````
revit
````

## Note
.revrc is auto-incremented. It should be committed and should not be manually modified.
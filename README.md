# Revit

This module acts as an alias for "git add . && git commit -m "rev. REVISION_ID" && git push -u origin master", where REVISION_ID is auto-incremented with a local .revrc file.

## Installation
````
npm i -g revit
````

## Usage

To initialize revit in your project:
````
revit i
````

To process an iteration:
````
revit
````

## Note
The `revit` command sets the comment of the next iteration to the number in the .revrc file, which will always be auto-incremented.
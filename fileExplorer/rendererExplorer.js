const fs = require('fs');
const os = require('os');
const SEPARATOR = require('path').sep
const {
  shell
} = require('electron');

// Init list of files
let listOfFiles = []

// Init path
let actualFolder = os.homedir();
let movingDir = "";
let myPath = String(os.homedir()).split(SEPARATOR);
const HOMEDIR = String(os.homedir()).split(SEPARATOR);
myPath = myPath.join(SEPARATOR)


document.getElementById('currentFolder').value += thePath(myPath)
displayList(actualFolder)

function goToFolder(file) {
  console.log("GO TO FOLDER");

  path = pathToString(myPath, file)

  if (path == false) {
    return false
  }

  displayReset(path);
  displayList(path)

  myPath = path
}

function goHome() {
  GoWhereIWant(HOMEDIR)
}

function GoWhereIWant(location) {
  myPath = location
  pathToString(myPath, '')
  displayReset(myPath)

  if (typeof myPath != "string") {
    myPath = myPath.join(SEPARATOR)
  }

  displayList(myPath)
}

function searchBar() {
  console.log('SEARCHBAR');

  let goToHere = document.getElementById("currentFolder").value
  GoWhereIWant(goToHere)
}

function goBack() {
  console.log("GO BACK");

  if (typeof myPath == "string") {
    myPath = myPath.split(SEPARATOR);
    myPath.pop()
    myPath = myPath.join(SEPARATOR)
  } else {
    myPath.pop()
    myPath = myPath.join(SEPARATOR)
  }

  displayReset(myPath);
  displayList(myPath)
}

function pathToString(path, file) {

  if (typeof path != "string") {
    path = path.join(SEPARATOR)
  }

  let nextDir = path + SEPARATOR + file

  statsObj = fs.statSync(nextDir);

  // console.log(statsObj);  
  console.log("Path is file:", statsObj.isFile());
  console.log("Path is directory:", statsObj.isDirectory());

  if (statsObj.isDirectory() != true) {
    console.log('is not directory !');
    return false
  }


  if (typeof path == "string") {
    path = path.split(SEPARATOR);
    path.push(file)
    path = path.join(SEPARATOR)
  } else {
    path.push(file)
    path = path.join(SEPARATOR)
  }
  return path
}

function displayReset(myPath) {
  console.log('DISPLAY RESET');

  document.getElementById('folderList').innerHTML = ""
  document.getElementById('currentFolder').value = thePath(myPath)
}

function thePath(myPath) {
  console.log('THE PATH');

  if (typeof myPath != "string") {
    myPath = myPath.join(SEPARATOR)
  }

  console.log(myPath);

  return myPath
}

function displayList(folder) {
  console.log('DISPLAY LIST')

  let fileIcon = ""

  fs.readdir(folder, (err, files) => {
    files.forEach(file => {
      statsObj = fs.statSync(myPath + SEPARATOR + file);
      if (statsObj.isDirectory() === true) {
        fileIcon = '<i class="gg-folder"></i>'
        document.getElementById('folderList').innerHTML += '<div class="fileItem">' + '<input type="checkbox" onclick="addToList(\'' + file + '\')" />' + '<span>' + fileIcon + '</span>' + '<a class="linkFile" ondblclick="goToFolder(\'' + file + '\')">' + file + '</a>' + '</div>'
      } else {
        fileIcon = '<i class="gg-file-document"></i>'
        document.getElementById('folderList').innerHTML += '<div class="fileItem">' + '<input type="checkbox" onclick="addToList(\'' + file + '\')" />' + '<span>' + fileIcon + '</span>' + '<a class="linkFile" ondblclick="openFile(\'' + file + '\')">' + file + '</a>' + '</div>'
      }
    });
  });
}

function openFile(file) {
  shell.openExternal(myPath + SEPARATOR + file);
}

function validateRename() {
  file = listOfFiles[0]
  document.getElementById("renameBox").style.display = "none";

  let ext = file.split('.').pop();
  let name = document.getElementById("renameValue").value
  if (name == null || name == "") {
    console.log("User cancelled the rename.");
  } else {
    console.log("User changed the rename.");
  }

  fs.rename(file, myPath + SEPARATOR + name + "." + ext, (err) => {
    if (err) throw err;
    console.log('Rename complete!');
  });

  document.getElementById("rename").style.display = "none";
  clearAfterActions()
}

function renameFile() {
  document.getElementById("renameBox").style.display = "flex";
}

function addToList(file) {
  console.log('ADD TO LIST')

  myFile = myPath + SEPARATOR + file
  const index = listOfFiles.indexOf(myFile);

  if (index === -1) {
    listOfFiles.push(myFile)
  } else {
    listOfFiles.splice(index, 1)
    document.getElementById("renameBox").style.display = "none";
  }
  console.log(listOfFiles);

  checkRename(listOfFiles)
}

function checkRename(tab) {
  if (tab.length !== 1) {
    document.getElementById("rename").style.display = "none";
  } else {
    document.getElementById("rename").style.display = "flex";
  }
}

function deleteFiles() {
  document.getElementById("deleteBox").style.display = "flex";
}

function deleteBox() {
  listOfFiles.forEach(element => {
    statsObj = fs.statSync(element);
    if (statsObj.isDirectory() == true) {
      fs.rmdir(element, () => {
        console.log("Folder Deleted!");
      });
    } else {
      fs.unlink(element, (err) => {
        if (err) throw err;
        console.log(element + ' was deleted');
      });
    }
  });
  document.getElementById("deleteBox").style.display = "none";
  clearAfterActions()
}

function cutFiles() {
  listOfFiles.forEach(element => {
    console.log(myPath);
    console.log(element);
    
    // fs.rename(element, myPath, (err) => {
    //   if (err) throw err;
    //   console.log('Move complete!');
    // });

    // FAIRE EN SORTE D'AVOIR UNE VAR QUI CHOISI COPIER OU COLLER
  });
}

function clearAfterActions() {
  listOfFiles = []
  GoWhereIWant(myPath);
}
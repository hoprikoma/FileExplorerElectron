const fs = require('fs');
const os = require('os');
const SEPARATOR = require('path').sep
const {shell} = require('electron');

// Init path
let actualFolder = os.homedir();
let movingDir = "";
let myPath = String(os.homedir()).split(SEPARATOR);
const HOMEDIR = String(os.homedir()).split(SEPARATOR);

myPath = myPath.join(SEPARATOR)

document.getElementById('currentFolder').innerHTML += thePath(myPath)

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
  document.getElementById('displayPic').innerHTML = ""
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
        document.getElementById('folderList').innerHTML += '<div class="fileItem">' + '<span>' + fileIcon + '</span>' + '<a class="linkFile" ondblclick="goToFolder(\'' + file + '\')">' + file + '</a>' + '</div>'
      } else {
        fileIcon = '<i class="gg-file-document"></i>'
        document.getElementById('folderList').innerHTML += '<div class="fileItem">' + '<span>' + fileIcon + '</span>' + '<a class="linkFile" ondblclick="openFile(\'' + file + '\')">' + file + '</a>' + '</div>'
      }
    });
  });
}

function openFile(file) {
  shell.openExternal(myPath + SEPARATOR + file);
}

function renameFile(params, file) {
  let ext = file.split('.').pop();
  let name = prompt("Please enter new file name:", "");
  if (name == null || name == "") {
    console.log("User cancelled the rename.");
  } else {
    console.log("User changed the rename.");
  }
  
  fs.rename(myPath + SEPARATOR + file, myPath + SEPARATOR + name + "." + ext, (err) => {
    if (err) throw err;
    console.log('Rename complete!');
  });
}
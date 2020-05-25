// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const fs = require('fs');
const os = require('os')
let actualFolder = os.homedir();
let movingDir = "";
let myPath = String(os.homedir()).split("\\");

console.log(myPath);


document.getElementById('currentFolder').innerHTML += "Current folder : " + thePath(myPath)

fs.readdir(actualFolder, (err, files) => {
  files.forEach(file => {
    console.log();
    document.getElementById('folderList').innerHTML += '<a onclick="goToFolder(\'' + file + '\')">' + file + '</a>'
  });
});

function goToFolder(file) {
  console.log("GO TO FOLDER");


  if (checkIfDir(file) != true) {
    console.log("It's not a directory")
    return false
  }

  console.log(myPath);
  

  pathToString(file)
  displayReset();


  fs.readdir(myPath, (err, files) => {
    files.forEach(file => {
      console.log();
      document.getElementById('folderList').innerHTML += '<a onclick="goToFolder(\'' + file + '\')">' + file + '</a>'
    });
  });
}

function thePath(myPath) {
  console.log('THE PATH');

  if (typeof myPath != "string") {
    myPath = myPath.join('\\')
  }

  return myPath
}

function goBack() {
  console.log("GO BACK");
  console.log(myPath);


  if (typeof myPath == "string") {
    myPath = myPath.split("\\");
    myPath.pop()
    myPath = myPath.join('\\')
  } else {
    myPath.pop()
    myPath = myPath.join('\\')
  }

  displayReset();

  fs.readdir(myPath, (err, files) => {
    files.forEach(file => {
      console.log();
      document.getElementById('folderList').innerHTML += '<a onclick="goToFolder(\'' + file + '\')">' + file + '</a>'
    });
  });
}

function checkIfDir(file) {
  console.log('CHECK IF DIR');

  var path = myPath

  pathToString(file)
  

  statsObj = fs.statSync(path); 
  
  // console.log(statsObj);  
  console.log("Path is file:", statsObj.isFile()); 
  console.log("Path is directory:", statsObj.isDirectory()); 


  console.log(statsObj.isDirectory());

  return statsObj.isDirectory()

}

function pathToString(file) {
  if (typeof path == "string") {
    path = path.split("\\");
    console.log('test1');
    
    path.push(file)
    path = path.join('\\')
  } else {
    console.log('test2');
    path.push(file)
    path = path.join('\\')
  }
}

function displayReset() {
  document.getElementById('folderList').innerHTML = ""
  document.getElementById('currentFolder').innerHTML = "Current folder : " + "<span>" + thePath(myPath) + "</span>"
}
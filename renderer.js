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

document.getElementById('currentFolder').innerHTML += "Current folder : " + thePath(myPath)

fs.readdir(actualFolder, (err, files) => {
  files.forEach(file => {
    console.log();
    document.getElementById('folderList').innerHTML += '<a onclick="goToFolder(\'' + file + '\')">' + file + '</a>'
  });
});

function goToFolder(file) {
  console.log("GO TO FOLDER");
  
  path = pathToString(myPath, file)
  
  displayReset(path);


  fs.readdir(path, (err, files) => {
    files.forEach(file => {
      console.log();
      document.getElementById('folderList').innerHTML += '<a onclick="goToFolder(\'' + file + '\')">' + file + '</a>'
    });
  });

  myPath = path
}



function goBack() {
  console.log("GO BACK");

  if (typeof myPath == "string") {
    myPath = myPath.split("\\");
    myPath.pop()
    myPath = myPath.join('\\')
  } else {
    myPath.pop()
    myPath = myPath.join('\\')
  }
  
  console.log(myPath);

  displayReset(myPath);

  fs.readdir(myPath, (err, files) => {
    files.forEach(file => {
      console.log();
      document.getElementById('folderList').innerHTML += '<a onclick="goToFolder(\'' + file + '\')">' + file + '</a>'
    });
  });
}

function pathToString(path, file) {

  if (typeof path != "string") {
    path = path.join('\\')
  }

  let nextDir = path+'\\'+file

  statsObj = fs.statSync(nextDir); 
  
  // console.log(statsObj);  
  // console.log("Path is file:", statsObj.isFile()); 
  // console.log("Path is directory:", statsObj.isDirectory());

  if (statsObj.isDirectory() != true) {
    console.log('is not directory !');
    return false
  }  
  

  if (typeof path == "string") {
    path = path.split("\\");
    path.push(file)
    path = path.join('\\')
  } else {
    path.push(file)
    path = path.join('\\')
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
    myPath = myPath.join('\\')
  }
  
  console.log(myPath);
  return myPath
}
const TabGroup = require("electron-tabs");

// Init Tabs
let tabGroup = new TabGroup();
let tab = tabGroup.addTab({
  title: "Explorer",
  src: "./fileExplorer/index.html",
  visible: true,
  webviewAttributes: {
    nodeintegration: true
  }
});
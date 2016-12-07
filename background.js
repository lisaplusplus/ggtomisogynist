// Post install tasks
chrome.runtime.onInstalled.addListener(function(details){
  console.log("Plugin onInstalled event detected");
  if(details.reason == "install") { 
    console.log("Defaulting plugin to enabled for first run");
    init(true);
  }
});

//// Plugin load starts here
chrome.runtime.onStartup.addListener(function() {
  chrome.storage.sync.get('enabled', function(items) {
    console.log(items.enabled);
    if (typeof items.enabled != 'undefined') {
      init(items.enabled);
    }
  });
});

init = function(enabled) {
  console.log("Initialising the greatest chrome plugin ever... (mode = " + enabled + ")")
  setMode(enabled);
  registerClickListener(enabled);
}

//// Event for clicking the icon
registerClickListener = function(enabled) {
  chrome.browserAction.onClicked.addListener(function (tab) {
    setMode(!enabled);   
  });
}

setMode = function(enabled) {
  //// Persist the plugin enable variable value
  chrome.storage.sync.set({'enabled': enabled}, function() {
    setupPluginIcon(enabled);
    console.log("Plugin toggled mode toggled to " + enabled + " successfully!");
      
    //// Communicate click event to the client side script injected by the plugin
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {enabled: enabled}, function(response) {
      });
    });
  });
}

//// Configure the icon depenending on plugin status
setupPluginIcon = function(enabled) {
  if (enabled) {
    setEnabledIcon();
  } else {
    setDisabledIcon();
  }
}

//// Use the glorious techni color when on
setEnabledIcon = function() {
  chrome.browserAction.setIcon({
    path: "images/icon-regular.png",
  });
};

//// Use the boring grey icon
setDisabledIcon = function() {
  chrome.browserAction.setIcon({
    path: "images/icon-disabled.png",
  });
};

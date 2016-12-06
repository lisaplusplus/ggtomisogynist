// Post install tasks
chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == "install") { 
    init(true);
  }
});

//// Plugin load starts here
chrome.storage.sync.get('enabled', function(items) {
  console.log(items.enabled);
  init(items.enabled);
});

init = function(enabled) {
  console.log("Initialising the greatest chrome plugin ever... (mode = " + enabled + ")")
  setupPluginIcon(enabled);
  registerClickListener(enabled);
}

//// Event for clicking the icon
registerClickListener = function(enabled) {
  chrome.browserAction.onClicked.addListener(function (tab) {
    enabled = !enabled;

    //// Persist the plugin enable variable value
    chrome.storage.sync.set({'enabled': enabled}, function() {
      setupPluginIcon(enabled);
      console.log("Plugin toggled mode toggled to " + enabled + " successfully!");
    });

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

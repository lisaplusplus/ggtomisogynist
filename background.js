//// Plugin load starts here
//chrome.runtime.onStartup.addListener(function() {
// Todo, bind this to some sort of event. 
chrome.storage.sync.get('disabled', function(items) {
  console.log(items.disabled);
  init(items.disabled);
});
//});

init = function(disabled) {
  console.log("Initialising the greatest chrome plugin ever... (mode = " + disabled + ")")
  registerClickListener();
}

//// Event for clicking the icon
registerClickListener = function() {
  chrome.browserAction.onClicked.addListener(function (tab) {
    toggleMode();
  });
}

toggleMode = function() {
  console.log("Toggling extension on/off");

  //// Get, invert then set the plugin on/off switch
  chrome.storage.sync.get('disabled', function(items) {
    newValue = !items.disabled;
    chrome.storage.sync.set({'disabled': newValue}, function() {
      setupPluginIcon(newValue);
      console.log("Plugin disabled flag toggled to " + newValue + " successfully!");

      //// Communicate click event to the client side script injected by the plugin
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log("Sending " + newValue + " to client");
        chrome.tabs.sendMessage(tabs[0].id, {disabled: newValue}, function(response) {
        });
      });
    });
  });
}

//// Configure the icon depenending on plugin status
setupPluginIcon = function(disabled) {
  if (disabled) {
    setDisabledIcon();
  } else {
    setEnabledIcon();
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

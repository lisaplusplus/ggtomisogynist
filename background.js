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
    // Work out new state and update extension icon
    newValue = !items.disabled;
    setupPluginIcon(newValue);

    //// Communicate click event to the client side script injected by the plugin
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log("Sending " + newValue + " to client");
      chrome.tabs.sendMessage(tabs[0].id, {disabled: newValue}, function(response) {
      });
    });

    // Presist disable flag
    chrome.storage.sync.set({'disabled': newValue}, function() {
      console.log("Plugin disabled flag persisted as " + newValue);
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

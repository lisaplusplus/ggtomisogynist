var _disabled;

//// Plugin load starts here
//chrome.runtime.onStartup.addListener(function() {
// Todo, bind this to some sort of event.
chrome.storage.sync.get('disabled', function(items) {
  console.log(items.disabled);
  _disabled = items.disabled;
  init(_disabled);
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

  // Flip the cached disabled flag
  _disabled = !_disabled;

  //// Communicate click event to the content script
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log("Sending " + _disabled + " to client");
    chrome.tabs.sendMessage(tabs[0].id, {disabled: _disabled}, function(response) {
      setupPluginIcon(_disabled);
    });
  });

  // Presist the mode switch. We just overwrite the stored value.
  chrome.storage.sync.set({'disabled': _disabled}, function() {
    console.log("Plugin disabled flag persisted as " + _disabled);
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

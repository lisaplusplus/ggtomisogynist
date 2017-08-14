var createMutationObserver = function() {
  return new WebKitMutationObserver(
    function(mutations, observer) {
      mutations.forEach(function(mutation) {
        doReplace(mutation.target);
      });
  });
};

var _observer = createMutationObserver();

var connectObserverDomListen = function() {
  _observer.observe(document.body, {
    attributes: true, childList: true, characterData: false, subtree: true
  });
  
  console.log("DOM observer connected");
};

var disconnectObserverDomListener = function() {
  if (observer != null) {
    _observer.disconnect();
    console.log("DOM observer disconnected");
  }
};

var doClientSideEnable = function() {
  console.log("Running doClientSideEnable()");
  doReplace(document, _observer);
  connectObserverDomListen(_observer);
}

var doClientSideDisable = function() {
  console.log("Running doClientSideDisable()");
  disconnectObserverDomListener(_observer);
}

/// Server side sent plugin shutdown request
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Background script sent " + request.disabled);
    if (request.disabled) {
      console.log("Server side script requested client side disable.");
      doClientSideDisable();
    } else {
      console.log("Server side script requested client side enable.");
      doClientSideEnable();
    }
    sendResponse({ok: true});
  }
);

/// Client side intialise
chrome.storage.sync.get('disabled', function(items) {
  console.log(items.disabled);
  if (items.disabled) {
    doClientSideDisable();
  } else {
    doClientSideEnable();
  }
});

substituteGamerGateText = function(node) {
  if (node.nodeValue) {
    node.nodeValue = node.nodeValue.replace(/Game[r]?[-]?[ ]?gate/ig, 'misogynist');
  }
}

doReplace = function(doc) {
  var treeWalker = document.createTreeWalker(doc, NodeFilter.SHOW_TEXT, null, null)

  console.log(doc);
  do {
    if (treeWalker.currentNode) {
      substituteGamerGateText(treeWalker.currentNode);
    }
  } while (treeWalker.nextNode());
};

chrome.storage.sync.get('disabled', function(items) {
  if (!items.disabled) {
    doReplace(document.body);
    connectObserverDomListen(createMutationObserver());
  }
});

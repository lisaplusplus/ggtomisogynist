var createMutationObserver = function() {
    return new WebKitMutationObserver(
        function(mutations) {
            mutations.forEach(function(mutation) {
              doReplace(mutation.target);
            });
        }
    );
};

var _observer = createMutationObserver();

var connectObserverDomListen = function(observer) {
    observer.observe(document.body, {
        attributes: false, childList: true, characterData: true, subtree: true
    });
    console.log("DOM observer connected");
};

var disconnectObserverDomListener = function(observer) {
  if (observer != null) {
    observer.disconnect();
    console.log("DOM observer disconnected");
  }
};

var doClientSideEnable = function() {
  console.log("Running doClientSideEnable()");
  doReplace(document);
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
});

/// Client side intialise
chrome.storage.sync.get('disabled', function(items) {
  console.log(items.disabled);
  if (items.disabled) {
    doClientSideDisable();
  } else {
    doClientSideEnable();
  }
});

/// This walks the DOM like an anti-fascist robot from the future
doReplace = function(doc) {
  var treeWalker = document.createTreeWalker(doc, NodeFilter.SHOW_TEXT, null, null)

  do {
    var tmpnode = treeWalker.currentNode;
    if (tmpnode.nodeValue) {
      tmpnode.nodeValue = tmpnode.nodeValue.replace(/gamergate/ig, 'misogynist');
      tmpnode.nodeValue = tmpnode.nodeValue.replace(/gamegate/ig, 'misogynist');
      tmpnode.nodeValue = tmpnode.nodeValue.replace(/gamer-gate/ig, 'misogynist');
      tmpnode.nodeValue = tmpnode.nodeValue.replace(/gamer gate/ig, 'misogynist');
      tmpnode.nodeValue = tmpnode.nodeValue.replace(
        /it's about ethics in journalism/ig,
        'It\'s about stopping women from playing video games');
      tmpnode.nodeValue = tmpnode.nodeValue.replace(
        /it's about ethics in gaming/ig,
        'It\'s about stopping women from playing video games');
      tmpnode.nodeValue = tmpnode.nodeValue.replace(
        /ethics in game journalism/ig,
        'stopping women from playing video games');

      treeWalker.currentNode = tmpnode;
    }
  } while (treeWalker.nextNode());
};

doReplace(document);

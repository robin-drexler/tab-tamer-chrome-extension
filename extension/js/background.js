var ALLOWED_TABS = 10;

chrome.tabs.onCreated.addListener(function(createdTab) {

  var referenceTabId = createdTab.openerTabId || createdTab.id
  chrome.tabs.get(referenceTabId, function(openerTab) {
    chrome.tabs.query({windowId: openerTab.windowId}, function(tabs) {
      var tabsToRemove = tabs.filter(function(tab) {
        return !tab.pinned
      });

      tabsToRemove = tabsToRemove.reverse().slice(ALLOWED_TABS);
      tabsToRemove = tabsToRemove.filter(function(tab) {
          return tab.index < openerTab.index
      });

      var tabIdsToRemove = tabsToRemove.map(function(tab) {
        return tab.id;
      });

      console.log(tabIdsToRemove)

      chrome.tabs.remove(tabIdsToRemove);
    });
  });

});

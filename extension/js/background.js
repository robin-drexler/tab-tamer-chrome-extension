var ALLOWED_TABS = 10;

chrome.tabs.onCreated.addListener(function(tab) {
  chrome.tabs.query({windowId: tab.windowId}, function(tabs) {
    var unpinnedTabs = tabs.filter(function(tab) {
      return !tab.pinned
    });
    var tabsToRemove = unpinnedTabs.reverse().slice(ALLOWED_TABS);
    var tabIdsToRemove = tabsToRemove.map(function(tab) {
      return tab.id;
    });

    chrome.tabs.remove(tabIdsToRemove);
  });
});

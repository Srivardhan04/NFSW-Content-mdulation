chrome.runtime.onInstalled.addListener(() => {
    console.log("Advanced NSFW Moderator Installed.");
    chrome.storage.sync.set({ nsfwFilter: true });
});

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            alert("NSFW Filter is Active!");
        }
    });
});

document.getElementById("toggle").addEventListener("click", () => {
    chrome.storage.sync.get("nsfwFilter", (data) => {
        const newState = !data.nsfwFilter;
        chrome.storage.sync.set({ nsfwFilter: newState }, () => {
            alert(`NSFW Filtering ${newState ? "Enabled" : "Disabled"}`);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("nsfw-toggle");

    chrome.storage.sync.get("nsfwFilter", (data) => {
        toggle.checked = data.nsfwFilter;
    });

    toggle.addEventListener("change", () => {
        chrome.storage.sync.set({ nsfwFilter: toggle.checked });
    });
});

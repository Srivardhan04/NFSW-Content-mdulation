(async function() {
    console.log("Advanced NSFW Moderator Running...");

    // Load TensorFlow.js and NSFW model
    async function loadModel() {
        const nsfwjs = await import("https://cdn.jsdelivr.net/npm/nsfwjs");
        return await nsfwjs.load();
    }

    const model = await loadModel();

    // Function to blur NSFW images
    async function analyzeImages() {
        const images = document.querySelectorAll("img");
        for (const img of images) {
            if (!img.complete || img.naturalWidth === 0) continue;

            try {
                const predictions = await model.classify(img);
                if (predictions.some(pred => ["Porn", "Sexy"].includes(pred.className) && pred.probability > 0.7)) {
                    img.style.filter = "blur(20px)";
                    img.style.transition = "filter 0.5s ease-in-out";
                }
            } catch (error) {
                console.error("Error analyzing image:", error);
            }
        }
    }

    // Function to filter NSFW text
    function analyzeText() {
        const badWords = ["sex", "porn", "nude", "xxx", "hot", "erotic", "adult"];
        const textElements = document.querySelectorAll("p, span, h1, h2, h3, h4, h5, h6, a");

        textElements.forEach(element => {
            const originalText = element.innerText.toLowerCase();
            if (badWords.some(word => originalText.includes(word))) {
                element.innerText = "[NSFW Content Removed]";
                element.style.color = "red";
            }
        });
    }

    analyzeImages();
    analyzeText();

    // Run analysis on dynamic content changes
    const observer = new MutationObserver(() => {
        analyzeImages();
        analyzeText();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();

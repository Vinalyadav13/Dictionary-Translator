const wordInput = document.getElementById("wordInput");
const searchBtn = document.getElementById("searchBtn");
const meaningSection = document.getElementById("meaningSection");
const wordTitle = document.getElementById("wordTitle");
const wordMeaning = document.getElementById("wordMeaning");
const audioBtn = document.getElementById("audioBtn");

const translationSection = document.getElementById("translationSection");
const languageSelect = document.getElementById("languageSelect");
const translateBtn = document.getElementById("translateBtn");
const translationOutput = document.getElementById("translationOutput");

let currentWord = "";

// Search meaning
searchBtn.addEventListener("click", async () => {
    const word = wordInput.value.trim();
    if (!word) return alert("Please enter a word");

    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await res.json();

        if (!data[0]) {
            alert("No meaning found");
            return;
        }

        currentWord = word;
        const meaning = data[0].meanings[0].definitions[0].definition;

        wordTitle.textContent = word;
        wordMeaning.textContent = meaning;

        meaningSection.classList.remove("hidden");
        translationSection.classList.remove("hidden");

        if (data[0].phonetics && data[0].phonetics.length > 0) {
    const audioUrl = data[0].phonetics.find(p => p.audio)?.audio;
    if (audioUrl) {
        audioBtn.onclick = () => {
            new Audio(audioUrl).play();
        };
    } else {
        audioBtn.onclick = null;
    }
} else {
    audioBtn.onclick=null;
}

    } catch (err) {
        alert("Error fetching meaning");
    }
});

// Translate with Google Translate unofficial API
translateBtn.addEventListener("click", async () => {
    const lang = languageSelect.value;
    if (!currentWord) return alert("Search a word first");

    try {
        const textToTranslate = currentWord; // only the searched word
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(textToTranslate)}`);
        const data = await res.json();

        // Extract translation
        const translation = data[0][0][0];
        translationOutput.textContent = translation;
    } catch (err) {
        alert("Error translating");
    }
});

import { LoremIpsum } from "lorem-ipsum";

const easyLorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 4,
        min: 2, // Fewer sentences for an easy paragraph
    },
    wordsPerSentence: {
        max: 10,
        min: 4, // Shorter sentences for readability
    },
});

const mediumLorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 6,
        min: 3,
    },
    wordsPerSentence: {
        max: 14,
        min: 6,
    },
});

const hardLorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 10,
        min: 6, // More sentences for a complex paragraph
    },
    wordsPerSentence: {
        max: 15,
        min: 10, // Longer sentences for complexity
    },
});

export { easyLorem, mediumLorem, hardLorem };

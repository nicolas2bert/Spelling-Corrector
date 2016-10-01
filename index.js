'use strict'; // eslint-disable-line strict

const words = require('./words');
const edit = require('./editWord');

let startTime;
let endTime;

function known(anyWords, offWords) {
    return new Set(Array.from(anyWords).filter(anyWord =>
      offWords.has(anyWord)));
}

module.exports = function correctMe(word, cb) {
    startTime = new Date().getTime();
    words.getWords((err, wordsArr) => {
        if (err) {
            return cb(err);
        }
        endTime = new Date().getTime();
        console.log(`${word} 1 = `, endTime - startTime);
        const wordsSet = new Set(wordsArr);

        startTime = new Date().getTime();
        // if the word is correct
        if ((known(new Set([word]), wordsSet)).size > 0) {
            endTime = new Date().getTime();
            console.log(`${word} 2 = `, endTime - startTime);
            return cb(null, word);
        }

        const editWordsSet = new Set(edit.editWord(word));
        const editWordsSetKnown = known(editWordsSet, wordsSet);
        // if the word only need one change
        if (editWordsSetKnown.size > 0) {
            const editWordsArrKnown = Array.from(editWordsSetKnown);
            startTime = new Date().getTime();
            const corr = words.corrections(editWordsArrKnown, wordsArr);
            endTime = new Date().getTime();
            console.log(`${word} 3 = `, endTime - startTime);
            return cb(null, editWordsArrKnown[corr[0]]);
        // else if the word need 2 changes
        }
        const editWords2Set = new Set(edit.editWord2(editWordsSet));
        const editWords2SetKnown = known(editWords2Set, wordsSet);
        if (editWords2SetKnown.size > 0) {
            const editWords2ArrKnown = Array.from(editWords2SetKnown);
            const corr = words.corrections(editWords2ArrKnown, wordsArr);
            return cb(null, editWords2ArrKnown[corr[0]]);
        }
        // else the word
        return cb(null, word);
    });
};

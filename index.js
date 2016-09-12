'use strict'; // eslint-disable-line strict

const words = require('./words');
const edit = require('./editWord');

function known(anyWords, offWords) {
    return new Set(Array.from(anyWords).filter(anyWord =>
      offWords.has(anyWord)));
}

module.exports = function correctMe(word, cb) {
    words.getWords((err, wordsArr) => {
        if (err) {
            return cb(err);
        }
        const wordsSet = new Set(wordsArr);

        // if the word is correct
        if ((known(new Set([word]), wordsSet)).size > 0) {
            return cb(null, word);
        }

        const editWordsSet = new Set(edit.editWord(word));
        const editWordsSetKnown = known(editWordsSet, wordsSet);
        // if the word only need one change
        if (editWordsSetKnown.size > 0) {
            const editWordsArrKnown = Array.from(editWordsSetKnown);
            const corr = words.corrections(editWordsArrKnown, wordsArr);
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

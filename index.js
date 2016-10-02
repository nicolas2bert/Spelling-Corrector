'use strict'; // eslint-disable-line strict

const Words = require('./Words');
const edit = require('./editWord');

module.exports = function correctMe(word, cb) {
    const words = new Words();
    words.getWords(err => {
        if (err) {
            return cb(err);
        }

        // if the word is correct
        if ((words.known([word])).length > 0) {
            return cb(null, word);
        }
        const candidates1 = edit.editWord(word);
        const candidatesKnown1 = words.known(candidates1);
        // if the word only need one change
        if (candidatesKnown1.length > 0) {
            const corr = words.corrections(candidatesKnown1);
            return cb(null, candidatesKnown1[corr[0]]);
        // else if the word need 2 changes
        }
        const candidates2 = edit.editWord2(candidates1);
        // console.log('candidates2', candidates2);
        const candidatesKnown2 = words.known(candidates2);
        if (candidatesKnown2.length > 0) {
            const corr = words.corrections(candidatesKnown2);
            return cb(null, candidatesKnown2[corr[0]]);
        }
        // else the word
        return cb(null, word);
    });
};

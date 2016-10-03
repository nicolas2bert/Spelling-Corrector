'use strict'; // eslint-disable-line strict
const Words = require('./Words');

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
        const firstCandidates = words.getCandidates(word);
        const firstCandidatesKnown = words.known(firstCandidates);
        // if the word only need one change
        if (firstCandidatesKnown.length > 0) {
            words.counter();
            const corr = words.corrections(firstCandidatesKnown);
            return cb(null, firstCandidatesKnown[corr[0]]);
        // else if the word need 2 changes
        }
        const secondCandidates = words.getCandidates2(firstCandidates);
        const secondCandidatesKnown = words.known(secondCandidates);
        if (secondCandidatesKnown.length > 0) {
            words.counter();
            const corr = words.corrections(secondCandidatesKnown);
            return cb(null, secondCandidatesKnown[corr[0]]);
        }
        // else the word
        return cb(null, word);
    });
};

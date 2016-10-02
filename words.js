'use strict'; // eslint-disable-line strict
const fs = require('fs');

class Words {
    constructor() {
        this.words = [];
        this.uniqWords = [];
    }

    readFile(file, cb) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                return cb(err);
            }
            return cb(null, data.toLowerCase());
        });
    }

    counter() {
        const values = [];
        const nbrs = [];
        let prev = '';
        this.words.sort();
        for (let inc = 0; inc < this.words.length; inc++) {
            if (this.words[inc] !== prev) {
                values.push(this.words[inc]);
                nbrs.push(1);
            } else {
                nbrs[nbrs.length - 1]++;
            }
            prev = this.words[inc];
        }
        return [values, nbrs];
    }

    probability(candidate) {
        const count = this.counter();
        const value = count[0];
        const nbrs = count[1];
        const nbr = nbrs[value.indexOf(candidate)];
        return nbr;
    }

    // known(candidates) {
    //     const candidatesKnown = [];
    //     const offWords = new Set(this.words);
    //     const uniqCandidates = this.uniqArray(candidates);
    //     for (let inc = 0; inc < uniqCandidates.length; inc++) {
    //         // console.log(uniqCandidates[inc]);
    //         for (let i = 0; i < this.words.length; i++) {
    //             // console.log(uniqCandidates[i]);
    //             if (uniqCandidates[inc] === this.words[i]) {
    //                 candidatesKnown.push(uniqCandidates[inc]);
    //                 break;
    //             }
    //         }
    //         // if (offWords.has(uniqCandidates[inc])) {
    //         //     candidatesKnown.push(uniqCandidates[inc]);
    //         // }
    //     }
    //     return candidatesKnown;
    // }

    known(candidates) {
        const uniqCandidates = this.uniqArray(candidates);
        const offWords = new Set(this.uniqWords);
        return uniqCandidates.filter(anyWord =>
          offWords.has(anyWord));
    }

    uniqArray(arr) {
        return Array.from(new Set(arr));
    }

    getWords(cb) {
        this.readFile('./texts/big.txt', (err, data) => {
            if (err) {
                return cb(err);
            }
            /**
            * [^A-Za-z0-9_] : remove non-code characters
            * \s+ : multiple-escape
            **/
            const wordsWP = data.replace(/[^A-Za-z0-9_]/g, ' ');
            const words = wordsWP.split(/\s+/);
            this.words = words;
            this.uniqWords = this.uniqArray(words);
            return cb();
        });
    }

    corrections(candidates) {
        let maxIndex = 0;
        let maxCount = 0;
        for (let inc = 0; inc < candidates.length; inc++) {
            const prob = this.probability(candidates[inc]);
            if (prob > maxCount) {
                maxCount = prob;
                maxIndex = inc;
            }
        }
        return [maxIndex, maxCount];
    }
}

module.exports = Words;

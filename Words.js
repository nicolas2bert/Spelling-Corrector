'use strict'; // eslint-disable-line strict
const fs = require('fs');

const letters = 'abcdefghijklmnopqrstuvwxyz';

class Words {
    constructor() {
        this._words = [];
        this._uniqWords = [];
        this._count = [];
    }
    _readFile(file, cb) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                return cb(err);
            }
            return cb(null, data.toLowerCase());
        });
    }

    _probability(candidate) {
        const value = this._count[0];
        const nbrs = this._count[1];
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

    _uniqArray(arr) {
        return Array.from(new Set(arr));
    }

    counter() {
        const values = [];
        const nbrs = [];
        let prev = '';
        this._words.sort();
        for (let inc = 0; inc < this._words.length; inc++) {
            if (this._words[inc] !== prev) {
                values.push(this._words[inc]);
                nbrs.push(1);
            } else {
                nbrs[nbrs.length - 1]++;
            }
            prev = this._words[inc];
        }
        this._count = [values, nbrs];
    }

    known(candidates) {
        const uniqCandidates = this._uniqArray(candidates);
        const offWords = new Set(this._uniqWords);
        return uniqCandidates.filter(anyWord =>
          offWords.has(anyWord));
    }

    getCandidates(word) {
        const candidates = [];
        for (let inc = 0; inc < word.length + 1; inc++) {
            if (inc < word.length) {
                // delete one character
                candidates.push(
                    word.slice(0, inc) + word.slice(inc + 1)
                );
            }
            if (inc > 1) {
                // transposition
                candidates.push(
                    [word.slice(0, inc - 2),
                      word[inc - 1],
                      word[inc - 2],
                      word.slice(inc),
                    ].join('')
                );
            }
            for (let i = 0; i < letters.length; i++) {
                // insert one character
                candidates.push(
                    // I choose join() over + because join() copies less
                    [word.slice(0, inc), letters[i], word.slice(inc)].join('')
                );
                if (inc < word.length) {
                    // replace
                    candidates.push(
                        [word.slice(0, inc), letters[i], word.slice(inc + 1)]
                        .join('')
                    );
                }
            }
        }
        return candidates;
    }

    getCandidates2(wordsArr) {
        let arr = [];
        for (let inc = 0; inc < wordsArr.length; inc++) {
            arr = arr.concat(this.getCandidates(wordsArr[inc]));
        }
        return arr;
    }

    getWords(cb) {
        this._readFile('./texts/big.txt', (err, data) => {
            if (err) {
                return cb(err);
            }
            /**
            * [^A-Za-z0-9_] : remove non-code characters
            * \s+ : multiple-escape
            **/
            const wordsWP = data.replace(/[^A-Za-z0-9_]/g, ' ');
            const words = wordsWP.split(/\s+/);
            this._words = words;
            this._uniqWords = this._uniqArray(words);
            return cb();
        });
    }

    corrections(candidates) {
        let maxIndex = 0;
        let maxCount = 0;
        for (let inc = 0; inc < candidates.length; inc++) {
            const prob = this._probability(candidates[inc]);
            if (prob > maxCount) {
                maxCount = prob;
                maxIndex = inc;
            }
        }
        return [maxIndex, maxCount];
    }
}

module.exports = Words;

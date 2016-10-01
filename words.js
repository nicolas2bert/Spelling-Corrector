'use strict'; // eslint-disable-line strict

const fs = require('fs');

let startTime;
let endTime;

function readFile(file, cb) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            return cb(err);
        }
        return cb(null, data.toLowerCase());
    });
}
function counter(words) {
    const values = [];
    const nbrs = [];
    let prev = '';
    words.sort();
    startTime = new Date().getTime();
    for (let inc = 0; inc < words.length; inc++) {
        if (words[inc] !== prev) {
            values.push(words[inc]);
            nbrs.push(1);
        } else {
            nbrs[nbrs.length - 1]++;
        }
        prev = words[inc];
    }
    endTime = new Date().getTime();
    console.log('counter', endTime - startTime);
    return [values, nbrs];
}

function probability(candidate, words) {
    const count = counter(words);
    const value = count[0];
    const nbrs = count[1];
    const nbr = nbrs[value.indexOf(candidate)];
    return nbr;
}

module.exports = {
    getWords(cb) {
        readFile('./texts/big.txt', (err, data) => {
            if (err) {
                return cb(err);
            }
            /**
            * [^A-Za-z0-9_] : remove non-code characters
            * \s+ : multiple-escape
            **/
            const wordsWP = data.replace(/[^A-Za-z0-9_]/g, ' ');
            const words = wordsWP.split(/\s+/);
            return cb(null, words);
        });
    },
    corrections(candidates, words) {
        let maxIndex = 0;
        let maxCount = 0;
        for (let inc = 0; inc < candidates.length; inc++) {
            const prob = probability(candidates[inc], words);
            if (prob > maxCount) {
                maxCount = prob;
                maxIndex = inc;
            }
        }
        return [maxIndex, maxCount];
    },
};

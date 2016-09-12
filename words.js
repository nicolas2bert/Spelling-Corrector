'use strict'; // eslint-disable-line strict

const fs = require('fs');

function readFile(file, cb) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            return cb(err);
        }
        return cb(null, data.toLowerCase());
    });
}
function sumArray(arr) {
    let sum = 0;
    for (let inc = 0; inc < arr.length; inc++) {
        sum += arr[inc];
    }
    return sum;
}
function counter(words) {
    const values = [];
    const nbrs = [];
    let prev = '';
    words.sort();
    for (let inc = 0; inc < words.length; inc++) {
        if (words[inc] !== prev) {
            values.push(words[inc]);
            nbrs.push(1);
        } else {
            nbrs[nbrs.length - 1]++;
        }
        prev = words[inc];
    }
    return [values, nbrs];
}

function probability(word, words) {
    const count = counter(words);
    const value = count[0];
    const nbrs = count[1];
    const sum = sumArray(nbrs);
    const nbr = nbrs[value.indexOf(word)];
    return nbr / sum;
}

const words = {
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
    corrections(anyWords, offWords) {
        let maxIndex = 0;
        let maxCount = 0;
        for (let inc = 0; inc < anyWords.length; inc++) {
            const prob = probability(anyWords[inc], offWords);
            if (prob > maxCount) {
                maxCount = prob;
                maxIndex = inc;
            }
        }
        return [maxIndex, maxCount];
    },
};

module.exports = words;

// edit1();

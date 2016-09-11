const fs = require('fs');

function readFile(file, cb) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            return cb(err);
        }
        return cb(null, data.toLowerCase());
    });
}

module.exports = function getWords(cb) {
    readFile('./texts/small.txt', (err, data) => {
        if (err) {
            return cb(err);
        }
/**
* [.,\/#!$%\^&\*;:{}=\-_`~()] : punctuation I want to get rid of
* \s+ : multiple-escape
**/
        const wordsWP = data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/, ' ');
        const words = wordsWP.split(/\s+/);
        return cb(null, words);
    });
};

// edit1();

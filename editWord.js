'use strict'; // eslint-disable-line strict

const letters = 'abcdefghijklmnopqrstuvwxyz';


function getCandidates(word) {
    const alls = [];
    for (let inc = 0; inc < word.length + 1; inc++) {
        if (inc < word.length) {
            // delete one character
            alls.push(
                word.slice(0, inc) + word.slice(inc + 1)
            );
        }
        if (inc > 1) {
            // transposition
            alls.push(
                [word.slice(0, inc - 2),
                  word[inc - 1],
                  word[inc - 2],
                  word.slice(inc),
                ].join('')
            );
        }
        for (let i = 0; i < letters.length; i++) {
            // insert one character
            alls.push(
                // I choose join() over + because join() copies less
                [word.slice(0, inc), letters[i], word.slice(inc)].join('')
            );
            if (inc < word.length) {
                // replace
                alls.push(
                    [word.slice(0, inc), letters[i], word.slice(inc + 1)]
                    .join('')
                );
            }
        }
    }
    return alls;
}
// const alls = getCandidates('somthing');
// console.log(alls.length);

function insertOneChar(word) {
    const inserts = [];
    for (let inc = 0; inc < word.length + 1; inc++) {
        for (let i = 0; i < letters.length; i++) {
            // I choose join() over + because join() copies less
            inserts.push(
                [word.slice(0, inc), letters[i], word.slice(inc)].join('')
            );
        }
    }
    return inserts;
}
// const inserts = insertOneChar('tiro');
// console.log(inserts.length);

function deleteOneChar(word) {
    const deletes = [];
    for (let inc = 0; inc < word.length + 1; inc++) {
        if (inc < word.length) {
            deletes.push(
                word.slice(0, inc) + word.slice(inc + 1)
            );
        }
    }
    return deletes;
}
// const del = deleteOneChar('tiro');
// console.log(del);

function transposition(word) {
    const transposes = [];
    for (let inc = 0; inc < word.length + 1; inc++) {
        if (inc > 1) {
            transposes.push(
                [word.slice(0, inc - 2),
                  word[inc - 1],
                  word[inc - 2],
                  word.slice(inc),
                ].join('')
            );
        }
    }
    return transposes;
}
// const end = transposition('somthing');
// console.log(end);

function replaceOneChar(word) {
    const replaces = [];
    for (let inc = 0; inc < word.length + 1; inc++) {
        for (let i = 0; i < letters.length; i++) {
            if (inc < word.length) {
                replaces.push(
                    [word.slice(0, inc), letters[i], word.slice(inc + 1)]
                    .join('')
                );
            }
        }
    }
    return replaces;
}
// const replace = replaceOneChar('tiro');
// console.log(replace.length);

const edit = {
    editWord(word) {
        return getCandidates(word);
    },
    editWord2(wordsArr) {
        let arr = [];
        for (let inc = 0; inc < wordsArr.length; inc++) {
            arr = arr.concat(getCandidates(wordsArr[inc]));
        }
        return arr;
    },
};

module.exports = edit;

'use strict'; // eslint-disable-line strict

const letters = 'abcdefghijklmnopqrstuvwxyz';


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
function deleteOneChar(word) {
    const deletes = [];
    for (let inc = 1; inc < word.length + 1; inc++) {
        deletes.push(
            word.slice(0, inc - 1) + word.slice(inc)
        );
    }
    return deletes;
}

function transposition(word) {
    const transposes = [];
    for (let inc = 2; inc < word.length + 1; inc++) {
        transposes.push(
            [word.slice(0, inc - 2),
              word[inc - 1],
              word[inc - 2],
              word.slice(inc),
            ].join('')
        );
    }
    return transposes;
}

function replaceOneChar(word) {
    const replaces = [];
    for (let inc = 1; inc < word.length + 1; inc++) {
        for (let i = 0; i < letters.length; i++) {
            replaces.push(
                [word.slice(0, inc - 1), letters[i], word.slice(inc)].join('')
            );
        }
    }
    return replaces;
}

const edit = {
    editWord(word) {
        return insertOneChar(word).concat(
            deleteOneChar(word), transposition(word), replaceOneChar(word)
        );
    },
    editWord2(wordsSet) {
        let arr = [];
        const wordsArr = Array.from(wordsSet);
        for (let inc = 0; inc < wordsArr.length; inc++) {
            arr = arr.concat(edit.editWord(wordsArr[inc]));
        }
        return arr;
    },
};

module.exports = edit;

const getWords = require('./getWords');

getWords((err, words) => {
    if (err) {
        return console.log(err);
    }
    return console.log('words', words);
});

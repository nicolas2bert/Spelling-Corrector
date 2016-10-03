'use strict'; // eslint-disable-line strict

const assert = require('assert');
const correctMe = require('../index');

// ✓ insert (1100ms)
// ✓ replace 2 (2306ms)
// ✓ replace (1114ms)
// ✓ insert 2 (2839ms)
// ✓ delete (1082ms)
// ✓ transpose (1177ms)
// ✓ transpose + delete (1559ms)
// ✓ known (471ms)
// ✓ unknown (4920ms)

// ✓ insert (1119ms)
// ✓ replace 2 (2352ms)
// ✓ replace (1122ms)
// ✓ insert 2 (2896ms)
// ✓ delete (1123ms)
// ✓ transpose (1237ms)
// ✓ transpose + delete (1613ms)
// ✓ known (461ms)
// ✓ unknown (5141ms)

describe('Basic tests: ', () => {
    it('insert', done => {
        correctMe('speling', (err, value) => {
            if (err) {
                done(err);
            }
            assert.deepEqual(value, 'spelling');
            return done();
        });
    });
    it('replace 2', done => {
        correctMe('korrectud', (err, value) => {
            if (err) {
                done(err);
            }
            assert.deepEqual(value, 'corrected');
            return done();
        });
    });
    it('replace', done => {
        correctMe('informition', (err, value) => {
            if (err) {
                done(err);
            }
            assert.deepEqual(value, 'information');
            return done();
        });
    });
    it('insert 2', done => {
        correctMe('inconvient', (err, value) => {
            if (err) {
                done(err);
            }
            assert.deepEqual(value, 'inconvenient');
            return done();
        });
    });
    it('delete', done => {
        correctMe('arrainged', (err, value) => {
            if (err) {
                done(err);
            }
            assert.deepEqual(value, 'arranged');
            return done();
        });
    });
    it('transpose', done => {
        correctMe('peotry', (err, value) => {
            if (err) {
                done(err);
            }
            assert.deepEqual(value, 'poetry');
            return done();
        });
    });
    it('transpose + delete', done => {
        correctMe('peotryy', (err, value) => {
            if (err) {
                done(err);
            }
            assert.deepEqual(value, 'poetry');
            return done();
        });
    });
    it('known', done => {
        correctMe('known', (err, value) => {
            if (err) {
                done(err);
            }
            assert.deepEqual(value, 'known');
            return done();
        });
    });
    it('unknown', done => {
        correctMe('quintessential', (err, value) => {
            if (err) {
                done(err);
            }
            assert.deepEqual(value, 'quintessential');
            return done();
        });
    });
});

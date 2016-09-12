'use strict'; // eslint-disable-line strict

const assert = require('assert');
const correctMe = require('../index');

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

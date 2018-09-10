const mongoose = require('mongoose');
const request = require('supertest');
const db = require('../config/db');
const auth_model = require('../app/models/auth_model');
const userAuth = auth_model.encodeToBase64(
    process.env.AUTH_USER,
    process.env.AUTH_PASS
);

describe('test user authentication', () => {
    beforeAll(() => {
        mongoose.connect(db.url, { useNewUrlParser: true });
    });

    test('user to be authenticated', () => {
        expect.assertions(1);
        return auth_model.check('Basic ' + userAuth).then(data => expect(data).toBe(1));
    });

    afterAll(() => {
        mongoose.disconnect();
    });
});

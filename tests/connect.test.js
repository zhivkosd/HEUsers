const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const db = require('../config/db');
const user = require('../app/models/auth_model').encodeToBase64(
    process.env.AUTH_USER, 
    process.env.AUTH_PASS
);
const router = express.Router();
const app = express();

require('../app/routes/routes')(router);
app.use(router);

describe('test GET users method', () => {

    beforeAll(() => {
        mongoose.connect(db.url, { useNewUrlParser: true });
    });

    test('should be GET', () => {

        return request(app).get('/users')
        .set('Authorisation', user)
        .then(res => {
            expect(res.status).toBe(200);
        });
    });

    afterAll(() => {
        mongoose.disconnect();
    });
});

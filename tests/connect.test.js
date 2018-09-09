const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const db = require('../config/db');
const router = express.Router();
const app = express();

require('../app/routes/routes')(router);
app.use(router);

describe('test GET users method', () => {

    beforeAll(() => {
        mongoose.connect(db.url, { useNewUrlParser: true });
    });

    test('should be GET', () => {

        return request(app).get('/users').then(res => {
            expect(res.status).toBe(200);
        });
    });
});

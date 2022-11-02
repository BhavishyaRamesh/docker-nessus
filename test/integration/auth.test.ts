import request from 'supertest';

let header = { 'x-client-id': 'F155F57A9CAADFF39EE56C128E13C' };

let invalidHeader = { 'x-client-id': 'F155F57A9CAADFF39EE56C1k28E13C' };

let headers = {
    'x-client-id': 'F155F57A9CAADFF39EE56C128E13C',
    'x-auth-code': 'ynrc2f9h7dpyd4ybyyfxm68t799xqa'
};

let invalidHeaders = {
    'x-client-id': 'F155sF57A9CAADFF39EE56C128E13C',
    'x-auth-code': 'ynrc2f9h7dspyd4ybyyfxm68t799xqa'
};
let head: object;

let app = require('../../index');
afterEach(async () => await app.close());

describe('Authorization Module', () => {
    jest.setTimeout(60000);
    it("it should get the Auth Code", async () => {
        let result = await request(app).get('/auth/authorize').set(header);
        expect(JSON.parse(result.text).data).toHaveProperty('authCode');
        if (app !== undefined) {
            await app.close();
        }
    });

    it("it should fail for wrong clientId for the Auth Code", async () => {
        let result = await request(app).get('/auth/authorize').set(invalidHeader);
        expect(JSON.parse(result.text).data).toBeNull();
        if (app !== undefined) {
            await app.close();
        }
    });   
    

    it("it should get the token", async () => {
        let result = await request(app).get('/auth/token').set(headers);
        expect(JSON.parse(result.text).data).toHaveProperty('token');
        head = {
            'x-access-token': JSON.parse(result.text).data.token
        }
        if (app !== undefined) {
            await app.close();
        }
    });

    it("it should fail for wrong data for the generating token", async () => {
        let result = await request(app).get('/auth/token').set(invalidHeaders);
        expect(JSON.parse(result.text).data).toBeNull();
        if (app !== undefined) {
            await app.close();
        }
    });

    it("it should make user to loggin", async () => {
        let result = await request(app)
            .post('/auth/login')
            .send({
                "email": "nlk@worksitelabs.com",
                "password": "Gokul@123"
            })
            .set(head);
        expect(result.body.data.message).toBe('Logged In Successfully');
        if (app !== undefined) {
            await app.close();
        }
    });

    it("it should make user to not loggin for Invalid Password", async () => {
        let result = await request(app)
            .post('/auth/login')
            .send({
                "email": "nlk@worksitelabs.com",
                "password": "Gokul@1234"
            })
            .set(head);
        expect(JSON.parse(result.text).message).toBe('Invalid Email or Password');
        if (app !== undefined) {
            await app.close();
        }
    });

    it("it should make user to not loggin for Invalid Email", async () => {
        let result = await request(app)
            .post('/auth/login')
            .send({
                "email": "nlk@worksitelabs.com",
                "password": "Gokul@1234"
            })
            .set(head);
        expect(JSON.parse(result.text).message).toBe('Invalid Email or Password');
        if (app !== undefined) {
            await app.close();
        }
    });
});

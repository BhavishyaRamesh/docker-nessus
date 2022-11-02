import request from 'supertest';

let app = require('../../../index');
let headers = {
    'x-access-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
};

afterEach(async () => await app.close());

describe('Login Module', () => {
    jest.setTimeout(60000);

    it("it should make user to loggin", async () => {
        const result = await request(app)
            .post('/auth/login')
            .set(headers)
        .send({
            "email": "vijayanandr2000@gmail.com",
            "password": "Gokul@123"
        });
        expect(result.body.data.message).toBe('Logged In Successfully');
        if(app !== undefined){
        await app.close();
    }
    });

    it("it should make user to not loggin for Invalid Password", async () => {
        const result = await request(app)
            .post('/auth/login')
            .set(headers)
            .send({
                email: 'vijayanandr2000@gmail.com',
                password: 'Gokul@1234',
            });
        expect(JSON.parse(result.text).message).toBe(
            'Invalid Email or Password'
        );
        if(app !== undefined){
        await app.close();
    }
    });

    it("it should make user to not loggin for Invalid Email", async () => {
        const result = await request(app)
            .post('/auth/login')
            .set(headers)
            .send({
                email: 'vijayanandr20000@gmail.com',
                password: 'Gokul@1234',
            });
        expect(JSON.parse(result.text).message).toBe(
            'Invalid Email or Password'
        );
        if(app !== undefined){
        await app.close();
    }
    });
    
    
});

import request from 'supertest';

let headers = {
    'x-client-id': 'F155F57A9CAADFF39EE56C128E13C',
    'x-auth-code': 'ynrc2f9h7dpyd4ybyyfxm68t799xqa'
};

let invalidHeaders = {
    'x-client-id': 'F155sF57A9CAADFF39EE56C128E13C',
    'x-auth-code': 'ynrc2f9h7dspyd4ybyyfxm68t799xqa'
};

let app = require('../../../index');

afterEach(async () => await app.close());

describe('Token Module', () => {
    jest.setTimeout(60000);

    it("it should get the token", async () => {
        const result = await request(app).get('/auth/token').set(headers);
        expect(JSON.parse(result.text).data).toHaveProperty('token');
        if(app !== undefined){
        await app.close();
    }
    });

    it("it should fail for wrong data for the generating token", async () => {
        const result = await request(app).get('/auth/token').set(invalidHeaders);
        expect(JSON.parse(result.text).data).toBeNull();
        if(app !== undefined){
        await app.close();
    }
    });
    
    
});

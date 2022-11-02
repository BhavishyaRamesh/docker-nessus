import request from 'supertest';

let header = {'x-client-id': 'F155F57A9CAADFF39EE56C128E13C'};

let invalidHeader = {'x-client-id': 'F155F57A9CAADFF39EE56C1k28E13C'};

let app = require('../../../index');

afterEach(async () => await app.close());

describe('Authorize Module', () => {
    jest.setTimeout(60000);

    it("it should get the Auth Code", async () => {
        const result = await request(app).get('/auth/authorize').set(header);
        expect(JSON.parse(result.text).data).toHaveProperty('authCode');
        if(app !== undefined){
        await app.close();
    }
    });

    it("it should fail for wrong clientId for the Auth Code", async () => {
        const result = await request(app).get('/auth/authorize').set(invalidHeader);
        expect(JSON.parse(result.text).data).toBeNull();
        if(app !== undefined){
        await app.close();
    }
    });
    
    
});

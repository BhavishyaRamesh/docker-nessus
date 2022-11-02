import request from 'supertest';

let headers = {
  'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
}

let app = require('../../../index');
let header: object;

beforeEach(async () => {
  let result = await request(app)
    .post('/auth/login')
    .send({
      "email": "vijayanandr2000@gmail.com",
      "password": "Gokul@123"
    })
    .set(headers);
 header = {
     'x-access-token': result.body.data.accessToken,
 };
});
afterEach(async () => await app.close());

describe('SocialLoginsignin', () => {
    let data ={
            "socialLoginDetails": 
              {
                "email": "testadd@gmail.com",
                "id": "12345678902345",
                "image": "https://img.png",
                "name": "John Doe",
                "provider": "facebook",
                "signupType": "facebook"
              }
      }

      
    let failData ={
        "socialLoginDetails": {
            "email": "testadd12345@gmail.com",
            "id": "123456789102345",
            "image": "https://img.png",
            "name": "John Doe",
            "provider": "facebook",
            "signupType": "facebook"
        }
      }
      
    it('it should add user', async () => {
        const result = await request(app)
                  .post('/sociallogin/signin')
                  .send(data)
                  .set(header);
                expect(result).toHaveProperty('status', 200);
    });

    it('it should fail for the incorrect data which is given', async () => {
      const result = await request(app)
                  .post('/sociallogin/signin')
                  .send(failData)
                  .set(header);
                expect(result).toHaveProperty('_body.data.status', 400);

    });  
})
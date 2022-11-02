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
describe('verifies email', () => {
  jest.setTimeout(600000);
  let data = {
    "userId": 3,
    "isChangeEmail": true
  }
  let failData = {
    "userId": 999939,
    "isChangeEmail": false
  }

  it('should verify email', async () => {
    let result = await request(app)
      .post('/registration/verifyemails')
      .send(data)
      .set(header);
    expect(result).toHaveProperty('_body.data.status', true);
  });

  it('it should fail for the incorrect data which is given', async () => {
    let result = await request(app)
      .post('/registration/verifyemails')
      .send(failData)
      .set(header);
    expect(result).toHaveProperty('_body.data.status', 400);
  });
})
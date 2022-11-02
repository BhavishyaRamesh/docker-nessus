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
describe('Validates OTP', () => {
  let data = {
    email: "vijayanandr2000@gmail.com",
    otp: "1234",
    phone: ""
  }
  let failData = {
    email: "",
    otp: "",
    phone: "+918754833291"
  }

  it('should verify otp', async () => {
    let result = await request(app)
      .post('/registration/validateotp')
      .send(data)
      .set(header);
    expect(result).toHaveProperty('status', 200);
  });

  it('it should fail for the incorrect data which is given', async () => {
    let result = await request(app)
      .post('/registration/validateotp')
      .send(failData)
      .set(header);
    expect(result).toHaveProperty('status', 400);
  });
})
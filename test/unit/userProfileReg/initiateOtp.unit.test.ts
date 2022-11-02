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

describe('Initiate OTP', () => {
  jest.setTimeout(60000);
  let phoneData = {
    email: "indhu321@yopmail.com",
    form: "",
    isChangeEmail: true,
    isUserOTP: true,
    localStorageData: "",
    phone: "+918754833291",
    validationMethod: "phone"
  }
  let emailData = {
    email: "vijayanandr2000@gmail.com",
    form: "",
    isChangeEmail: true,
    isUserOTP: true,
    localStorageData: "",
    phone: "",
    validationMethod: "email"
  }

  let failData = {
    email: "vijayanandr2000@gmail.com",
    form: "",
    isChangeEmail: true,
    isUserOTP: true,
    localStorageData: "",
    phone: "+139342",
    validationMethod: "phone"
  }

  it('email verification', async () => {
    let result = await request(app)
      .post('/registration/initiateotp')
      .send(emailData)
      .set(header);
    expect(result).toHaveProperty('status', 200);
  });
  it('mobile verification', async () => {
    let result = await request(app)
      .post('/registration/initiateotp')
      .send(phoneData)
      .set(header);
      expect(result).toHaveProperty('status', 200);
    });

  it('it should fail for the incorrect data which is given', async () => {
    let result = await request(app)
      .post('/registration/initiateotp')
      .send(failData)
      .set(header);
    expect(result).toHaveProperty('status', 400);
  });
})
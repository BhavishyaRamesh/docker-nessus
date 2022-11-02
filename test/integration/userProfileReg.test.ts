import * as userProfileRegModel from '../../src/models/userProfileReg/userProfileRegModel'
import request from 'supertest';

let headers = {
  'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
}
let app = require('../../index');
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

// Check email if it is already registered or not.
describe('registration test', () => {
  jest.setTimeout(600000);
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

  let failDataotp = {
    email: "vijayanandr2000@gmail.com",
    form: "",
    isChangeEmail: true,
    isUserOTP: true,
    localStorageData: "",
    phone: "+139342",
    validationMethod: "phone"
  }

  let data = {
    userId: 3,
    isChangeEmail: true
  }

  let failData = {
    userId: 999939,
    isChangeEmail: true
  }

  let validateotpdata = {
    email: "",
    otp: "503249",
    phone: "+918248431115"
  }

  let failValidateotpData = {
    email: "indhu123@yopmail.com",
    otp: "1234598676",
    phone: ""
  }

  it('it should pass if the email is not registered', async () => {
    let data = {
      userId: 3,
      email: "indhu@worksitelabs.com",
      password: "Test@123",
      postCode: ""
    }
    let result: any = await userProfileRegModel.checkemailAddress(data);
    expect(result).toHaveProperty('status', 200)
  });

  it('it should fail if the email is aready registered', async () => {
    let data = {
      "email": "indhu321@yopmail.com",
      "password": "Test@123",
      "postCode": ""
    }
    let result: any = await userProfileRegModel.checkemailAddress(data)
    expect(result).toHaveProperty('status', 200)
  });

  //initiate otp
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
      .send(failDataotp)
      .set(header);
    expect(result).toHaveProperty('status', 400);
  });

  //Verify Email
  it('should verify email', async () => {
    let result = await request(app)
      .post('/registration/verifyEmails')
      .send(data)
      .set(header);
    expect(result).toHaveProperty('_body.data.status', true);
  });

  it('it should fail for the incorrect data which is given', async () => {
    let result = await request(app)
      .post('/registration/verifyEmails')
      .send(failData)
      .set(header);
    expect(result).toHaveProperty('_body.data.status', 400);

  });

  //Validate otp
  it('should verify otp', async () => {
    let result = await request(app)
      .post('/registration/validateotp')
      .send(validateotpdata)
      .set(header);
    expect(result).toHaveProperty('status', 200);
  });

  it('it should fail for the incorrect data which is given', async () => {
    let result = await request(app)
      .post('/registration/validateotp')
      .send(failValidateotpData)
      .set(header);
    expect(result).toHaveProperty('status', 400);
  });
})

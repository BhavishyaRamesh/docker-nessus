import * as userProfileRegModel from '../../../src/models/userProfileReg/userProfileRegModel'

// Check email if it is already registered or not.
describe('checkemail', () => {
  it('it should pass if the email is not registered', async () => {
    let data = {
      "email": "indhu@worksitelabs.com",
      "password": "Test@123",
      "postCode": ""
    }
    let result: any = await userProfileRegModel.checkemailAddress(data);
    expect(result).toHaveProperty('status', 200)
  });

  it('it should fail if the email is aready registered', async () => {
    let data = {
      "email": "vijayanandr2000@gmail.com",
      "password": "Test@123",
      "postCode": ""
    }
    let result: any = await userProfileRegModel.checkemailAddress(data)
    expect(result).toHaveProperty('status', 400)
  });
})
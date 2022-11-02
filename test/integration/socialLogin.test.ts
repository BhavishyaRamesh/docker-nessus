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

describe('SocialLogin', () => {
  let data = {
      Email: 'testadd@gmail.com',
      Address1: 'dark street , chennai',
      Address2: 'North street ,chennai',
      City: 'chennai',
      County: '',
      State: 'chennai',
      Country: 'US',
      Zipcode: '607103',
      BirthDate: '10/09/1998',
      Ethnicity: '',
      FirstName: 'Jone',
      MiddleName: 'Andre',
      LastName: 'Gonzalez Perez',
      HasMinors: 0,
      IsINTNameFormat: 1,
      IsNotHavePermanentAddress: 1,
      IsVerified: 1,
      PassportCountry: 'USA',
      PassportNo: 'son',
      Phone: '9080648630',
      Race: '',
      Sex: 'Male',
      minor: [
          {
              Email: 'john@gmail.com',
              BirthDate: '10/09/1998',
              FirstName: '1234',
              MiddleName: 'Andre',
              LastName: 'Gonzalez Perez',
              PassportCountry: 'USA',
              Relationship: 'son',
              SchoolName: 'abc hr sec school',
              StudentId: 'abc123',
              Notification: 1,
              Sex: 'Male',
          },
      ],
      insurence: [
          {
              Email: 'john@gmail.com',
              FrontCard:
                  'https://firebasestorage.googleapis.com/v0/b/wsl-multitenancy-dev-ac13b.appspot.com/o/WLABS_KO.png?alt=media&token=d4573843-63c6-4d84-8f9f-7b5b07f2c81a',
              BackCard:
                  'https://firebasestorage.googleapis.com/v0/b/wsl-multitenancy-dev-ac13b.appspot.com/o/WLABS_KO.png?alt=media&token=d4573843-63c6-4d84-8f9f-7b5b07f2c81a',
          },
      ],
      uninsured: [
          {
              Email: 'john@gmail.com',
              FrontCard:
                  'https://firebasestorage.googleapis.com/v0/b/wsl-multitenancy-dev-ac13b.appspot.com/o/WLABS_KO.png?alt=media&token=d4573843-63c6-4d84-8f9f-7b5b07f2c81a',
              BackCard:
                  'https://firebasestorage.googleapis.com/v0/b/wsl-multitenancy-dev-ac13b.appspot.com/o/WLABS_KO.png?alt=media&token=d4573843-63c6-4d84-8f9f-7b5b07f2c81a',
          },
      ],
      creditcard: [
          {
              Email: 'john@gmail.com',
              CardName: 'visa',
              PaymentMethod: 2,
              CardNumber: '312345678909876',
          },
      ],
      socialLoginDetails: {
          email: 'testadd@gmail.com',
          id: '12345678902345',
          image: 'https://img.png',
          name: 'John Doe',
          provider: 'facebook',
          signupType: 'facebook',
      },
  };

  let failData = {
    "Email": "",
    "Address1": "dark street , chennai",
    "Address2": "North street ,chennai",
    "City": "chennai",
    "County": "",
    "State": "",
    "Country": "",
    "Zipcode": "",
    "BirthDate": "10/09/1998",
    "Ethnicity": "",
    "FirstName": 1234,
    "MiddleName": "Andre",
    "LastName": "Gonzalez Perez",
    "HasMinors": 0,
    "IsINTNameFormat": 1,
    "IsNotHavePermanentAddress": 1,
    "IsVerified": 1,
    "PassportCountry": "USA",
    "PassportNo": "son",
    "Phone": "9080648630",
    "Race": "",
    "Sex": "Male",
    "minor": [
      {
        "Email": "john@gmail.com",
        "BirthDate": "10/09/1998",
        "FirstName": "1234",
        "MiddleName": "Andre",
        "LastName": "Gonzalez Perez",
        "PassportCountry": "USA",
        "Relationship": "son",
        "SchoolName": "abc hr sec school",
        "StudentId": "abc123",
        "Notification": 1,
        "Sex": "Male"
      }
    ],
    "insurence": [
      {
        "Email": "john@gmail.com",
        "FrontCard": "https://firebasestorage.googleapis.com/v0/b/wsl-multitenancy-dev-ac13b.appspot.com/o/WLABS_KO.png?alt=media&token=d4573843-63c6-4d84-8f9f-7b5b07f2c81a",
        "BackCard": "https://firebasestorage.googleapis.com/v0/b/wsl-multitenancy-dev-ac13b.appspot.com/o/WLABS_KO.png?alt=media&token=d4573843-63c6-4d84-8f9f-7b5b07f2c81a"
      }
    ],
    "uninsured": [
      {
        "Email": "john@gmail.com",
        "FrontCard": "https://firebasestorage.googleapis.com/v0/b/wsl-multitenancy-dev-ac13b.appspot.com/o/WLABS_KO.png?alt=media&token=d4573843-63c6-4d84-8f9f-7b5b07f2c81a",
        "BackCard": "https://firebasestorage.googleapis.com/v0/b/wsl-multitenancy-dev-ac13b.appspot.com/o/WLABS_KO.png?alt=media&token=d4573843-63c6-4d84-8f9f-7b5b07f2c81a"
      }
    ],
    "creditcard": [
      {
        "Email": "john@gmail.com",
        "CardName": "visa",
        "PaymentMethod": 2,
        "CardNumber": "312345678909876"
      }
    ],
    "socialLoginDetails": {}
  }

  //signup flow
  it('it should add user', async () => {
    let result = await request(app)
      .post('/sociallogin/signup')
      .send(data)
      .set(header);
    expect(result).toHaveProperty('status', 200);
  });

  it('it should fail for the incorrect data which is given', async () => {
    let result = await request(app)
      .post('/sociallogin/signup')
      .send(failData)
      .set(header);
    expect(result).toHaveProperty('status', 400);
  });

  //signin flow
  it('it should generate token', async () => {
    let successData = {
      socialLoginDetails: {
        "email": "testadd@gmail.com",
        "id": "123456789102345",
        "image": "https://img.png",
        "name": "John Doe",
        "provider": "facebook",
        "signupType": "facebook"
      }
    }
    let result = await request(app)
      .post('/sociallogin/signin')
      .send(successData)
      .set(header);
    expect(result).toHaveProperty('status', 200);
  });
  let wrongData = {
    socialLoginDetails: {
      "email": "testadd12345@gmail.com",
      "id": "123456789102345",
      "image": "https://img.png",
      "name": "John Doe",
      "provider": "facebook",
      "signupType": "facebook"
    }
  }

  it('it should fail for the incorrect data which is given', async () => {
    let result = await request(app)
      .post('/sociallogin/signin')
      .send(wrongData)
      .set(header);
    expect(result).toHaveProperty('_body.data.status', 400);
  });
})
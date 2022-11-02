import 'dotenv/config';
const Client = require("node-rest-client").Client;

const client = new Client();

export const initiateOTPNotification = (
        email: string, 
        randomNumber: string, 
        FirstName: string, 
        User_Id?: any, 
        isChangeEmailVerify?: boolean, 
        token?: string
    ) => {

    const reqBody = {
        to: email,
        otp: randomNumber,
        name: FirstName,
        id: User_Id,
        isChangeEmail: isChangeEmailVerify
    }

    const reqHeader = {
        "Content-Type": "application/json",
        "x-access-token": token
    }

    const args = {
        data: reqBody,
        headers: reqHeader
    }

    try {
        let createURL  = process.env.OTP_NOTIFIER_URL
        console.log('createURL',createURL)
        client.post(createURL, args, (data: any, _res: any) => {
            console.log("Request sent");
            console.log(data);
        })
    } catch (err: any) {
        console.log("err.message", err.message);
    }
}
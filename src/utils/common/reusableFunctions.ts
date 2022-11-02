import { config } from './config';
import * as jwt from 'jsonwebtoken';
import { errorMessage } from './dictionaries';
import { checkToken } from '../mySql/select';
// import { verifyAccessToken } from '../mySql/Authorization/auth';
import { UserDetails } from './types';

// get old qbench customer id by current is from collection
export function capitalizeFirstLetter(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export const authentication = async (req: any, res: any, next: any) => {
    const headersData = req.headers['x-access-token'];
    jwt.verify(
        headersData,
        config.affilateServices.jwt.secret,
        async (err: any, decoded: any) => {
            if (err) {
                return res.status(400).json({
                    status: errorMessage.inValidStatus,
                    message: errorMessage.invalidToken,
                });
            } else {
                req.userId = decoded.id;
                req.email = decoded.email;
                next();
                // const verifyToken: any = await verifyAccessToken(headersData, decoded.id, decoded.email);

                // if (verifyToken.status && verifyToken.message) {
                //     next();
                // } else {
                //     return res.status(400).json({ status: errorMessage.inValidStatus, message: errorMessage.invalidToken });
                // }
            }
        }
    );
};

export const tokenAuthentication = (req: any, res: any, next: any) => {
    const headersData = req.headers['x-access-token'];
    if (headersData === config.affilateServices.jwt.secret) {
        next();
    } else {
        return res.status(400).json({
            status: errorMessage.inValidStatus,
            message: errorMessage.invalidToken,
        });
    }
};

export const authenticationForGuest = async (req: any, res: any, next: any) => {
    const headersData = req.headers['x-access-token'];
    jwt.verify(
        headersData,
        config.affilateServices.jwt.secret,
        async (err: any, decoded: any) => {
            req.token = headersData
            if (err) {
                let validToken: any = await checkToken(headersData);
                if (!validToken.status) {
                    return res.status(400).json({
                        status: errorMessage.inValidStatus,
                        message: errorMessage.invalidToken,
                    });
                } else {
                    next();
                }
            } else {
                req.userId = decoded.id;
                req.email = decoded.email;
                next();
            }
        }
    );
};

export function generateRandomNumber() {
    //This function generates the 6 digit random number
    const randomNumber: string = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    if (randomNumber.length === 6) {
        return randomNumber;
    } else {
        return '';
    }
}

// accesstoken generation
export async function getAccessToken(userDetails: UserDetails) {
    return jwt.sign({ userDetails: userDetails }, config.JWT.secret, {
        expiresIn: config.JWT.expiresIn,
    });
}
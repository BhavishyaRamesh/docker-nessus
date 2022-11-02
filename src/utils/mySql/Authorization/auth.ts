import { connection } from '../../database/mySqlConnection';
import { Authorization } from '../storedProcedures';

export const verifyAccessToken = (accessToken: any, id: number, email: string) => {
    return new Promise((resolve) => {
        connection.query(
            Authorization.verifyToken,
            [accessToken, id, email],
            (error: any, response: any) => {
                if (error) {
                    resolve({status: false, message: error});
                    //connection.end()
                } else {
                    let result = response[0][0];
                    resolve({
                        status: result.status === 1 ? true : false,
                        message: result.message,
                    });
                    //connection.end()
                }
            }
        );
    });
};

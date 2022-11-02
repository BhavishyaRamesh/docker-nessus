import colors from 'colors'
import { API_RESP_CODES } from "./errorCodes";
import { errorMessage } from './dictionaries';

// Common function to return api PARAM VALIDATION ERROR
export function validateErrResp(res: any, err: any, _api?: string) {
    res.status(API_RESP_CODES.HTTP_BAD_REQUEST.status).send({
        status: API_RESP_CODES.HTTP_BAD_REQUEST.status,
        message: API_RESP_CODES.APP_PARAM_ERROR.message,
        data: { error: err },
        // api:_api
    });
}

// Common function to return api INTERNAL SERVER ERROR
export function internalErrResp(res: any, err: any) {
    res.status(API_RESP_CODES.HTTP_SERVER_ERR.status).send({
        status: API_RESP_CODES.HTTP_SERVER_ERR.status,
        message: API_RESP_CODES.HTTP_SERVER_ERR.message,
        data: { error: err },
    });
}

// Common function to return api INTERNAL SERVER ERROR
export function apiValidResponse(res: any, _data: any, _api: string) {
    res.status(API_RESP_CODES.HTTP_SUCCESS.status).send({
        status: API_RESP_CODES.HTTP_SUCCESS.status,
        message: API_RESP_CODES.HTTP_SUCCESS.message,
        data: _data,
        // api:_api
    });
}
export function apiNoResponse(res: any, _data: any, _api: string) {
    res.status(API_RESP_CODES.HTTP_SUCCESS.status).send({
        status: API_RESP_CODES.HTTP_SUCCESS.status,
        message: errorMessage.noDataFound,
        data: _data,
        // api:_api
    });
}

// Common function to return api INTERNAL SERVER ERROR
export function apiInvalidResponse(res: any, _status: any, _msg: any, _data: any) {
    res.status(API_RESP_CODES.HTTP_UNAUTHORIZED.status).send({
        status: _status,
        message: _msg,
        data: _data,
    });
}

// Common function to log the body from the request in GCP logs
export const logRequestInGCP = (request: any, api: string) => {
    console.info(JSON.stringify({
        severity: "INFO",
        api: api,
        data: request
    }))
}

// Common function to show error in catch block of Models and services and in any catch block
export const modelsServicesError = (modelOrService: string, error: any) => {
    console.error(colors.red.bold(`${modelOrService}-${error}`))
}

// Middleware function to handle try / catch block repetition
export function asyncMiddlewareController(handler: any) {
    return async (req: any, res: any) => {
        try {
            await handler(req, res);
        } catch (err) {
            res.status(API_RESP_CODES.HTTP_SERVER_ERR.status).send({
                status: API_RESP_CODES.HTTP_SERVER_ERR.status,
                message: API_RESP_CODES.HTTP_SERVER_ERR.message,
                data: { error: err },
            });
        }
    };
}
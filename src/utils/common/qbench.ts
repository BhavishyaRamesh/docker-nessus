import { sign } from 'jsonwebtoken';
import axios from 'axios';
import { stringify } from 'qs';
import Bottleneck from 'bottleneck';


import { config } from "./config";
import { Sample } from "./types";
import { convertUTC2PST } from "./../common/reusableFunctions";
import { format } from 'date-fns';
import moment from 'moment';
import { modelsServicesError } from './api-middleware';

const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 110,
});
const getAccessToken = async () => {
    const token = sign(
        { sub: config.functionsConfig.qbench.client_id },
        config.functionsConfig.qbench.client_secret,
        { expiresIn: '1800s' }
        );
        
    const {
        data: { access_token },
    } = await axios({
        method: 'post',
        url: `${config.functionsConfig.qbench.url}/qbench/oauth2/v1/token`,
        data: stringify({
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: token,
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    
    return access_token;
};

const getOrderById = async (id: string, accessToken?: string) => {
    let token = accessToken;

    if (!token) {
        token = await getAccessToken();
    }

    const  data : any = await axios({
        method: 'get',
        url: `${config.functionsConfig.qbench.url}/qbench/api/v1/order/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).catch((error)=>{
         return error
    })
    return {
        ...data.data,
        samples: data.data.samples?.map((sample: Sample) => ({
            ...sample,
            time_of_collection: convertUTC2PST(sample.time_of_collection),
            tests: sample.tests.map((test) => ({
                ...test,
                complete_date: convertUTC2PST(test.complete_date),
                start_date: convertUTC2PST(test.start_date),
            })),
        })),
    };
};

const createOrder = async (QbenchCustomerId,Appt_Id,specimenCount,access_token?:string) =>{
    let token = access_token;
    if (!token) {
        token = await getAccessToken();
    }

    const orderCreateResult: any = await axios({
        method: 'post',
        url: `${config.functionsConfig.qbench.url}/qbench/api/v1/order`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data:{
            customer_account_id: QbenchCustomerId,
            date_received: format(new Date(), 'LL/dd/yyyy'),
            X_EXTERNAL_ORDER_NUMBER: Appt_Id,
            X_SPECIMEN_COUNT: specimenCount,
        }
    });
    const QbenchId = orderCreateResult.data.id;
    const orderDetails = await getOrderById(QbenchId, token);
    const ConfirmationId = orderDetails?.custom_formatted_id;
    return {QbenchId,orderDetails,ConfirmationId}
}

const getSampleById = async (id: string, accessToken?: string) => {
    let token = accessToken;

    if (!token) {
        token = await getAccessToken();
    }

    const { data }: any = await axios({
        method: 'get',
        url: `${config.functionsConfig.qbench.url}/qbench/api/v1/sample/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return {
        ...data,
    };
};

const getTestById = async (id: string, accessToken?: string) => {
    let token = accessToken;

    if (!token) {
        token = await getAccessToken();
    }

    const { data }: any = await axios({
        method: 'get',
        url: `${config.functionsConfig.qbench.url}/qbench/api/v1/test/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return {
        ...data,
    };
};


const deleteOrder = async (id: string, accessToken?: string) => {
    let token = accessToken;

    if (!token) {
        token = await getAccessToken();
    }

    await axios({
        method: 'delete',
        url: `${config.functionsConfig.qbench.url}/qbench/api/v1/order/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).catch((error)=>{
        modelsServicesError('deleteOrder', error);
    })
};

const deleteSample = async (sampleId: string, accessToken?: string) => {
    let token = accessToken;

    if (!token) {
        token = await getAccessToken();
    }

    await axios({
        method: 'delete',
        url: `${config.functionsConfig.qbench.url}/qbench/api/v1/sample/${sampleId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const getOrdersByIds = async (
    ids: (string | undefined)[],
    accessToken?: string
) => {
    let token = accessToken;

    if (!token) {
        token = await getAccessToken();
    }

    return  Promise.all(
        ids.map((id) =>
            id
                ? limiter.schedule(() =>
                      getOrderById(id, token).catch((err) => {
                          modelsServicesError(
                              `getOrdersByIds - can't get order with ID: ${id}`,
                              err
                          );
                      })
                  )
                : null
        )
    );
    
};

const getResultsReportUrl = async (sampleId: string, accessToken?: string) => {
    let token = accessToken;

    if (!token) {
        token = await getAccessToken();
    }

    const result = await axios({
        method: 'get',
        url: `${config.functionsConfig.qbench.url}/qbench/api/v1/report/sample/${sampleId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return result.data;
};

const updateSample = async (
    orderId: number,
    sampleId: number,
    update: any,
    accessToken?: string
) => {
    try {
        let token = accessToken;

        if (!token) {
            token = await getAccessToken();
        }

        const sampleUpdate: any = {};
        if (update.firstName) {
            sampleUpdate.X_PATIENT_FIRST_NAME = update.firstName;
        }

        if (update.lastName) {
            sampleUpdate.X_PATIENT_LAST_NAME = update.lastName;
        }

        if (update.birthDate) {
            sampleUpdate.X_PATIENT_DOB = update.birthDate;
        }

        if (update.birthDate) {
            sampleUpdate.X_PATIENT_ADDRESS1 = update.address1;
        }

        if (update.birthDate) {
            sampleUpdate.X_PATIENT_CITY = update.city;
        }

        if (update.birthDate) {
            sampleUpdate.X_PATIENT_STATE = update.state;
        }

        if (update.birthDate) {
            sampleUpdate.X_PATIENT_ZIP_CODE = update.zip_code;
        }
        if (update.room) {
            sampleUpdate.X_CLASSROOM_NUMBER = update.room;
        }
        if (update.school) {
            sampleUpdate.X_SCHOOL = update.school;
        }

        if (Object.keys(sampleUpdate).length > 0) {
            await axios({
                method: 'post',
                url: `${config.functionsConfig.qbench.url}/qbench/api/v1/sample/${sampleId}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: {
                    order_id: orderId,
                    ...sampleUpdate,
                },
            });
        }
    } catch (error) {
        console.log(error)
    }

};

const pocQbench = async (data: any, accessToken?: string) => {
    const { id, fname, email, phone, gender, dob } = data

    let token = accessToken;
    if (!token) {
        token = await getAccessToken();
    }
 await axios({
        method: 'post',
        url: `${config.functionsConfig.qbench.url}/qbench/api/v1/sample/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            X_PATIENT_FIRST_NAME: fname,
            PATIENT_EMAIL: email,
            X_PATIENT_PHONE: phone,
            X_PATIENT_SEX: gender,
            X_PATIENT_DOB: dob
        }
    });
};

const updateOrder = async (
    orderId: number,
    update: any,
    accessToken?: string,
    type?: boolean
) => {
    let token = accessToken;

    if (!token) {
        token = await getAccessToken();
    }

    const sampleUpdate: any = {};

    if (update.confirmationId) {
        sampleUpdate.X_PATIENT_EXTERNAL_ID = update.confirmationId;
    }

    if (update.confirmationId) {
        sampleUpdate.X_EXTERNAL_ORDER_NUMBER = update.confirmationId;
    }

    if (update.appointment_date) {
        sampleUpdate.appointment_date = update.appointment_date;
    }

    if (update.locationId) {
        sampleUpdate.customer_account_id = update.locationId;
    }

    if (update.date_received) {
        sampleUpdate.date_received = update.date_received;
    }

    if (type) {
        sampleUpdate.X_SPECIMEN_COUNT = update
    }
    if (Object.keys(sampleUpdate).length > 0) {
        await axios({
            method: 'post',
            url: `${config.functionsConfig.qbench.url}/qbench/api/v1/order/${orderId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                ...sampleUpdate,
            },
        }).catch((error)=>{
            modelsServicesError('updateOrder', error);
        })
    }
};

const getPrintSampleByLabelId = async (
    printData?: any,
    accessToken?: string,
) => {
    let token = accessToken;
    if (!token) {
        token = await getAccessToken();
    }

    const reqData: any = await axios({
        method: 'post',
        url: `${config.functionsConfig.qbench.url}​/qbench/api/v1/samples/label/${printData.labelId}?timezone=${printData.timeZone}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            entity_dicts: printData.entity_dicts
        },
    });
    return {
        htmlContent: reqData.data
    };
};

const deleteTimeOfCollection = async (id: string, accessToken?: string) => {
    let token = accessToken;
    if (!token) {
        token = await getAccessToken();
    }
    await axios({
        method: 'post',
        url: `${config.functionsConfig.qbench.url}/qbench/api/v1/sample/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            time_of_collection: null
        }
    });
};


const getTestIdfromSampleId = async (sampleId: string, accessToken: string) => {
    if (!accessToken) {
        accessToken = await getAccessToken();
    }
    const reqData: any = await axios({
        method: 'get',
        url: `${config.functionsConfig.qbench.url}/qbench/api/v1/sample/${sampleId}`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    }).catch((error)=>{
        modelsServicesError('getTestIdfromSampleId', error);
    })
    return reqData?.data?.tests[0]?.id

}

const updateResult = async (testId: string, results: string, accessToken: string, tech_id: number, reviewed_by: number) => {
    if (!accessToken) {
        accessToken = await getAccessToken();
    }
    await axios({
        method: 'post',
        url: `${config.functionsConfig.qbench.url}/qbench/api/v1/test/${testId}`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        data: {
            results,
            id: testId,
            state: 'COMPLETED',
            release_results: true,
            complete_date: convertUTC2PST(format(new Date(), 'LL/dd/yyyy hh:mm a')),
            tech_id: tech_id,
            X_REVIEWED_BY: reviewed_by
        }
    });
}

const updateResultFalse = async (testId: string, result: boolean, accessToken: string) => {
    if (!accessToken) {
        accessToken = await getAccessToken();
    }
    await axios({
        method: 'post',
        url: `${config.functionsConfig.qbench.url}/qbench/api/v1/test/${testId}`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        data: {
            id: testId,
            release_results: result
        }
    });
}
const generateReport = async (sampleID: any, getReportConfigurationID: any) => {
    if (getReportConfigurationID.report_config_id) {
        let access_token = await getAccessToken();
        let ID = await getTestIdfromSampleId(sampleID, access_token);
        let url = getReportConfigurationID.signature_id ?
            `${config.functionsConfig.qbench.url}/qbench/api/v1/report?report_config_id=${getReportConfigurationID.report_config_id}&test_ids=${ID}&signature_id=${getReportConfigurationID.signature_id}`
            :
            `${config.functionsConfig.qbench.url}/qbench/api/v1/report?report_config_id=${getReportConfigurationID.report_config_id}&test_ids=${ID}`
        await axios({
            method: 'POST',
            url,
            headers: { Authorization: `Bearer ${access_token}`, },
            data: ""
        })
    }
}
const updateTimeOfCollection = async (sampleId: number) => {
    const accessToken = await getAccessToken();
    await axios({
        method: 'post',
        url: `${config.functionsConfig.qbench.url}/qbench/api/v1/sample/${sampleId}`,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        data: {
            time_of_collection: moment(new Date()).format(
                'MM/DD/YYYY hh:mm A'
            ),
        },
    }).catch((error) => {
        modelsServicesError('userCheckin', error);
    });
    return true
}
const updateOrderDetails = async (qbenchId,data,access_token?:string) => {
    if (!access_token) {
        access_token = await getAccessToken();
    }
    await axios({
        method:'post',
        url:`${config.functionsConfig.qbench.url}/qbench/api/v1/order/${qbenchId}`,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },
        data
    })
}
const postSampleData = async (data,access_token?:string) => {
    if (!access_token) {
        access_token = await getAccessToken();
    }
    return  axios({
        method: 'post',
        url: `${config.functionsConfig.qbench.url}/qbench/api/v1/sample`,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },
        data,
    });
    
}
const postTestData = async (data,access_token?:string) => {
    if (!access_token) {
        access_token = await getAccessToken();
    }
    await axios({
        method:'post',
        url:`${config.functionsConfig.qbench.url}/qbench/api/v1/test`,
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
        },
        data
    })
}
export default {
    getAccessToken,
    getOrderById,
    deleteOrder,
    getOrdersByIds,
    getResultsReportUrl,
    updateSample,
    getSampleById,
    getTestById,
    updateOrder,
    getPrintSampleByLabelId,
    deleteTimeOfCollection,
    getTestIdfromSampleId,
    updateResult,
    updateResultFalse,
    deleteSample,
    generateReport,
    updateTimeOfCollection,
    pocQbench,
    createOrder,
    updateOrderDetails,
    postSampleData,
    postTestData
};

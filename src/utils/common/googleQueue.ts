import { config } from './config';
import { CloudTasksClient } from '@google-cloud/tasks';
import { HttpMethod } from './dictionaries';

const cloudTasksClient = new CloudTasksClient();

export const googleQueueRequest = async (api: string, queue: any, data: any) => {
    try {
        // return
        const parent = cloudTasksClient.queuePath(
            config.googleCloudQueue.project,
            config.googleCloudQueue.location,
            queue
        );

        console.log(`Queue's request data - API:${api}, Queue:${queue}`, data);

        const URL = config.cloudRunBaseURL + api;
        const payload = { ...data };
        const convertedPayload_1 = JSON.stringify(payload);
        const body = Buffer.from(convertedPayload_1).toString('base64');
        const task = {
            httpRequest: {
                httpMethod: HttpMethod.POST,
                url: URL,
                headers: { 'Content-Type': 'application/json', },
                body,
            },
        };
        const [response] = await cloudTasksClient.createTask({
            parent,
            task,
        });
        console.log(`Queue's response - API:${api}, Queue:${queue}`, response)
        return response;
    }
    catch (error) {
        console.log(`Queue's error - API:${api}, Queue:>${queue}`, data, error)
        return error;
    }
}
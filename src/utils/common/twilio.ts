import Bottleneck from 'bottleneck';
import { config } from './config';
const client = require('twilio')(
    config.functionsConfig.twilio.sid,
    config.functionsConfig.twilio.token
  );
const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 333,
});


function prepareNumber(num: string): string {
    let number = num.replace(/[ ,-,()]/g, "");
    if (number.startsWith("+") && number.length !== 11) {
        return `+${number.replace(/\D/g, "")}`;
    } else if (number.startsWith("+") && number.length === 11) {
        return `+1${number.replace(/\D/g, "")}`;
    } else {
        if (number.length === 10) {
            return `+1${number.replace(/\D/g, "")}`;
        } else {
            return `+${number.replace(/\D/g, "")}`;
        }
    }
}

const sendTextMessage =  limiter
  .wrap( async (to: string, body: string) => {
    return client.messages.create({
      from: config.functionsConfig.twilio.messaging_service_sid,
      to: prepareNumber(to),
      body,
    });
  })
  
  ;

export default { sendTextMessage };

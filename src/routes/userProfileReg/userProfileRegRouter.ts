import { Router } from 'express';
import * as userProfileRegController from '../../controllers/userProfileReg/userProfileRegController'
import {authenticationForGuest} from '../../utils/common/reusableFunctions';
const userProfileRegRouter: Router = Router();

userProfileRegRouter.get(
    '/checkemailaddress/:email',
    [authenticationForGuest],
    userProfileRegController.checkEmailAddressController
  );

userProfileRegRouter.post(
    '/verifyemails',
    [authenticationForGuest],
    userProfileRegController.verifyEmailController
  );

userProfileRegRouter.post(
    '/initiateotp',
    [authenticationForGuest],
    userProfileRegController.initiateOTPController
  );
userProfileRegRouter.post(
    '/validateotp',
    [authenticationForGuest],
    userProfileRegController.validateOTPController
  );

export default userProfileRegRouter;
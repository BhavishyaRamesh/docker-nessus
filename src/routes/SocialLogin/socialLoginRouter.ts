import {Router} from 'express';
import { socialLoginsignupController ,socialLoginsigninController } from '../../controllers/SocialLogin/SocialLoginController';
import {authenticationForGuest} from '../../utils/common/reusableFunctions';

const socialLoginRouter: Router = Router();
socialLoginRouter.post(
    '/signup',
    [authenticationForGuest],
    socialLoginsignupController
  );
socialLoginRouter.post(
    '/signin',
    [authenticationForGuest],
    socialLoginsigninController
  );

  export default socialLoginRouter;
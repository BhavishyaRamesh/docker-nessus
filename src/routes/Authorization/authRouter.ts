import { Router } from 'express';
import * as authorizationControllers from '../../controllers/Authorization/authorizationControllers';
import { tokenAuthentication } from '../../utils/common/reusableFunctions';
const authRouter: Router = Router();

authRouter.get(
    '/authorize',
    authorizationControllers.getAuthCodeController
);

authRouter.get('/token', authorizationControllers.getTokenController);

authRouter.post(
    '/login',
    [tokenAuthentication],
    authorizationControllers.selectLoginController
);


export default authRouter;

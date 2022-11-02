import express from 'express';

import userProfileRegRouter from './userProfileReg/userProfileRegRouter';
import socialLoginRouter from './SocialLogin/socialLoginRouter';
import authRouter from './Authorization/authRouter';

const app = express();

app.use('/auth', authRouter);
app.use('/registration', userProfileRegRouter);
app.use('/sociallogin', socialLoginRouter);

export default app;

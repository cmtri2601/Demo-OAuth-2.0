import express from 'express';
import jwt from 'jsonwebtoken';
import { getGoogleToken, getGoogleUser } from './service.js';

const app = express();

app.get('/', (req, res) => {
  res.json('Hello world!');
});

app.get('/api/oauth/google', async (req, res) => {
  try {
    const { state, code } = req.query;
    console.log('This is state, compare this to what client send to prevent csrf attack :', state);

    const token = await getGoogleToken(code);
    console.log('tokenData', token);

    const user = await getGoogleUser(token);
    console.log('userData', user);

    // Check email is verified
    if (!user.email_verified) {
      return res.status(403).json({
        message: 'Google email not verified'
      });
    }

    const access_token = jwt.sign(user, process.env.ACCESS_PRIVATE_KEY, { expiresIn: '15m' });
    const refresh_token = jwt.sign({}, process.env.REFRESH_PRIVATE_KEY, { expiresIn: '100d' });

    res.redirect(`http://localhost:3000/login?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (err) {
    console.log(err);
  }
});

app.listen(8080, () => console.log('Server is running on port 8080'));

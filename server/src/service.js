import axios from 'axios';

// step 3
const getGoogleToken = async (code) => {
  const body = {
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URIS,
    grant_type: 'authorization_code'
  };

  const { data } = await axios.post(process.env.TOKEN_URI, body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  return data;
};

// step 4 is google server send token back to nodejs server

// step 5
const getGoogleUser = async (token) => {
  const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
    params: {
      access_token: token.access_token,
      alt: 'json'
    },
    headers: {
      Authorization: `Bearer ${token.id_token}`
    }
  });

  return data;
};

// step 6 is google server send user info back to nodejs server

export { getGoogleToken, getGoogleUser };

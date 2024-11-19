import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // check login
  const isLogin = localStorage.getItem('access_token') !== null;

  // get link (include query)
  const getOathGoogleUrl = () => {
    const { VITE_AUTH_URI, VITE_CLIENT_ID, VITE_REDIRECT_URIS } = import.meta.env;
    const params = {
      client_id: VITE_CLIENT_ID,
      redirect_uri: VITE_REDIRECT_URIS,
      response_type: 'code', // for server-side web app - for js app set'token' => get hash value
      state: 'prevent-csrf',
      access_type: 'offline', // get refresh token
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ].join(' ')
    };
    const query = new URLSearchParams(params);
    return `${VITE_AUTH_URI}?${query}`;
  };

  // logout
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate(0);
  };

  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Demo OAuth 2.0 with Google</h1>
      <div className='card'>
        <br />
        {isLogin ? (
          <>
            <Link to={'/content'}>You have login, click here to access content</Link>
            <p>
              <button onClick={logout}>Logout</button>
            </p>
          </>
        ) : (
          <p>
            <Link to={getOathGoogleUrl()}>Login</Link> to access more content
          </p>
        )}
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </>
  );
};

export default Home;

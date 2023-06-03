import React from 'react'
import axios from "axios";

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props;
  const [auth, setAuth] = React.useState({})

  const attemptTokenLogin = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const { data: auth } = await axios.get('/apiRoutes/auth', {
        headers: {
          authorization: token
        }
      })
      setAuth(auth);
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({});
    location.reload();
  }

  React.useEffect(() => {
    attemptTokenLogin();
  }, [])

  return (
    <div>
      {auth?
        <>
          <h3>Welcome, {username}</h3>
          <button onClick={logout}>Log Out</button>
        </>:
        <p>You are not logged in.</p>
      }
    </div>
  )
}

export default Home;
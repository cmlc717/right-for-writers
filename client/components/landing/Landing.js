import React, {useEffect} from 'react'
import axios from "axios";
import { fetchAllPosts,  selectAllPosts } from './LandingSlice';
import { useSelector, useDispatch } from 'react-redux'

/**
 * COMPONENT
 */
export const Landing = props => {
  const {username} = props;
  const [auth, setAuth] = React.useState({});
  const [allPosts, setAllPosts] = React.useState([]);
  const dispatch = useDispatch();

  useEffect (() => {
    dispatch(fetchAllPosts());
    setAllPosts(selectAllPosts);
  }, []);

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
        <p></p>
    </div>
  )
}

export default Landing;
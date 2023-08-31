import React, { useEffect } from 'react'
import axios from "axios";
import { fetchAllPosts } from './LandingSlice';
import { useSelector, useDispatch } from 'react-redux'
import LandingPost from './LandingPost';
// import LandingPost from './LandingPost';
import uuid4 from "uuid4";

/**
 * COMPONENT
 */
export const Landing = props => {
  const {username} = props;
  const [auth, setAuth] = React.useState({});
  const allPosts = useSelector((state) => state.Landing);
  const dispatch = useDispatch();

  useEffect (() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

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
        {allPosts.length > 0? 
          <ul>
            {allPosts.map((post) => <LandingPost post={post} key={uuid4()}/>)}
          </ul>
          : <div className="text-center alert alert-danger">Error Loading Posts</div>
        }
    </div>
  )
}

export default Landing;
import React, {useEffect} from 'react'
import { fetchSignupAsync, selectSignup } from './SignupSlice';
import { fetchLoginAsync, selectLogin } from './LoginSlice';
import { useSelector, useDispatch } from 'react-redux'
import Home from '../Home';

/**
 * COMPONENT
 */
const AuthForm = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loginAttempt, setLoginAttempt] = React.useState(false);
    const [signupAttempt, setSignupAttempt] = React.useState(false);
    const [user, setUser] = React.useState('');
    const [tab, setTab] = React.useState("");
    const dispatch = useDispatch();

    const onChange = ev => {
      if (ev.target.name === 'username') setUsername(ev.target.value)
      if (ev.target.name === 'password') setPassword(ev.target.value)
    }

    const onSubmit = ev => {
      ev.preventDefault();
      if (ev.target.name === 'signup') setSignupAttempt(true);
      if (ev.target.name === 'login')  setLoginAttempt(true);
    }

    const onTabChange = ev => {
      ev.preventDefault();
      if (tab==="login") {
        setTab("signup");
      } else if (tab==="signup") {
        setTab("login")
      }
    }

    useEffect (() => {
      if (tab==="") {
        setTab("login")
      }
      if (loginAttempt) {
        dispatch(fetchLoginAsync({username, password}));
        setUser(selectLogin);
      } else if (signupAttempt) {
        dispatch(fetchSignupAsync({username, password}));
        setUser(selectSignup);
      }
    }, [loginAttempt, signupAttempt, tab]);

    return (
      <>
        {tab==="login"?
          <div>
            <ul className="nav nav-tabs">
              <li role="presentation" className="active"onClick={onTabChange}><a href="" >Log In</a></li>
              <li role="presentation"onClick={onTabChange}><a href="">Sign Up</a></li>
            </ul>

            {!loginAttempt && !signupAttempt?
              <form className="form-group">
                <input value={username} onChange={onChange} name="username" placeholder="username"/>
                <input value={password} onChange={onChange} name="password" placeholder='password'/>
                <button className="btn" type='submit' name='login' onClick={onSubmit}>Log In</button>
              </form> : <Home username={username} />}
          </div>
          :
          <div>
          <ul className="nav nav-tabs">
            <li role="presentation"><a href="" onClick={onTabChange}>Log In</a></li>
            <li role="presentation" className="active"><a href=""onClick={onTabChange}>Sign Up</a></li>
          </ul>

          {!loginAttempt && !signupAttempt?
            <form className="form-group">
              <input value={username} onChange={onChange} name="username" placeholder="username"/>
              <input value={password} onChange={onChange} name="password" placeholder='password'/>
              <button className="btn" type='submit' name ='signup' onClick={onSubmit}>Sign Up</button>
            </form> : <Home username={username} />}
            </div>
        }
      </>
    )
}

export default AuthForm;
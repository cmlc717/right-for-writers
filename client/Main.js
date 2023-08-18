import React, {Component, Fragment} from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthForm from './components/authform/AuthForm';
import Landing from './components/landing/Landing';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={ < Landing /> } />
      <Route path='/login' element={ < AuthForm /> } />
    </Routes>
  );
}

export default Main;
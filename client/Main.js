import React, {Component, Fragment} from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthForm from './components/AuthForm';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={ < AuthForm /> } />
    </Routes>
  );
}

export default Main;
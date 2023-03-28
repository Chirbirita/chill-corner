import React, { useState, useEffect } from 'react';
import { useContext } from 'react'
import Login from './Login';
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import WrapperContainer from './WrapperContainer';



const Signin = () => {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({ type: reducerCases.SET_TOKEN, token });

    }
    document.title = "ChillCorner";
  }, [dispatch, token]);


  return (
    <>
      <div>
        {token ? <WrapperContainer /> : <Login />}

      </div>
    </>
  );
};
export default Signin;
import React, { useState, useEffect } from 'react';
import { useContext } from 'react'
import Login from './Login';
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import WrapperContainer from './WrapperContainer';
import axios from "axios";
import useAuth from "./useAuth"

const codeURL = new URLSearchParams(window.location.search).get("code")


const Signin = () => {
  const [{ token, code }, dispatch] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({ type: reducerCases.SET_TOKEN, token });

    }
    document.title = "ChillCorner";
  }, [dispatch, token]);

  useEffect(() => {
    if(codeURL){
      dispatch({ type: reducerCases.SET_CODE, code :codeURL });
    }
    
  }, [dispatch, code]);


  return (
    <>
      <div>
        {codeURL ? <WrapperContainer code={ codeURL } /> : <Login />}
      </div>
    </>
  );
};
export default Signin;
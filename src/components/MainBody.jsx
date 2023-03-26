import React, { useState,useEffect } from 'react';
import styled from 'styled-components'
import { useContext } from 'react'
import BGContext from './BGContext'
import Navbar from './Navbar';
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from '../utils/Constants';
import Body from './Body';



 

const MainBody = () => {

  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        
      });
      console.log(data); 
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.email,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
    
  },[dispatch,token]);
      
 

  const [background, _] = useContext(BGContext)
  const choosenBg = background === null ? 'bg-whtie' : background
  return (
    <>
      <div
        style={{ backgroundImage: `url(${choosenBg})` }}
        className="glass my-auto h-5/6 w-full rounded-lg bg-center bg-cover"
      >
        <Navbar/>
        <Body/>
        

      </div>
    </>
  );
};
export default MainBody;
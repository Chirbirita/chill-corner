import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { useContext } from 'react'
import BGContext from './BGContext'
import Navbar from './Navbar';
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from '../utils/Constants';
import Body from './Body';
import Footer from './Footer';





const MainBody = () => {
  const [{ token, themeBackground }, dispatch] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyRef = useRef();
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },

      });

      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.email,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();

  }, [dispatch, token]);



  return (

    <div
      style={{ backgroundImage: `url(${themeBackground})` }}
      className="relative flex flex-col w-[90%] max-w-[300px] md:w-[75%] md:max-w-[1200px] md:h-5/6 mx-auto gap-3 glass rounded-lg bg-center bg-cover py-5"
    >

      <div className="relative chill__footer flex mx-auto justify-center h-40 w-[100%]">
        <Footer />
      </div>

      <div className="relative body__contents flex mx-auto justify-center h-50 w-[100%]">
        <Body headerBackground={headerBackground} />
      </div>



    </div>

  );
};
export default MainBody;

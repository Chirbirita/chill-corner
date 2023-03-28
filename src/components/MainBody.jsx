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
      className="glass my-auto h-5/6 w-full rounded-lg bg-center bg-cover flex flex-col items-center justify-center"
    >

      <div className="chill__footer flex justify-center h-40 w-full">
        <Footer />
      </div>

      <div className="body__contents flex justify-center h-80 w-full">
        <Body headerBackground={headerBackground} />
      </div>



    </div>

  );
};
export default MainBody;

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
    .body {
      height: 100%;
      width: 50%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.7rem;
        max-height: 2rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;
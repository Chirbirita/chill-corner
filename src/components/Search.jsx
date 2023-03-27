import React from "react";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import styled from "styled-components";
import Playlists from "./Playlists";

export default function Search() {
    return(
        <Container>
           <div className="top__links">
                <ul>
                    <li>
                        <MdHomeFilled />
                        <span>Home</span>
                    </li>
                    <li>
                        <MdSearch />
                        <span>Search</span>
                    </li>
                </ul>
            
            </div>
            <Playlists/>
        </Container>
       

    );
}

const Container = styled.div`
  .top__links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 40%;
        block-size: auto;
      }
    }
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 3rem;
      li {
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: white;
        }
      }
    }
  }
`;


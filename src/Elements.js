import React from 'react';
import styled, {keyframes} from 'styled-components';
import {Link, NavLink} from 'react-router-dom';
import {Toggle} from 'react-powerplug';

const anim1 = keyframes`
  0% {
    top: 36px;
    height: 128px;
  }
  50% {
    top: 60px;
    height: 80px;
  }
  100% {
    top: 60px;
    height: 80px;
  }
`;

const anim2 = keyframes`
0% {
    top: 42px;
    height: 116px;
  }
  50% {
    top: 60px;
    height: 80px;
  }
  100% {
    top: 60px;
    height: 80px;
  }
`;

const anim3 = keyframes`
  0% {
    top:  48px;
    height: 104px;
  }
  50% {
    top: 60px;
    height: 80px;
  }
  100% {
    top: 60px;
    height: 80px;
  }
`;


const LoaderWrapper = styled.div`
  position: relative;
  & div {
    position: absolute;
    width: 30px;
     &:nth-child(1) {
      left: 35px;
      background: #f49712;
      animation: ${anim1} 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
      animation-delay: -0.2s;
    }
   &:nth-child(2) {
      left: 85px;
      background: #a6d6c9;
      animation: ${anim2} 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
      animation-delay: -0.1s;
    }
    &:nth-child(3) {
      left: 135px;
      background: #f7d117;
      animation: ${anim3} 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    }
  }
  width: 200px !important;
  height: 200px !important;
  -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
  transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
`;

const HeaderWrapper = styled.div`
    display: flex;
    background-color: #ccc;
    flex-grow: 1;
    flex-direction: column;
    max-height: 100px;

    div{
      display: flex;
      align-items: center;
    }
`;

const Title = styled(Link)`
    background-color: #333;
    text-decoration: none;
    height: 60px;
    padding: 10px 20px 7px 20px;
      font-family: Rockwell, "Courier Bold", "Courier", "Georgia", Times, "Times New Roman", serif;
      font-weight: bold;
      font-size: 2rem;
      color: white;
      @media only screen and (max-width: 880px) {
        flex-grow: 1;
      }
      text-align: center;
    & span:nth-of-type(1){
        color: #f49712;
    }
    & span:nth-of-type(2){
        color: #a6d6c9;
    }
    & span:nth-of-type(3){
        color: #f7d117;
    }
`;

const Content = styled.div`
    padding: 10px;
    font-size: 1.5rem;
    flex-grow: 1;
    @media only screen and (max-width: 880px) {
        text-align: center;
    }
`;

const Nav = styled.nav`
    margin-right: 5px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: stretch;
    height: 40px;
    width: 100%;

    a:nth-child(3n+1){
      background-color: #f49712;
    }
    a:nth-child(3n+2){
      background-color: #a6d6c9;
    }
    a:nth-child(3n+0){
      background-color: #f7d117;
    }
    /* a.active{
      background-color: #333;
      color: white;
    } */
    a{
      color: black;
      text-decoration: none;
      text-align: center;
      padding: 10px 16px;
      height: 100%;
      flex-grow: 1;
      &:hover{
        background-color: #333;
        color: white;
      }
    }
    @media only screen and (max-width: 880px) {
      flex-grow: 1;
      margin: 0;
  }
`;

export const Loader = (props) => (
    <LoaderWrapper {...props}>
        <div></div>
        <div></div>
        <div></div>
    </LoaderWrapper>
);

export const Header = ({admin}) => (
    <HeaderWrapper>
        <div>
          <Title to="/">
            <span>Welly</span><span>Comp</span><span>Sci</span>
          </Title>
          <Content>
            <span style={{fontFamily: 'Gill Sans SB', marginRight: "6px"}}>Internship Programme</span>Training Portal {admin && <strong style={{flexGrow: "1", textAlign: "center"}}>ADMIN</strong>}
          </Content>
        </div>
        <Nav>
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/courses">Courses</NavLink>
            <NavLink to="/newcourses">New Courses</NavLink>
        </Nav>
    </HeaderWrapper>

);

const FooterWrapper = styled.footer`
    color: #aaa;
    background-color: #f1f1f1;
    font-size: 0.5rem;
    padding: 10px;
    text-align: center;
`;

export const Footer = ({onChangeAdmin}) => (
    <Toggle>
        {({on, toggle}) =>
            <FooterWrapper>
                <span>WellyCompSci is a student project. Examples might be simplified for high school level learning. Tutorials, references, and examples are constantly reviewed to avoid errors, but we cannot warrant full correctness of all content. While using this site, you agree to have read and accepted our terms of use, cookie and privacy policy. Copyright 2017-2018. All Rights Reserved. Powered by Mann Power.</span>
                <span onClick={toggle} style={{cursor: 'pointer'}}> Edit</span>
                {on && <input onChange={onChangeAdmin} style={{fontSize: '0.5rem', marginLeft: 5}} />}
            </FooterWrapper>
        }
    </Toggle>
)

export const Main = styled.main`
    max-width: 960px;
    margin: auto;
    flex-grow: 1;
`;

export const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
`;

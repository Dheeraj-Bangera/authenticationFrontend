import React from "react";
import {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './home.css'
axios.defaults.withCredentials = true;
export const Home = () => {

  const Navigate = useNavigate();
  const nav = () => {
    Navigate("/");
  };


  const fetchData = async () => {
    try {
      var response = await axios.get(`${process.env.REACT_APP_SEVER_URL}/get`, {
        withCredentials: true,
      });
      console.log(response);
    } catch (err) {
      if (err.response.status === 401) {
        nav();
      }
    }
  };
  useEffect(() => {
    fetchData();
  });
  return (
    <div className="wrapper1">
      <div className="model">
        <h1>Welcome to Home page</h1>
        <p>This is secure page and will be logged out once the jwt token expires </p>
        <p>To manually Logout click on the button below</p>
        <button className="button-53" style={{backgroundColor: '#FF5B22'}} onClick={nav}>Logout</button>
      </div>
    </div>
  );
};

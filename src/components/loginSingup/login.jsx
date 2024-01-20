import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
axios.defaults.withCredentials = true;

export const Login = () => {
  const Navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [repassword, setrepassword] = useState("");

  const [toggle, setToggle] = useState(true);

  const navigator = ()=>{
    Navigate("/home")
  }
  const loginHandler = async () => {
    setToggle(true);
    setEmail("");
    setPassword("");
  };
  const signupHandler = () => {
    setToggle(false);
    setEmail("");
    setPassword("");
    setname("");
    setrepassword("");
  };
  const submitHandler = async () => {
    if (toggle) {
      if (!email || !password) {
        alert("Please fill all the fields");
      } else {
        const loginCredentials = {
          email: email,
          password: password,
        };
        console.log(loginCredentials);
        try {
           await axios
            .post(
              `${process.env.REACT_APP_SEVER_URL}/login`,
              {
                email: email,
                password: password,
              },
              { withCredentials: true }
            )
            navigator();
              
          
        } catch {
          alert("Invalid Credentials");
        }
        setEmail("");
        setPassword("");
        setname("");
        setrepassword("");
      }
    } else {
      if (!email || !password || !name || !repassword) {
        alert("Please fill all the fields correctly");
      } else {
        if (password !== repassword) {
          alert("passwords do not match");
        } else {
          const signUpDetails = {
            name: name,
            email: email,
            password: password,
          };
          console.log(signUpDetails);
          try {
            await axios.post(`${process.env.REACT_APP_SEVER_URL}/signup`, {
              name: name,
              email: email,
              password: password,
            });
            console.log("done");
          } catch {
            alert("Invalid Credentials");
          }
          setEmail("");
          setPassword("");
          setname("");
          setrepassword("");
        }
      }
    }
  };
  return (
    <div className="main">
      <div className="wrapper">
        <div className="heading">TODO APP</div>
        <div className="btns">
          <button
            id="loginbtn"
            style={{ backgroundColor: toggle ? "#c6b4b1" : "#fee6e3" }}
            className="loginbtn button-56 "
            onClick={loginHandler}
          >
            Login
          </button>
          <button
            className="signupbtn  button-56"
            style={{ backgroundColor: toggle ? "#fee6e3" : "#c6b4b1" }}
            onClick={signupHandler}
          >
            SignUp
          </button>
        </div>
        <div className="form">
          {toggle ? (
            <div></div>
          ) : (
            <input
              className="inputText"
              type="text"
              name="name"
              placeholder="name"
              onChange={(e) => {
                setname(e.target.value);
              }}
              value={name}
            ></input>
          )}
          <input
            className="inputText"
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          ></input>
          <input
            className="inputText"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          ></input>
          {toggle ? (
            <div></div>
          ) : (
            <input
              className="inputText"
              type="password"
              name="re-password"
              placeholder="re-enter password"
              onChange={(e) => {
                setrepassword(e.target.value);
              }}
              value={repassword}
            ></input>
          )}
        </div>
        <button className=" button-53 " onClick={submitHandler}>
          Submit
        </button>
      </div>
    </div>
  );
};
export default Login;

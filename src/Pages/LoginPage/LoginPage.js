import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, AuthProvider } from "../../context/context";
import { Sidebar } from "../../Components/components";

function LoginPage() {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useAuth();
  const { loginError, setLoginError } = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const setUserData = (name) => {
    console.log("name", name);
    return ({ target: { value } }) => {
      console.log("value", value);
      setLoginData((prevvalue) => ({ ...prevvalue, [name]: value }));
    };
  };
  const testUser = {
    email: "adarshbalika@gmail.com",
    password: "adarshBalika123",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    submitLoginDetail(loginData);
  };
  const guestLogin = (e) => {
    e.preventDefault();
    submitLoginDetail(testUser);
  };

  const submitLoginDetail = async (loginData) => {
    try {
      const response = await axios.post("/api/auth/login", loginData);
      if (response.status === 200) {
        setLoggedIn(true);
        const userToken = response.data.encodedToken;
        localStorage.setItem("userToken", userToken);
      }
    } catch (error) {
      // setLoginError("An error occured");
      console.log("error", error.response.error);
    }
  };
  return (
    <main className="login-wrapper">
      <Sidebar />
      <section className="login-page-bottom-container">
        <div className="login-container">
          <form className="login-form" onSubmit={handleLogin}>
            <h1>Login</h1>
            <div>
              <label className="input-label">Email address</label>
              <input
                className="form-input-container"
                type="text"
                placeholder="xyz@gmail.com"
                value={loginData.email}
                onChange={setUserData("email")}
              />
            </div>
            <div>
              <label className="input-label">Password</label>
              <input
                className="form-input-container"
                type="password"
                placeholder="**********"
                value={loginData.password}
                onChange={setUserData("password")}
              />
            </div>
            <div className="forgot-pswrd-link">
              <a href="#">Forgot Password?</a>
            </div>
            <p>
              <input className="style-input-checkbox" type="checkbox" />{" "}
              Remember me
            </p>
            <button className="button-login-form border-style">LOGIN</button>
            <button
              className="button-login-form border-style"
              onClick={(e) => guestLogin(e)}
            >
              GUEST LOGIN
            </button>
            <Link to="/signup" className="btn-sign-up button-link">
              Create New Account <i class="fas fa-chevron-right"></i>
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/context";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useAuth();
  const [signupData, setSignupData] = useState({ email: "", password: "" });

  const setUserData = (name) => {
    return ({ target: { value } }) => {
      setSignupData((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submitSignupData(signupData);
  };

  const submitSignupData = async (data) => {
    try {
      const response = await axios.post("/api/auth/signup", data);
      if (response.status === 201) {
        const { data } = response;
        const userToken = data.encodedToken;
        setLoggedIn(true);
        localStorage.getItem("userToken", userToken);
        navigate("/");
      }
    } catch (error) {
      console.log("error", error.response.error);
    }
  };
  return (
    <main className="signup-wrapper">
      <section className="login-page-bottom-container">
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <div>
              <label className="input-label">Email address</label>
              <input
                className="form-input-container"
                type="text"
                required
                placeholder="xyz@gmail.com"
                value={signupData.email}
                onChange={setUserData("email")}
              />
            </div>
            <div>
              <label className="input-label">Password</label>
              <input
                className="form-input-container"
                type="password"
                required
                placeholder="**********"
                value={signupData.password}
                onChange={setUserData("password")}
              />
            </div>
            <div className="form-bottom-section">
              <input type="checkbox" className="checkbox" />
              <span>I accept all Terms and Conditions</span>
            </div>
            <button className="button-login-form border-style" type="submit">
              CREATE NEW ACCOUNT
            </button>
            <Link to="/login">
              Already have an account <i className="fas fa-chevron-right"></i>
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Signup;

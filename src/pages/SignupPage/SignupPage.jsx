import "./SignupPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [formError, setFormError] = useState(false);

  //status for error
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmedPassError, setConfirmedPassError] = useState("");

  //use navigate
  const navigate = useNavigate();

  const handleChangeUserName = (e) => {
    setUsername(e.target.value);
    if (usernameError) setUsernameError("");
  };

  const handleChangePass = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError("");
  };

  const handleChangeConfirmedPass = (e) => {
    setConfirmedPass(e.target.value);
    if (confirmedPassError) setConfirmedPassError("");
  };

  const isPassValid = () => {
    let isValid = true;

    if (username.trim().length === 0) {
      setUsernameError("Username cannot be empty.");
      isValid = false;
    }

    if (password.length < 0) {
      setPasswordError("Password cannot be empty");
      isValid = false;
    }

    if (confirmedPass !== password) {
      setConfirmedPassError("Passwords do not match.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPassValid()) {
      return;
    }

    navigate("/setting", { state: { username, password } });
  };

  return (
    <div className="signup__input--form">
      <div className="signup__wrapper">
        <h2 className="signup__input--title">Sign up</h2>
        <form className="signup__form" onSubmit={handleSubmit}>
          <label htmlFor="username" className="signup__label">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="👤Username"
              className="signup__input"
              value={username}
              onChange={handleChangeUserName}
            />
            {usernameError && <p className="signup__error">{usernameError}</p>}
          </label>
          <label htmlFor="password" className="signup__label">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="🔒password"
              className="signup__input"
              value={password}
              onChange={handleChangePass}
            />
            {passwordError && <p className="signup__error">{passwordError}</p>}
          </label>
          <label htmlFor="password" className="signup__label">
            <input
              type="password"
              name="password"
              id="confirmedPassword"
              placeholder="🔒confirm password"
              className="signup__input"
              value={confirmedPass}
              onChange={handleChangeConfirmedPass}
            />
            {confirmedPassError && (
              <p className="signup__error">{confirmedPassError}</p>
            )}
          </label>

          <div className="signup__footer">
            <button className="signup__button">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;

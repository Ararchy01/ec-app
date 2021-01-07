import React, { useState, useCallback } from "react";
import { PrimaryButton, TextInput, Spacer } from "../components/uikit";
import { signUp } from "../reducks/users/operations";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  const inputVerifyPassword = useCallback(
    (event) => {
      setVerifyPassword(event.target.value);
    },
    [setVerifyPassword]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">Register</h2>
      <Spacer />
      <TextInput
        fullWidth={true}
        label={"User Name"}
        multiline={false}
        required={true}
        rows={1}
        value={username}
        type={"text"}
        onChange={inputUsername}
      />
      <TextInput
        fullWidth={true}
        label={"Email"}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={"Password"}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={"password"}
        onChange={inputPassword}
      />
      <TextInput
        fullWidth={true}
        label={"Verify Password"}
        multiline={false}
        required={true}
        rows={1}
        value={verifyPassword}
        type={"password"}
        onChange={inputVerifyPassword}
      />
      <Spacer />
      <div className="center">
        <PrimaryButton
          label="Register"
          onClick={() =>
            dispatch(signUp(username, email, password, verifyPassword))
          }
        />
      </div>
    </div>
  );
};

export default SignUp;

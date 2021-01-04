import React, {useState, useCallback} from 'react';
import {PrimaryButton, TextInput, Spacer} from '../components/uikit';
import {signIn} from '../reducks/users/operations';
import {useDispatch} from 'react-redux';

const SignIn = () => {
  const dispatch = useDispatch();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value);
  }, [setPassword]);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">Sign In</h2>
      <Spacer />
      <TextInput
        fullWidth={true} label={"Email"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <TextInput
        fullWidth={true} label={"Password"} multiline={false} required={true}
        rows={1} value={password} type={"password"} onChange={inputPassword}
      />
      <Spacer />
      <div className="center">
        <PrimaryButton
        label="Sign In" 
        onClick={() => dispatch(signIn(email, password))}
        />
      </div>
    </div>
  )
}

export default SignIn
import React, {useState, useCallback} from 'react';
import {PrimaryButton, TextInput, Spacer} from '../components/uikit';
import {resetPassword} from '../reducks/users/operations';
import {useDispatch} from 'react-redux';

const ResetPassword = () => {
  const dispatch = useDispatch();

  const [email,setEmail] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, [setEmail]);

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">Sign In</h2>
      <Spacer />
      <TextInput
        fullWidth={true} label={"Email"} multiline={false} required={true}
        rows={1} value={email} type={"email"} onChange={inputEmail}
      />
      <Spacer />
      <div className="center">
        <PrimaryButton
        label={"Reset Password"}
        onClick={() => dispatch(resetPassword(email))}
        />
      </div>
    </div>
  )
}

export default ResetPassword
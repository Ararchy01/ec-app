export const SIGN_IN = "SIGN_IN"
export const signInAction = (userState) => {
  return {
    type: this.SIGN_IN,
    payload: {
      isSignedIn: true,
      uid: userState.uid,
      username: userState.username
    } 
  }
}

export const SIGN_OUT = "SIGN_OUT"
export const signOutAction = (userState) => {
  return {
    type: this.SIGN_OUT,
    payload: {
      isSignedIn: false,
      uid: "",
      username: ""
    }
  }
}
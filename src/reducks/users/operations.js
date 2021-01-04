import {signInAction} from './actions';
import {push} from 'connected-react-router';
import {auth, db, FirebaseTimestamp} from '../../firebase/index';

export const signIn = (email, password) => {
  return async (dispatch) => {
    if (email === "" || password === "") {
      alert("Input required");
      return false;
    }
    auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user;
        if (user) {
          const uid = user.uid;
          db.collection('users').doc(uid).get()
            .then(snapshot => {
              const data = snapshot.data();
              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid: data.uid,
                username: data.username
              }))
              dispatch(push('/'));
            })
        }
      })
  }
}

export const signUp = (username, email, password, verifyPassword) => {
  return async (dispatch) => {
    if (username === "" || email === "" || password === "" || verifyPassword === "") {
      alert("Required Field empty");
      return false;
    }

    if (password !== verifyPassword) {
      alert("Verify password not match password");
      return false;
    }

    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user;
        if (user) {
          const uid = user.uid;
          const role = "customer"
          const timestamp = FirebaseTimestamp.now();
          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: role,
            uid: uid,
            updated_at: timestamp,
            username: username
          }

          db.collection("users").doc(uid).set(userInitialData)
            .then(() => {
              dispatch(signInAction({
                isSignedIn: true,
                role: role,
                uid: uid,
                username: username
              }))
              dispatch(push('/'));
            })
        }
      })
  }
}
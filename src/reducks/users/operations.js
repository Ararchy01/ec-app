import {signInAction, signOutAction} from './actions';
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

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {
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
          })
      } else {
        dispatch(push('/signin'));
      }
    })
  }
}

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut()
      .then(() => {
        dispatch(signOutAction());
        dispatch(push('/signin'));
      })
  }
}

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert("Input required");
      return false;
    }
    auth.sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset form sent to the email");
        dispatch(push('/signin'));
      })
      .catch(() => {
        alert("Error occured while the password reset");
      })
  }
}
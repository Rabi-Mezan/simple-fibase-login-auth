
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
import initAuthentication from './Firebase/Firebase.init';
import './App.css';
import { useState } from 'react';

initAuthentication();
function App() {

  const googleprovider = new GoogleAuthProvider();
  const gitprovider = new GithubAuthProvider();
  const auth = getAuth();
  const [user, setUser] = useState({});
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleprovider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedUser = {
          name: displayName,
          email: email,
          img: photoURL
        }
        setUser(loggedUser)
        console.log(result.user)
      })
      .catch(error => {
        console.log(error.massage)
      })
  }

  const handleGitSignIn = () => {
    signInWithPopup(auth, gitprovider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const loggedUser = {
          name: displayName,
          email: email,
          img: photoURL
        }
        setUser(loggedUser)
      })
  }

  const handleSignOut = () => {
    signOut(auth);
    setUser({})
  }
  return (
    <div className="App">
      {!user.name ?
        <div>
          <button onClick={handleGoogleSignIn}>Google sign in </button> <br />
          <button onClick={handleGitSignIn}>Github sign in</button>
        </div> :

        <button onClick={handleSignOut}>Sign out</button>}
      {
        user.name && <div>
          <img src={user.img} alt="" />
          <p> welcome {user.name}</p>
          <p>{user.email}</p>

        </div>
      }
    </div>
  );
}

export default App;

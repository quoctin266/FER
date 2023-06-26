import GoogleButton from "react-google-button";
import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/action/auth";

const GoogleSignIn = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        dispatch(
          login({
            name: currentUser.displayName,
            email: currentUser.email,
            img: currentUser.photoURL,
          })
        );
      }
    });
    return () => {
      unSubscribe();
    };
  }, [dispatch]);

  return (
    <>
      <div className="google-btn">
        <GoogleButton
          onClick={handleGoogleSignIn}
          style={{ margin: "0 auto", marginTop: "5%" }}
        />
      </div>
    </>
  );
};

export default GoogleSignIn;

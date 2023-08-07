import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header.js";
import Sidebar from "./components/HomePage/Sidebar";
import { Outlet } from "react-router-dom";
import SendMail from "./components/SendMail";
import { useDispatch, useSelector } from "react-redux";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { login, logout, selectUser } from "./features/userSlice";
import Login from "./components/LoginPage/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth)=>{
      if(userAuth)
      {
        // user is logged in
        dispatch(login({
          displayName: userAuth.displayName,
          email: userAuth.email,
          photoURL: userAuth.photoURL,
        }));
      }
      else
      {
        // user is logged out
        dispatch(logout());
      }
    });
    return ()=>unsubscribe();
  }, [dispatch]);

  return (
    <>
      {user ? (
        <div className="app">
          <Header />
          <div className="app__body">
            <Sidebar />

            <div className="app__outlet">
              <Outlet />
            </div>

            {sendMessageIsOpen && <SendMail />}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;

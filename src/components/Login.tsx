import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import User from "./model/User";
import background from "./KUBU.png";
import { baseURL } from "./URL";

// Props to update the current user
interface Props {
  currentUser: User | null;
  setCurrentUser: any
}

// Function to handle the login process
export default function Login({ currentUser, setCurrentUser }: Props) {
  // Login success tracking
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Fields that user give input for
  const [inputFields, setInputFields] = useState(
    {
      username: "",
      password: ""
    }
  );

  // Gets User input for each field based on its name
  function getInput(event: any) {
    setInputFields({
      ...inputFields,
      [event.target.name]: event.target.value
    });
  }

  // Function for when Login button is pressed
  async function login() {
    // The info to check in API
    let checkUser: User = {
      username: inputFields.username,
      password: inputFields.password
    }

    // Check properties of user object, ensure it has values
    let isValid = Object.values(checkUser).every(value => {
      if (!value)
        return false;
      else
        return true;
    });

    // If login info has values
    if (isValid) {
      // Check info in API
      let returnedUser = await baseURL.post('/login',
        JSON.stringify(checkUser),
        {
          'headers':
          {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        .then((response) => response.data)
        .catch(() => alert("Something went wrong while logging in. Try again"));

      if (returnedUser) {
        // Check Login Success, if ID is 0 => login failed, otherwise, set up necessary login variables
        returnedUser.userID == 0 ?
          (console.log(returnedUser)) :
          (setUp(returnedUser));
      }
    }
  }

  // Set log in variables
  function setUp(returnedUser: User) {
    setCurrentUser(returnedUser); // Update current user
    setLoginSuccess(true);        // Set log in success to true
  }


  // What to show => if login was a success, navigate to search page, otherwise, show login
  return loginSuccess ? (<Navigate to="/userProfile" />) :
    (
      <>
        {/* Author: Christian | style setup */}
        <div className="backgroundColor">
          <img className="bandCat" src={require('../pics/KUBU.png')}></img>
          <div className="center">

            <br></br>
            <br></br>
            <div className="topBox">

              <div className="homeText">BandCat Instruments - Login</div>
            </div>
            <br></br>
            <br></br>

            {/* Login Form */}
            <div className="loginBox">
              <div className="bodyText">
                <form style={{ margin: '10px 0px' }}>

                  {/* Username Field */}
                  <span>Username: </span>
                  <input type="text" placeholder="username" name="username" value={inputFields.username} onChange={getInput} />
                  <br /><br />

                  {/* Password Field */}
                  <span>Password: </span>
                  <input type="password" placeholder="password" name="password" value={inputFields.password} onChange={getInput} />
                  <br /><br />

                </form>

                {/* Login Button, submits login info */}
                
                <div className = "divLoginButtons">
                <button id = "loginButton" type="button" onClick={login}>Login</button>
                <br /><br />

                {/* Sign Up Button, switches to sign up page */}
                <Link to={"/signUp"}>
                  <button id = "signupButton" type="button">Sign Up</button>
                </Link>

                </div>
              </div>
            </div>
          </div>
          <img className="bottomCorner" src={require('../pics/bottomCorner.png')}></img>
        </div>
      </>);
}
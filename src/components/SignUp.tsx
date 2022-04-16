import axios from "axios";
import { useEffect, useState } from "react";
import Instrument from "./model/Instrument";
import InstrumentOptions from "./model/InstrumentOptions";
import User from "./model/User";
import { Link, Navigate } from "react-router-dom";
import { baseURL } from "./URL";

export default function SignUp() {

  // Success of Sign Up
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [inputFields, setInputFields] = useState(
    {
      username: '',
      password: '',
      email: '',
      phoneNumber: '',
      instrumentName: InstrumentOptions.BASS,
      confidence: 1
    }
  );

  // Checks if Username has already been taken while getting user input for username
  useEffect(() => {checkUsername()}, [inputFields.username]);

  // Gets User input for each field based on its element name
  function getInput(event: any) {
    setInputFields({
      ...inputFields,
      [event.target.name]: event.target.value
    });
  }

  // Checks if Username is already taken
  async function checkUsername()
  {
    if (inputFields.username)
    {
      let userFound = await baseURL.get('/users/byUsername/' + inputFields.username)
      .then(response => response.data)
      .catch(() => null);
  
      setUsernameTaken(() => userFound ? true : false); 
    }
  }

  // When Sign Up Button is Pressed
  async function sendInfo() 
  {
    // Initialize User object with typed information
    let userToCreate: User = {
      username: inputFields.username,
      password: inputFields.password,
      email: inputFields.email,
      phoneNumber: inputFields.phoneNumber
    };


    // Check properties of user object, ensure it has values
    let isValid = Object.values(userToCreate).every(value => 
    {
        if (!value)
            return false;
        else
            return true;
    });

    // If sign up info has values
    if (isValid)
    {
      // POST request to API with user info, set headers to JSON, and retrieve the User back
      let userReturned = await baseURL
      .post("/users", JSON.stringify(userToCreate), {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((response) => response.data)
      .catch(() => alert("Something went wrong while Signing Up. Try again"));

      // If there is a User taht was returned, continue sign up process
      if (userReturned)
      {
        // Initialize Instrument object with selected information
        let instrumentForUser: Instrument = {
          instrumentID: userReturned.userID, // Assign ID for DB mapping
          instrumentName: inputFields.instrumentName,
          confidence: inputFields.confidence
        };

        // If the ID isn't 0 meaning there was User found, continue
        if (instrumentForUser.instrumentID != 0)
        {
          // POST request to API with instrument info, set JSON header
          await baseURL.post
          (
            "/instruments/" + instrumentForUser.instrumentID,
            JSON.stringify(instrumentForUser),
            {
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
              },
            }
          )
          .then((response) => response.data)
          .catch(() => 
          {
            // Alert User an error occured during sign up
            alert("Couldn't set the Instrument. Try again.");
            return;
          });

          // State Variable for Success of Sign Up
          setSignUpSuccess(true);
        }
        else 
        {
          alert("No User was found to assign Instrument to.");
        }
      }
    }
    else
    {
      alert("Missing a field.");
    }
  }

  // What to show
  // If sign up was a succes -> go to login page, otherwise show the sign up form
  return signUpSuccess ? (<Navigate to="/login" />) : 
  (
    <>
      <div className="backgroundColor">
        <img className="bandCat" src={require('../pics/KUBU.png')}></img>
        <div className="center">

          <br></br>
          <br></br>

          <div className="topBox">

            <div className="homeText">BandCat Instruments - Sign Up</div>

          </div>
        </div>

        <div className="historyBox" >
          <div className="bodyText">
            
            <form className="center" style={{ margin: '25px 0px' }}>
              {/* Input For User Fields */}

              {/* Username*/}
              <label>
                Username:<span> </span>
              </label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={inputFields.username}
                onChange={getInput}
              />
              {/* Shows message or not based on whether username has already been taken or not */}
              {usernameTaken ? <><br/> Username is taken. <br/></> : null}

              <br /><br />

              {/* Password*/}
              <label>
                Password:<span> </span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={inputFields.password}
                onChange={getInput}
              />
              <br /><br />

              {/* Email*/}
              <label>
                Email:<span> </span>
              </label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={inputFields.email}
                onChange={getInput}
              />
              <br /><br />

              {/* Phone Number*/}
              <label>
                Phone Number:<span> </span>
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                value={inputFields.phoneNumber}
                onChange={getInput}
              />
              <br /><br />

              {/* Instrument Selector*/}
              <label>
                Instrument:<span> </span>
              </label>
              <select
                id="instrument_name"
                name="instrumentName"
                value={inputFields.instrumentName}
                onChange={getInput}
              >
                <option value={InstrumentOptions.BASS}>Bass</option>
                <option value={InstrumentOptions.CLARINET}>Clarinet</option>
                <option value={InstrumentOptions.DRUMS}>Drums</option>
                <option value={InstrumentOptions.GUITAR}>Guitar</option>
                <option value={InstrumentOptions.HARMONICA}>Harmonica</option>
                <option value={InstrumentOptions.PIANO}>Piano</option>
                <option value={InstrumentOptions.SAXOPHONE}>Saxophone</option>
                <option value={InstrumentOptions.SINGER}>Singer</option>
                <option value={InstrumentOptions.TRUMPET}>Trumpet</option>
              </select>
              <br /><br />

              {/* Confidence selector*/}
              <label>
                Confidence:<span> </span>
              </label>
              <select 
              id="confidence"
              name="confidence" 
              value={inputFields.confidence} 
              onChange={getInput}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
              <br /><br />

              {/* Register Button, when clicked send the info*/}
              <button type="button" onClick={sendInfo}>
                Register
              </button>
              <br /><br />
              {/* Example of how to link other "pages" via a button click*/}
              <Link to="/login">
                <button type="button">Login</button>
              </Link>
            </form>

          </div>
        </div>
          <img className="bottomCorner" src={require('../pics/bottomCorner.png')}></img>
      </div>
    </>
  );
}

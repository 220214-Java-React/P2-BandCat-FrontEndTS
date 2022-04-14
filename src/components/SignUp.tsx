import axios from "axios";
import { useEffect, useState } from "react";
import Instrument from "./model/Instrument";
import InstrumentOptions from "./model/InstrumentOptions";
import User from "./model/User";
import { Link, Navigate } from "react-router-dom";

export default function SignUp() {
  // State  Variables to track info from Form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [instrument, setInstrument] = useState(InstrumentOptions.GUITAR);
  const [confidence, setConfidence] = useState(1);

  // Success of Sign Up
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  // Mutator methods to adjust state variables
  function changeUsername(e: any) {
    setUsername(e.target.value);
  }

  function changePassword(e: any) {
    setPassword(e.target.value);
  }

  function changeEmail(e: any) {
    setEmail(e.target.value);
  }

  function changePhoneNumber(e: any) {
    setPhoneNumber(e.target.value);
  }

  function changeInstrument(e: any) {
    setInstrument(e.target.value);
  }

  function changeConfidence(e: any) {
    setConfidence(e.target.value);
  }

  // When Sign Up Button is Pressed
  async function sendInfo() {
    // Initialize User object with typed information
    let userToCreate: User = {
      username: username,
      password: password,
      email: email,
      phoneNumber: phoneNumber,
    };

    // POST request to API with user info, set headers to JSON, and retrieve the User back
    let userReturned = await axios
      .post("http://localhost:8080/users", JSON.stringify(userToCreate), {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((response) => response.data);

    console.log(userReturned);

    // Initialize Instrument object with selected information
    let instrumentForUser: Instrument = {
      instrumentID: userReturned.userID, // Assign ID for DB mapping
      instrumentName: instrument,
      confidence: confidence,
    };

    // POST request to API with instrument info, set JSON header
    await axios
      .post(
        "http://localhost:8080/instruments/" + instrumentForUser.instrumentID,
        JSON.stringify(instrumentForUser),
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then((response) => response.data)
      .then((data) => console.log(data));

    // Check response here, need a check for response status to update singUpSuccess state variable

    // State Variable for Success of Sign Up
    setSignUpSuccess(true);
  }

  // What to show
  // If sign up was a succes -> go to login page, otherwise show the sign up form
  return signUpSuccess ? (
    <Navigate to="/login" />
  ) : (
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
        {/* <div className="topBox">
            
            <div className="homeText">BandCat Instruments - Login</div>
          </div>
     */}
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
                value={username}
                onChange={changeUsername}
              />
              <br /><br />

              {/* Password*/}
              <label>
                Password:<span> </span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={changePassword}
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
                value={email}
                onChange={changeEmail}
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
                value={phoneNumber}
                onChange={changePhoneNumber}
              />
              <br /><br />

              {/* Instrument Selector*/}
              <label>
                Instrument:<span> </span>
              </label>
              <select
                id="instrument_name"
                value={instrument}
                onChange={changeInstrument}
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
              <select id="confidence" value={confidence} onChange={changeConfidence}>
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

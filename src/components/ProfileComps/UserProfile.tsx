import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import User from "../model/User";
import background from "./KUBU.png";
import ShowProf from "./ShowProf";

// Props to update the current user
interface Props {
    currentUser: User | null;
    setCurrentUser: any
}

// Function to handle the login process
export default function UserProfile({ currentUser, setCurrentUser }: Props) {
    function logout(){
        setCurrentUser = null;
        window.location.href = '/login'

        }

    return currentUser ? (<>
        <div className="backgroundColor">
            <img className="bandCat" src={require('../../pics/KUBU.png')}></img>
            <div className="center">
                <br></br>
                <br></br>
                <div className="topBox">

                    <div className="homeText">{currentUser.username} - User Profile</div>
                </div>
                <br></br>
                <br></br>
                <div className="historyBox">

                    <div style={{ margin: '10px 0px' }}>

                        {currentUser ? <ShowProf user={currentUser} /> : null}


                        <Link to={"/search"}>
                            <button type="button">Search</button>
                        </Link>

                        {/* Logout Button */}
                        <button type="button" onClick={logout}  >Logout</button>
                    </div>


                </div>
            </div>
            <img className="bottomCorner" src={require('../../pics/bottomCorner.png')}></img>
        </div>

    </>) : <Navigate to="/login" />;
}
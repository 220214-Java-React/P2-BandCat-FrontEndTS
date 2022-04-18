import { Navigate, Link } from "react-router-dom";
import InstrumentOptions from "../model/InstrumentOptions";
import User from "../model/User";
import { useEffect, useState } from "react";
import ByUsername from "./ByUsername";
import ByInstrument from "./ByInstrument";
import Instrument from "../model/Instrument";
import axios from "axios";
import ShowUsers from "./ShowUsers";
import { baseURL } from "../URL";


// Interface concerning currentUser state from App.tsx
interface Props {
    currentUser: User | null;
    setCurrentUser: any
}

export default function Search({ currentUser, setCurrentUser }: Props) {
    // Logout User
    function logout() {
        setCurrentUser(null);
        <Navigate to='/login' />
    }

    // Search criteria
    const [searchCriteria, setSearchCriteria] = useState(0);

    // Username to search by
    const [usernameToSearch, setUsernameToSearch] = useState('');

    // Instrument to search by
    const [instrumentToSearch, setInstrumentToSearch] = useState<Instrument>(
        {
            instrumentName: InstrumentOptions.BASS,
            confidence: 5
        }
    );

    // List of Users that were found from DB
    const [usersFound, setUsersFound] = useState<User[] | null[]>([]);

    // Hooks to keep track of state
    useEffect(() => console.log(usersFound), [usersFound]);
    useEffect(() => console.log(instrumentToSearch), [instrumentToSearch]);

    // Dynamically update usersFound during input
    useEffect(() => { search() }, [usernameToSearch]);

    // Changes search criteria
    function changeSearch() {
        // Change to By Instrument
        if (searchCriteria == 0) {
            setUsersFound([]);
            setUsernameToSearch('');
            setSearchCriteria(1);
        }
        else {
            // Change to By Username
            setUsersFound([]);
            setUsernameToSearch('');
            setSearchCriteria(0);
        }
    }

    // Clears Username text box to reset the search
    function clearUsername() {
        setUsernameToSearch('');
    }

    // When search button is pressed
    async function search() {
        // Reset the Users found
        setUsersFound([]);

        // Axios request for users using usernameToSearch
        switch (searchCriteria) {
            // By Username
            case 0:
                if (usernameToSearch) {
                    // axios for username
                    let foundUser = await baseURL.get("/users/byUsername/" + usernameToSearch)
                        .then((response) => response.data)
                        .catch(() => {
                            alert("Something went wrong while Searching by Username. Try again");
                            return;
                        });

                    // If a User was found
                    if (foundUser) {
                        setUsersFound(usersFound => [...usersFound, foundUser]); // Set array of found Users
                    }
                }
                break;

            // By Instrument
            case 1:

                if (!(instrumentToSearch.confidence == 0 && instrumentToSearch.instrumentName == InstrumentOptions.NONE)) {
                    // axios for instrument
                    let foundUsers = await baseURL.post
                        (
                            "/instruments/findUsers",
                            JSON.stringify(instrumentToSearch),
                            {
                                headers:
                                {
                                    "Content-Type": "application/json;charset=UTF-8",
                                },
                            }
                        )
                        .then((response) => response.data)
                        .catch(() => {
                            alert("Something went wrong while Searching by Instrument. Try again");
                            return;
                        });

                    if (foundUsers) {
                        setUsersFound(foundUsers);
                    }
                }
                break;
        }

    }

    // Contain functionality 
    function chooseSearch() {
        return (
            <>
                {/* Author: Christian | style setup */}
                <div className="searchBackgroundColor">
                    <img className="bandCat" src={require('../../pics/KUBU.png')}></img>
                    <div className="center">

                        <br></br>
                        <br></br>
                        <div className="topBox">

                            <div className="homeText">BandCat Instruments - Search</div>
                        </div>
                        <br></br>
                        <br></br>
                    </div>

                    <div className="searchBox">
                        <div className="bodyText">
                            <form style={{ margin: '10px 0px' }}>
                                {/* Search Criteria Selection */}
                                <label>
                                    Criteria:<span> </span>

                                </label>
                                <select name="search" onChange={changeSearch}>
                                    <option value={0}>By Username</option>

                                    <option value={1}>By Instrument</option>
                                </select>
                                <br /><br />

                                {/* Conditional render based search criteria => if By Username, show ByUsername component, otherwise, show the ByInstrument component */}
                                {searchCriteria == 0 ?
                                    <ByUsername usernameToSearch={usernameToSearch} setUsernameToSearch={setUsernameToSearch} /> :
                                    <ByInstrument instrumentToSearch={instrumentToSearch} setInstrumentToSearch={setInstrumentToSearch} />}

                                <br />
                                {/* Conditional render based on if users were found => if they were, show each one's info, otherwise, don't */}
                                {usersFound ?
                                    (<div>
                                        {usersFound.map((user) => (<ShowUsers user={user} key="{user}" />))}

                                    </div>) : null}

                            </form>

                            {/* Clear Button to reset Username Search */}
                            {usernameToSearch ? (<button type="button" onClick={clearUsername}>Clear</button>) : null}
                            <br />
                            {/* Search Button */}
                            {searchCriteria == 1 ? <button type="button" onClick={search}>Search</button> : null}
                            <br /><br />
                            <Link to={"/userProfile"}>
                                <button type="button">My Profile</button>
                            </Link>
                            <br /><br />
                            <button type="button" onClick={logout}  >Logout</button>
                        </div>
                        <img className="transparentLogo" src={require('../../pics/instrumentLogo.png')}></img>

                    </div>


                    <img className="bottomCorner" src={require('../../pics/bottomCorner.png')}></img>

                </div>
            </>
        );
    }


    // If there is not a User logged in, go to login page, otherwise allow searching
    return !currentUser ? (<Navigate to={"/login"} />) : (chooseSearch());
}
import { Navigate, Link } from "react-router-dom";
import InstrumentOptions from "../model/InstrumentOptions";
import User from "../model/User";
import {useEffect, useState} from "react";
import ByUsername from "./ByUsername";
import ByInstrument from "./ByInstrument";
import Instrument from "../model/Instrument";
import axios from "axios";
import ShowUsers from "./ShowUsers";


// Interface concerning currentUser state from App.tsx
interface Props
{
  currentUser: User | null;
  setCurrentUser: any
}

export default function Search({currentUser, setCurrentUser}: Props)
{
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
    useEffect(() => {search()}, [usernameToSearch]);

    // Changes search criteria
    function changeSearch()
    {
        if (searchCriteria == 0)
        {
            setUsersFound([]);
            setUsernameToSearch('');
            setSearchCriteria(1);
        }
        else 
        {
            setUsersFound([]);
            setUsernameToSearch('');
            setSearchCriteria(0);
        }
    }


    // When search button is pressed
    async function search()
    {
        setUsersFound([]);
        // Axios request for users using usernameToSearch
        switch(searchCriteria)
        {
            case 0:
                if (usernameToSearch)
                {
                    // axios for username
                    let foundUser = await axios.get("http://localhost:8080/users/byUsername/" + usernameToSearch)
                    .then((response) => response.data);

                    setUsersFound(usersFound => [...usersFound, foundUser]);
                }

                break;

                // NEEDS WORK ↓↓↓↓
            case 1:

                if (!(instrumentToSearch.confidence == 0 && instrumentToSearch.instrumentName == InstrumentOptions.NONE))
                {
                    // axios for instrument
                    let foundUsers = await axios.post("http://localhost:8080/instruments/findUsers",
                    JSON.stringify(instrumentToSearch),
                    {
                      headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                      },
                    }
                  )
                    .then((response) => response.data);
    
                    setUsersFound(foundUsers);
                }

                break;
        }
    }

    // Contain functionality 
    function chooseSearch()
    {
        return (
        <>
            {/* Search Criteria Selection */}
            <label>
                Criteria:<span> </span>
            </label>
            <select name="search" onChange={changeSearch}>
                <option value={0}>By Username</option>
                <option value={1}>By Instrument</option>
            </select>
            <br />

            {/* Conditional render based search criteria => if By Username, show ByUsername component, otherwise, show the ByInstrument component */}
            {searchCriteria == 0 ? 
            <ByUsername usernameToSearch={usernameToSearch} setUsernameToSearch={setUsernameToSearch}/>: 
            <ByInstrument instrumentToSearch={instrumentToSearch} setInstrumentToSearch={setInstrumentToSearch}/>}

            {/* Conditional render based on if users were found => if they were, show each one's info, otherwise, don't */}
            {usersFound ? 
            (<div>
                {usersFound.map((user) => (<ShowUsers user={user} key="{user}" />))}
            </div>): null}

            {/* Search Button */}
            <button type="button" onClick={search}>Search</button>

            <Link to={"/userProfile"}>
                <button type="button">User Profile</button>
            </Link>
        </>
        );
    }


    // If there is not a User logged in, go to login page, otherwise allow searching
    return !currentUser ? (<Navigate to={"/login"}/>) : (chooseSearch());
}
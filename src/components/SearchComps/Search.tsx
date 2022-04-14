import { Navigate } from "react-router-dom";
import InstrumentOptions from "../model/InstrumentOptions";
import User from "../model/User";
import {useEffect, useState} from "react";
import ByUsername from "./ByUsername";
import ByInstrument from "./ByInstrument";
import Instrument from "../model/Instrument";
import axios from "axios";

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

    const [instrumentToSearch, setInstrumentToSearch] = useState<Instrument>(
        {
            instrumentName: InstrumentOptions.BASS,
            confidence: 5
        }
    );

    useEffect(() => console.log(instrumentToSearch), [instrumentToSearch]);

    // Changes search criteria
    function changeSearch()
    {
        if (searchCriteria == 0)
            setSearchCriteria(1);
        else setSearchCriteria(0);
    }

    // When search button is pressed
    function search()
    {
        // Axios request for users using usernameToSearch
        switch(searchCriteria)
        {
            case 0:
                // axios for username
                let userFound = axios.get("http://localhost:8080/users/byUsername/" + usernameToSearch)
                .then((response) => response.data)
                .then(data => console.log(data));
                break;

            case 1:
                // axios for instrument
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

            <button type="button" onClick={search}>Search</button>
            
        </>
        );
    }


    // If there is not a User logged in, go to login page, otherwise allow searching
    return !currentUser ? (<Navigate to={"/login"}/>) : (chooseSearch());
}
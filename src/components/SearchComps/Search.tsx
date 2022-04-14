import { Navigate } from "react-router-dom";
import InstrumentOptions from "../model/InstrumentOptions";
import User from "../model/User";
import {useEffect, useState} from "react";
import ByUsername from "./ByUsername";
import ByInstrument from "./ByInstrument";

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
            <ByInstrument />}

            <button type="button" onClick={search}>Search</button>
            
        </>
        );
    }


    // If there is not a User logged in, go to login page, otherwise allow searching
    return !currentUser ? (<Navigate to={"/login"}/>) : (chooseSearch());
}
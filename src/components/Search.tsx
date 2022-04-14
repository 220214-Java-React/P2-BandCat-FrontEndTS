import { Navigate } from "react-router-dom";
import User from "./model/User";

interface Props
{
  currentUser: User | null;
  setCurrentUser: any
}

export default function Search({currentUser, setCurrentUser}: Props)
{

    return !currentUser ? (<Navigate to={"/login"}/>) : (
        <>
        <div>
            <h1>Search Buttons to switch between Search Options or Profile Page?</h1>
        </div>
        </>
    );
}
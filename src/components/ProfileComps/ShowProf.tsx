import Instrument from "../model/Instrument";
import User from "../model/User";

interface Props
{
    user: User | null
}

// Shows User's info
export default function ShowProf({user} : Props)
{
    return (
    <>
    <div>
        {user?.email}                       
        <br></br>
        {user?.phoneNumber}                 
        <br></br>
        {user?.instrument?.instrumentName}  
        <br></br>
        {user?.instrument?.confidence}
    </div>
    </>);
}
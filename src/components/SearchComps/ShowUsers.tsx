import Instrument from "../model/Instrument";
import User from "../model/User";

interface Props
{
    user: User | null
}

// Shows User's info
export default function ShowUsers({user} : Props)
{
    return (
    <>
    <div>
        <b>
            Username: {user?.username}
            <br/>
            Instrument: {user?.instrument?.instrumentName}
            <br/>
            Confidence Level: {user?.instrument?.confidence}
        </b>
            <br/>
            Email: {user?.email}
            <br/>
            Phone: {user?.phoneNumber}
    </div>
    </>);
}
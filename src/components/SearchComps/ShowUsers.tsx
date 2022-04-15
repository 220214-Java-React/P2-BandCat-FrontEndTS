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
        {user?.username}                    <span>     </span>
        {user?.instrument?.instrumentName}  <span>     </span>
        {user?.instrument?.confidence}
    </div>
    </>);
}
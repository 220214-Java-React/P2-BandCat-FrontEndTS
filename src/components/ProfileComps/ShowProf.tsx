import Instrument from "../model/Instrument";
import User from "../model/User";

interface Props {
    user: User | null
}

// Shows User's info
export default function ShowProf({ user }: Props) {
    return (
        <>
            <div>
                <h3>Email: {user?.email}</h3>

                <h3>Phone Number: {user?.phoneNumber}</h3>

                <h3>Instrument Name: {user?.instrument?.instrumentName}</h3>

                <h3>Confidence Level: {user?.instrument?.confidence}</h3>

                <br />
            </div>
        </>);
}
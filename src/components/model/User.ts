import Instrument from "./Instrument";

export default interface User
{
    userID?: number;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    instrument?: Instrument;
}

// export default class User
// {
//     id: number;
//     username: string;
//     password: string;
//     email: string;
//     phoneNumber: string;
//     instrument: Instrument;

//     constructor(id: number, username: string, password: string, email: string, phoneNumber: string, instrument: Instrument)
//     {
//         this.id = id;
//         this.username = username;
//         this.password = password;
//         this.email = email;
//         this.phoneNumber = phoneNumber;
//         this.instrument = instrument;
//     }
// }
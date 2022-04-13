import User from "./User";
import InstrumentOptions from "./InstrumentOptions";

export default interface Instrument
{
    instrumentID?: number;
    instrumentName: InstrumentOptions;
    confidence: number;
    user?: User;
}

// export default class Instrument
// {
//     instrumentID: number;
//     instrumentName: InstrumentOptions;
//     confidence: number;
//     user: User;

//     constructor(instrumentID: number, instrumentName: InstrumentOptions, confidence: number, user: User)
//     {
//         this.instrumentID = instrumentID;
//         this.instrumentName = instrumentName;
//         this.confidence = confidence;
//         this.user = user;
//     }
// }
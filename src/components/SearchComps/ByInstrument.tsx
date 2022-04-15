import Instrument from "../model/Instrument";
import InstrumentOptions from "../model/InstrumentOptions";

// Properties for the Instrument being searched
interface Props
{
  instrumentToSearch: Instrument | null;
  setInstrumentToSearch: any;
}

// Shows the Instrument search component
export default function ByInstrument({instrumentToSearch, setInstrumentToSearch} : Props)
{
    // Changes Instrument
    function changeSearch(e : any)
    {
        setInstrumentToSearch({
            ...instrumentToSearch,
            [e.target.name]: e.target.value});
    }

    return (
        <div>
            {/* Instrument Selector*/}
            <label>
                Instrument:<span> </span>
            </label>
            <select
            name="instrumentName"
            value={instrumentToSearch?.instrumentName}
            onChange={changeSearch}
            >
                <option value={InstrumentOptions.NONE}>All</option>
                <option value={InstrumentOptions.BASS}>Bass</option>
                <option value={InstrumentOptions.CLARINET}>Clarinet</option>
                <option value={InstrumentOptions.DRUMS}>Drums</option>
                <option value={InstrumentOptions.GUITAR}>Guitar</option>
                <option value={InstrumentOptions.HARMONICA}>Harmonica</option>
                <option value={InstrumentOptions.PIANO}>Piano</option>
                <option value={InstrumentOptions.SAXOPHONE}>Saxophone</option>
                <option value={InstrumentOptions.SINGER}>Singer</option>
                <option value={InstrumentOptions.TRUMPET}>Trumpet</option>
            </select>
            <br />

            {/* Confidence Selector*/}
            <label>
                Confidence:<span> </span>
            </label>
            <select 
            name="confidence"
            value={instrumentToSearch?.confidence}
            onChange={changeSearch}
             >
                <option value={0}>All</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
            </select>
            <br />
        </div>
    );
}
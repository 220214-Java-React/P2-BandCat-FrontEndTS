// Props for Username to search by
interface Props
{
  usernameToSearch: string | null;
  setUsernameToSearch: any
}

// Shows the Username searching component
export default function ByUsername({usernameToSearch, setUsernameToSearch} : Props)
{
    // Changes username being searched
    function changeSearch(e : any)
    {
        setUsernameToSearch(e.target.value);
    }

    return (
        <div>
            {/* Username Field*/}
            <label>
                Username:<span> </span>
            </label>
            <input type="text" placeholder="Username" value={usernameToSearch ? usernameToSearch : ''} onChange={changeSearch} />
        </div>
    );
}
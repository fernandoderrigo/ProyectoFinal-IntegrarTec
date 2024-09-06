import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from '@fortawesome/react-fontawesome';

export default function SearchBar(){
    return (
      <>
        <form action="">
          <label htmlFor="">
            <input type="text" />
          </label>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </form>
      </>
    );
}
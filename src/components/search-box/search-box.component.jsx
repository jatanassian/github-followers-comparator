import { useState } from "react";

import "./search-box.styles.css";

const defaultSearchFields = {
  firstUser: "",
  secondUser: "",
};

const SearchBox = ({ handleSubmit }) => {
  const [searchFields, setSearchFields] = useState(defaultSearchFields);
  const { firstUser, secondUser } = searchFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchFields({ ...searchFields, [name]: value });
  };

  return (
    <form onSubmit={(event) => handleSubmit(event, searchFields)}>
      <div className="input-group">
        <div className="form-input">
          <input
            type="search"
            name="firstUser"
            required
            value={firstUser}
            onChange={handleChange}
          />
          <label>First GitHub user</label>
        </div>

        <div className="form-input">
          <input
            type="search"
            name="secondUser"
            required
            value={secondUser}
            onChange={handleChange}
          />
          <label>Second GitHub user</label>
        </div>
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBox;

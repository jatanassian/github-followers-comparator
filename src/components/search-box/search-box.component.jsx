import { useState } from "react";

import "./search-box.styles.css";

const defaultSearchFields = {
  firstUser: "",
  secondUser: "",
};

const SearchBox = ({ handleSubmit, loading }) => {
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
            placeholder="Type a username"
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
            placeholder="Type a username"
            required
            value={secondUser}
            onChange={handleChange}
          />
          <label>Second GitHub user</label>
        </div>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBox;

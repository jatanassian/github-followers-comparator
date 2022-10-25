import { useState } from "react";

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
      <input
        type="search"
        name="firstUser"
        required
        value={firstUser}
        onChange={handleChange}
      />
      <input
        type="search"
        name="secondUser"
        required
        value={secondUser}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBox;

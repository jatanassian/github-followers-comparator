import { useState } from "react";

const defaultSearchFields = {
  firstUser: "",
  secondUser: "",
};

const SearchBox = () => {
  const [searchFields, setSearchFields] = useState(defaultSearchFields);
  const { firstUser, secondUser } = searchFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchFields({ ...searchFields, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(searchFields);
  };

  return (
    <form>
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
      <button type="submit" onClick={handleSubmit}>
        Search
      </button>
    </form>
  );
};

export default SearchBox;

import SearchBox from "../search-box/search-box.component";

import "./header.styles.css";

const Header = ({ handleSubmit }) => {
  return (
    <div className="header-container">
      <h1 class="app-title">GitHub Finder</h1>
      <h4>
        Please enter two GitHub users to find out which followers they have in
        common
      </h4>
      <SearchBox handleSubmit={handleSubmit} />
    </div>
  );
};

export default Header;

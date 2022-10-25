import { useState, useEffect } from "react";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

function App() {
  const [firstUserFollowers, setFirstUserFollowers] = useState([]);
  const [secondUserFollowers, setSecondUserFollowers] = useState([]);
  const [commonFollowers, setCommonFollowers] = useState([]);

  useEffect(() => {
    console.log(firstUserFollowers);
    console.log(secondUserFollowers);
    const followers = firstUserFollowers.filter((follower1) => {
      return secondUserFollowers.find(
        (follower2) => follower1.id === follower2.id
      );
    });
    console.log(followers);
    setCommonFollowers(followers);
  }, [firstUserFollowers, secondUserFollowers]);

  const handleSubmit = async (event, searchFields) => {
    const { firstUser, secondUser } = searchFields;
    event.preventDefault();

    const firstFollowers = await getFollowers(firstUser);
    const secondFollowers = await getFollowers(secondUser);
    setFirstUserFollowers(firstFollowers);
    setSecondUserFollowers(secondFollowers);
  };

  const getFollowers = async (username) => {
    try {
      const res = await fetch(
        `https://api.github.com/users/${username}/followers`
      );
      const followers = await res.json();
      return followers;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>Please enter two GitHub users</h1>
      <SearchBox handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;

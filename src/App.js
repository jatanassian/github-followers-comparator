import { useState, useEffect } from "react";
import SearchBox from "./components/search-box/search-box.component";
import FollowersList from "./components/followers-list/followers-list.component";
import "./App.css";

import { parseLinkHeader } from "@web3-storage/parse-link-header";

function App() {
  const [firstUserFollowers, setFirstUserFollowers] = useState([]);
  const [secondUserFollowers, setSecondUserFollowers] = useState([]);
  const [commonFollowers, setCommonFollowers] = useState(null);

  // Create array of followers in common when followers arrays are updated
  useEffect(() => {
    const followers = firstUserFollowers.filter((follower1) => {
      return secondUserFollowers.find(
        (follower2) => follower1.id === follower2.id
      );
    });
    setCommonFollowers(followers);
  }, [firstUserFollowers, secondUserFollowers]);

  const handleSubmit = async (event, searchFields) => {
    setCommonFollowers(null);
    const { firstUser, secondUser } = searchFields;
    event.preventDefault();

    const firstFollowers = await getFollowers(firstUser);
    const secondFollowers = await getFollowers(secondUser);
    setFirstUserFollowers(firstFollowers);
    setSecondUserFollowers(secondFollowers);
  };

  const getFollowers = async (username, url = "") => {
    try {
      const res = await fetch(
        url || `https://api.github.com/users/${username}/followers?per_page=100`
      );

      const followers = await res.json();
      const linkHeader = res.headers.get("Link");

      if (linkHeader) {
        const parsed = parseLinkHeader(linkHeader);
        // Get followers of next page if next exists
        if (parsed.next?.url) {
          const nextFollowers = await getFollowers(username, parsed.next.url);
          followers.push(...nextFollowers);
        }
      }
      return followers;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>GitHub Finder</h1>
      <h3>
        Please enter two GitHub users to find out which followers they have in
        common
      </h3>
      <SearchBox handleSubmit={handleSubmit} />
      {commonFollowers && commonFollowers.length === 0 ? (
        <p>
          Those two users don't share any follower in common. <br /> Try with
          other users!
        </p>
      ) : (
        <FollowersList followers={commonFollowers} />
      )}
    </div>
  );
}

export default App;

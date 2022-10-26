import { useState } from "react";
import Header from "./components/header/header.component";
import FollowersList from "./components/followers-list/followers-list.component";
import "./App.css";

import { parseLinkHeader } from "@web3-storage/parse-link-header";

function App() {
  const [commonFollowers, setCommonFollowers] = useState(null);

  // Return an array of common followers
  const findCommonFollowers = (followers1, followers2) => {
    const followersInCommon = followers1.filter((follower1) => {
      return followers2.find((follower2) => follower1.id === follower2.id);
    });

    return followersInCommon;
  };

  // Fetch followers recursively to handle pagination
  const getFollowers = async (username, url = "") => {
    const res = await fetch(
      url || `https://api.github.com/users/${username}/followers?per_page=100`
    );

    if (res.status === 404) {
      throw new Error(`The user ${username} does not exist.`);
    }

    const followers = await res.json();
    const linkHeader = res.headers.get("Link");

    if (linkHeader) {
      const parsed = parseLinkHeader(linkHeader);
      if (parsed.next?.url) {
        const nextFollowers = await getFollowers(username, parsed.next.url);
        followers.push(...nextFollowers);
      }
    }
    return followers;
  };

  // Get followers, find common followers and set them in the state
  const handleSubmit = async (event, searchFields) => {
    setCommonFollowers(null);
    const { firstUser, secondUser } = searchFields;
    event.preventDefault();

    try {
      const firstFollowers = await getFollowers(firstUser);
      const secondFollowers = await getFollowers(secondUser);
      const followersInCommon = findCommonFollowers(
        firstFollowers,
        secondFollowers
      );
      setCommonFollowers(followersInCommon);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="App">
      <Header handleSubmit={handleSubmit} />
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

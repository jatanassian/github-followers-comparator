import Follower from "../follower/follower.component";
import "./followers-list.styles.css";

const FollowersList = ({ followers }) => (
  <div className="followers-list">
    {followers &&
      followers.map((follower) => (
        <Follower follower={follower} key={follower.id} />
      ))}
  </div>
);

export default FollowersList;

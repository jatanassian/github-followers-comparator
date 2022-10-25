import Follower from "../follower/follower.component";

const FollowersList = ({ followers }) => (
  <div>
    {followers.map((follower) => (
      <Follower follower={follower} key={follower.id} />
    ))}
  </div>
);

export default FollowersList;

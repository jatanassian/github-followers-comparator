import "./follower.styles.css";

const Follower = ({ follower: { login, avatar_url } }) => {
  return (
    <div className="card">
      <img src={avatar_url} className="avatar" alt="" />
      <h3>{login}</h3>
    </div>
  );
};

export default Follower;

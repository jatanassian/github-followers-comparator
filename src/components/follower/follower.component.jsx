import "./follower.styles.css";

const Follower = ({ follower: { login, avatar_url } }) => {
  return (
    <div className="card">
      <img src={avatar_url} className="avatar" alt="" />
      <a
        href={`https://github.com/${login}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h3>{login}</h3>
      </a>
    </div>
  );
};

export default Follower;

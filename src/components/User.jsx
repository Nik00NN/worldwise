import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../contexts/FakeAuthenticationContext";
import styles from "./User.module.css";

const User = () => {
  const { user, logout } = useAuthentication();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default User;

import { firebaseAuth } from "../services/Firebase";
import { AuthContext } from "../AuthContext";
import { auth } from "../services/Auth";
import * as React from "react";

import "../styles/nav.css";

const handleSignOut = () => {
  auth.removeAccessToken();
  firebaseAuth().signOut();
};

const Navbar = () => {
  const user = React.useContext(AuthContext);

  if (user) {
    return (
      <nav className="nav">
        <div className="user-info">
          <img
            src={user.photoURL || ""}
            className="user-avatar"
            alt={user.displayName || "user"}
          />
          <a href="#" onClick={handleSignOut}>
            Sign Out
          </a>
        </div>
      </nav>
    );
  } else {
    return null;
  }
};

export default Navbar;

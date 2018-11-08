import { firebaseAuth } from "src/services/Firebase";
import { AuthContext } from "src/AuthContext";
import { auth } from "src/services/Auth";
import * as React from "react";

import "../styles/nav.css";

class Navbar extends React.Component<{}, {}> {
  render() {
    return (
      <AuthContext.Consumer>
        {user => {
          if (user) {
            return (
              <nav className="nav">
                <div className="user-info">
                  <img
                    src={user.photoURL || ""}
                    className="user-avatar"
                    alt={user.displayName || "user"}
                  />
                  <a
                    href="#"
                    onClick={() => {
                      firebaseAuth().signOut();
                      auth.removeAccessToken();
                    }}
                  >
                    Sign Out
                  </a>
                </div>
              </nav>
            );
          } else {
            return null;
          }
        }}
      </AuthContext.Consumer>
    );
  }
}

export default Navbar;

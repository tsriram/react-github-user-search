import { AuthContext } from "src/AuthContext";
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
                {user.displayName}
                <img src={user.photoURL || ""} className="avatar" />
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

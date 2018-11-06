import { BrowserRouter as Router, Route } from "react-router-dom";
import UserSearchPage from "./components/UserSearchPage";
import PrivateRoute from "./components/PrivateRoute";
import { firebaseAuth } from "./services/Firebase";
import { AuthContext } from "./AuthContext";
import Login from "./components/Login";
import * as React from "react";

interface AppState {
  readonly user: firebase.User | null;
  readonly loading: boolean;
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
  }

  componentDidMount() {
    firebaseAuth().onAuthStateChanged(user => {
      this.setState({
        loading: false,
        user
      });
    });
  }

  public render() {
    return this.state.loading ? (
      <h3 className="loading">Loading...</h3>
    ) : (
      <AuthContext.Provider value={this.state.user}>
        <Router>
          <div>
            <PrivateRoute exact path="/" component={UserSearchPage} />
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </AuthContext.Provider>
    );
  }
}

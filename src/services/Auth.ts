import * as auth0 from "auth0-js";
// import history from "./history";

class Auth {
  private static instance: Auth;
  private auth0 = new auth0.WebAuth({
    domain: "tsriram.auth0.com",
    clientID: "xX6Zw8YxPkm3dWwtRn5ObBvEIud3ed2k",
    redirectUri: "http://localhost:3000/callback",
    responseType: "token id_token",
    scope: "openid"
  });

  static getInstance = () => {
    if (!Auth.instance) {
      Auth.instance = new Auth();
    }
    return Auth.instance;
  };

  login() {
    this.auth0.authorize({ connection: "github" });
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        // history.replace("/");
      } else if (err) {
        // history.replace("/");
        console.log(err);
      }
    });
  }

  setSession(authResult: any) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    // navigate to the  route
    // history.replace("/");
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    // navigate to the  route
    // history.replace("/");
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAtToken = localStorage.getItem("expires_at");
    if (expiresAtToken) {
      const expiresAt = JSON.parse(expiresAtToken);
      return new Date().getTime() < expiresAt;
    } else {
      return false;
    }
  }
}

const auth = Auth.getInstance();

export { auth };

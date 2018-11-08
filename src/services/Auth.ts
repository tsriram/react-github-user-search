class Auth {
  private static instance: Auth;

  static getInstance = () => {
    if (!Auth.instance) {
      Auth.instance = new Auth();
    }
    return Auth.instance;
  };

  removeAccessToken() {
    localStorage.removeItem("access_token")
  }

  setAccessToken(token: string) {
    localStorage.setItem("access_token", token);
  }

  getAccessToken(): string {
    return localStorage.getItem("access_token") || "";
  }

  isAuthenticated() {
    return Boolean(localStorage.getItem("access_token"));
  }
}

const auth = Auth.getInstance();

export { auth };

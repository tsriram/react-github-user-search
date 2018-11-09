class Auth {
  private static instance: Auth;
  private static ACCESS_TOKEN = "ghus:access_token";

  static getInstance = () => {
    if (!Auth.instance) {
      Auth.instance = new Auth();
    }
    return Auth.instance;
  };

  removeAccessToken() {
    localStorage.removeItem(Auth.ACCESS_TOKEN);
  }

  setAccessToken(token: string) {
    localStorage.setItem(Auth.ACCESS_TOKEN, token);
  }

  getAccessToken(): string {
    return localStorage.getItem(Auth.ACCESS_TOKEN) || "";
  }
}

const auth = Auth.getInstance();

export { auth };

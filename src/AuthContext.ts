import * as React from "react";

export const AuthContext = React.createContext<firebase.User | null>(null);

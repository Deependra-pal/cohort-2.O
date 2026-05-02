import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes.jsx";
import "./feature/shared/style/global.scss"
import { AuthProvider } from "./feature/auth/auth.Context.jsx";

const App = () => {
 return ( <AuthProvider> 
    <RouterProvider router={router} />;
  </AuthProvider>
 )
};

export default App;

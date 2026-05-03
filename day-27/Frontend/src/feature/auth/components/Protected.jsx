import React from "react";
import { useAuth } from "../hooks/useAuth";
import {  useNavigate } from "react-router";

const Protected = ({ children }) => {

  const navigate = useNavigate();

  const { user, loading } = useAuth();

  if (loading) {
    return <h1>loading...</h1>
  }

  if (!user){
    return <Navigate to="login" />
  }

  return children
};

export default Protected

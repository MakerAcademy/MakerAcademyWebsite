import { COMMON_CONTEXT_STORAGE } from "@constants";
import React, { createContext, useEffect, useMemo, useState } from "react";

// Create Context Object
export const CommonContext = createContext({});

// Create a provider for components to consume and subscribe to changes
export const CommonContextProvider = ({ children }) => {
  const [state, setState] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useMemo(() => {
    if (typeof window !== "undefined") {
      const _data = window.localStorage.getItem(COMMON_CONTEXT_STORAGE);
      const parsed = _data ? JSON.parse(_data) : {};
      setState((old) => ({ ...old, ...parsed }));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !isLoading) {
      const parsed = JSON.stringify(state);
      window.localStorage.setItem(COMMON_CONTEXT_STORAGE, parsed);
    }
  }, [state, isLoading]);

  const setCommonValues = (data = {}) => {
    setState((old) => ({
      ...old,
      ...data,
    }));
  };

  const handleDrawerToggle = (name) => {
    setCommonValues({ [name]: !state[name] });
  };

  return (
    <CommonContext.Provider
      value={{ commonState: state, setCommonValues, handleDrawerToggle }}
    >
      {children}
    </CommonContext.Provider>
  );
};

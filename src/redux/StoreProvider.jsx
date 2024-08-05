"use client";
import React from "react";

import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store"; 

import { Provider } from "react-redux";
import Loader from '../components/Loader'

const StoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default StoreProvider;

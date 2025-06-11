"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

import { ResponseErrorAPI } from "../Interface/ResponseErrorAPI";

export type ErrorLoggerContextType = {
  log: ResponseErrorAPI | undefined;
  addLog: (res: ResponseErrorAPI) => void;
};

const ErrorLoggerContext = createContext<ErrorLoggerContextType | undefined>(
  undefined,
);

export const LogProvider = ({ children }: { children: ReactNode }) => {
  const [log, setLog] = useState<ResponseErrorAPI | undefined>();

  const addLog = (res: ResponseErrorAPI) => {
    const newLog: ResponseErrorAPI = {
      message: res?.message,
      statusCode: res?.statusCode,
      apiErrorMessage: res?.apiErrorMessage,
      timestamp: new Date().toLocaleString(),
    };

    setLog(newLog);
  };

  const value = useMemo(() => ({ log, addLog }), [log]);

  return (
    <ErrorLoggerContext.Provider value={value}>
      {children}
    </ErrorLoggerContext.Provider>
  );
};

export const useErrorLogger = () => {
  const context = useContext(ErrorLoggerContext);

  if (!context) {
    throw new Error("useLog must be used within a LogProvider");
  }

  return context;
};

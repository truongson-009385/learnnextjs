"use client";

import { useErrorLogger } from "@/src/contexts/ErrorLoggerContext";

export default function Page() {
  const logger = useErrorLogger();

  const hanldeError = () => {
  };

  return (
    <div>
      Trang chủ
      <button onClick={hanldeError}>btn</button>
    </div>
  );
}

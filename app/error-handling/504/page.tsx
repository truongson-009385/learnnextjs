"use client";

import VkxButton from "@/components/vkx-button/vkx-button";
import { useErrorLogger } from "@/src/contexts/ErrorLoggerContext";
import { ResponseErrorAPI } from "@/src/Interface/ResponseErrorAPI";
import HttpUtils from "@/utils/http-util";

export default function Page() {
  const logger = useErrorLogger();

  async function fetchData() {
    try {
      await HttpUtils.getApi(
        "http://localhost:3000/api/error-handling/504",
        "GET",
        {},
        true,
        null,
      );
    } catch (e) {
      logger.addLog(e as ResponseErrorAPI);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Test error 504 <small className="text-sm">(timeout 3s)</small>
        </h1>
        <VkxButton
          className="w-full py-3 text-lg font-semibold"
          onClick={fetchData}
        >
          Lấy dữ liệu
        </VkxButton>
      </div>
    </div>
  );
}

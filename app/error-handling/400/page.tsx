"use client";
import HttpUtils from "@/utils/HttpUtils";

export default function Page() {
  async function handleSubmit() {
    await HttpUtils.create("/api/error-handling", { name: "John" });
  }

  return (
    <div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

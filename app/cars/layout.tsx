"use client";

import { ToastProvider } from "@heroui/react";

export default function VkxAccordionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToastProvider />
      {children}
    </>
  );
}

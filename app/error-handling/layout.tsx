"use client";

import VXKErrorPopup from "@/components/vkx-error-popup/vkx-error-popup";
import { ToastProvider } from "@heroui/react";

export default function VkxAccordionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToastProvider />
      <VXKErrorPopup />
      {children}
    </>
  );
}

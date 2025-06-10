"use client";

import VkxButton from "@/components/vkx-button/vkx-button";
import { VkxForm } from "@/components/vkx-form/vkx-form";

import { VkxInput } from "@/components/vkx-input";
import { VkxTextArea } from "@/components/vkx-text-area/vkx-text-area";

interface Props {
  params: { id: string };
}

export default function BlogDetailPage({ params }: Props) {
  const blog = params.id;

  return (
    <VkxForm className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <VkxInput name="title" className="w-full p-2 mb-4 border rounded" />
      <VkxTextArea
        name="content"
        className="w-full p-2 mb-4 border rounded h-32"
      />
      <VkxButton type="submit">Update</VkxButton>
    </VkxForm>
  );
}

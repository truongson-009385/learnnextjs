"use client";
import VkxButton from "@/components/vkx-button/vkx-button";
import { VkxGenericForm } from "@/components/vkx-form";
import { VkxInput } from "@/components/vkx-input";
import React from "react";

class Student {
  name?: string = undefined;
  email?: string = undefined;
}

export default function VkxGenericFormPage() {
  const [action, setAction] = React.useState("");
  return (
    <div>
      <h1 className="text-xl font-medium text-black dark:text-white mb-2">
        1. Form generic có kiểm soát (controlled)
      </h1>
      <VkxGenericForm<Student>
        type={Student}
        className="w-full max-w-xs flex flex-col gap-4"
        onReset={() => setAction("reset")}
        onSubmit={(e) => {
          setAction(`submit ${JSON.stringify(e)}`);
        }}
      >
        <VkxInput
          isRequired
          errorMessage="Please enter a valid username"
          label="Username"
          labelPlacement="outside"
          name="name"
          placeholder="Enter your username"
          type="text"
        />

        <VkxInput
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
        />

        <div className="flex gap-2">
          <VkxButton size="sm" color="primary" type="submit">
            Submit
          </VkxButton>
          <VkxButton size="sm" type="reset" variant="flat">
            Reset
          </VkxButton>
        </div>
        {action && (
          <div className="text-small text-default-500">
            Action: <code>{action}</code>
          </div>
        )}
      </VkxGenericForm>
    </div>
  );
}

"use client";

import React from "react";

import { VkxForm } from "@/components/vkx-form/vkx-form";
import { VkxInput } from "@/components/vkx-input/vkx-input";
import VkxButton from "@/components/vkx-button/vkx-button";
import { VkxPasswordInput } from "@/components/vkx-password-input/vkx-password-input";

class Employee {
  username?: string;
  password?: string;
}

class Student {
  score?: number;
}

export default function VkxFormPage() {
  const [submitted, setSubmitted] = React.useState({});
  const [action, setAction] = React.useState("");

  const [errors, setErrors] = React.useState({});

  return (
    <div className="flex w-full flex-col gap-8 p-6">
      <div>
        <h1 className="text-xl font-medium text-black dark:text-white mb-2">
          1. Form cơ bản
        </h1>
        <VkxForm
          className="flex flex-col gap-4 max-w-md"
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            const fromData = new FormData(e.currentTarget);
            const data = Object.fromEntries(fromData);

            setSubmitted(data);
            console.log(data);
          }}
        >
          <VkxInput
            isRequired
            errorMessage="Please enter a valid email"
            label="User name"
            labelPlacement="outside"
            name="userName"
            placeholder="Enter your email"
            type="text"
          />
          <VkxButton type="submit">Submit</VkxButton>
          {submitted && (
            <div className="text-small text-default-500">
              You submitted: <code>{JSON.stringify(submitted)}</code>
            </div>
          )}
        </VkxForm>
      </div>

      <div>
        <h1 className="text-xl font-medium text-black dark:text-white mb-2">
          2. Form có kiểm soát (controlled)
        </h1>
        <VkxForm
          className="w-full max-w-xs flex flex-col gap-4"
          onReset={() => setAction("reset")}
          onSubmit={(e) => {
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.currentTarget));

            setAction(`submit ${JSON.stringify(data)}`);
          }}
        >
          <VkxInput
            isRequired
            errorMessage="Please enter a valid username"
            label="Username"
            labelPlacement="outside"
            name="username"
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
        </VkxForm>
      </div>
      
      <div>
        <h1 className="text-xl font-medium text-black dark:text-white mb-2">
          3. Validation form
        </h1>
        <VkxForm
          className="w-full max-w-xs flex flex-col gap-4"
          validationErrors={errors}
          onReset={() => setAction("reset")}
          onSubmit={(e) => {
            e.preventDefault();
            
            const employee: Employee = Object.fromEntries(
              new FormData(e.currentTarget)
            );

            const student: Student = Object.fromEntries(
              new FormData(e.currentTarget),
            );

            console.log(employee);
            console.log(student);

            const result = callServer(employee);

            setErrors(result.errors);
          }}
        >
          <VkxInput
            isRequired
            // errorMessage="Please enter a valid username"
            label="Username"
            labelPlacement="outside" 
            name="username"
            placeholder="Enter your username"
            type="text"
          />
          <VkxInput
            isRequired
            // errorMessage="Please enter a valid username"
            label="Score"
            labelPlacement="outside"
            name="score"
            placeholder="Enter your score"
            type="text"
          />

          <VkxPasswordInput
            isRequired
            // errorMessage="Please re-enter a password"
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
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
        </VkxForm>
      </div>

      <div>
        <h1 className="text-xl font-medium text-black dark:text-white mb-2">
          4. Form với validation behavior aria
        </h1>
        <VkxForm
          className="flex flex-col gap-4 max-w-md"
          validationBehavior="aria"
          onSubmit={(e) => {
            e.preventDefault();
            const fromData = new FormData(e.currentTarget);
            const data = Object.fromEntries(fromData);

            setSubmitted(data);
            console.log(data);
          }}
        >
          <VkxInput
            isRequired
            label="Username"
            placeholder="Enter your username"
            type="username"
            validate={(value) => {
              if (value.length < 3) {
                return "Username must be at least 3 characters long";
              }

              return value === "admin" ? "Nice try!" : null;
            }}
          />
          <VkxButton type="submit">Submit</VkxButton>
        </VkxForm>
      </div>

      <div className="mt-5">
        <h1 className="text-2xl font-medium text-black dark:text-white mb-6">
          Tài liệu về các thuộc tính (Props)
        </h1>
        <h2 className="text-xl font-medium text-black dark:text-white mt-8 mb-4">
          VkxForm Props
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                  Thuộc tính
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                  Kiểu dữ liệu
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                  Mặc định
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                  Mô tả
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  children
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  ReactNode
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  -
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Nội dung của form (inputs, buttons, etc.)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  validationBehavior
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  "native" | "aria"
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  "native"
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Cơ chế validation (native HTML hoặc ARIA)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  validationErrors
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Record&lt;string, string | string[]&gt;
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  -
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Đối tượng chứa lỗi validation cho các field
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  action
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  string | FormHTMLAttributes["action"]
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  -
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  URL xử lý form submission
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  method
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  "get" | "post" | "dialog"
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  -
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Phương thức HTTP của form
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  autoComplete
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  "on" | "off"
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  -
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Bật/tắt gợi ý autocomplete của trình duyệt
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  className
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  string
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  ""
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Class CSS tùy chỉnh
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  style
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  CSSProperties
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  -
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Inline CSS styles
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function callServer(dat: any) {
  return {
    errors: {
      username: "Sorry, this username is taken.",
    },
  };
}

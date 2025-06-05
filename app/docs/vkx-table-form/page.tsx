
"use client";

import VkxButton from "@/components/vkx-button/vkx-button";
import { VkxDatePicker } from "@/components/vkx-date-picker/vkx-date-picker";
import { VkxForm } from "@/components/vkx-form/vkx-form";
import { VkxInput } from "@/components/vkx-input";
import { VkxNumberInput } from "@/components/vkx-number-input/vkx-number-input";
import { VkxSelect } from "@/components/vkx-select/vkx-select";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { parseDate } from "@internationalized/date";
import React from "react";
import { EnterpriseFormPage } from "./enterprise-form";
import { ReactHookFromTestPage } from "./react-hook-from-test";
import { MultipleFormPage } from "./multiple-form";

interface Student {
  name?: string;
  birthday?: Date;
  gender?: string;
  score?: number;
}

export default function VkxTableFormPage() {
  const [students, setStudents] = React.useState<Student[]>([]);
  const [email, setEmail] = React.useState("");
  const [submittedValue, submitted] = React.useState({});

  return (
    <div>
      <div className="mt-10">
        <h1 className="text-xl font-medium text-black dark:text-white mb-2">
          1. Form kết hợp với table validate trong form
        </h1>
        <VkxForm
          autoComplete="on"
          onSubmit={(e) => {
            e.preventDefault();
            // console.log(e.currentTarget);

            let student: Student = Object.fromEntries(
              new FormData(e.currentTarget)
            );
            // console.log(student);
            setStudents([...students, student]);
          }}
        >
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Họ và tên</TableColumn>
              <TableColumn>Ngày sinh</TableColumn>
              <TableColumn>Giới tính</TableColumn>
              <TableColumn>Điểm thi</TableColumn>
              <TableColumn> </TableColumn>
            </TableHeader>

            <TableBody key="body-table-2">
              <>
                {students.map((student, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student?.birthday?.toString()} </TableCell>
                      <TableCell>{student.gender}</TableCell>
                      <TableCell>{student.score}</TableCell>
                      <TableCell> </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow key="root-input-table-key">
                  <TableCell>
                    <VkxInput name="name"></VkxInput>
                  </TableCell>
                  <TableCell>
                    <VkxDatePicker
                      name="birthday"
                      minValue={parseDate("1945-01-01")}
                    ></VkxDatePicker>
                  </TableCell>
                  <TableCell className="w-40">
                    <VkxSelect
                      aria-label="gender"
                      name="gender"
                      selectItems={[
                        {
                          key: "1",
                          children: "Nam",
                        },
                        {
                          key: "2",
                          children: "Nữ",
                        },
                        {
                          key: "3",
                          children: "Khác",
                        },
                      ]}
                    ></VkxSelect>
                  </TableCell>
                  <TableCell>
                    <VkxNumberInput
                      name="score"
                      minValue={0}
                      maxValue={10}
                    ></VkxNumberInput>
                  </TableCell>
                  <TableCell>
                    <VkxButton type="submit" size="lg">
                      Add
                    </VkxButton>
                  </TableCell>
                </TableRow>
              </>
            </TableBody>
          </Table>
        </VkxForm>
        <p className="text-xs text-gray-500 mt-1"></p>

        <div className="mt-6">
          <h1 className="text-xl">
            2. Ví dụ về cách tốt nhất xử lý validation trong next js
          </h1>
          <div className="mt-6">
            <VkxForm
              className="w-full max-w-xs"
              onSubmit={(e) => {
                e.preventDefault();
                const data = Object.fromEntries(new FormData(e.currentTarget));
                submitted(data);
                // console.log(data);
              }}
            >
              <VkxInput
                isRequired
                errorMessage="Please enter a valid email"
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onValueChange={setEmail}
                validate={(value) => {
                  // console.log("validate2" + value);
                  if (value.length < 10) {
                    return "Username must be at least 3 characters long";
                  }
                  return value === "admin" ? "Nice try" : null;
                }}
              />
              <VkxButton type="submit" variant="bordered">
                Submit
              </VkxButton>
              {submittedValue && (
                <div className="text-small text-default-500">
                  You submitted: <code>{JSON.stringify(submittedValue)}</code>
                </div>
              )}
            </VkxForm>
          </div>
        </div>

        <div className="mt-6">
          <h1 className="text-xl">3. Ví dụ enterprise form</h1>
          <div className="mt-6">
            <EnterpriseFormPage />
          </div>
        </div>

        <div className="mt-6">
          <h1 className="text-xl">3. Ví dụ multiple form</h1>
          <div className="mt-6">
            <MultipleFormPage />
          </div>
        </div>

      </div>
    </div>
  );
}

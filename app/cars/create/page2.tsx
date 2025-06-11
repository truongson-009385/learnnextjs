"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CompanyCreateDto from "@/src/DTOParams/Company/CompanyCreateDto";
import HttpUtils from "@/utils/http-util";
import Company from "@/src/entities/Company";
import { VkxForm } from "@/components/vkx-form/vkx-form";
import { VkxInput } from "@/components/vkx-input/vkx-input";
import { VKXCard } from "@/components/vkx-card/vkx-card";
import VkxButton from "@/components/vkx-button/vkx-button";
import { VkxDatePicker } from "@/components/vkx-date-picker/vkx-date-picker";
import { VkxSelect } from "@/components/vkx-select/vkx-select";
import { VkxSelectItem } from "@/components/vkx-select/vkx-select-item";
import { VkxRadioGroup, VkxRadio } from "@/components/vkx-radio/vkx-radio";
import { VkxNumberInput } from "@/components/vkx-number-input/vkx-number-input";
import { VkxFileInput } from "@/components/vkx-file-input/vkx-file-input";
import { VkxMonthInput } from "@/components/vkx-month-input/vkx-month-input";
import { VkxYearInput } from "@/components/vkx-year-input/vkx-year-input";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

import {
  today,
  parseDate,
  parseDateTime,
  DateValue,
} from "@internationalized/date";

type CountryItem = {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
};

type Employee = {
  name: string;
  birthday: string;
  gender: string;
  hometown: string;
};

export default function CreateCompanyPage() {
  const placeholderDate = today("UTC");
  const minValue = parseDate("1900-01-01");
  const [selectOptions, setSelectOptions] = React.useState<VkxSelectItem[]>([]);
  const [files, setFiles] = React.useState<FileList>();
  const [formData, setFormData] = useState<any>({});
  const [value, setValue] = React.useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeInput, setEmployeeInput] = useState({
    name: "",
    birthday: "",
    gender: "",
    hometown: "",
  });


  // const [formData, setFormData] = useState<CompanyCreateDto>({
  //   name: "",
  //   email: "",
  //   address: "",
  //   phone: ""
  // });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/flag/images");
        const json = await res.json();

        if (!json.error) {
          console.log("Countries fetched successfully:", json.data);
          const options = json.data.map((country: CountryItem) => ({
            key: country.iso2,
            children: country.name,
          }));
          setSelectOptions(options);
        }
      } catch (err) {
        console.error("Failed to fetch countries:", err);
      }
    };

    fetchCountries();
  }, []);


  let HostUrl = process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_URL_DEV as string
    : process.env.NEXT_PUBLIC_URL_PRODUCTION as string;
  let apiUrl = HostUrl + "company";

  const router = useRouter();

  //theo dõi sự thay đổi của text. cập nhật vào state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Record<string, any>) => ({ ...prev, [name]: value }));
  };

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployeeInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: DateValue | null) => {
    if (date) {
      setEmployeeInput((prev) => ({ ...prev, birthday: date.toString() }));
    }
  };

  const addEmployee = () => {
    if (employeeInput.name && employeeInput.birthday && employeeInput.gender && employeeInput.hometown !== undefined) {
      const newEmployee: Employee = {
        name: employeeInput.name,
        birthday: employeeInput.birthday,
        gender: employeeInput.gender,
        hometown: employeeInput.hometown,
      };
      setEmployees([...employees, newEmployee]);
      setEmployeeInput({ name: "", birthday: "", gender: "", hometown: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📝 Submitted form data:", formData);
  };

  //   sự kiên lưu tạo mới dữ liệu
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const response = await HttpUtils.create<Company>(apiUrl, formData);
  //     //   const response = await fetch(`${process.env.NEXT_PUBLIC_URL_DEV}Company`, {
  //     //     method: "POST",
  //     //     headers: { "Content-Type": "application/json" },
  //     //     body: JSON.stringify(formData)
  //     //   });

  //     if (response) {
  //       router.push("/cars"); // điều hướng sau khi tạo thành công
  //     } else {
  //       console.error("Tạo thất bại");
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi gửi yêu cầu:", error);
  //   }
  // };

  return (
    <div>
      <h1 className="text-3xl font-medium text-black dark:text-white mb-3">
        <strong>
          Add New Company
        </strong>
      </h1>

      <VKXCard fullWidth className="space-y-5 p-4 radius-lg" >
        <VkxForm className="gap-y-4" onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-semibold text-black dark:text-white mb-3">
            Company Information
          </h2>
          <VkxInput
            isRequired
            onChange={handleChange}
            errorMessage="Please enter a valid name"
            label="Company Name"
            labelPlacement="outside"
            name="Company Name"
            placeholder="Enter your company name"
            type="text"
          />
          <VkxInput
            onChange={handleChange}
            isRequired
            errorMessage="Please enter a valid email"
            label="Email"
            labelPlacement="outside"
            name="Email"
            placeholder="Enter company email"
            type="text"
          />
          <div className="w-full grid grid-cols-4 gap-4">
            <div className="">
              <VkxInput
                onChange={handleChange}
                isRequired
                errorMessage="Please enter a valid phone number"
                label="Phone number"
                labelPlacement="outside"
                name="Phone number"
                placeholder="Enter phone number"
                type="text"
              />
            </div>
            <div className="">
              <VkxInput
                onChange={handleChange}
                label="Date of establishment"
                labelPlacement="outside"
                placeholder="Enter date of establishment"
                name="DateOfEstablishment"
                type="number"
              ></VkxInput>
            </div>
            <div>
              <VkxMonthInput
                onChange={handleChange}
                className="max-w-xs"
                label="Month of establishment"
                labelPlacement="outside"
                name="MonthOfEstablishment"
                onSelectionChange={(value) => {
                  console.log(value);
                  setValue(value.currentKey ?? "");
                }}
              />
            </div>
            <div>
              <VkxYearInput
                className="max-w-xs"
                label="Year of establishment"
                labelPlacement="outside"
                name="YearOfEstablishment"
                onSelectionChange={(value) => {
                  console.log(value);
                  setValue(value.currentKey ?? "");
                }}
              />
            </div>
          </div>

          <div className="w-full grid grid-cols-3 gap-4">
            <VkxInput
              onChange={handleChange}
              className="col-span-2 w-full"
              isRequired
              errorMessage="Please enter a website URL"
              label="Website URL"
              labelPlacement="outside"
              name="Website URL"
              placeholder="Enter Website URL"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">https://</span>
                </div>
              }
              type="text"
            />
            <div className="w-full">
              <VkxRadioGroup
                label="Select company type"
                orientation="horizontal"
                onChange={handleChange}
                name="CompanyType"
              >
                <VkxRadio value="Ltd">Ltd</VkxRadio>
                <VkxRadio value="CORPORATION">Corporation</VkxRadio>
                <VkxRadio value="PrivateEnterprise">Private Enterprise</VkxRadio>
              </VkxRadioGroup>
            </div>
          </div>

          <div className="w-full grid grid-cols-3 gap-4">
            <div className="w-full">
              <VkxInput
                onChange={handleChange}
                label="Number of employees (estimated)"
                labelPlacement="outside"
                placeholder="Enter number of employees"
                name="NumOfEmployees"
                type="number"
              ></VkxInput>
            </div>
            <div className="w-full col-span-2">
              <VkxFileInput
                isRequired
                multiple
                label="Company Logo"
                name="CompanyLogo"
                labelPlacement="outside"
                onChange={(e) => {
                  if (e.target.files) {
                    setFiles(e.target.files);
                  }
                }}
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-black dark:text-white mb-3">
            Address Information
          </h2>
          <div className="w-full grid grid-cols-3 gap-4">
            <VkxInput
              onChange={handleChange}
              className="w-full"
              label="Address line"
              labelPlacement="outside"
              name="Address line"
              placeholder="Enter Address line"
              type="text"
            />
            <VkxInput
              onChange={handleChange}
              className="w-full"
              label="Street"
              labelPlacement="outside"
              name="Street"
              placeholder="Enter Street"
              type="text"
            />
            <VkxInput
              onChange={handleChange}
              className="w-full"
              isRequired
              errorMessage="Please enter district"
              label="District"
              labelPlacement="outside"
              name="District"
              placeholder="Enter District"
              type="text"
            />
          </div>

          <div className="w-full grid grid-cols-3 gap-4">
            <VkxInput
              onChange={handleChange}
              className="w-full"
              isRequired
              errorMessage="Please enter city"
              label="City"
              labelPlacement="outside"
              name="City"
              placeholder="Enter city"
              type="text"
            />
            <VkxSelect
              onSelectionChange={(val) =>
                setFormData((prev: any) => ({ ...prev, country: val }))
              }
              isVirtualized={true}
              className="w-full"
              label="Country"
              labelPlacement="outside"
              placeholder="Select a country"
              selectItems={selectOptions}
            />
            <VkxInput
              onChange={handleChange}
              className="w-full"
              label="Postal code"
              labelPlacement="outside"
              name="Postal code"
              placeholder="Enter postal code"
              type="text"
            />
          </div>

          <h2 className="text-xl font-semibold text-black dark:text-white mb-3">
            Employee Information
          </h2>

          <Table aria-label="Employee Table" className="w-full">
            <TableHeader>
              <TableColumn>Full name</TableColumn>
              <TableColumn>Date of birth</TableColumn>
              <TableColumn>Gender</TableColumn>
              <TableColumn>Hometown</TableColumn>
              <TableColumn> </TableColumn>
            </TableHeader>
            <TableBody key="table-body">
              <>
                {employees.map((employees, index) => (
                  <TableRow key={index}>
                    <TableCell>{employees.name}</TableCell>
                    <TableCell>{employees.birthday?.toString()}</TableCell>
                    <TableCell>{employees.gender}</TableCell>
                    <TableCell>{employees.hometown}</TableCell>
                    <TableCell> </TableCell>
                  </TableRow>
                ))}
                <TableRow key="root-input-table-key">
                  <TableCell>
                    <VkxInput
                      name="name"
                      value={employeeInput.name}
                      onChange={handleEmployeeChange}
                    />
                  </TableCell>
                  <TableCell>
                    <VkxDatePicker
                      name="birthday"
                      onChange={handleDateChange}
                      minValue={parseDate("1945-01-01")}
                    />
                  </TableCell>
                  <TableCell className="w-40">
                    <VkxSelect
                      aria-label="gender"
                      name="gender"
                      selectItems={[
                        { key: "1", children: "Nam" },
                        { key: "2", children: "Nữ" },
                        { key: "3", children: "Khác" },
                      ]}
                      onChange={handleEmployeeChange}
                    />
                  </TableCell>
                  <TableCell>
                    <VkxInput
                      name="hometown"
                      value={employeeInput.hometown}
                      onChange={handleEmployeeChange}
                    />
                  </TableCell>
                  <TableCell>
                    <VkxButton type="submit" size="lg" onClick={addEmployee}>
                      Add
                    </VkxButton>
                  </TableCell>
                </TableRow>
              </>
            </TableBody>
          </Table>

          <div className="place-items-end">
            <div className="w-full flex gap-4 justify-end">
              <VkxButton type="submit">Huỷ</VkxButton>
              <VkxButton type="submit" color="success">Lưu</VkxButton>
            </div>
          </div>

        </VkxForm>
      </VKXCard>
    </div>
  );
}

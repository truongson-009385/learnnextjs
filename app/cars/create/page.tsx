'use client'

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Checkbox,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    ButtonGroup,
} from "@heroui/react";
import { parseDate, CalendarDate, DateValue } from "@internationalized/date";

import VkxButton from "@/components/vkx-button/vkx-button";
import VkxCheckbox from "@/components/vkx-checkbox/vkx-checkbox";
import VkxPhoneInput from "@/components/vkx-phone-input/vkx-phone-input";
import { VkxForm } from "@/components/vkx-form/vkx-form";
import { VKXCard } from "@/components/vkx-card/vkx-card";
import { VkxInput } from "@/components/vkx-input";
import { VkxPasswordInput } from "@/components/vkx-password-input/vkx-password-input";
import { VkxDatePicker } from "@/components/vkx-date-picker/vkx-date-picker";
import { VkxRadio, VkxRadioGroup } from "@/components/vkx-radio/vkx-radio";
import { VkxNumberInput } from "@/components/vkx-number-input/vkx-number-input";
import { VkxMonthInput } from "@/components/vkx-month-input/vkx-month-input";
import { VkxYearInput } from "@/components/vkx-year-input/vkx-year-input";
import { VkxTextArea } from "@/components/vkx-text-area/vkx-text-area";
import { VkxCheckboxGroup } from "@/components/vkx-checkbox/vkx-checkbox-group";
import { VkxSelect } from "@/components/vkx-select/vkx-select";

const optionsGroupCheckbox = [
    { label: "Lựa chọn A", value: "a" },
    { label: "Lựa chọn B", value: "b" },
    { label: "Lựa chọn C", value: "c" },
];

type Product = {
    name: string;
    importDate: CalendarDate;
    status: string;
    price: number;
};

// Fix: Display status label instead of key and format price with commas
const statusLabels: { [key: string]: string } = {
    "1": "Còn hàng",
    "2": "Sắp hết hàng",
    "3": "Hết hàng",
};

const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas every 3 digits
};

type FormData = {
    username: string;
    password: string;
    phone: string;
    email: string;
    birthDate: CalendarDate;
    gender: string;
    bio: string;
    exampleDate: DateValue | null;
    weight: number;
    month: string;
    year: string;
    description: string;
    groupOptions: string[];
    newsletter: boolean;
}

export default function CreatePage() {
    const [checked, setChecked] = React.useState<string[]>(["a"]);
    const [products, setProduct] = React.useState<Product[]>([]);
    const [productInput, setProductInput] = useState({
        name: "",
        importDate: new CalendarDate(2025, 1, 1),
        status: "",
        price: 0,
    });
    const [formData, setFormData] = useState<FormData>({
        username: "",
        password: "",
        phone: "",
        email: "",
        birthDate: new CalendarDate(2025, 1, 1),
        gender: "",
        bio: "",
        exampleDate: null,
        weight: 0,
        month: "",
        year: "",
        description: "",
        groupOptions: ["a"],
        newsletter: false,
    })

    // Handle nút checkbox
    const handleCheckboxChange = (value: string[]) => {
        setFormData((prev) => ({ ...prev, groupOptions: value }));
    };

    const handleDatePickerChange = (name: string, date: DateValue | null) => {
        setFormData((prev) => ({
            ...prev,
            [name]: date && "toDate" in date ? date : prev[name as keyof typeof prev],
        }));
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, month: e.target.value }));
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, year: e.target.value }));
    };

    // Handle các input vào bảng
    const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProductInput((prev) => ({
            ...prev,
            [name]: name === 'price' ? Number(value) : value // Convert price to number
        }));
    };

    // Handle ngày tháng năm vào bảng
    const handleDateChange = (date: DateValue | null) => {
        if (date) {
            setProductInput((prev) => ({ ...prev, importDate: date as CalendarDate }));
        }
    };

    // Handle xoá sản phẩm khỏi bảng
    const deleteProduct = (index: number) => {
        setProduct(products.filter((_, i) => i !== index));
    };

    // Hàm thêm sản phẩm vào bảng
    const addProduct = () => {
        if (productInput.name && productInput.importDate && productInput.status && productInput.price !== undefined) {
            const newEmployee: Product = {
                name: productInput.name,
                importDate: productInput.importDate,
                status: productInput.status,
                price: productInput.price,
            };
            setProduct([...products, newEmployee]);
            setProductInput({ name: "", importDate: new CalendarDate(2025, 1, 1), status: "", price: 0 });
        }
    };

    // Map các input và lưu
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        console.log("Form Data:", { ...formData, products }); // Log all form data and products
    };
    return (
        <div>
            <h1 className="text-3xl font-medium text-black dark:text-white mb-3">
                <strong>
                    Thêm người dùng mới
                </strong>
            </h1>
            <VKXCard className="mb-6 w-full">
                <div className="w-full">Thông tin cơ bản</div>
                <Divider className="mb-5" />
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-5">
                    <VkxInput
                        aria-label="Enter username"
                        label="Tên đăng nhập"
                        labelPlacement="outside"
                        name="username"
                        placeholder="Nhập tên đăng nhập"
                        errorMessage="Tên đăng nhập không được để trống"
                        type="text"
                        isRequired
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                    <VkxPasswordInput
                        aria-label="Enter password"
                        label="Mật khẩu"
                        labelPlacement="outside"
                        name="password"
                        placeholder="Nhập mật khẩu"
                        errorMessage="Mật khẩu không được để trống"
                        isRequired
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <VkxPhoneInput
                        aria-label="Enter số điện thoại"
                        label="Số điện thoại"
                        labelPlacement="outside"
                        name="phone"
                        placeholder="Nhập số điện thoại"
                        errorMessage="Số điện thoại không được để trống"
                        isRequired
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                    <VkxInput
                        aria-label="Enter email"
                        label="Email"
                        labelPlacement="outside"
                        name="email"
                        placeholder="Nhập email"
                        errorMessage="Email không được để trống"
                        type="email"
                        isRequired
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <VkxDatePicker
                        aria-label="Select your desired birthDate"
                        label="Ngày sinh"
                        labelPlacement="outside"
                        name="birthDate"
                        isRequired
                        minValue={new CalendarDate(1900, 1, 1)}
                        value={formData.birthDate}
                        onChange={(date) => handleDatePickerChange("birthDate", date)}
                    />
                    <VkxRadioGroup
                        label="Giới tính"
                        name="gender"
                        orientation="horizontal"
                        value={formData.gender}
                        onValueChange={(value: string) => setFormData((prev) => ({ ...prev, gender: value }))}
                    >
                        <VkxRadio value="Nam">Nam</VkxRadio>
                        <VkxRadio value="Nữ">Nữ</VkxRadio>
                        <VkxRadio value="Khác">Khác</VkxRadio>
                    </VkxRadioGroup>
                </div>
            </VKXCard>

            <VKXCard className="w-full mb-6">
                <h3 className="text-md font-semibold mb-2">Khác</h3>
                <Divider className="mb-5" />
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mb-5">
                    <VkxInput
                        aria-label="Enter bio"
                        label="Bio"
                        labelPlacement="outside"
                        name="bio"
                        placeholder="Nhập url bio của bạn"
                        errorMessage="Bio không được để trống"
                        type="text"
                        isRequired
                        startContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">https://</span>
                            </div>
                        }
                        value={formData.bio}
                        onChange={handleInputChange}
                    />
                    <VkxDatePicker
                        aria-label="Select your desired exampleDate"
                        label="Example"
                        labelPlacement="outside"
                        name="exampleDate"
                        minValue={new CalendarDate(2025, 5, 1)}
                        value={formData.exampleDate}
                        onChange={(date) => handleDatePickerChange("exampleDate", date)}
                    />
                    <VkxNumberInput
                        label="Cân nặng"
                        labelPlacement="outside"
                        key={"weight"}
                        name="weight"
                        placeholder="Nhập số cân của bạn"
                        minValue={0}
                        value={formData.weight}
                        onChange={(value) => setFormData((prev) => ({ ...prev, weight: Number(value) }))}
                    />

                    <VkxMonthInput
                        description="Chọn tháng"
                        label="Tháng"
                        labelPlacement="outside"
                        name="month"
                        value={formData.month}
                        onChange={handleMonthChange}
                    />

                    <VkxYearInput
                        description="Chọn năm"
                        label="Năm"
                        labelPlacement="outside"
                        name="year"
                        value={formData.year}
                        onChange={handleYearChange}
                    />
                    <VkxTextArea
                        label="Mô tả"
                        labelPlacement="outside"
                        name="description"
                        maxRows={6}
                        minRows={2}
                        placeholder="Nhập mô tả..."
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
            </VKXCard>

            <VKXCard className="w-full mb-6">
                <h3 className="text-md font-semibold mb-2">Điều khoản</h3>
                <Divider className="mb-5" />
                <div className="grid gap-x-2 gap-y-3 grid-cols-1">
                    <VkxCheckboxGroup
                        label="Chọn các mục phù hợp"
                        name="groupOptions"
                        value={formData.groupOptions}
                        onChange={handleCheckboxChange}
                    >
                        {optionsGroupCheckbox.map((option) => (
                            <Checkbox
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </Checkbox>
                        ))}
                    </VkxCheckboxGroup>

                    <VkxCheckbox
                        value="newsletter"
                        onChange={(e) => setFormData((prev) => ({ ...prev, newsletter: e.target.checked }))}
                    >
                        Đăng kí để nhận thông tin mới nhất
                    </VkxCheckbox>
                </div>
            </VKXCard>

            <VKXCard className="w-full">
                <h3 className="text-md font-semibold mb-2">Danh sách sản phẩm</h3>
                <Divider className="mb-5" />
                <Table aria-label="Product list table">
                    <TableHeader>
                        <TableColumn>Tên</TableColumn>
                        <TableColumn>Ngày nhập</TableColumn>
                        <TableColumn>Trạng thái</TableColumn>
                        <TableColumn>Giá (VNĐ)</TableColumn>
                        <TableColumn> </TableColumn>
                    </TableHeader>
                    <TableBody>
                        <>
                            {products.map((products, index) => (
                                <TableRow key={index}>
                                    <TableCell>{products.name}</TableCell>
                                    <TableCell>{products.importDate.toString()}</TableCell>
                                    <TableCell>{statusLabels[products.status] || products.status}</TableCell>
                                    <TableCell>{formatPrice(products.price)}</TableCell>
                                    <TableCell>
                                        <VkxButton
                                            color="danger"
                                            variant="shadow"
                                            size="md"
                                            onClick={() => deleteProduct(index)} // Handle delete on click
                                        >
                                            Delete
                                        </VkxButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow className="root-input-table-key">
                                <TableCell>
                                    <VkxInput
                                        aria-label="Enter product name"
                                        name="name"
                                        value={productInput.name}
                                        onChange={handleProductChange}
                                    />
                                </TableCell>
                                <TableCell>
                                    <VkxDatePicker
                                        aria-label="Select import date"
                                        name="importDate"
                                        value={productInput.importDate}
                                        onChange={(date) => handleDateChange(date)}
                                        minValue={parseDate("1945-01-01")}
                                    />
                                </TableCell>
                                <TableCell>
                                    <VkxSelect
                                        aria-label="Select product status"
                                        name="status"
                                        value={productInput.status}
                                        onChange={handleProductChange}
                                        selectItems={[
                                            { key: "1", children: "Còn hàng" },
                                            { key: "2", children: "Sắp hết hàng" },
                                            { key: "3", children: "Hết hàng" },
                                        ]}
                                        className="min-w-[150px]"
                                    />
                                </TableCell>
                                <TableCell>
                                    <VkxNumberInput
                                        aria-label="Enter product price"
                                        name="price"
                                        value={productInput.price}
                                        maxValue={1000000000}
                                        minValue={0}
                                        onChange={(value) => setProductInput((prev) =>
                                            ({ ...prev, price: Number(value) }))} // Handle number input
                                    />
                                </TableCell>
                                <TableCell>
                                    <VkxButton type="submit" color="primary" variant="shadow" size="md" onClick={addProduct}>
                                        Add
                                    </VkxButton>
                                </TableCell>
                            </TableRow>
                        </>
                    </TableBody>
                </Table>
            </VKXCard>
            <div className="mt-4">
                <VkxButton color="success" variant="shadow" size="lg" onClick={handleSave}>
                    Save
                </VkxButton>
            </div>
        </div>
    );
}

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
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

import { Product, UserInfo, Orther } from "@/types";

//VKX Component
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
import { VkxSelect } from "@/components/vkx-select/vkx-select";
import VkxCheckboxGroup from "@/components/vkx-checkbox/vkx-checkbox-group";
import { VkxModal } from "@/components/vkx-modal/vkx-modal";
import { useErrorLogger } from "@/src/contexts/ErrorLoggerContext";

//variable
const optionsCheckbox = [
  { label: "Lựa chọn A", value: "a" },
  { label: "Lựa chọn B", value: "b" },
  { label: "Lựa chọn C", value: "c" },
];

const labelPlacement = "outside";
const minPrice = 0;
const maxPrice = 1000000000;

// Khởi tạo sản phẩm mới
const createNewProduct = (): Product => ({
  id: `prod_${Date.now()}`,
  name: "",
  importDate: new Date().toISOString().split("T")[0],
  status: "1",
  price: 0,
});

//Page
export default function Page() {
  //hooks
  const router = useRouter();
  const [readOnly, setReadOnly] = React.useState<boolean>(true);
  const [info, setInfo] = React.useState<UserInfo>({
    id: "",
    username: "",
    password: "",
    phone: "",
    email: "",
    birthDate: "",
    gender: "1",
  });
  const [orther, setOrther] = React.useState<Orther>({
    bio: "",
    exampleDate: "",
    weight: 0,
    month: "12",
    year: "2030",
    description: "",
    groupOptions: [],
    emailNotifications: false,
  });
  const [products, setProducts] = React.useState<Product[]>([]);
  // const [submitted, setSubmitted] = React.useState(null);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<Product | null>(null);
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);

  React.useEffect(() => {
    fetch("/api/cars/123")
      .then((res) => {
        if (!res.ok) {
          console.log("lỗi nè");
        }

        return res.json();
      })
      .then((data) => {
        setInfo(data.info);
        setOrther(data.orther);
        setProducts(data.products);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //action
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Submit data to your backend API.

    console.log({ info, orther, products });
    setReadOnly(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("info.")) {
      const fieldName = name.replace("info.", "") as keyof UserInfo;

      setInfo((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    } else if (name.startsWith("orther.")) {
      const fieldName = name.replace("orther.", "") as keyof Orther;

      setOrther((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
  };

  const handleDateChange = (e: DateValue | null, name?: string) => {
    const dateString = e?.toString() || "";

    if (name?.startsWith("info.")) {
      const fieldName = name.replace("info.", "") as keyof UserInfo;

      setInfo((prev) => ({
        ...prev,
        [fieldName]: dateString,
      }));
    } else if (name?.startsWith("orther.")) {
      const fieldName = name.replace("orther.", "") as keyof Orther;

      setOrther((prev) => ({
        ...prev,
        [fieldName]: dateString,
      }));
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("info.")) {
      const fieldName = name.replace("info.", "") as keyof UserInfo;

      setInfo((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
  };

  const handleNumberChange = (value: number, name?: string) => {
    if (name?.startsWith("orther.")) {
      const fieldName = name.replace("orther.", "") as keyof Orther;

      setOrther((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
  };

  const handleCheckboxChange = (isSelected: boolean) => {
    setOrther((prev) => ({
      ...prev,
      emailNotifications: isSelected,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("orther.")) {
      const fieldName = name.replace("orther.", "") as keyof Orther;

      setOrther((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
  };

  const handleCheckboxGroupChange = (values: string[]) => {
    setOrther((prev) => ({
      ...prev,
      groupOptions: values,
    }));
  };

  const handleProductInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Product
  ) => {
    const { value } = e.target;

    setProducts((prev) =>
      prev.map((product, i) =>
        i === index ? { ...product, [field]: value } : product
      )
    );
  };

  const handleProductDateChange = (
    date: DateValue | null,
    index: number,
    field: keyof Product
  ) => {
    const dateString = date?.toString() || "";

    setProducts((prev) =>
      prev.map((product, i) =>
        i === index ? { ...product, [field]: dateString } : product
      )
    );
  };

  const handleProductSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
    field: keyof Product
  ) => {
    const { value } = e.target;

    setProducts((prev) =>
      prev.map((product, i) =>
        i === index ? { ...product, [field]: value } : product
      )
    );
  };

  const handleProductNumberChange = (
    value: number,
    index: number,
    field: keyof Product
  ) => {
    setProducts((prev) =>
      prev.map((product, i) =>
        i === index ? { ...product, [field]: value } : product
      )
    );
  };

  const onNewTableForm = () => {
    const newProduct = createNewProduct();

    setModalData(newProduct);
    setIsEditMode(false);
    setIsOpenModal(true);
  };

  const onEditTableForm = (prodId: string) => {
    const productToEdit = products.find((prod) => prod.id === prodId);

    if (productToEdit) {
      setModalData({ ...productToEdit });
      setIsEditMode(true);
      setIsOpenModal(true);
    }
  };

  const onRemoveTableForm = (prodId: string) => {
    if (confirm("Bạn có chắc chắn muốn xoá sản phẩm này không???")) {
      setProducts((prev) => prev.filter((prod) => prod.id !== prodId));
    }
  };

  const handleModalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setModalData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleModalDateChange = (
    date: DateValue | null,
    field: keyof Product
  ) => {
    const dateString = date?.toString() || "";

    setModalData((prev) => (prev ? { ...prev, [field]: dateString } : null));
  };

  const handleModalSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setModalData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleModalNumberChange = (value: number, field: keyof Product) => {
    setModalData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSave = () => {
    if (!modalData) return;

    if (!modalData.name.trim()) {
      alert("Vui lòng nhập tên sản phẩm!");

      return;
    }

    if (!modalData.importDate) {
      alert("Vui lòng chọn ngày nhập!");

      return;
    }

    if (modalData.price < 0) {
      alert("Giá sản phẩm không được âm!");

      return;
    }

    if (isEditMode) {
      setProducts((prev) =>
        prev.map((prod) => (prod.id === modalData.id ? { ...modalData } : prod))
      );
    } else {
      setProducts((prev) => [...prev, { ...modalData }]);
    }

    onCloseModal();
  };

  const onCloseModal = () => {
    setIsOpenModal(false);
    setModalData(null);
    setIsEditMode(false);
  };

  return (
    <>
      <nav className="w-full flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold mb-0">Thông tin người dùng</h2>
        {readOnly ? (
          <ButtonGroup>
            <VkxButton
              color="primary"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                setReadOnly(false);
              }}
            >
              Sửa
            </VkxButton>
            <VkxButton type="button" onPress={() => router.back()}>
              Thoát
            </VkxButton>
          </ButtonGroup>
        ) : (
          <ButtonGroup>
            <VkxButton color="primary" form="formUserInfo" type="submit">
              Lưu
            </VkxButton>
            <VkxButton
              color="danger"
              type="button"
              onPress={() => {
                setReadOnly(true);
              }}
            >
              Trở lại
            </VkxButton>
          </ButtonGroup>
        )}
      </nav>
      <Divider className="mb-10" />
      <VkxForm className="w-full" id="formUserInfo" onSubmit={onSubmit}>
        {/* Thông tin cơ bản */}
        <VKXCard className="w-full mb-6">
          <div className="w-full">
            <h3 className="text-md font-semibold mb-2">Thông tin cơ bản</h3>
            <Divider className="mb-5" />
            <div className="grid gap-x-2 gap-y-3 grid-cols-1 md:grid-cols-3 mb-10">
              <VkxInput
                aria-label="Enter username"
                isReadOnly={readOnly}
                label="Tên đăng nhập"
                labelPlacement={labelPlacement}
                name="info.username"
                placeholder="Nhập tên đăng nhập"
                type="text"
                value={info.username}
                onChange={handleInputChange}
              />
              <VkxPasswordInput
                aria-label="Enter password"
                isReadOnly={readOnly}
                label="Mật khẩu"
                labelPlacement={labelPlacement}
                name="info.password"
                placeholder="Nhập mật khẩu mới (để trống nếu không đổi)"
                value={info.password}
                onChange={handleInputChange}
              />
              <VkxPhoneInput
                aria-label="Enter phone number"
                isReadOnly={readOnly}
                label="Số điện thoại"
                labelPlacement={labelPlacement}
                name="info.phone"
                placeholder="Nhập số điện thoại của bạn"
                value={info.phone}
                onChange={handleInputChange}
              />
              <VkxInput
                aria-label="Enter email"
                isReadOnly={readOnly}
                label="Email"
                labelPlacement={labelPlacement}
                name="info.email"
                placeholder="Nhập email của bạn"
                type="email"
                value={info.email}
                onChange={handleInputChange}
              />

              <VkxDatePicker
                aria-label="Select your desired birthDate"
                isReadOnly={readOnly}
                label="Ngày sinh"
                labelPlacement={labelPlacement}
                minValue={new CalendarDate(1900, 1, 1)}
                name="info.birthDate"
                value={info.birthDate ? parseDate(info.birthDate) : null}
                onChange={(date) => handleDateChange(date, "info.birthDate")}
              />

              <VkxRadioGroup
                isDisabled={readOnly}
                label="Giới tính"
                name="info.gender"
                size="sm"
                value={info.gender}
                onChange={handleRadioChange}
              >
                <VkxRadio value="1">Nam</VkxRadio>
                <VkxRadio value="2">Nữ</VkxRadio>
                <VkxRadio value="3">Khác</VkxRadio>
              </VkxRadioGroup>
            </div>
          </div>
        </VKXCard>

        <VKXCard className="w-full mb-6">
          <h3 className="text-md font-semibold mb-2">Khác</h3>
          <Divider className="mb-5" />
          <div className="grid gap-x-2 gap-y-3 grid-cols-1 md:grid-cols-3 mb-10">
            <VkxInput
              isReadOnly={readOnly}
              label="Bio"
              labelPlacement={labelPlacement}
              name="orther.bio"
              placeholder="Nhập url bio của bạn"
              type="url"
              value={orther.bio}
              onChange={handleInputChange}
            />

            <VkxDatePicker
              aria-label="Select your desired exampleDate"
              isReadOnly={readOnly}
              label="Example"
              labelPlacement={labelPlacement}
              minValue={new CalendarDate(2025, 5, 1)}
              value={orther.exampleDate ? parseDate(orther.exampleDate) : null}
              onChange={(date) => handleDateChange(date, "orther.exampleDate")}
            />

            <VkxNumberInput
              hideStepper
              isReadOnly={readOnly}
              label="Cân nặng"
              labelPlacement={labelPlacement}
              name="orther.weight"
              placeholder="Nhập số cân của bạn"
              size="md"
              value={orther.weight}
              onValueChange={(value) =>
                handleNumberChange(value, "orther.weight")
              }
            />

            <VkxMonthInput
              defaultSelectedKeys={new Set([orther.month])}
              description="Chọn tháng"
              isDisabled={readOnly}
              label="Tháng"
              labelPlacement={labelPlacement}
              name="orther.month"
              value={orther.month}
              onChange={handleSelectChange}
            />

            <VkxYearInput
              defaultSelectedKeys={new Set([orther.year])}
              description="Chọn năm"
              isDisabled={readOnly}
              label="Năm"
              labelPlacement={labelPlacement}
              name="orther.year"
              value={orther.year}
              onChange={handleSelectChange}
            />

            <VkxTextArea
              isReadOnly={readOnly}
              label="Mô tả"
              labelPlacement={labelPlacement}
              maxRows={6}
              minRows={2}
              name="orther.description"
              placeholder="Nhập mô tả..."
              value={orther.description}
              onChange={handleInputChange}
            />
          </div>
        </VKXCard>

        <VKXCard className="w-full mb-6">
          <h3 className="text-md font-semibold mb-2">Điều khoản</h3>
          <Divider className="mb-5" />
          <div className="grid gap-x-2 gap-y-3 grid-cols-1">
            <VkxCheckboxGroup
              isReadOnly={readOnly}
              label="Chọn các mục phù hợp"
              name="orther.groupOptions"
              size="sm"
              value={orther.groupOptions}
              onChange={handleCheckboxGroupChange}
            >
              {optionsCheckbox.map((option) => (
                <VkxCheckbox
                  key={option.value}
                  isReadOnly={readOnly}
                  value={option.value}
                >
                  {option.label}
                </VkxCheckbox>
              ))}
            </VkxCheckboxGroup>

            <VkxCheckbox
              isReadOnly={readOnly}
              isSelected={orther.emailNotifications}
              size="sm"
              onValueChange={handleCheckboxChange}
            >
              Đăng kí để nhận thông tin mới nhất
            </VkxCheckbox>
          </div>
        </VKXCard>

        <VKXCard className="w-full">
          <nav className="w-full flex justify-between items-center mb-2">
            <h3 className="text-md font-semibold mb-0">Danh sách sản phẩm</h3>
            <VkxButton color="primary" type="button" onPress={onNewTableForm}>
              Thêm mới SP
            </VkxButton>
          </nav>
          <Divider className="mb-5" />
          <Table aria-label="Product list table">
            <TableHeader>
              <TableColumn>Tên</TableColumn>
              <TableColumn>Ngày nhập</TableColumn>
              <TableColumn>Trạng thái</TableColumn>
              <TableColumn>Giá (₫)</TableColumn>
              <TableColumn> </TableColumn>
            </TableHeader>
            <TableBody>
              {products &&
                products.map((prod, index) => (
                  <TableRow key={prod.id}>
                    <TableCell>
                      <VkxInput
                        aria-label={`Product name ${index}`}
                        isReadOnly={readOnly}
                        name={`products.${index}.name`}
                        type="text"
                        value={prod.name}
                        onChange={(e) =>
                          handleProductInputChange(e, index, "name")
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <VkxDatePicker
                        aria-label={`Product import date ${index}`}
                        isReadOnly={readOnly}
                        minValue={parseDate("1945-01-01")}
                        value={
                          prod.importDate ? parseDate(prod.importDate) : null
                        }
                        onChange={(date) =>
                          handleProductDateChange(date, index, "importDate")
                        }
                      />
                    </TableCell>
                    <TableCell className="w-40">
                      <VkxSelect
                        aria-label={`Product status ${index}`}
                        isDisabled={readOnly}
                        name={`products.${index}.status`}
                        selectItems={[
                          { key: "1", children: "Còn hàng" },
                          { key: "2", children: "Sắp hết hàng" },
                          { key: "3", children: "Hết hàng" },
                        ]}
                        selectedKeys={new Set([prod.status])}
                        value={prod.status}
                        onChange={(e) =>
                          handleProductSelectChange(e, index, "status")
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <VkxNumberInput
                        aria-label={`Product price ${index}`}
                        formatOptions={{
                          style: "currency",
                          currency: "VND",
                          minimumFractionDigits: 0,
                        }}
                        isReadOnly={readOnly}
                        maxValue={maxPrice}
                        minValue={minPrice}
                        value={prod.price}
                        onValueChange={(value) =>
                          handleProductNumberChange(value, index, "price")
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <VkxButton
                          color="warning"
                          isDisabled={readOnly}
                          onPress={() => onEditTableForm(prod.id)}
                        >
                          Sửa
                        </VkxButton>
                        <VkxButton
                          color="danger"
                          isDisabled={readOnly}
                          onPress={() => onRemoveTableForm(prod.id)}
                        >
                          Xoá
                        </VkxButton>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </VKXCard>
      </VkxForm>
      <VkxModal
        backdrop="blur"
        footer={
          <>
            <VkxButton color="danger" variant="flat" onPress={onCloseModal}>
              Đóng
            </VkxButton>
            <VkxButton color="primary" onPress={handleSave}>
              {isEditMode ? "Cập nhật" : "Thêm mới"}
            </VkxButton>
          </>
        }
        isDismissable={false}
        isOpen={isOpenModal}
        placement="top-center"
        scrollBehavior="inside"
        size="lg"
        title={isEditMode ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
        onClose={onCloseModal}
      >
        {modalData && (
          <div className="grid gap-4">
            <VkxInput
              isRequired
              label="Tên sản phẩm"
              labelPlacement="outside"
              name="name"
              placeholder="Nhập tên sản phẩm"
              type="text"
              value={modalData.name}
              onChange={handleModalInputChange}
            />

            <VkxDatePicker
              isRequired
              label="Ngày nhập"
              labelPlacement="outside"
              minValue={parseDate("1945-01-01")}
              value={
                modalData.importDate ? parseDate(modalData.importDate) : null
              }
              onChange={(date) => handleModalDateChange(date, "importDate")}
            />

            <VkxSelect
              defaultSelectedKeys={new Set([modalData.status])}
              label="Trạng thái"
              labelPlacement="outside"
              name="status"
              selectItems={[
                { key: "1", children: "Còn hàng" },
                { key: "2", children: "Sắp hết hàng" },
                { key: "3", children: "Hết hàng" },
              ]}
              value={modalData.status}
              onChange={handleModalSelectChange}
            />

            <VkxNumberInput
              formatOptions={{
                style: "currency",
                currency: "VND",
                minimumFractionDigits: 0,
              }}
              label="Giá (VNĐ)"
              labelPlacement="outside"
              maxValue={maxPrice}
              minValue={minPrice}
              placeholder="Nhập giá sản phẩm"
              value={modalData.price}
              onValueChange={(value) => handleModalNumberChange(value, "price")}
            />
          </div>
        )}
      </VkxModal>
    </>
  );
}

import VkxButton from "@/components/vkx-button/vkx-button";
import { VkxForm } from "@/components/vkx-form/vkx-form";
import { VkxInput } from "@/components/vkx-input";
import { VkxNumberInput } from "@/components/vkx-number-input/vkx-number-input";
import { useRef, useState } from "react";

class Customer {
  name?: string = undefined;
  email?: string = undefined;
}
class Product {
  name?: string = undefined;
  price?: number = undefined;
}

export function MultipleFormPage() {
  const formProduct = useRef<HTMLFormElement>(null);
  const formCustomer = useRef<HTMLFormElement>(null);

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const [productErrors, setProductErrors] = useState({});
  const [customerErrors, setCustomerErrors] = useState({});

  const validateProduct = (data: Product): any => {
    const errors: any = {};
    let isError: boolean = false;

    if (!data.name) {
      isError = true;
      errors.name = "Trường này bắt buộc nhập";
    }

    if (data.name && data.name!.length > 30) {
      isError = true;
      errors.name = "Độ dài của tên phải nhỏ hơn 30 ký tự";
    }

    if (!data.price) {
      isError = true;
      errors.price = "Trường này bắt buộc nhập";
    }

    return isError ? errors : undefined;
  };

  const validateCustomer = (data: Customer): any => {
    const errors: any = {};
    let isError: boolean = false;

    if (!data.name) {
      errors.name = "Trường này bắt buộc nhập";
      isError = true;
    }

    if (data.name && data.name!.length > 30) {
      errors.name = "Độ dài của tên phải nhỏ hơn 30 ký tự";
      isError = true;
    }

    if (!data.email) {
      errors.email = "Trường này bắt buộc nhập";
      isError = true;
    }

    return isError ? errors : undefined;
  };

  const handleSubmit = () => {
    if (!formProduct.current || !formCustomer.current) return;

    const productFormData = new FormData(formProduct.current);
    const customerFormData = new FormData(formCustomer.current);

    const productData: Product = Object.fromEntries(productFormData);
    const customerData: Customer = Object.fromEntries(customerFormData);

    const productErrors = validateProduct(productData);
    setProductErrors(productErrors);
    const customerErrors = validateCustomer(customerData);
    setCustomerErrors(customerErrors);

    if (productErrors || customerErrors) return;

    setProduct(productData);
    setCustomer(customerData);
  };

  return (
    <div className="">
      <div className="grid grid-rows-2 md:grid-rows-2 gap-6 border-1 rounded-xl border-gray-700 p-4">
        <div className="border-1 rounded-xl border-gray-700 p-4">
          <p className="text-xl pb-4">Product form</p>
          <VkxForm ref={formProduct} validationErrors={productErrors}>
            <VkxInput name="name" label="Họ tên" isRequired></VkxInput>
            <VkxNumberInput
              name="price"
              label="Giá tiền"
              size="md"
              isRequired
            ></VkxNumberInput>
          </VkxForm>
        </div>

        <div className="border-1 rounded-xl border-gray-700 p-4">
          <p className="text-xl pb-4">Customer form</p>
          <VkxForm ref={formCustomer} validationErrors={customerErrors}>
            <VkxInput name="name" label="Họ tên" isRequired></VkxInput>
            <VkxInput
              name="email"
              type="email"
              label="Email"
              isRequired
            ></VkxInput>
          </VkxForm>
        </div>
        <div className="">
          <VkxButton
            variant="bordered"
            onPress={() => {
              handleSubmit();
            }}
          >
            Submit
          </VkxButton>
        </div>
      </div>
      <div className="m-4">
        {product ? <p>product: {JSON.stringify(product)}</p> : ""}
        {product ? <p>customer: {JSON.stringify(customer)}</p> : ""}
      </div>
    </div>
  );
}

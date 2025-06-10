import { Form as HeroUIForm } from "@heroui/react";
import React from "react";
import { VkxFormProps } from "./vkx-form-props";

export const VkxForm: React.FC<VkxFormProps> = ({
  ariaLabel = "VkxForm",
  ref,
  ...props
}) => {
  return <HeroUIForm aria-label={ariaLabel} ref={ref} {...props}></HeroUIForm>;
};

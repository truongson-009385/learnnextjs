import { FormProps } from "@heroui/react";

export interface VkxFormProps extends FormProps {
  ariaLabel?: string;
  ref?:React.LegacyRef<HTMLFormElement> | undefined;
}

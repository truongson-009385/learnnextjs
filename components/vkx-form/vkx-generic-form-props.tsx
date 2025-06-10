import { FormProps } from "@heroui/react";

export interface VkxGenericFormProps<T>
  extends Omit<FormProps, "onSubmit" | "onReset" | "onInvalid"> {
  ariaLabel?: string;
  onInvalid?: ((value?: T) => void) | undefined;
  onSubmit?: ((value?: T) => void) | undefined;
  onReset?: ((value?: T) => void) | undefined;
  ref?: React.LegacyRef<HTMLFormElement> | undefined;
  type: new () => T;
}

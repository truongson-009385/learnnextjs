import { NumberInput, NumberInputProps } from "@heroui/number-input";
import { NumberInputSlots, SlotsToClasses } from "@heroui/theme";
import React from "react";
export interface VkxNumberInputProps extends NumberInputProps {
  ariaLabel?: string;
  classNames?: SlotsToClasses<NumberInputSlots>;
  className?: string;
  defaultValue?: number;
  value?: number;
  placeholder?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  errorMessage?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  isClearable?: boolean;
  isWheelDisabled?: boolean;
  minValue?: number;
  maxValue?: number;
  step?: number;
  size?: "sm" | "md" | "lg" | undefined;
  formatOptions?: Intl.NumberFormatOptions;
  name?: string;
  hideStepper?: boolean;
  readOnly?: boolean;
  onValueChange?: (value: number) => void | undefined;
  onClear?: (() => void | undefined) | undefined;
}

export function VkxNumberInput({
  ariaLabel = "VkxNumberInput",
  className,
  classNames,
  defaultValue,
  value,
  placeholder,
  label,
  description,
  errorMessage,
  isDisabled,
  isInvalid,
  isRequired,
  isClearable,
  isWheelDisabled,
  minValue,
  maxValue,
  step,
  size = "sm",
  name,
  formatOptions,
  hideStepper = true,
  readOnly,
  onValueChange,
  onClear,
  ...props
}: VkxNumberInputProps) {
  return (
    <NumberInput
      aria-label={ariaLabel}
      className={className}
      classNames={{
        input: "text-right",
        ...classNames,
      }}
      defaultValue={defaultValue}
      value={value}
      placeholder={placeholder}
      label={label}
      description={description}
      errorMessage={errorMessage}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isRequired={isRequired}
      isClearable={isClearable}
      isWheelDisabled={isWheelDisabled}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      size={size}
      name={name}
      formatOptions={formatOptions}
      readOnly={readOnly}
      hideStepper={hideStepper}
      onValueChange={onValueChange}
      onClear={onClear}
      {...props}
    />
  );
}

import { FormProps, Form as HeroUIForm } from "@heroui/react";
import React, { ReactNode, CSSProperties, FormHTMLAttributes } from "react";

export interface VkxFormProps extends FormProps {
  ariaLabel?: string;
  children: ReactNode;
  validationBehavior?: "native" | "aria";
  validationErrors?: Record<string, string | string[]>;
  action?: string | FormHTMLAttributes<HTMLFormElement>["action"];
  encType?:
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain";
  method?: "get" | "post" | "dialog";
  target?: "_blank" | "_self" | "_parent" | "_top";
  autoComplete?: "off" | "on";
  role?: "presentation" | "search" | undefined;
  autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters";
  className?: string;
  style?: CSSProperties;
  onInvalid?: React.FormEventHandler<HTMLFormElement>;
  ref?:React.LegacyRef<HTMLFormElement> | undefined;
}

export const VkxForm: React.FC<VkxFormProps> = ({
  ariaLabel = "VkxForm",
  children,
  className = "",
  validationBehavior = "native",
  validationErrors,
  action,
  encType,
  role,
  ref,
  method,
  target,
  autoComplete,
  autoCapitalize,
  style,
  onInvalid, // add onInvalid support
  ...props
}) => {
  return (
    <HeroUIForm
      aria-label={ariaLabel}
      action={action}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      className={className}
      encType={encType}
      method={method}
      role={role}
      ref={ref}
      style={style}
      target={target}
      validationBehavior={validationBehavior}
      validationErrors={validationErrors}
      onInvalid={onInvalid} // pass onInvalid to HeroUIForm
      {...props}
    >
      {children}
    </HeroUIForm>
  );
};

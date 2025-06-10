
import { VkxGenericFormProps } from "./vkx-generic-form-props";
import { VkxForm } from "./vkx-form";
import { autoMapper } from "@/utils/mapping-util";


export function VkxGenericForm<T>({
  ariaLabel = "VkxForm",
  ref,
  type,
  onReset,
  onSubmit,
  onInvalid,
  ...props
}: VkxGenericFormProps<T>) {
  return (
    <VkxForm
      aria-label={ariaLabel}
      ref={ref}
      onInvalid={
        onInvalid
          ? (event) => {
              event.preventDefault();
              let formData = new FormData(event.currentTarget);
              let entity = Object.fromEntries(formData);
              let model = autoMapper<T>(entity, type);
              onInvalid(model);
            }
          : undefined
      }
      onReset={
        onReset
          ? (event) => {
              event.preventDefault();
              let formData = new FormData(event.currentTarget);
              let entity = Object.fromEntries(formData);
              let model = autoMapper<T>(entity, type);
              onReset(model);
            }
          : undefined
      }
      onSubmit={
        onSubmit
          ? (event) => {
              event.preventDefault();
              let formData = new FormData(event.currentTarget);
              let entity = Object.fromEntries(formData);
              let model = autoMapper<T>(entity, type);
              onSubmit(model);
            }
          : undefined
      }
      {...props}
    ></VkxForm>
  );
}

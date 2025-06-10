import VkxCheckbox from "@/components/vkx-checkbox/vkx-checkbox";
import { VkxInput } from "@/components/vkx-input";
import { VkxTextArea } from "@/components/vkx-text-area/vkx-text-area";
import { VkxPasswordInput } from "@/components/vkx-password-input/vkx-password-input";
import { VkxNumberInput } from "@/components/vkx-number-input/vkx-number-input";
import { VkxSelect } from "@/components/vkx-select/vkx-select";
import { VkxSwitch } from "@/components/vkx-switch/vkx-switch";
import { VkxFileInput } from "@/components/vkx-file-input/vkx-file-input";
import VkxPhoneInput from "@/components/vkx-phone-input/vkx-phone-input";
import { VkxRadio, VkxRadioGroup } from "@/components/vkx-radio/vkx-radio";
import { VkxDateInput } from "@/components/vkx-date-input/vkx-date-input";
import { VkxDatePicker } from "@/components/vkx-date-picker/vkx-date-picker";
import { VkxDateRangePicker } from "@/components/vkx-date-range-picker/vkx-date-range-picker";
import { parseDateTime } from "@internationalized/date";
import { VkxTimeInput } from "@/components/vkx-time-input/vkx-time-input";

export enum FieldType {
  Text = "Text",
  Number = "Number",
  Email = "Email",
  Password = "Password",
  TextArea = "TextArea",
  Select = "Select",
  MultiSelect = "MultiSelect",
  Checkbox = "Checkbox",
  Radio = "Radio",
  Date = "Date",
  DateTime = "DateTime",
  RangeDateTime = "RangeDateTime",
  Time = "Time",
  Switch = "Switch",
  File = "File",
  Phone = "Phone",
  Url = "Url",
}

export class FormDynamic {
  id?: string;
  items: FormDynamicItem[] = [];
}

export class KeyItem {
  key: string = "";
  value?: string = "";
}

export class FormDynamicItem {
  label?: string;
  placeholder?: string;
  name?: string;
  type?: FieldType;
  isRequired?: boolean = true;
  value?: string = "";
  keyItems?: KeyItem[];
}

export function getField(formDynamic: FormDynamicItem, index: number) {  
  if (formDynamic.type === FieldType.Text) {
    return (
      <VkxInput
        type="text"
        name={`[${index}].` + formDynamic.name}
        placeholder={formDynamic.placeholder}
        isRequired={formDynamic.isRequired}
      />
    );
  } else if (formDynamic.type === FieldType.Number) {
    return (
      <VkxNumberInput
        name={`[${index}].` + formDynamic.name}
        placeholder={formDynamic.placeholder}
        isRequired={formDynamic.isRequired}
      />
    );
  } else if (formDynamic.type === FieldType.Email) {
    return <VkxInput type="email" />;
  } else if (formDynamic.type === FieldType.Password) {
    return <VkxPasswordInput />;
  } else if (formDynamic.type === FieldType.TextArea) {
    return <VkxTextArea />;
  } else if (formDynamic.type === FieldType.Select && formDynamic.keyItems) {
    return (
      <VkxSelect
        selectItems={formDynamic.keyItems.map((x) => {
          return {
            key: x.key,
            children: x.value,
          };
        })}
        isRequired={formDynamic.isRequired}
        name={`[${index}].` + formDynamic.name}
      />
    );
  } else if (
    formDynamic.type === FieldType.MultiSelect &&
    formDynamic.keyItems
  ) {
    return (
      <VkxSelect
        selectItems={formDynamic.keyItems.map((x) => {
          return {
            key: x.key,
            children: x.value,
          };
        })}
        isRequired={formDynamic.isRequired}
        selectionMode="multiple"
      />
    );
  } else if (formDynamic.type === FieldType.Checkbox) {
    return <VkxCheckbox />;
  } else if (formDynamic.type === FieldType.Radio) {
    return (
      <VkxRadioGroup>
        <VkxRadio value="1">Option 1</VkxRadio>
        <VkxRadio value="2">Option 2</VkxRadio>
      </VkxRadioGroup>
    );
  } else if (formDynamic.type === FieldType.Date) {
    return <VkxDateInput />;
  } else if (formDynamic.type === FieldType.DateTime) {
    return (
      <VkxDatePicker
        minValue={parseDateTime("1940-01-01")}
        isRequired={formDynamic.isRequired}
        name={`[${index}].` + formDynamic.name}
      />
    );
  } else if (formDynamic.type === FieldType.RangeDateTime) {
    return <VkxDateRangePicker />;
  } else if (formDynamic.type === FieldType.Time) {
    return <VkxTimeInput />;
  } else if (formDynamic.type === FieldType.Switch) {
    return <VkxSwitch />;
  } else if (formDynamic.type === FieldType.File) {
    return <VkxFileInput />;
  } else if (formDynamic.type === FieldType.Phone) {
    return <VkxPhoneInput />;
  } else {
    return <VkxInput type="text" />;
  }
}

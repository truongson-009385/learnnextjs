"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FieldType, FormDynamic, getField } from "./form-dynamic";
import VkxIconButton from "@/components/vkx-icon-button/vkx-icon-button";
import { VkxForm } from "@/components/vkx-form/vkx-form";
import VkxButton from "@/components/vkx-button/vkx-button";
import { autoMapper, autoMapperToArray } from "@/utils/mapping-util";
import { VkxSearchInput } from "@/components/vkx-search-input/vkx-search-input";

class Student {
  name?: string = undefined;
  birthday?: Date = undefined;
  gender?: string = undefined;
  score?: number = undefined;
}

class Search {
  keyword?: string = undefined;
}

export function EnterpriseFormPage() {
  let [formDynamics, setFormDynamics] = useState<FormDynamic[]>([
    {
      id: uuidv4(),
      items: [
        {
          name: "name",
          placeholder: "Họ tên",
          type: FieldType.Text,
          isRequired: true,
        },
        {
          name: "birthday",
          placeholder: "Ngày sinh",
          type: FieldType.DateTime,
          isRequired: true,
        },
        {
          name: "gender",
          placeholder: "Giới tính",
          type: FieldType.Select,
          isRequired: true,
          keyItems: [
            {
              key: "1",
              value: "Nam",
            },
            {
              key: "2",
              value: "Nữ",
            },
          ],
        },
        {
          name: "score",
          placeholder: "Điểm số",
          isRequired: true,
          type: FieldType.Number,
        },
      ],
    },
  ]);

  return (
    <VkxForm
      onSubmit={(e) => {
        e.preventDefault();
        var a = Object.fromEntries(new FormData(e.currentTarget));
        console.log(a);
        var response = autoMapperToArray<Student>(a, new Student());
        var search = autoMapper<Search>(a, new Search());

        console.log(response);
        console.log(search);
      }}
    >
      <div className="p-3 border-1 rounded-xl border-gray-700">
        <table className="">
          <thead>
            <tr>
              <th className="pb-5">
                <VkxSearchInput
                  className="max-w-xs"
                  placeholder="Tìm kiếm"
                  name="keyword"
                ></VkxSearchInput>
              </th>
            </tr>
          </thead>

          <tbody>
            {formDynamics?.map((formDyn, indexForm) => {
              return (
                <tr key={`tr-${formDyn.id}`} className="flex gap-2 pb-2">
                  {formDyn.items.map((field, indexField) => {
                    return (
                      <td
                        key={`td-${formDyn.id}-${indexField}`}
                        className="w-48"
                      >
                        {getField(field, indexForm)}
                      </td>
                    );
                  })}
                  <td>
                    <VkxIconButton
                      aria-label="Thêm"
                      isIconOnly
                      variant="solid"
                      onPress={() => {
                        setFormDynamics([
                          ...formDynamics,
                          addRowItem(uuidv4()),
                        ]);
                      }}
                    >
                      <span className="text-lg font-bold">+</span>
                    </VkxIconButton>
                  </td>
                  <td>
                    <VkxIconButton
                      aria-label="Xóa"
                      isIconOnly
                      isDisabled={formDynamics.length < 2}
                      variant="solid"
                      onPress={(e) => {
                        setFormDynamics([
                          ...formDynamics.filter(
                            (x, index) => index != indexForm
                          ),
                        ]);
                      }}
                    >
                      <span className="text-lg font-bold">x</span>
                    </VkxIconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <VkxButton type="submit" variant="bordered">
        Submit
      </VkxButton>
    </VkxForm>
  );
}

function addRowItem(id?: string) {
  return {
    id: id,
    items: [
      {
        name: "name",
        placeholder: "Họ tên",
        type: FieldType.Text,
      },
      {
        name: "birthday",
        placeholder: "Ngày sinh",
        type: FieldType.DateTime,
      },
      {
        name: "gender",
        placeholder: "Giới tính",
        type: FieldType.Select,
        keyItems: [
          {
            key: "1",
            value: "Nam",
          },
          {
            key: "2",
            value: "Nữ",
          },
        ],
      },
      {
        name: "score",
        placeholder: "Điểm số",
        type: FieldType.Number,
      },
    ],
  };
}

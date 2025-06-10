"use client";
import React, { useState } from "react";
import { Avatar } from "@heroui/react";

import accordionItems from "../../../public/fake-data/accordions.json";


import { VkxAccordionProps } from "@/components/vkx-accordion/vkx-accordion-props";
import { VkxAccordionItemProps } from "@/components/vkx-accordion/vkx-accordion-item-props";
import { VkxAccordion } from "@/components/vkx-form";

export default function VkxAccordionPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [errors, setErrors] = React.useState({});

  var accordionItemsCustomTitle = accordionItems.map<VkxAccordionItemProps>(
    (item) => ({
      key: item.key,
      title: (
        <div className="flex items-center gap-2">
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {item.title}
          </p>
          {item.link && (
            <a
              className="text-blue-500 underline hover:text-blue-700"
              href={item.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              Learn more
            </a>
          )}
        </div>
      ),
      children: (
        <div className="text-gray-600 dark:text-gray-400">{item.content}</div>
      ),
      subtitle: item.subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {item.subtitle}
        </p>
      ),
      startContent: item.imageUrl && (
        <Avatar
          isBordered
          alt={`${item.title} image`}
          color="warning"
          radius="lg"
          src={item.imageUrl}
        />
      ),
    }),
  );

  var accordionItemsWithSubtitle = accordionItems.map((item) => ({
    key: item.key,
    title: item.title,
    children: item.content,
    subtitle: item.subtitle,
  }));

  const accordionProps: VkxAccordionProps = {
    accordionItems: accordionItems.map((item) => ({
      key: item.key,
      title: item.title,
      children: item.content,
    })),
  };
  var defaultExpandedKey = accordionItemsWithSubtitle[0].key;

  return (
    <div className="flex w-full flex-col gap-y-10 pb-8">
      <div>
        <h1 className="text-xl font-medium text-black dark:text-white">
          Trường hợp 1: chỉ chọn một
        </h1>
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Trong trường hợp này, chỉ cho phép mở một accordion item tại một
            thời điểm. Khi bạn mở một item mới, item đang mở sẽ tự động đóng
            lại. Điều này được thực hiện bằng cách sử dụng prop{" "}
            <code>selectionMode=&quot;single&quot;</code>.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Thích hợp sử dụng khi bạn muốn người dùng tập trung vào một nội dung
            tại một thời điểm.
          </p>
        </div>

        <div className="mx-auto flex pt-6">
          <VkxAccordion
            accordionItems={accordionProps.accordionItems}
            selectionMode="single"
            variant="bordered"
          />
        </div>
      </div>

      <div>
        <h1 className="text-xl font-medium text-black dark:text-white">
          Trường hợp 2: cho phép chọn nhiều
        </h1>
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Cho phép mở nhiều accordion item cùng một lúc. Người dùng có thể xem
            nhiều nội dung đồng thời. Sử dụng prop{" "}
            <code>selectionMode=&quot;multiple&quot;</code> để kích hoạt tính
            năng này.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Phù hợp cho các trường hợp người dùng cần so sánh hoặc xem nhiều
            thông tin cùng lúc.
          </p>
        </div>
        <div className="mx-auto flex pt-6">
          <VkxAccordion
            accordionItems={accordionProps.accordionItems}
            selectionMode="multiple"
            variant="bordered"
          />
        </div>
      </div>

      <div>
        <h1 className="text-xl font-medium text-black dark:text-white">
          Trường hợp 3: Sử dụng phụ đề
        </h1>
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Thêm thông tin phụ đề (subtitle) cho mỗi accordion item để cung cấp
            thêm ngữ cảnh hoặc mô tả ngắn. Phụ đề được hiển thị dưới tiêu đề
            chính và giúp người dùng hiểu rõ hơn về nội dung bên trong.
          </p>
        </div>
        <div className="mx-auto flex pt-6">
          <VkxAccordion
            accordionItems={accordionItemsWithSubtitle}
            variant="bordered"
          />
        </div>
      </div>

      <div>
        <h1 className="text-xl font-medium text-black dark:text-white">
          Trường hợp 4: Mặc định chọn một phần tử
        </h1>
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Có thể cấu hình accordion để mặc định mở một hoặc nhiều item khi
            trang được tải. Sử dụng prop <code>defaultExpandedKeys</code> và
            truyền vào một Set chứa các key của các item cần mở.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Hữu ích khi bạn muốn hiển thị một số nội dung quan trọng ngay từ
            đầu.
          </p>
        </div>
        <div className="mx-auto flex pt-6">
          <VkxAccordion
            accordionItems={accordionItemsWithSubtitle}
            defaultExpandedKeys={new Set([defaultExpandedKey])}
            variant="bordered"
          />
        </div>
      </div>

      <div>
        <h1 className="text-xl font-medium text-black dark:text-white">
          Trường hợp 5: Không cho phép chọn một phần tử
        </h1>
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Vô hiệu hóa khả năng mở/đóng của một số accordion item cụ thể. Sử
            dụng prop <code>disabledKeys</code> và truyền vào một Set chứa các
            key của các item cần vô hiệu hóa.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Thích hợp khi một số nội dung tạm thời không khả dụng hoặc không cho
            phép truy cập.
          </p>
        </div>
        <div className="mx-auto flex pt-6">
          <VkxAccordion
            accordionItems={accordionItemsWithSubtitle}
            disabledKeys={new Set([defaultExpandedKey])}
            variant="bordered"
          />
        </div>
      </div>

      <div>
        <h1 className="text-xl font-medium text-black dark:text-white">
          Trường hợp 6: Điều khiển sự kiện chọn
        </h1>
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Theo dõi và xử lý sự kiện khi người dùng mở/đóng các accordion item.
            Sử dụng prop <code>onSelectionChange</code> để nhận callback mỗi khi
            có thay đổi.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Cho phép bạn thực hiện các hành động tùy chỉnh như theo dõi hành vi
            người dùng hoặc đồng bộ hóa trạng thái.
          </p>
        </div>
        <div className="mx-auto flex pt-6">
          <VkxAccordion
            accordionItems={accordionItemsWithSubtitle}
            variant="bordered"
            onSelectionChange={(keys) => {
              // console.log(keys);
              setSelected(keys as Set<string>);
            }}
          />
        </div>
        <div className="pt-3">
          <h1 className="text-xl font-medium text-black dark:text-white">
            Các keys đã chọn:{" "}
          </h1>
          {Array.from(selected).map((item) => (
            <span key={item}>
              Key: {item} <br />
            </span>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-xl font-medium text-black dark:text-white">
          Trường hợp 7: Tùy chỉnh giao diện với HTML
        </h1>
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            Tùy chỉnh giao diện của accordion items bằng cách sử dụng HTML và
            các component tùy chỉnh. Có thể thêm hình ảnh, biểu tượng, liên kết
            và các thành phần giao diện khác.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Giúp tạo ra giao diện phong phú và tương tác tốt hơn cho người dùng.
          </p>
        </div>
        <div className="mx-auto flex pt-6">
          <VkxAccordion
            accordionItems={accordionItemsCustomTitle}
            variant="bordered"
          />
        </div>
      </div>

      <div className="mt-12">
        <h1 className="text-2xl font-medium text-black dark:text-white mb-6">
          Tài liệu về các thuộc tính (Props)
        </h1>

        <h2 className="text-xl font-medium text-black dark:text-white mt-8 mb-4">
          VkxAccordion Props
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                  Thuộc tính
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                  Kiểu dữ liệu
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                  Mặc định
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                  Mô tả
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>accordionItems</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>VkxAccordionItemProps[]</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>[]</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Mảng các item sẽ được hiển thị trong accordion
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>selectionMode</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>&quot;single&quot; | &quot;multiple&quot;</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>&quot;single&quot;</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Chế độ chọn: một item hoặc nhiều item cùng lúc
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>variant</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>
                    &quot;light&quot; | &quot;bordered&quot; |
                    &quot;shadow&quot;
                  </code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>&quot;light&quot;</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Kiểu hiển thị của accordion
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>defaultExpandedKeys</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>Set&lt;string&gt;</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>new Set()</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Các item sẽ được mở mặc định khi khởi tạo
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>disabledKeys</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>Set&lt;string&gt;</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>new Set()</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Các item sẽ bị vô hiệu hóa, không thể mở/đóng
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>onSelectionChange</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>(keys: Set&lt;string&gt;) =&gt; void</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  -
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Callback được gọi khi có item được mở hoặc đóng
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>isCompact</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>boolean</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  -
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Xác định xem accordion có hiển thị ở chế độ nhỏ gọn (compact)
                  hay không. Khi được bật, các item sẽ chiếm ít không gian hơn.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>selectedKeys</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>Set&lt;string&gt;</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  -
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Xác định các item đang được chọn trong accordion. Giá trị là
                  một Set chứa các key của các item được chọn. Thích hợp khi bạn
                  muốn kiểm soát trạng thái chọn từ bên ngoài.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-medium text-black dark:text-white mt-8 mb-4">
          VkxAccordionItem Props
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                  Thuộc tính
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                  Kiểu dữ liệu
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                  Bắt buộc
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">
                  Mô tả
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900">
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>key</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>string</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Có
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Định danh duy nhất cho mỗi item trong accordion
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>title</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>string | ReactNode</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Có
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Tiêu đề của item, có thể là text hoặc JSX
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>subtitle</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>string | ReactNode</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Không
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Phụ đề hiển thị dưới tiêu đề chính
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>children</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>ReactNode</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Có
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Nội dung sẽ hiển thị khi item được mở
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>startContent</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>ReactNode</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Không
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Nội dung hiển thị bên trái tiêu đề (ví dụ: icon, avatar)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>endContent</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <code>ReactNode</code>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Không
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  Nội dung hiển thị bên phải tiêu đề
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">
            Lưu ý về ReactNode
          </h3>
          <p className="text-blue-700 dark:text-blue-300">
            Các thuộc tính có kiểu <code>ReactNode</code> cho phép bạn truyền
            vào:
          </p>
          <ul className="list-disc list-inside mt-2 text-blue-600 dark:text-blue-300">
            <li>Chuỗi văn bản đơn giản</li>
            <li>Số</li>
            <li>Phần tử JSX/TSX</li>
            <li>Component React</li>
            <li>null hoặc undefined</li>
            <li>Mảng các phần tử trên</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// const AnchorIcon = (
//   props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
// ) => {
//   return (
//     <svg
//       aria-hidden="true"
//       focusable="false"
//       height="24"
//       role="presentation"
//       viewBox="0 0 24 24"
//       width="24"
//       {...props}
//     >
//       <path
//         d="M8.465,11.293c1.133-1.133,3.109-1.133,4.242,0L13.414,12l1.414-1.414l-0.707-0.707c-0.943-0.944-2.199-1.465-3.535-1.465 S7.994,8.935,7.051,9.879L4.929,12c-1.948,1.949-1.948,5.122,0,7.071c0.975,0.975,2.255,1.462,3.535,1.462 c1.281,0,2.562-0.487,3.536-1.462l0.707-0.707l-1.414-1.414l-0.707,0.707c-1.17,1.167-3.073,1.169-4.243,0 c-1.169-1.17-1.169-3.073,0-4.243L8.465,11.293z"
//         fill="currentColor"
//       />
//       <path
//         d="M12,4.929l-0.707,0.707l1.414,1.414l0.707-0.707c1.169-1.167,3.072-1.169,4.243,0c1.169,1.17,1.169-3.073,0-4.243 l-2.122,2.121c-1.133,1.133-3.109,1.133-4.242,0L10.586,12l-1.414,1.414l0.707,0.707c0.943,0.944,2.199,1.465,3.535,1.465 s2.592-0.521,3.535-1.465L19.071,12c1.948-1.949,1.948-5.122,0-7.071C17.121,2.979,13.948,2.98,12,4.929z"
//         fill="currentColor"
//       />
//     </svg>
//   );
// };

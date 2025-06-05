'use client'
import { Card } from "@heroui/react";
import { VkxSpacer } from "@/components/vkx-spacer/vkx-spacer";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { spacerPropsData } from "./table-data";

export const CustomCard = () => (
    <Card className="w-[200px] space-y-5 p-4 radius-lg">
        <div className="h-24 rounded-lg bg-default-300" />
        <div className="space-y-3">
            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </div>
    </Card>
);

export default function VkxSpacerPage() {
    //khai báo cho bảng giá trị bên dưới, không phải cho component
    const spaceValues: (number | string)[] = [
        0, "px", 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96
    ];

    return (
        <div className="flex w-full flex-col gap-y-10 pb-8">
            <h1 className="text-3xl font-medium text-black dark:text-white mb-2">
                <strong>
                    Spacer
                </strong>
            </h1>
            <p>
                Là một thành phần dùng để tạo khoảng cách giữa các phần tử. Spacer có thể được sử dụng để tạo khoảng cách theo chiều ngang hoặc chiều dọc, giúp cho việc bố trí các phần tử trở nên dễ dàng hơn.
            </p>

            <div>
                <h1 className="text-xl font-medium text-black dark:text-white mb-3">
                    1. Thuộc tính x
                </h1>
                <p className="mt-4 flex flex-col gap-y-2 mb-3">
                    Thuộc tính x định nghĩa khoảng cách giữa các phần tử theo chiều ngang. Giá trị có thể là một số nguyên hoặc số thực, và có thể được sử dụng để tạo khoảng cách giữa các phần tử trong layout.
                </p>
                <div className="flex">
                    <CustomCard />
                    <VkxSpacer x={8} />
                    <CustomCard />
                    <VkxSpacer x={4} />
                    <CustomCard />
                </div>
            </div>

            <div>
                <h1 className="text-xl font-medium text-black dark:text-white mb-3">
                    2. Thuộc tính y
                </h1>
                <p className="mt-4 flex flex-col gap-y-2 mb-3">
                    Thuộc tính y định nghĩa khoảng cách giữa các phần tử theo chiều dọc. Giá trị có thể là một số nguyên hoặc số thực, và có thể được sử dụng để tạo khoảng cách giữa các phần tử trong layout.
                </p>
                <div>
                    <div className="flex flex-col items-center">
                        <CustomCard />
                        <VkxSpacer y={4} />
                        <CustomCard />
                        <VkxSpacer y={12} />
                        <CustomCard />
                    </div>
                </div>
            </div>

            <div>
                <div className="p-4 sm:p-6 lg:p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Spacer (thuộc tính)</h2>
                    <Table aria-label="Bảng thuộc tính của Modal HeroUI">
                        <TableHeader>
                            <TableColumn className="font-semibold text-lg text-gray-700 dark:text-gray-200">Thuộc tính</TableColumn>
                            <TableColumn className="font-semibold text-lg text-gray-700 dark:text-gray-200">Type</TableColumn>
                            <TableColumn className="font-semibold text-lg text-gray-700 dark:text-gray-200">Mặc định</TableColumn>
                            <TableColumn className="font-semibold text-lg text-gray-700 dark:text-gray-200">Công dụng</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {spacerPropsData.map((prop, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-gray-700 dark:text-gray-300 font-mono text-sm">{prop.prop}</TableCell>
                                    <TableCell className="text-blue-600 dark:text-blue-300 font-mono text-sm">{prop.type}</TableCell>
                                    <TableCell className="text-green-600 dark:text-green-300 font-mono text-sm">{prop.default}</TableCell>
                                    <TableCell className="text-gray-600 dark:text-gray-400 text-sm">{prop.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div>
                <div className="p-6 max-w-3xl mx-auto">
                    <h1 className="text-2xl font-bold mb-4">Giá trị Spacer</h1>
                    <Table aria-label="Space values table" className="w-full">
                        <TableHeader>
                            <TableColumn className="font-semibold text-lg text-gray-700 dark:text-gray-200">Giá trị</TableColumn>
                            <TableColumn className="font-semibold text-lg text-gray-700 dark:text-gray-200">Mô tả</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {spaceValues.map((value, index) => (
                                <TableRow key={index}>
                                    <TableCell>{value}</TableCell>
                                    <TableCell className="text-gray-700 dark:text-gray-300 font-mono text-sm">
                                        {value === "px"
                                            ? "1 pixel"
                                            : typeof value === "number"
                                                ? `Đơn vị khoảng cách: ${value} - theo Tailwind CSS ${value * 4}px `
                                                : `Đơn vị khoảng cách: ${value}`}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

"use client"; 
import Company from "@/src/entities/Company";
import { useRouter } from 'next/navigation';
import HttpUtils from "@/utils/http-util";
import { useEffect, useRef, useState } from "react";
import { ResponseErrorAPI } from "@/src/Interface/ResponseErrorAPI";
import { VkxDatePicker } from "@/components/vkx-date-picker/vkx-date-picker";
import { now, parseDate, today } from "@internationalized/date";
import { VkxInput } from "@/components/vkx-input";
import VkxButton from "@/components/vkx-button/vkx-button";
import VkxDatatableGet, {DataTableHandle} from "@/components/vkx-datatableGet/vkx-data-table-get";  
import { VkxNumberInput } from "@/components/vkx-number-input/vkx-number-input";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  DateValue,
  Spinner,
  getKeyValue
} from "@heroui/react";
import TablePagination from "@/components/vkx-pagination/vkx-pagination";


  type SearchForm = {
    name: string;
    address: string;
    phone: string;
    time: DateValue | null;
  }
  export default function CarListPage() {
    const [Companys, setCompany] = useState<Company[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const [error, setError] = useState<ResponseErrorAPI | null>(null);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [searchForm,setSearchFrom] = useState<SearchForm>(
      {
        name: '',
        address: '',
        phone: '',
        time: now('UTC'), // Khởi tạo với ngày hiện tại
      }
    );

    const tableRef = useRef<DataTableHandle>(null);
    const handleSearchClick = () => {
      tableRef.current?.search()
    }

    const columnsDatatable = [
      { name: 'Id', value: 'id' },
      { name: 'Tên', value: 'name' },
      { name: 'Email', value: 'email' },
      { name: 'Địa chỉ', value: 'address' },
      { name: 'Số điện thoại', value: 'phone' },
      { name: "Hành động", value: "actions" },
    ] 

    const minValue = parseDate("2020-01-01");
      const maxValue = parseDate("2030-12-31");
      const placeholderDate = today("UTC");


    let HostUrl = process.env.NODE_ENV === 'development' 
                   ?  process.env.NEXT_PUBLIC_URL_DEV as string 
                   : process.env.NEXT_PUBLIC_URL_PRODUCTION as string;
   
    
    const handleCreateNew = () => {
      // chuyển về màn hình create
      router.push('/cars/create');
    };

    // Hàm xử lý thay đổi giá trị trong ô input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchFrom(prev => (
          { ...prev, [e.target.name]: e.target.value }
        ));
    };

    // Hàm xử lý thay đổi giá trị trong ô input date số
    const handleDateChange = (date: DateValue | null) => {
      setSearchFrom(prev => ({ ...prev, time: date }));
    };

    // Hàm fetchData sẽ gọi API để lấy dữ liệu và cập nhật state
    const fetchData = async () => {
              setLoading(true)
              try {
                const query = new URLSearchParams({ pageNumber: page.toString(), pageSize: pageSize.toString(), ...search }).toString();
                const fullUrl = `${HostUrl + 'company'}?${query}`;
                const reponse = await HttpUtils.get<Company>(fullUrl);
                if (reponse && reponse.items) {
                  setCompany(reponse.items as Company[])
                  setTotal(reponse.totalCount || 0)
                } else {
                  console.warn('Dữ liệu không hợp lệ:', reponse)
                }
              } catch (err) {
                console.error('Lỗi khi tải dữ liệu:', err)
              } finally {
                setLoading(false)
              }
            }
    

    const navigateToDetail = (id: number) => {
      debugger
      // Dùng router.push() để chuyển hướng đến trang chi tiết
      router.push(`/cars/${id}`);
    };

    const deleteById = async(id: number) => {
        try {
               let apiUrl = HostUrl + "company"; // Xác định URL API
               const result = await HttpUtils.delete<Company>(apiUrl, id.toString());
               handleSearchClick();
               localStorage.setItem("IDDelete",id.toString());
           } catch (error) {
               console.error("Error calling API:", error);
           }
    };
    // chạy 1 lần mỗi khi Companys Thay đổi
    useEffect(() => {
      fetchData();
      console.log("kết quả trả về: ", Companys);
    }, [page, pageSize, searchForm, total]);

    const search = () => {
      // Xử lý tìm kiếm ở đây
      debugger
      console.log("Tìm kiếm với dữ liệu:", searchForm);
      // Gọi API hoặc lọc dữ liệu dựa trên searchForm
      // Ví dụ: fetchData(searchForm);
    };

    // Hàm để lấy giá trị của mỗi cột trong bảng
    const getKeyValue = (item: any, columnKey: React.Key) => {
      if (columnKey === "actions") {
        return (
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="ghost"
              onPress={() => navigateToDetail(item.id)}
            >
              Xem
            </Button>
            <Button
              size="sm"
              color="danger"
              variant="flat"
              onPress={() => deleteById(item.id)}
            >
              Xóa
            </Button>
          </div>
        );
      }
      return item[columnKey as string];
    };
    

    if (error) {
    return (
      <div className="p-6 bg-red-100 text-red-800 rounded">
        <h2>❌ Lỗi tải dữ liệu</h2>
        <p>{error.message}</p>
        <p>{error.statusCode}</p>
        <button onClick={() => {
          setError(null);
          handleSearchClick();
        }}>
          Thử lại
        </button>
      </div>
    );
    }
    

    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Danh sách đơn vị</h1>
        <div className="border border-gray-300 rounded-xl p-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div>
              <VkxInput label="Name" type="text" name="name" value={searchForm.name} onChange={handleChange}  />
            </div>
            <div>
              <VkxInput label="Địa chỉ" type="text" name="address" value={searchForm.address} onChange={handleChange} />
            </div>
            <div>
              <VkxDatePicker
                        className="max-w-xs"
                        label="Chọn ngày sinh"
                        minValue={minValue}
                        placeholder={placeholderDate}
                        value={searchForm.time}
                        onChange={handleDateChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div>
              <VkxInput label="Name" type="text" name="name" value={searchForm.name} onChange={handleChange}  />
            </div>
            <div>
              <VkxInput label="Địa chỉ" type="text" name="address" value={searchForm.address} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
           <VkxButton onPress={search} >
              Tìm kiếm
           </VkxButton>
          </div>
        </div>
        {/* {tìm kiếm} */}
        <button
          onClick={handleCreateNew}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Tạo mới
        </button>


        <Table isStriped
          bottomContent={
            <TablePagination
                page={page}
                totalPages={Math.ceil(total / pageSize)}
                pageSize={pageSize}
                onPageChange={setPage}
                onPageSizeChange={(newSize) => {
                  setPageSize(newSize);
                  setPage(1); // reset về trang đầu khi đổi size
                }}
            />
              }> 
            {/* Bảng dữ liệu với isStriped = thuộc tính đổi màu giữa các dòng */}
            <TableHeader columns={columnsDatatable}> 
                {/* Hiển thị tiêu đề cột và key thuộc tính trong đối tượng dữ liệu*/}
                {(column) => (
                  <TableColumn key={column.value}>{column.name}</TableColumn>
                )}
            </TableHeader>
            <TableBody items={Companys}isLoading={loading}loadingContent={<Spinner label="Đang tải dữ liệu..." />}>   
                {(item) => (
                    <TableRow key={item.id}>    
                        {(columnKey) => (
                          <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
          </Table>
        
        {/* <VkxDatatableGet
          objectdata = {Company}
          ref={tableRef}
          dataUrl="company"
          columns={columnsDatatable}
          search={searchForm}
          renderActions={(item: Company) => (
            <div className="space-x-2">
              <button className="text-blue-600 underline">Xem</button>
              <button className="text-red-600 underline">Xóa</button>
            </div>
          )}
        /> */}

      </main>
    );
  }
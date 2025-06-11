'use client'

import HttpUtils from '@/utils/http-util';
import { DateValue } from '@heroui/react';
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react'

//Khai báo kiểu dữ liệu cho cột có dạng key-value
type Column = { name: string; value: string } 

//Khai báo kiểu dữ liệu cho hàm renderActions
export type DataTableHandle = {
  search: () => void // Hàm này sẽ được gọi khi người dùng muốn tìm kiếm dữ liệu
}

// Component DataTableProps sẽ nhận vào các props cần thiết để hiển thị bảng dữ liệu
type DataTableProps = {
  objectdata: object // Dữ liệu mẫu để xác định kiểu dữ liệu của bảng
  dataUrl: string // URL để lấy dữ liệu từ API
  columns: Column[] // Mảng các cột để hiển thị trong bảng, mỗi cột có tên và giá trị tương ứng
  search?: Record<string, string | number | DateValue| null> // Thông tin tìm kiếm, có thể là các trường như từ khóa, ngày tháng, v.v.
  renderActions?: (item: any) => React.ReactNode // Hàm để render các hành động cho mỗi dòng dữ liệu, ví dụ: nút sửa, xóa, v.v.
}


// Component DataTable sẽ sử dụng forwardRef để có thể expose các hàm ra ngoài
const DataTable = forwardRef<DataTableHandle, DataTableProps>(
  ({objectdata, dataUrl, columns, search = {}, renderActions }, ref) => {
    const [data, setData] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)

    let HostUrl = process.env.NODE_ENV === 'development' 
                   ?  process.env.NEXT_PUBLIC_URL_DEV as string 
                   : process.env.NEXT_PUBLIC_URL_PRODUCTION as string;

    // Hàm fetchData sẽ gọi API để lấy dữ liệu và cập nhật state
    const fetchData = async () => {
      setLoading(true)
      try {
        
        const query = new URLSearchParams({ pageNumber: page.toString(), pageSize: pageSize.toString(), ...search }).toString();
        const fullUrl = `${HostUrl + dataUrl}?${query}`;
        const reponse = await HttpUtils.get<typeof objectdata>(fullUrl);
        if (reponse && reponse.items) {
          setData(reponse.items as any[])
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

    // expose search() ra ngoài
    useImperativeHandle(ref, () => ({
      search: () => {
        setPage(1) // reset về trang đầu
        fetchData()
      },
    }))

    // khi đổi trang/pageSize thì tự fetch
    useEffect(() => {
      fetchData()
    }, [page, pageSize])

    const totalPages = Math.ceil(total / pageSize)

    return (
      <div className="rounded border shadow p-4 space-y-4">
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <>
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  {columns.map(col => (
                    <th key={col.value} className="text-left px-4 py-2 border-b">{col.name}</th>
                  ))}
                  {renderActions && <th className="px-4 py-2 border-b">Hành động</th>}
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {columns.map(col => (
                      <td key={col.value} className="px-4 py-2 border-b">{item[col.value]}</td>
                    ))}
                    {renderActions && (
                      <td className="px-4 py-2 border-b">{renderActions(item)}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <label>
                  Hiển thị:&nbsp;
                  <select value={pageSize} onChange={e => { setPage(1); setPageSize(parseInt(e.target.value)) }} className="border px-2 py-1 rounded">
                    {[5, 10, 20].map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select> dòng
                </label>
              </div>
              <div className="space-x-2">
                <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="border px-3 py-1 rounded disabled:opacity-50">Trước</button>
                <span>Trang {page}/{totalPages}</span>
                <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="border px-3 py-1 rounded disabled:opacity-50">Sau</button>
              </div>
              
            </div>
          </>
        )}
      </div>
    )
  }
)

export default DataTable

// components/TablePagination.tsx
import { Pagination, Select, SelectItem, Button } from "@heroui/react";

type TablePaginationProps = {
  page: number; // số trang hiện tại
  totalPages: number; // tổng số trang
  pageSize: number; // số lượng dòng trên mỗi trang
  pageSizeOptions?: number[]; // các tùy chọn kích thước trang có thể chọn
  onPageChange: (page: number) => void; // hàm gọi khi thay đổi trang
  onPageSizeChange: (size: number) => void; // hàm gọi khi thay đổi kích thước trang
};

export default function TablePagination({
  page, 
  totalPages,
  pageSize,
  pageSizeOptions = [5, 10, 20], // các tùy chọn kích thước trang mặc định
  onPageChange,
  onPageSizeChange,
}: TablePaginationProps) {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <div className="flex items-center gap-2 text-sm text-default-500">
        <span>Hiển thị:</span>
        {/* Select của HeroUI để chọn số dòng hiển thị trên một trang */}
        <Select
            // selectedKeys là tập hợp các key đang được chọn, ở đây là pageSize chuyển thành string
            selectedKeys={new Set([pageSize.toString()])}
            // Xử lý sự kiện khi người dùng chọn thay đổi giá trị trong select
            onSelectionChange={(keys) => {
            // keys là tập hợp các key được chọn (ở đây chỉ một)
              const selected = Array.from(keys)[0];
              // Chuyển string sang number rồi gọi callback thay đổi kích thước trang
              if (selected) onPageSizeChange(parseInt(selected as string));
            }}
            size="sm"
            className="w-20"
            >      
            {/* Duyệt qua các tùy chọn pageSizeOptions để tạo các SelectItem */}     
            {pageSizeOptions.map((size) => (
              <SelectItem key={size.toString()} textValue={size.toString()}> {/*Select của heroUI không nhận giá trị value => dùng textValue để hiển thị lựa chọn */}
                {/* Hiển thị giá trị số dòng */}
                {size}
              </SelectItem>
            ))}
        </Select>
        <span>dòng</span>
      </div>

      {/* Hiển thị phân trang
          - Nếu tổng số trang lớn hơn 5, dùng phân trang chuẩn với các nút điều khiển (showControls) của HeroUI.
          - Lưu ý: showControls có thể gây lỗi khi tổng số trang nhỏ hơn 3, nên tránh dùng khi trang ít.
          - Nếu tổng số trang nhỏ hơn hoặc bằng 5, dùng phân trang có vòng lặp (loop), giao diện đơn giản và an toàn hơn.
          - initialPage được set bằng page hiện tại để đồng bộ trạng thái phân trang.
        */}
      {totalPages > 5 ? (
          <Pagination
            isCompact
            showControls
            color="primary"
            page={page}
            total={totalPages}
            onChange={onPageChange}
          />
        ) : (
          <Pagination
            loop
            color="success"
            initialPage={1}
            total={totalPages}
            page={page}
            onChange={onPageChange}
          />
        )}

      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button
          isDisabled={page <= 1}
          size="sm"
          variant="flat"
          onPress={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          isDisabled={page >= totalPages}
          size="sm"
          variant="flat"
          onPress={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

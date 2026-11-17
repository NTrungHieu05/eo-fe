import { useEffect, useState } from 'react';

/**
 * Phân trang ở giao diện cho bảng antd: dữ liệu đã tải đủ, chỉ chia trang khi hiển thị.
 * Trả về `pagination` để truyền thẳng vào <Table> và `rowNumber` để đánh STT liên tục qua các trang.
 */
export const useTablePagination = (total: number, unit = 'mục', defaultPageSize = 20) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);

  // Xóa hết dòng ở trang cuối thì lùi về trang cuối còn dữ liệu.
  useEffect(() => {
    const lastPage = Math.max(1, Math.ceil((total || 0) / pageSize));
    if (page > lastPage) {
      setPage(lastPage);
    }
  }, [total, pageSize]);

  const pagination = {
    current: page,
    pageSize,
    total: total || 0,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    showTotal: (count: number, [from, to]: [number, number]) => `${from}–${to} / ${count} ${unit}`,
    onChange: (nextPage: number, nextSize: number) => {
      setPage(nextSize !== pageSize ? 1 : nextPage);
      setPageSize(nextSize);
    },
  };

  const rowNumber = (index: number) => (page - 1) * pageSize + index + 1;

  return { pagination, rowNumber, page, pageSize, setPage };
};

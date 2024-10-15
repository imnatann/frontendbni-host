// src/components/TableEDC.tsx

import DataTable from "@smpm/components/DataTable";
import { ElectronicDataCaptureMachine } from "@smpm/models/edcTerpasangModel";
import { getDataEDC } from "@smpm/services/edcTerpasangService";
import { useDebounce } from "@smpm/utils/useDebounce";
import useTableHelper from "@smpm/utils/useTableHelper";
import { useQuery } from "@tanstack/react-query";
import { ColumnsType } from "antd/es/table";
import { useMemo, useState } from "react";
import { Input } from "antd";

const TableEDC = () => {
  const { tableFilter } = useTableHelper<ElectronicDataCaptureMachine>({pagination : true});

  const [search, setSearch] = useState<string>("");

  const searchValue = useDebounce(search, 500);

  const onSearch = (value: string) => setSearch(value);

  const { data: edc, isLoading } = useQuery({
    queryKey: ["edc", { ...tableFilter, search: searchValue }],
    queryFn: () =>
      getDataEDC({
        order: tableFilter.sort.order,
        order_by: tableFilter.sort.order_by,
        search: searchValue,
        search_by: tableFilter.searchBy,
        page: Number(tableFilter.pagination.current),
        take: Number(tableFilter.pagination.pageSize),
      }),
    keepPreviousData: true, // Untuk menghindari flickering saat pagination berubah
  });

  const columns: ColumnsType<ElectronicDataCaptureMachine> = useMemo((): ColumnsType<ElectronicDataCaptureMachine> => {
    return [
      {
        title: "Serial Number",
        dataIndex: "serial_number",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "TID",
        dataIndex: "tid",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Merk EDC",
        dataIndex: "brand",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Tipe EDC",
        dataIndex: "brand_type",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Wilayah",
        dataIndex: "region",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Status Kepemilikan",
        dataIndex: "status_owner",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Kondisi",
        dataIndex: "status_machine_desc",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Provider Simcard",
        dataIndex: "simcard_provider",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "No Simcard",
        dataIndex: "simcard_number",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Status Mesin",
        dataIndex: "status_machine",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Aktif",
        dataIndex: "status_active",
        render: (text, record) => (record.status_active ? "Ya" : "Tidak"),
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      // Tambahkan kolom lain sesuai kebutuhan
    ];
  }, []);

  return (
    <>
      <Input.Search
        placeholder="Cari EDC Terpasang"
        onSearch={onSearch}
        enterButton
        style={{ marginBottom: 16, width: 300 }}
        allowClear
      />
      <DataTable<ElectronicDataCaptureMachine>
        dataSource={edc?.result.data}
        pagination={{
          current: edc?.result.meta.page,
          pageSize: edc?.result.meta.take,
          total: edc?.result.meta.item_count,
        }}
        loading={isLoading}
        bordered
        columns={columns}
        useGlobalSearchInput={false} // Karena kita sudah menggunakan Input.Search
        // Jika DataTable Anda mendukung callback untuk perubahan sort/pagination, pastikan untuk menghubungkannya dengan useTableHelper
      />
    </>
  );
};

export default TableEDC;
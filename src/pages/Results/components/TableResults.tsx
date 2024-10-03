
import React, { useMemo, useState } from 'react';
import DataTable from "@smpm/components/DataTable";
import { IResultsModel } from "@smpm/models/resultsModel";
import { getResults } from "@smpm/services/resultsService";
import { useDebounce } from "@smpm/utils/useDebounce";
import useTableHelper from "@smpm/utils/useTableHelper";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "antd";
import { ColumnsType } from "antd/es/table";
import * as dayjs from "dayjs";

interface ITableResultsProps {
  filter?: any;
}

const TableResults: React.FC<ITableResultsProps> = ({ filter }) => {
  const { tableFilter, onChangeTable, onChangeSearchBy } = useTableHelper<IResultsModel>();

  const [search, setSearch] = useState<string>("");

  const searchValue = useDebounce(search, 500);

  const onSearch = (value: string) => setSearch(value);

  const {
    data: results,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["results", { ...tableFilter, searchValue, ...filter }],
    queryFn: () =>
      getResults({
        order: tableFilter.sort.order,
        order_by: tableFilter.sort.order_by,
        search: searchValue,
        search_by: tableFilter.searchBy,
        page: parseInt(tableFilter.pagination.current),
        take: parseInt(tableFilter.pagination.pageSize),
        ...filter,
      }),
  });

  const columns: ColumnsType<IResultsModel> = useMemo(
    (): ColumnsType<IResultsModel> => {
      return [
        {
          title: "NO. HASIL",
          dataIndex: "no",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          width: 300,
        },
        {
          title: "JENIS HASIL",
          dataIndex: "type",
          sorter: true,
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "WILAYAH",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (record) => {
            return record.region.name;
          },
        },
        {
          title: "VENDOR",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (record) => {
            return record.vendor.name;
          },
        },
        {
          title: "TANGGAL",
          dataIndex: "date",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (date) => {
            return dayjs(date).format("DD-MMM-YYYY");
          },
        },
        {
          title: "MID",
          dataIndex: "mid",
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
          title: "NAMA MERCHANT",
          dataIndex: "merchant_name",
          sorter: true,
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "ALAMAT",
          dataIndex: "address",
          sorter: true,
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "KATEGORI MERCHANT",
          dataIndex: "merchant_category",
          sorter: true,
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "STATUS",
          dataIndex: "status",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (status) => {
            return status === "Selesai" ? (
              <Badge color="green" text={status} />
            ) : (
              <Badge color="orange" text={status} />
            );
          },
        },
      ];
    },
    []
  );

  return (
    <DataTable<IResultsModel>
      dataSource={results?.result.data}
      pagination={{
        current: results?.result.meta.page,
        pageSize: results?.result.meta.take,
        total: results?.result.meta.item_count,
      }}
      loading={isLoading}
      bordered
      onChangeSearchBy={onChangeSearchBy}
      searchByOptions={[
        { name: "NO. HASIL", value: "no" },
        { name: "Jenis", value: "type" },
        { name: "Wilayah", value: "region.name" },
        { name: "Vendor", value: "vendor.name" },
        { name: "MID", value: "mid" },
        { name: "TID", value: "tid" },
        { name: "Nama Merchant", value: "merchant_name" },
        { name: "Kategori Merchant", value: "merchant_category" },
        { name: "Status", value: "status" },
      ]}
      onGlobalSearch={onSearch}
      columns={columns}
      useGlobalSearchInput
      onChange={onChangeTable}
      scroll={{
        x: 2000,
      }}
    />
  );
};

export default TableResults;

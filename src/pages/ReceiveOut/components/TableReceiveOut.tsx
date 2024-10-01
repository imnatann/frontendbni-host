import DataTable from "@smpm/components/DataTable";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import React, { useMemo } from "react";

const data = [
  {
    tid: "YM1123232",
    brand: "INGENICO",
    brand_type: "MOVE 200",
    out_at: new Date(),
  },
  {
    tid: "PX22343",
    brand: "PAX",
    brand_type: "D210",
    out_at: new Date(),
  },
];

const TableReceiveIn = () => {
  const columns = useMemo((): ColumnsType<any> => {
    return [
      {
        title: "TID",
        dataIndex: "tid",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Merk",
        dataIndex: "brand",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Jenis Merk",
        dataIndex: "brand_type",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Out At",
        dataIndex: "out_at",
        sorter: true,
        sortDirections: ["descend", "ascend"],
        render: (value, record) => {
          return moment(value).format("DD MMMM YYYY");
        },
      },
    ];
  }, []);

  return (
    <DataTable
      dataSource={data}
      columns={columns}
      useGlobalSearchInput
      bordered
    />
  );
};

export default TableReceiveIn;

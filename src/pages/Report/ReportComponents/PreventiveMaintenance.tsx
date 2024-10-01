import { Card, DatePicker, Flex, Select, Space, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import DataTable, {
  getColumnFilter,
  getColumnSearchProps,
} from "@smpm/components/DataTable";
import { Option } from "antd/es/mentions";
import { IconSearch } from "@tabler/icons-react";
import useTableHelper from "@smpm/utils/useTableHelper";
import PageContent from "@smpm/components/PageContent";
import FilterTable, { TOptions } from "./FilterTable";
import { useState } from "react";

interface DataType {
  key: string;
  ticket_number: string;
  mid: string;
  tid: string;
  merchant: string;
  vendor_name: string;
  vendor_code: string;
  kantor_wilayah: string;
}

const data: DataType[] = [
  {
    key: "1",
    ticket_number: "PMW012022100300001",
    mid: "201900091",
    tid: "201900091",
    merchant: "General Electric",
    vendor_name: "PT SWADHARMA SARANA INFORMATIKA",
    vendor_code: "BW",
    kantor_wilayah: "Kantor Wilayah 01",
  },
  {
    key: "2",
    ticket_number: "PMW012022100300002",
    mid: "654856778",
    tid: "654856778",
    merchant: "Gillette",
    vendor_name: "PT SWADHARMA SARANA INFORMATIKA",
    vendor_code: "BW",
    kantor_wilayah: "Kantor Wilayah 01",
  },
  {
    key: "3",
    ticket_number: "PMW012022100300003",
    mid: "8787451988",
    tid: "8787451988",
    merchant: "Mitsubishi",
    vendor_name: "PT SWADHARMA SARANA INFORMATIKA",
    vendor_code: "BW",
    kantor_wilayah: "Kantor Wilayah 01",
  },
];

const optionStatus: TOptions[] = [
  {
    label: "All Status",
    value: "All Status",
  },
  {
    label: "Aktif",
    value: "Aktif",
  },
  {
    label: "Tidak Aktif",
    value: "Tidak Aktif",
  },
];

const optionWilayah: TOptions[] = [
  {
    label: "All Wilayah",
    value: "All Status",
  },
  {
    label: "Kantor Wilayah 01",
    value: "W01",
  },
  {
    label: "Kantor Wilayah 02",
    value: "W02",
  },
  {
    label: "Kantor Wilayah 03",
    value: "W03",
  },
];

const optionVendor: TOptions[] = [
  {
    label: "All Vendor",
    value: "All Vendor",
  },
  {
    label: "PT SWADHARMA SARANA INFORMATIKA",
    value: "BW",
  },
  {
    label: "PT INGENICO INTERNATIONAL INDONESIA",
    value: "IG",
  },
  {
    label: "PT PRIMA VISTA SOLUSI",
    value: "BP",
  },
];

const optionMerchant: TOptions[] = [
  {
    label: "All Merchant",
    value: "All Merchant",
  },
  {
    label: "PONDOK MAHONI MBL ",
    value: "201203817",
  },
  {
    label: "MARANATHA PONSEL MBL",
    value: "201042538",
  },
  {
    label: "MARANATHA BABY SHOP MBL",
    value: "201042520",
  },
];

function PreventiveMaintenance() {
  const [valueStatus, setValueStatus] = useState<string>("All Status");
  const [valueWilayah, setValueWilayah] = useState<string>("All Wilayah");
  const [valueVendor, setValueVendor] = useState<string>("All Vendor");
  const [valueMerchant, setValueMerchant] = useState<string>("All Merchant");
  const { Title } = Typography;
  const { RangePicker } = DatePicker;
  const { onChangeTable, onChangeSearchBy } = useTableHelper<DataType>();

  const handleChangeFilterStatus = (key: string) => {
    setValueStatus(key);
  };
  const handleChangeFilterWilayah = (key: string) => {
    setValueWilayah(key);
  };
  const handleChangeFilterVendor = (key: string) => {
    setValueVendor(key);
  };
  const handleChangeFilterMerchant = (key: string) => {
    setValueMerchant(key);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Ticket Number",
      dataIndex: "ticket_number",
      key: "ticket_number",
      width: "20%",
      sorter: true,
      sortDirections: ["descend", "ascend"],
      render: (row) => {
        return row || "-";
      },
    },
    {
      title: "MID",
      dataIndex: "mid",
      key: "mid",
      sorter: true,
      sortDirections: ["descend", "ascend"],
      render: (row) => {
        return row || "-";
      },
    },
    {
      title: "TID",
      dataIndex: "TID",
      key: "TID",
      sorter: true,
      sortDirections: ["descend", "ascend"],
      render: (row) => {
        return row || "-";
      },
    },
    {
      title: "Merchant",
      dataIndex: "merchant",
      key: "merchant",
      sorter: true,
      sortDirections: ["descend", "ascend"],
      render: (row) => {
        return row || "-";
      },
    },
    {
      title: "Vendor Name",
      dataIndex: "vendor_name",
      key: "vendor_name",
      sorter: true,
      sortDirections: ["descend", "ascend"],
      render: (row) => {
        return row || "-";
      },
    },
    {
      title: "Vendor Code",
      dataIndex: "vendor_code",
      key: "vendor_code",
      sorter: true,
      sortDirections: ["descend", "ascend"],
      width: "50%",
      render: (row) => {
        return row || "-";
      },
    },
    {
      title: "Kantor Wilayah",
      dataIndex: "kantor_wilayah",
      key: "kantor_wilayah",
      sorter: true,
      sortDirections: ["descend", "ascend"],
      width: "50%",
      render: (row) => {
        return row || "-";
      },
    },
  ];
  return (
    <>
      <Flex justify="space-between" align="flex-end">
        <Title level={3}>Preventive Maintenance Report</Title>
        <Space direction="vertical" size={12}>
          <RangePicker />
        </Space>
      </Flex>
      <FilterTable
        optionStatus={optionStatus}
        valueStatus={valueStatus}
        handleChangeFilterStatus={handleChangeFilterStatus}
        optionWilayah={optionWilayah}
        valueWilayah={valueWilayah}
        handleChangeFilterWilayah={handleChangeFilterWilayah}
        optionVendor={optionVendor}
        valueVendor={valueVendor}
        handleChangeFilterVendor={handleChangeFilterVendor}
        optionMerchant={optionMerchant}
        valueMerchant={valueMerchant}
        handleChangeFilterMerchant={handleChangeFilterMerchant}
      />
      <DataTable<DataType>
        style={{
          overflowX: "auto",
        }}
        columns={columns}
        bordered
        useGlobalSearchInput
        dataSource={data}
        pagination={{
          current: 1,
          pageSize: 10,
          total: data.length,
        }}
        onChange={onChangeTable}
      />
    </>
  );
}

export default PreventiveMaintenance;

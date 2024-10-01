import { Button, DatePicker, Flex, Space, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import DataTable from "@smpm/components/DataTable";
import useTableHelper from "@smpm/utils/useTableHelper";
import FilterTable, { TOptions } from "./FilterTable";
import { useMemo, useState } from "react";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import ReportPDF from "./ReportPDF";
import { saveAs } from "file-saver";
import dayjs from "dayjs";

interface DataType {
  key: string;
  no_jo: string;
  jenis_jo: string;
  tanggal_jo: string;
  mid: string;
  tid: string;
  nama_merchant: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
}

const data: DataType[] = [
  {
    key: "1",
    no_jo: "EDM07-MI-10112023-IS-SW-0001",
    jenis_jo: "New Installation",
    tanggal_jo: "10-Nov-23",
    mid: "000100207005302",
    tid: "07530202",
    nama_merchant: "ANUGRAH SHOP MBL",
    address1: "ANUGRAH SHOP MBL",
    address2: "",
    address3: "",
    address4: "",
  },
  {
    key: "2",
    no_jo: "EDM07-MI-10112023-IS-SW-0002",
    jenis_jo: "CM Replace",
    tanggal_jo: "10-Nov-23",
    mid: "000100207005298",
    tid: "07530202",
    nama_merchant: "DUTA IRAMA PALLANGGA",
    address1: "DUTA IRAMA PALLANGGA",
    address2: "",
    address3: "",
    address4: "",
  },
  {
    key: "3",
    no_jo: "EDM07-MI-10112023-IS-SW-0003",
    jenis_jo: "CM Re-init",
    tanggal_jo: "10-Nov-23",
    mid: "000100207005302",
    tid: "07530202",
    nama_merchant: "ANUGRAH SHOP MBL",
    address1: "ANUGRAH SHOP MBL",
    address2: "",
    address3: "",
    address4: "",
  },
  {
    key: "4",
    no_jo: "EDM07-MI-10112023-IS-SW-0001",
    jenis_jo: "New Installation",
    tanggal_jo: "10-Nov-23",
    mid: "000100207005302",
    tid: "07530202",
    nama_merchant: "ANUGRAH SHOP MBL",
    address1: "ANUGRAH SHOP MBL",
    address2: "",
    address3: "",
    address4: "",
  },
  {
    key: "5",
    no_jo: "EDM07-MI-10112023-IS-SW-0002",
    jenis_jo: "CM Replace",
    tanggal_jo: "10-Nov-23",
    mid: "000100207005298",
    tid: "07530202",
    nama_merchant: "DUTA IRAMA PALLANGGA",
    address1: "DUTA IRAMA PALLANGGA",
    address2: "",
    address3: "",
    address4: "",
  },
  {
    key: "6",
    no_jo: "EDM07-MI-10112023-IS-SW-0003",
    jenis_jo: "CM Re-init",
    tanggal_jo: "10-Nov-23",
    mid: "000100207005302",
    tid: "07530202",
    nama_merchant: "ANUGRAH SHOP MBL",
    address1: "ANUGRAH SHOP MBL",
    address2: "",
    address3: "",
    address4: "",
  },
];

const optionStatus: TOptions[] = [
  {
    label: "All Status",
    value: "All Status",
  },
  {
    label: "Tersedia",
    value: "Tersedia",
  },
  {
    label: "Terpasang",
    value: "Terpasang",
  },
  {
    label: "Rusak",
    value: "Rusak",
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

function JobOrder() {
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

  const handleDownload = async () => {
    const date = new Date();
    const blob = await pdf(<ReportPDF />).toBlob();
    // saveAs(blob, `${dayjs(date).format("DD_MM_YYYY")} Work Order.pdf`);
    saveAs(blob, `Work Order.pdf`);
  };

  const columns: ColumnsType<DataType> = useMemo(() => {
    return [
      {
        title: "No. JO",
        dataIndex: "no_jo",
        key: "no_jo",
        sorter: true,
        sortDirections: ["descend", "ascend"],
        render: (row) => {
          return <div className="w-60">{row || "-"}</div>;
        },
      },
      {
        title: "Jenis JO",
        dataIndex: "jenis_jo",
        key: "jenis_jo",
        width: "20%",
        sorter: true,
        sortDirections: ["descend", "ascend"],
        render: (row) => {
          return row || "-";
        },
      },
      {
        title: "Tanggal JO",
        dataIndex: "tanggal_jo",
        key: "tanggal_jo",
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
        dataIndex: "tid",
        key: "tid",
        sorter: true,
        sortDirections: ["descend", "ascend"],
        render: (row) => {
          return row || "-";
        },
      },
      {
        title: "Nama Merchant",
        dataIndex: "nama_merchant",
        key: "nama_merchant",
        sorter: true,
        sortDirections: ["descend", "ascend"],
        render: (row) => {
          return row || "-";
        },
      },
      {
        title: "Address 1",
        dataIndex: "address1",
        key: "address1",
        sorter: true,
        sortDirections: ["descend", "ascend"],
        width: "50%",
        render: (row) => {
          return row || "-";
        },
      },
      {
        title: "Address 2",
        dataIndex: "address2",
        key: "address2",
        sorter: true,
        sortDirections: ["descend", "ascend"],
        width: "50%",
        render: (row) => {
          return row || "-";
        },
      },
      {
        title: "Address 3",
        dataIndex: "address3",
        key: "address3",
        sorter: true,
        sortDirections: ["descend", "ascend"],
        width: "50%",
        render: (row) => {
          return row || "-";
        },
      },
      {
        title: "Address 4",
        dataIndex: "address4",
        key: "address4",
        sorter: true,
        sortDirections: ["descend", "ascend"],
        width: "50%",
        render: (row) => {
          return row || "-";
        },
      },
      {
        title: "Aksi",
        width: "50%",
        render: (row) => {
          return (
            <Button
              type="primary"
              style={{
                marginTop: "6px",
              }}
              onClick={() => handleDownload()}
            >
              Job Order Report
            </Button>
          );
        },
      },
    ];
  }, []);
  return (
    <>
      <Flex justify="space-between" align="flex-end">
        <Title level={3}>Job Order Report</Title>
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
        hasDownloadReportOrder={false}
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

export default JobOrder;

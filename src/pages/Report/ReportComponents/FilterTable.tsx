import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  Button,
  Col,
  Divider,
  Flex,
  Grid,
  Row,
  Select,
  Typography,
} from "antd";
import { Option } from "antd/es/mentions";
import React from "react";
import ReportPDF from "./ReportPDF";

export type TOptions = {
  label: string;
  value: any;
};

interface IFilterTable {
  handleChangeFilterStatus: (key: string) => void;
  valueStatus: string;
  optionStatus: TOptions[];

  handleChangeFilterWilayah: (key: string) => void;
  valueWilayah: string;
  optionWilayah: TOptions[];

  handleChangeFilterVendor: (key: string) => void;
  valueVendor: string;
  optionVendor: TOptions[];

  handleChangeFilterMerchant: (key: string) => void;
  valueMerchant: string;
  optionMerchant: TOptions[];
  hasDownloadReportOrder?: boolean;
  isInventoryReport?: boolean;
}

const FilterTable: React.FC<IFilterTable> = ({
  handleChangeFilterStatus,
  valueStatus,
  optionStatus,
  handleChangeFilterWilayah,
  valueWilayah,
  optionWilayah,
  handleChangeFilterVendor,
  valueVendor,
  optionVendor,
  handleChangeFilterMerchant,
  valueMerchant,
  optionMerchant,
  hasDownloadReportOrder = false,
  isInventoryReport = false,
}) => {
  const { Title } = Typography;
  return (
    <>
      <Row gutter={12} align={"top"} justify={"space-between"} className="mt-6">
        <Col xs={24} md={16}>
          <Row justify="start" className="my-4" gutter={12}>
            <Col xs={24} md={6}>
              <Select
                allowClear
                mode={"multiple"}
                onChange={handleChangeFilterStatus}
                value={valueStatus}
                className="w-full mb-5"
              >
                {optionStatus.map((val) => (
                  <>
                    <Option value={val.value}>{val.label}</Option>
                  </>
                ))}
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <Select
                onChange={handleChangeFilterWilayah}
                value={valueWilayah}
                className="w-full mb-5"
              >
                {optionWilayah.map((val) => (
                  <>
                    <Option value={val.value}>{val.label}</Option>
                  </>
                ))}
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <Select
                onChange={handleChangeFilterVendor}
                value={valueVendor}
                className="w-full mb-5"
              >
                {optionVendor.map((val) => (
                  <>
                    <Option value={val.value}>{val.label}</Option>
                  </>
                ))}
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <Select
                onChange={handleChangeFilterMerchant}
                value={valueMerchant}
                className="w-full mb-5"
              >
                {optionMerchant.map((val) => (
                  <>
                    <Option value={val.value}>{val.label}</Option>
                  </>
                ))}
              </Select>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={6}>
          {isInventoryReport ? (
            <Flex align="center" justify="flex-end">
              <Button type="primary">Generate</Button>
            </Flex>
          ) : (
            <Flex gap={2} align="center" justify="flex-end">
              <Title level={5}>Generate</Title>
              <Divider
                style={{
                  height: "40px",
                  fontWeight: "bold",
                }}
                type="vertical"
              />
              <div>
                <Flex gap={4} justify="space-between">
                  <Button type="primary">SLA</Button>
                  <Button type="primary">Report</Button>
                </Flex>
                {hasDownloadReportOrder ? (
                  <PDFDownloadLink
                    document={<ReportPDF />}
                    fileName={"Work Order"}
                  >
                    {({ blob, url, loading, error }) => (
                      <>
                        <Button
                          type="primary"
                          style={{
                            marginTop: "6px",
                          }}
                        >
                          {loading ? "Loading..." : "Job Order Report"}
                        </Button>
                      </>
                    )}
                  </PDFDownloadLink>
                ) : null}
              </div>
            </Flex>
          )}
        </Col>
      </Row>
    </>
  );
};

export default FilterTable;

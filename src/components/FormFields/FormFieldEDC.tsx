import { Col, Form, Grid, Input, Row, Select } from "antd";
import React from "react";

const FormFieldEDC = () => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            label={"Serial Number"}
            name={"serial_number"}
            rules={[
              {
                required: true,
                message: "Dibutuhkan",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label={"TID"}
            name={"tid"}
            rules={[
              {
                required: true,
                message: "Dibutuhkan",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label={"MID"}
            name={"mid"}
            rules={[
              {
                required: true,
                message: "Dibutuhkan",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            label={"Tipe EDC"}
            name={"brand_type"}
            rules={[
              {
                required: true,
                message: "Dibutuhkan",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label={"Merk EDC"}
            name={"brand"}
            rules={[
              {
                required: true,
                message: "Dibutuhkan",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label={"Wilayah"}
            name={"region"}
            rules={[
              {
                required: true,
                message: "Dibutuhkan",
              },
            ]}
          >
            <Select>
              <Select.Option value={"WILAYAH 1"}>Wilayah 1</Select.Option>
              <Select.Option value={"WILAYAH 2"}>Wilayah 2</Select.Option>
              <Select.Option value={"WILAYAH 3"}>Wilayah 3</Select.Option>
              <Select.Option value={"WILAYAH 4"}>Wilayah 4</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            label={"Status Kepemilikan"}
            name={"status_owner"}
            rules={[
              {
                required: true,
                message: "Dibutuhkan",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label={"Kelengkapan"}
            name={"status_owner_desc"}
            rules={[
              {
                required: true,
                message: "Dibutuhkan",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label={"Kondisi"}
            name={"status_machine"}
            rules={[
              {
                required: true,
                message: "Dibutuhkan",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            label={"Penggunaan"}
            name={"utilization"}
            rules={[
              {
                required: true,
                message: "Dibutuhkan",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label={"Tempat"}
            name={"place"}
            rules={[
              {
                required: true,
                message: "Dibutuhkan",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label={"Provider"}
            name={"simcard_provider"}
            rules={[
              {
                required: true,
                message: "Dibutuhkan",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            label={"No Simcard"}
            name={"simcard_number"}
            rules={[
              {
                required: true,
                message: "Dibutuhkan",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label={"Kategori"}
            name={"category"}
            rules={[
              {
                required: true,
                message: "Dibutuhkan",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label={"Tanggal Masuk"}
            name={"entry_date"}
            rules={[
              {
                required: true,
                message: "Dibutuhkan",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default FormFieldEDC;

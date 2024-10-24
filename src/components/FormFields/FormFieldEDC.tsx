// src/components/FormFields/FormFieldEDC.tsx

import { Col, Form, Input, Row, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { IRegionModel } from "@smpm/models/regionModel";
import { IVendorModel } from "@smpm/models/vendorModel";  // Assuming this model exists
import { getAllRegion } from "@smpm/services/regionService";
import { getVendorMilik, getVendorSewa } from "@smpm/services/vendorService";

const FormFieldEDC = () => {
  const [regions, setRegions] = useState<IRegionModel[]>([]);
  const [loadingRegions, setLoadingRegions] = useState<boolean>(false);
  const [errorRegions, setErrorRegions] = useState<string | null>(null);

  const [statusOwnership, setStatusOwnership] = useState<string | null>(null);
  const [vendors, setVendors] = useState<IVendorModel[]>([]);
  const [loadingVendors, setLoadingVendors] = useState<boolean>(false);
  const [errorVendors, setErrorVendors] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegions = async () => {
      setLoadingRegions(true);
      try {
        const response = await getAllRegion();
        if (response.status.code === 200) {
          setRegions(response.result);
          setErrorRegions(null);
        } else {
          console.error("Failed to fetch regions:", response.status.description);
          setErrorRegions(response.status.description);
        }
      } catch (error) {
        console.error("Error fetching regions:", error);
        setErrorRegions("Terjadi kesalahan saat mengambil data wilayah.");
      } finally {
        setLoadingRegions(false);
      }
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      if (!statusOwnership) return; // Exit if no ownership status selected

      setLoadingVendors(true);
      setErrorVendors(null);

      try {
        const response =
          statusOwnership === "sewa"
            ? await getVendorSewa({})
            : await getVendorMilik({});

        if (response.status.code === 200) {
          setVendors(response.result.data);
          setErrorVendors(null);
        } else {
          console.error("Failed to fetch vendors:", response.status.description);
          setErrorVendors(response.status.description);
        }
      } catch (error) {
        console.error("Error fetching vendors:", error);
        setErrorVendors("Terjadi kesalahan saat mengambil data vendor.");
      } finally {
        setLoadingVendors(false);
      }
    };

    fetchVendors();
  }, [statusOwnership]);

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            label="MID"
            name="mid"
            rules={[
              {
                required: true,
                message: "MID diperlukan",
              },
            ]}
          >
            <Input placeholder="Masukkan MID" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="TID"
            name="tid"
            rules={[
              {
                required: true,
                message: "TID diperlukan",
              },
            ]}
          >
            <Input placeholder="Masukkan TID" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Serial Number"
            name="serial_number"
            rules={[
              {
                required: true,
                message: "Serial Number diperlukan",
              },
            ]}
          >
            <Input placeholder="Masukkan Serial Number" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Merk EDC"
            name="brand"
            rules={[
              {
                required: true,
                message: "Merk EDC diperlukan",
              },
            ]}
          >
            <Input placeholder="Masukkan Merk EDC" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Tipe EDC"
            name="brand_type"
            rules={[
              {
                required: true,
                message: "Tipe EDC diperlukan",
              },
            ]}
          >
            <Input placeholder="Masukkan Tipe EDC" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Wilayah"
            name="region"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Select
              placeholder="Pilih Wilayah"
              loading={loadingRegions}
              allowClear
            >
              {regions.map((region) => (
                <Select.Option key={region.id} value={region.name}>
                  {`${region.name} (${region.code})`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {errorRegions && (
            <span style={{ color: "red" }}>{errorRegions}</span>
          )}
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Status Kepemilikan"
            name="status_owner"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Select
              placeholder="Pilih Status Kepemilikan"
              onChange={(value) => setStatusOwnership(value)}
            >
              <Select.Option value="sewa">Sewa</Select.Option>
              <Select.Option value="milik">Milik</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Kelengkapan"
            name="status_owner_desc"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input placeholder="Masukkan Kelengkapan" />
          </Form.Item>
        </Col>
      </Row>
      {statusOwnership && (
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Vendor"
              name="owner_id"
              rules={[
                {
                  required: true,
                  message: "Vendor diperlukan",
                },
              ]}
            >
              <Select
                placeholder="Pilih Vendor"
                loading={loadingVendors}
                allowClear
              >
                {vendors.map((vendor) => (
                  <Select.Option key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {errorVendors && (
              <span style={{ color: "red" }}>{errorVendors}</span>
            )}
          </Col>
        </Row>
      )}
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Kondisi"
            name="status_machine"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input placeholder="Masukkan Kondisi" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Deskripsi Kondisi"
            name="status_machine_desc"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input placeholder="Masukkan Deskripsi Kondisi" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Status Aktif"
            name="status_active"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Status Aktif diperlukan",
              },
            ]}
          >
            <Switch checkedChildren="Aktif" unCheckedChildren="Tidak Aktif" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Provider"
            name="simcard_provider"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input placeholder="Masukkan Provider" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="No Simcard"
            name="simcard_number"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input placeholder="Masukkan No Simcard" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Status EDC"
            name="status_edc"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input placeholder="Masukkan Status EDC" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item
            label="Informasi Tambahan"
            name="info"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input.TextArea
              placeholder="Masukkan Informasi Tambahan"
              rows={4}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default FormFieldEDC;

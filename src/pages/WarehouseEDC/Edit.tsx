// src/components/EditEDC.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, Checkbox, Spin, notification } from 'antd';
import { getEDCById, updateEDC, getBrand, getBrandType } from '@smpm/services/edcService';
import { ElectronicDataCaptureMachine,GetEdcBrandTypeDto } from '@smpm/models/edcModel';

const { Option } = Select;

const EditEDC: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [edc, setEdc] = useState<ElectronicDataCaptureMachine | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [brands, setBrands] = useState<string[]>([]);
  const [brandTypes, setBrandTypes] = useState<string[]>([]);
  const [statusActive, setStatusActive] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setLoading(true);
          const edcData = await getEDCById(Number(id));
          setEdc(edcData);
          form.setFieldsValue({
            mid: edcData.mid,
            tid: edcData.tid,
            brand: edcData.brand,
            brand_type: edcData.brand_type,
            region: edcData.region,
            serial_number: edcData.serial_number,
            status_owner: edcData.status_owner,
            status_owner_desc: edcData.status_owner_desc,
            status_machine: edcData.status_machine,
            status_machine_desc: edcData.status_machine_desc,
            status_active: edcData.status_active,
            simcard_provider: edcData.simcard_provider,
            simcard_number: edcData.simcard_number,
            status_edc: edcData.status_edc,
            info: edcData.info,
            kondisibarang: edcData.kondisibarang,
          });
          setStatusActive(edcData.status_active);

          // Fetch brands
          const brandData = await getBrand();
          setBrands(brandData.map((item: any) => item.brand));

          // Fetch brand types based on existing brand
          if (edcData.brand) {
            const brandTypeParams: GetEdcBrandTypeDto = { brand: edcData.brand };
            const brandTypeData = await getBrandType(brandTypeParams);
            setBrandTypes(brandTypeData.map((item: any) => item.type));
          }

        } catch (error) {
          console.error("Error fetching EDC data:", error);
          notification.error({
            message: 'Error',
            description: 'Gagal mengambil data EDC.',
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id, form]);

  // Handle change on brand to fetch brand types
  const handleBrandChange = async (value: string) => {
    form.setFieldsValue({ brand_type: undefined });
    try {
      const brandTypeParams: GetEdcBrandTypeDto = { brand: value };
      const brandTypeData = await getBrandType(brandTypeParams);
      setBrandTypes(brandTypeData.map((item: any) => item.type));
    } catch (error) {
      console.error("Error fetching brand types:", error);
      notification.error({
        message: 'Error',
        description: 'Gagal mengambil tipe brand.',
      });
    }
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      await updateEDC(Number(id), {
        ...values,
        status_active: values.status_active || false,
        updated_by: 1, // Gantilah sesuai dengan user yang login
      });
      notification.success({
        message: 'Success',
        description: 'Data EDC berhasil diperbarui.',
      });
      navigate('/edc'); // Redirect ke halaman EDC setelah berhasil
    } catch (error) {
      console.error("Error updating EDC:", error);
      notification.error({
        message: 'Error',
        description: 'Gagal memperbarui data EDC.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !edc) {
    return <Spin />;
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
      <h2>Edit Electronic Data Capture Machine</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ status_active: statusActive }}
      >
        <Form.Item
          label="MID"
          name="mid"
          rules={[{ required: true, message: 'Please input MID!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="TID"
          name="tid"
          rules={[{ required: true, message: 'Please input TID!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: 'Please select brand!' }]}
        >
          <Select placeholder="Select Brand" onChange={handleBrandChange}>
            {brands.map((brand) => (
              <Option key={brand} value={brand}>
                {brand}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Brand Type"
          name="brand_type"
          rules={[{ required: true, message: 'Please select brand type!' }]}
        >
          <Select placeholder="Select Brand Type">
            {brandTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Region"
          name="region"
          rules={[{ required: true, message: 'Please input region!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Serial Number"
          name="serial_number"
          rules={[{ required: true, message: 'Please input serial number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Status Owner"
          name="status_owner"
          rules={[{ required: true, message: 'Please input status owner!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Status Owner Description"
          name="status_owner_desc"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Status Machine"
          name="status_machine"
          rules={[{ required: true, message: 'Please input status machine!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Status Machine Description"
          name="status_machine_desc"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="status_active"
          valuePropName="checked"
        >
          <Checkbox>Active</Checkbox>
        </Form.Item>

        <Form.Item
          label="Simcard Provider"
          name="simcard_provider"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Simcard Number"
          name="simcard_number"
          rules={[{ required: true, message: 'Please input simcard number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Status EDC"
          name="status_edc"
          rules={[{ required: true, message: 'Please input status EDC!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Info"
          name="info"
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Kondisi Barang"
          name="kondisibarang"
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update
          </Button>
          <Button
            style={{ marginLeft: '8px' }}
            onClick={() => navigate('/edc')}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditEDC;

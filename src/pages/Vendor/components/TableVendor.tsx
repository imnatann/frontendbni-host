
import React, { useMemo, useState, useEffect } from 'react';
import DataTable from "@smpm/components/DataTable"
import { IVendorModel } from "@smpm/models/vendorModel"
import { useDebounce } from "@smpm/utils/useDebounce"
import useTableHelper from "@smpm/utils/useTableHelper"
import { ColumnsType } from "antd/es/table"
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Button, Space, Popconfirm, message, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getVendor, updateVendor} from '@smpm/services/vendorService';
import { IPaginationRequest, IPaginationResponse, IBaseResponseService } from "@smpm/models";

interface TableVendorProps {
  onAddNewVendor: () => void;
  refreshData: () => void;
}

const TableVendor: React.FC<TableVendorProps> = ({ refreshData }) => {
  const { onChangeTable, onChangeSearchBy } = useTableHelper<IVendorModel>()
  const [form] = Form.useForm();

  const [search, setSearch] = useState<string>("")
  const debouncedSearch = useDebounce(search, 500)

  const [vendor, setVendor] = useState<IPaginationResponse<IVendorModel> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingVendor, setEditingVendor] = useState<IVendorModel | null>(null);
  const [pagination, setPagination] = useState<IPaginationRequest>({
    search: '',
    page: 1,
    take: 10,
    order: 'asc',
    order_by: 'name'
  });

  const fetchVendor = async () => {
    setIsLoading(true);
    try {
      const response: IBaseResponseService<IPaginationResponse<IVendorModel>> = await getVendor({
        ...pagination,
        search: debouncedSearch,
      });
      setVendor(response.result);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      message.error('Failed to fetch vendors');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVendor();
  }, [debouncedSearch, pagination]);

  const onSearch = (value: string) => setSearch(value)

  const handleEdit = (record: IVendorModel) => {
    setEditingVendor(record);
    form.setFieldsValue({
      id: record.id,
      name: record.name,
      code: record.code,
      description: record.description,
    });
    setIsEditModalVisible(true);
  };

  const handleEditModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingVendor) {
        const response = await updateVendor(editingVendor.id, values);
        if (response && response.result) {
          message.success('Vendor updated successfully');
          setIsEditModalVisible(false);
          fetchVendor();
          refreshData(); 
        } else {
          throw new Error('Update failed');
        }
      }
    } catch (error) {
      console.error('Failed to update vendor:', error);
      if (error instanceof Error) {
        message.error(`Failed to update vendor: ${error.message}`);
      } else {
        message.error('An unexpected error occurred while updating the vendor');
      }
    }
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    setEditingVendor(null);
    form.resetFields();
  };

  const handleDelete = async (record: IVendorModel) => {
    console.log('Delete vendor:', record);
    // Implement delete logic here
  };

  const columns: ColumnsType<IVendorModel> = useMemo((): ColumnsType<IVendorModel> => {
    return [
      {
        title: "ID",
        dataIndex: "id",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "NAME",
        dataIndex: "name",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "CODE",
        dataIndex: "code",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "DESCRIPTION",
        dataIndex: "description",
      },
      {
        title: "ACTION",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button 
              icon={<EditOutlined />} 
              onClick={() => handleEdit(record)}
            />
            <Popconfirm
              title="Are you sure to delete this vendor?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button 
                icon={<DeleteOutlined />} 
                danger
              />
            </Popconfirm>
          </Space>
        ),
      },
    ]
  }, [])

  const handleChangeSearchBy = (value: CheckboxValueType[]) => {
    onChangeSearchBy(value as string[]);
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPagination(prev => ({
      ...prev,
      page: pagination.current,
      take: pagination.pageSize,
      order: sorter.order === 'descend' ? 'desc' : 'asc',
      order_by: sorter.field || 'name'
    }));
    onChangeTable(pagination, filters, sorter);
  };

  return (
    <>
      <DataTable<IVendorModel>
        dataSource={vendor?.data}
        pagination={{
          current: vendor?.meta.page,
          pageSize: vendor?.meta.take,
          total: vendor?.meta.item_count,
        }}
        loading={isLoading}
        bordered
        onChangeSearchBy={handleChangeSearchBy}
        onGlobalSearch={onSearch}
        columns={columns}
        useGlobalSearchInput
        onChange={handleTableChange}
      />
      <Modal
        title="Edit Vendor"
        visible={isEditModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          name="edit_vendor_form"
        >
           <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the vendor name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="Code"
            rules={[{ required: true, message: 'Please input the vendor code!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default TableVendor

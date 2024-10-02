
import React, { useMemo, useState, useEffect } from 'react';
import DataTable from "@smpm/components/DataTable"
import { IRoleModel } from "@smpm/models/roleModel"
import { useDebounce } from "@smpm/utils/useDebounce"
import useTableHelper from "@smpm/utils/useTableHelper"
import { getRole } from "@smpm/services/roleService"
import { ColumnsType } from "antd/es/table"
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Button, Space, Popconfirm, message, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { IPaginationRequest, IPaginationResponse, IBaseResponseService } from "@smpm/models";

const { Option } = Select;

const TableRole: React.FC = () => {
  const [form] = Form.useForm();
  const { onChangeTable, onChangeSearchBy } = useTableHelper<IRoleModel>()

  const [search, setSearch] = useState<string>("")
  const debouncedSearch = useDebounce(search, 500)

  const [roles, setRoles] = useState<IPaginationResponse<IRoleModel> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<IRoleModel | null>(null);
  const [pagination, setPagination] = useState<IPaginationRequest>({
    search: '',
    page: 1,
    take: 10,
    order: 'asc',
    order_by: 'name'
  });

  useEffect(() => {  
    const fetchRoles = async () => {  
      setIsLoading(true);  
      try {  
        const response: IBaseResponseService<IPaginationResponse<IRoleModel>> = await getRole({  
          ...pagination,  
          search: debouncedSearch,  
        });  
        setRoles(response.result);  
      } catch (error) {  
        console.error('Error fetching roles:', error);  
        message.error('Failed to fetch roles');  
      } finally {  
        setIsLoading(false);  
      }  
    };  
  
    fetchRoles();  
  }, [debouncedSearch, pagination]);

  const onSearch = (value: string) => setSearch(value)

  const handleEdit = (record: IRoleModel) => {
    setEditingRole(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: IRoleModel) => {
    console.log('Delete role:', record);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('Updated role:', { ...editingRole, ...values });
      // Here you would typically call an API to update the role
      setIsModalVisible(false);
      form.resetFields();
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns: ColumnsType<IRoleModel> = useMemo((): ColumnsType<IRoleModel> => {
    return [
      {
        title: "NAME",
        dataIndex: "name",
        sorter: true,
      },
      {
        title: "DESCRIPTION",
        dataIndex: "description",
        sorter: true,
      },
      {
        title: "PERMISSIONS",
        dataIndex: "permissions",
        render: (permissions: string[]) => permissions?.join(", ") || "No permissions",
      },
      {
        title: "CREATED AT",
        dataIndex: "createdAt",
        sorter: true,
        render: (date: string) => new Date(date).toLocaleDateString(),
      },
      {
        title: "ACTION",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
            <Popconfirm
              title="Are you sure to delete this role?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} danger className="border-black text-red-500 bg-red-50 hover:bg-red-100 hover:border-black focus:border-black" />
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
      <DataTable<IRoleModel>
        dataSource={roles?.data}
        pagination={{
          current: roles?.meta.page,
          pageSize: roles?.meta.take,
          total: roles?.meta.item_count,
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
        title="Edit Role"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical" name="editRoleForm">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="permissions"
            label="Permissions"
            rules={[{ required: true, message: 'Please select at least one permission!' }]}
          >
            <Select mode="multiple" placeholder="Select permissions">
              <Option value="read">Read</Option>
              <Option value="write">Write</Option>
              <Option value="delete">Delete</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default TableRole

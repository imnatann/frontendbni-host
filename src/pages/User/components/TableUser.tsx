
import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from "@smpm/components/DataTable"
import { IUserModel } from "@smpm/models/userModel"
import { useDebounce } from "@smpm/utils/useDebounce"
import useTableHelper from "@smpm/utils/useTableHelper"
import { ColumnsType } from "antd/es/table"
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Button, Space, Popconfirm, Tag, message, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getUser, deleteUser, updateUser } from '@smpm/services/userService';
import { IPaginationRequest, IPaginationResponse, IBaseResponseService } from "@smpm/models";

const { Option } = Select;

const TableUser: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { onChangeTable, onChangeSearchBy } = useTableHelper<IUserModel>()

  const [search, setSearch] = useState<string>("")
  const debouncedSearch = useDebounce(search, 500)

  const [user, setUser] = useState<IPaginationResponse<IUserModel> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<IUserModel | null>(null);
  const [pagination, setPagination] = useState<IPaginationRequest>({
    search: '',
    page: 1,
    take: 10,
    order: 'asc',
    order_by: 'name'
  });

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response: IBaseResponseService<IPaginationResponse<IUserModel>> = await getUser({
          ...pagination,
          search: debouncedSearch,
        });
        console.log('User data received:', response.result);
        setUser(response.result);
      } catch (error) {
        console.error('Error fetching users:', error);
        message.error('Failed to fetch users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [debouncedSearch, pagination]);

  const onSearch = (value: string) => setSearch(value)

  const handleEdit = (record: IUserModel) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (record: IUserModel) => {
    try {
      await deleteUser(record.id);
      message.success('User deleted successfully');
      const updatedResponse = await getUser(pagination);
      setUser(updatedResponse.result);
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error('Failed to delete user');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        await updateUser(editingUser.id, values);
        message.success('User updated successfully');
        setIsModalVisible(false);
        const updatedResponse = await getUser(pagination);
        setUser(updatedResponse.result);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      message.error('Failed to update user');
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const renderComplexObject = (obj: any) => {
    if (typeof obj === 'object' && obj !== null) {
      return (
        <ul>
          {Object.entries(obj).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {renderComplexObject(value)}
            </li>
          ))}
        </ul>
      );
    }
    return String(obj);
  };

  const columns: ColumnsType<IUserModel> = useMemo((): ColumnsType<IUserModel> => {
    return [
      {
        title: "NAME",
        dataIndex: "name",
        sorter: true,
        sortDirections: ["descend", "ascend"],
        render: (value) => renderComplexObject(value),
      },
      {
        title: "EMAIL",
        dataIndex: "email",
        sorter: true,
        sortDirections: ["descend", "ascend"],
        render: (value) => renderComplexObject(value),
      },
      {
        title: "ROLE",
        dataIndex: "role",
        render: (role: string) => <Tag color="blue">{renderComplexObject(role)}</Tag>,
      },
      {
        title: "STATUS",
        dataIndex: "status",
        render: (status: string) => (
          <Tag color={status === 'Active' ? 'green' : 'red'}>{renderComplexObject(status)}</Tag>
        ),
      },
      {
        title: "CREATED AT",
        dataIndex: "createdAt",
        sorter: true,
        sortDirections: ["descend", "ascend"],
        render: (date: string) => new Date(date).toLocaleDateString(),
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
              title="Are you sure to delete this user?"
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

  console.log('User data before render:', user?.data);

  return (
    <>
      <DataTable<IUserModel>
        dataSource={user?.data}
        pagination={{
          current: user?.meta.page,
          pageSize: user?.meta.take,
          total: user?.meta.item_count,
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
        title="Edit User"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical" name="editUserForm">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input the email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
              <Option value="guest">Guest</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status!' }]}
          >
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default TableUser

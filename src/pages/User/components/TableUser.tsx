
import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from "@smpm/components/DataTable"
import { IUserModel, userSearchColumn } from "@smpm/models/userModel"
import { IRoleModel } from "@smpm/models/roleModel"
import { IVendorModel } from "@smpm/models/vendorModel"
import { useDebounce } from "@smpm/utils/useDebounce"
import useTableHelper from "@smpm/utils/useTableHelper"
import { ColumnsType } from "antd/es/table"
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Button, Space, Popconfirm, Tag, message, Modal, Form, Input, Select, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getUser, deleteUser, updateUser, createUser } from '@smpm/services/userService';
import { getRole } from '@smpm/services/roleService';
import { getVendor } from '@smpm/services/vendorService';
import { IPaginationRequest, IPaginationResponse, IBaseResponseService } from "@smpm/models";
import moment from 'moment';

const { Option } = Select;

interface TableUserProps {
  isAddModalVisible: boolean;
  setIsAddModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableUser: React.FC<TableUserProps> = ({ isAddModalVisible, setIsAddModalVisible }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { onChangeTable, onChangeSearchBy } = useTableHelper<IUserModel>()

  const [search, setSearch] = useState<string>("")
  const debouncedSearch = useDebounce(search, 500)

  const [user, setUser] = useState<IPaginationResponse<IUserModel> | null>(null);
  const [roles, setRoles] = useState<IRoleModel[]>([]);
  const [vendors, setVendors] = useState<IVendorModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<IUserModel | null>(null);
  const [pagination, setPagination] = useState<IPaginationRequest>({
    search: '',
    page: 1,
    take: 10,
    order: 'asc',
    order_by: 'id'
  });

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response: IBaseResponseService<IPaginationResponse<IUserModel>> = await getUser({
          ...pagination,
          search: debouncedSearch,
        });
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

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response: IBaseResponseService<IPaginationResponse<IRoleModel>> = await getRole({
          page: 1,
          take: 100,
          order: 'asc',
          order_by: 'name'
        });
        setRoles(response.result.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
        message.error('Failed to fetch roles');
      }
    };

    const fetchVendors = async () => {
      try {
        const response: IBaseResponseService<IPaginationResponse<IVendorModel>> = await getVendor({
          page: 1,
          take: 100,
          order: 'asc',
          order_by: 'name'
        });
        setVendors(response.result.data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
        message.error('Failed to fetch vendors');
      }
    };

    fetchRoles();
    fetchVendors();
  }, []);

  const onSearch = (value: string) => setSearch(value)

  const handleEdit = (record: IUserModel) => {
    setEditingUser(record);
    form.setFieldsValue({
      ...record,
      dob: record.dob ? moment(record.dob) : null,
      role_id: record.role_id,
      vendor_id: record.vendor_id
    });
    setIsEditModalVisible(true);
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
      const updatedValues = {
        ...values,
        dob: values.dob ? values.dob.format('YYYY-MM-DD') : null
      };

      if (editingUser) {
        await updateUser(editingUser.id, updatedValues);
        message.success('User updated successfully');
      } else {
        await createUser(updatedValues);
        message.success('User created successfully');
      }

      setIsEditModalVisible(false);
      setIsAddModalVisible(false);
      form.resetFields();
      const updatedResponse = await getUser(pagination);
      setUser(updatedResponse.result);
    } catch (error) {
      console.error('Error updating/creating user:', error);
      if (error.response && error.response.data && error.response.data.result && error.response.data.result.errors) {
        const errors = error.response.data.result.errors;
        for (const key in errors) {
          form.setFields([
            {
              name: key,
              errors: Array.isArray(errors[key]) ? errors[key] : [errors[key]],
            },
          ]);
        }
      } else {
        message.error('Failed to update/create user');
      }
    }
  };

  const handleModalCancel = () => {
    setIsEditModalVisible(false);
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const columns: ColumnsType<IUserModel> = useMemo((): ColumnsType<IUserModel> => {
    return [
      {
        title: "NAME",
        dataIndex: "name",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "EMAIL",
        dataIndex: "email",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "ROLE",
        dataIndex: "role_id",
        render: (role_id: number) => {
          const role = roles.find(r => r.id === role_id);
          return role ? <Tag color="blue">{role.name}</Tag> : '-';
        },
      },
      {
        title: "VENDOR",
        dataIndex: "vendor_id",
        sorter: true,
        sortDirections: ["descend", "ascend"],
        render: (vendor_id: number) => {
          const vendor = vendors.find(v => v.id === vendor_id);
          return vendor ? vendor.name : '-';
        },
      },
      {
        title: "NPP",
        dataIndex: "npp",
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "DOB",
        dataIndex: "dob",
        sorter: true,
        sortDirections: ["descend", "ascend"],
        render: (date: string) => date ? moment(date).format('DD/MM/YYYY') : '-',
      },
      {
        title: "PHONE",
        dataIndex: "phone",
        sorter: true,
        sortDirections: ["descend", "ascend"],
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
  }, [roles, vendors])

  const handleChangeSearchBy = (value: CheckboxValueType[]) => {
    onChangeSearchBy(value as string[]);
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const allowedOrderBy = ['id', 'name', 'email', 'npp', 'dob', 'phone'];
    const newOrderBy = allowedOrderBy.includes(sorter.field) ? sorter.field : 'id';

    setPagination(prev => ({
      ...prev,
      page: pagination.current,
      take: pagination.pageSize,
      order: sorter.order === 'descend' ? 'desc' : 'asc',
      order_by: newOrderBy
    }));
    onChangeTable(pagination, filters, sorter);
  };

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
        searchColumn={userSearchColumn}
      />
      <Modal
        title={editingUser ? "Edit User" : "Add New User"}
        visible={isEditModalVisible || isAddModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical" name="userForm">
          <Form.Item
            name="vendor_id"
            label="Vendor"
            rules={[{ required: true, message: 'Please select a vendor!' }]}
          >
            <Select>
              {vendors.map(vendor => (
                <Option key={vendor.id} value={vendor.id}>{vendor.name}</Option>
              ))}
            </Select>
          </Form.Item>
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
            name="role_id"
            label="Role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select>
              {roles.map(role => (
                <Option key={role.id} value={role.id}>{role.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="npp"
            label="NPP"
            rules={[{ required: true, message: 'Please input the NPP!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[{ required: true, message: 'Please select the date of birth!' }]}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please input the phone number!' }]}
          >
            <Input />
          </Form.Item>
          {!editingUser && (
            <>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: 'Please input the password!' },
                  { min: 6, message: 'Password must be at least 6 characters long!' }
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="password_confirmation"
                label="Confirm Password"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm the password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  )
}

export default TableUser

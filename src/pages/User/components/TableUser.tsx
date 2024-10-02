
import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from "@smpm/components/DataTable"
import { IUserModel } from "@smpm/models/userModel"
import { useDebounce } from "@smpm/utils/useDebounce"
import useTableHelper from "@smpm/utils/useTableHelper"
import { ColumnsType } from "antd/es/table"
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Button, Space, Popconfirm, Tag, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getUser, deleteUser } from '@smpm/services/userService';
import { IPaginationRequest, IPaginationResponse, IBaseResponseService } from "@smpm/models";

const TableUser: React.FC = () => {
  const navigate = useNavigate();
  const { onChangeTable, onChangeSearchBy } = useTableHelper<IUserModel>()

  const [search, setSearch] = useState<string>("")
  const debouncedSearch = useDebounce(search, 500)

  const [user, setUser] = useState<IPaginationResponse<IUserModel> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
    navigate(`/edit/${record.id}`);
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
  )
}

export default TableUser

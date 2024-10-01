
import React, { useMemo, useState, useEffect } from 'react';
import DataTable from "@smpm/components/DataTable"
import { IRoleModel } from "@smpm/models/roleModel"
import { useDebounce } from "@smpm/utils/useDebounce"
import useTableHelper from "@smpm/utils/useTableHelper"
import { getRole } from "@smpm/services/roleService"
import { ColumnsType } from "antd/es/table"
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Button, Space, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { IPaginationRequest, IPaginationResponse, IBaseResponseService } from "@smpm/models";

const TableRole: React.FC = () => {
  const { onChangeTable, onChangeSearchBy } = useTableHelper<IRoleModel>()

  const [search, setSearch] = useState<string>("")
  const debouncedSearch = useDebounce(search, 500)

  const [roles, setRoles] = useState<IPaginationResponse<IRoleModel> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
        console.log('API Response:', response);  // Tambahkan ini  
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
    console.log('Edit role:', record);
  };

  const handleDelete = (record: IRoleModel) => {
    console.log('Delete role:', record);
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
              <Button icon={<DeleteOutlined />} danger />
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
  )
}

export default TableRole

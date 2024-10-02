
import React, { useMemo, useState } from 'react';
import DataTable from "@smpm/components/DataTable"
import { IRegionModel } from "@smpm/models/regionModel"
import { getRegion, updateRegion, deleteRegion } from "@smpm/services/regionService"
import { useDebounce } from "@smpm/utils/useDebounce"
import useTableHelper from "@smpm/utils/useTableHelper"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button, Space, Popconfirm, message, Modal, Form, Input } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { ColumnsType } from "antd/es/table"

const TableRegion: React.FC = () => {
  const { tableFilter, onChangeTable, onChangeSearchBy } = useTableHelper<IRegionModel>()
  const [search, setSearch] = useState<string>("")
  const searchValue = useDebounce(search, 500)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingRegion, setEditingRegion] = useState<IRegionModel | null>(null);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const onSearch = (value: string) => setSearch(value)

  const {
    data: regions,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["region", { ...tableFilter, searchValue }],
    queryFn: () =>
      getRegion({
        order: tableFilter.sort.order,
        order_by: tableFilter.sort.order_by,
        search: searchValue,
        search_by: tableFilter.searchBy,
        page: parseInt(tableFilter.pagination.current),
        take: parseInt(tableFilter.pagination.pageSize),
      }),
  })

  const updateMutation = useMutation({
    mutationFn: (values: Partial<IRegionModel>) => updateRegion(editingRegion!.id, values),
    onSuccess: () => {
      message.success('Region updated successfully');
      setIsEditModalVisible(false);
      queryClient.invalidateQueries(["region"]);
    },
    onError: (error) => {
      console.error('Error updating region:', error);
      message.error('Failed to update region');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteRegion(id),
    onSuccess: () => {
      message.success('Region deleted successfully');
      queryClient.invalidateQueries(["region"]);
    },
    onError: (error) => {
      console.error('Error deleting region:', error);
      message.error('Failed to delete region');
    },
  });

  const handleEdit = (record: IRegionModel) => {
    setEditingRegion(record);
    form.setFieldsValue(record);
    setIsEditModalVisible(true);
  };

  const handleEditModalOk = () => {
    form.validateFields().then((values) => {
      updateMutation.mutate(values);
    });
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    form.resetFields();
  };

  const handleDelete = (record: IRegionModel) => {
    deleteMutation.mutate(record.id);
  };

  const columns: ColumnsType<IRegionModel> = useMemo((): ColumnsType<IRegionModel> => {
    return [
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
        sorter: true,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "ACTION",
        key: "action",
        width: 170,
        render: (_, record) => (
          <Space size="middle">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
            <Popconfirm
              title="Are you sure to delete this region?"
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

  return (
    <>
      <DataTable<IRegionModel>
        dataSource={regions?.result.data}
        pagination={{
          current: regions?.result.meta.page,
          pageSize: regions?.result.meta.take,
          total: regions?.result.meta.item_count,
        }}
        loading={isLoading}
        bordered
        onChangeSearchBy={onChangeSearchBy}
        onGlobalSearch={onSearch}
        columns={columns}
        useGlobalSearchInput
        onChange={onChangeTable}
      />
      <Modal
        title="Edit Region"
        visible={isEditModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
        confirmLoading={updateMutation.isLoading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the region name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="Code"
            rules={[{ required: true, message: 'Please input the region code!' }]}
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

export default TableRegion

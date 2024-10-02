import React, { useMemo, useState, useEffect } from 'react';  
import DataTable from "@smpm/components/DataTable"  
import { IVendorModel } from "@smpm/models/vendorModel"  
import { useDebounce } from "@smpm/utils/useDebounce"  
import useTableHelper from "@smpm/utils/useTableHelper"  
import { ColumnsType } from "antd/es/table"  
import { CheckboxValueType } from 'antd/es/checkbox/Group';  
import { Button, Space, Popconfirm, Tag, message, Modal, Form, Input, Select } from 'antd';  
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';  
import { getVendor, updateVendor } from '@smpm/services/vendorService';  
import { IPaginationRequest, IPaginationResponse, IBaseResponseService } from "@smpm/models";  

const { Option } = Select;  

const TableVendor: React.FC = () => {  
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

  useEffect(() => {  
    const fetchVendor = async () => {  
      setIsLoading(true);  
      try {  
        const response: IBaseResponseService<IPaginationResponse<IVendorModel>> = await getVendor({  
          ...pagination,  
          search: debouncedSearch,  
        });  
        console.log('Vendor data received:', response.result);  
        setVendor(response.result);  
      } catch (error) {  
        console.error('Error fetching vendors:', error);  
        message.error('Failed to fetch vendors');  
      } finally {  
        setIsLoading(false);  
      }  
    };  

    fetchVendor();  
  }, [debouncedSearch, pagination]);  

  const onSearch = (value: string) => setSearch(value)  

  const handleEdit = (record: IVendorModel) => {  
    setEditingVendor(record);  
    form.setFieldsValue(record);  
    setIsEditModalVisible(true);  
  };  

  const handleEditModalOk = async () => {  
    try {  
      const values = await form.validateFields();  
      if (editingVendor) {  
        await updateVendor(editingVendor.id, values);  
        message.success('Vendor updated successfully');  
        setIsEditModalVisible(false);  
        // Refresh the vendor list  
        const response: IBaseResponseService<IPaginationResponse<IVendorModel>> = await getVendor(pagination);  
        setVendor(response.result);  
      }  
    } catch (error) {  
      console.error('Failed to update vendor:', error);  
      message.error('Failed to update vendor');  
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
    // Note: deleteVendor function is not provided in the vendorService, so you might need to implement it  
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

  const columns: ColumnsType<IVendorModel> = useMemo((): ColumnsType<IVendorModel> => {  
    return [  
      {  
        title: "NAME",  
        dataIndex: "name",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
        render: (value) => renderComplexObject(value),  
      },  
      {  
        title: "CODE",  
        dataIndex: "code",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
        render: (value) => renderComplexObject(value),  
      },  
      {  
        title: "TYPE",  
        dataIndex: "type",  
        render: (type: string) => <Tag color="blue">{renderComplexObject(type)}</Tag>,  
      },  
      {  
        title: "DESCRIPTION",  
        dataIndex: "description",  
        render: (value) => renderComplexObject(value),  
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

  console.log('Vendor data before render:', vendor?.data);  

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
            name="type"  
            label="Type"  
            rules={[{ required: true, message: 'Please select the vendor type!' }]}  
          >  
            <Select>  
              <Option value="supplier">Supplier</Option>  
              <Option value="manufacturer">Manufacturer</Option>  
              <Option value="distributor">Distributor</Option>  
            </Select>  
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
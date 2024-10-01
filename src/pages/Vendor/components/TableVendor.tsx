import React, { useMemo, useState, useEffect } from 'react';  
import DataTable from "@smpm/components/DataTable"  
import { IVendorModel } from "@smpm/models/vendorModel"  
import { useDebounce } from "@smpm/utils/useDebounce"  
import useTableHelper from "@smpm/utils/useTableHelper"  
import { ColumnsType } from "antd/es/table"  
import { CheckboxValueType } from 'antd/es/checkbox/Group';  
import { Button, Space, Popconfirm, Tag, message } from 'antd';  
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';  
import { getVendor } from '@smpm/services/vendorService';  
import { IPaginationRequest, IPaginationResponse, IBaseResponseService } from "@smpm/models";  

const TableVendor: React.FC = () => {  
  const { onChangeTable, onChangeSearchBy } = useTableHelper<IVendorModel>()  

  const [search, setSearch] = useState<string>("")  
  const debouncedSearch = useDebounce(search, 500)  

  const [vendor, setVendor] = useState<IPaginationResponse<IVendorModel> | null>(null);  
  const [isLoading, setIsLoading] = useState(true);  
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
    console.log('Edit vendor:', record);  
    // Implement edit logic here  
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
  )  
}  

export default TableVendor
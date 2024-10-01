import React, { useMemo, useState } from 'react';  
import DataTable from "@smpm/components/DataTable"  
import { IRegionModel } from "@smpm/models/regionModel"  
import { getRegion } from "@smpm/services/regionService"  
import { useDebounce } from "@smpm/utils/useDebounce"  
import useTableHelper from "@smpm/utils/useTableHelper"  
import { useQuery } from "@tanstack/react-query"  
import { Button, Space, Popconfirm, message } from 'antd'  
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'  
import { ColumnsType } from "antd/es/table"  

const TableRegion: React.FC = () => {  
  const { tableFilter, onChangeTable, onChangeSearchBy } = useTableHelper<IRegionModel>()  

  const [search, setSearch] = useState<string>("")  

  const searchValue = useDebounce(search, 500)  

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

  const handleEdit = (record: IRegionModel) => {  
    console.log('Edit region:', record);  
    // Implement edit logic here  
  };  

  const handleDelete = async (record: IRegionModel) => {  
    try {  
      // Implement delete logic here  
      // For example: await deleteRegion(record.id);  
      message.success('Region deleted successfully');  
      refetch(); // Refetch the data after deletion  
    } catch (error) {  
      console.error('Error deleting region:', error);  
      message.error('Failed to delete region');  
    }  
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
  )  
}  

export default TableRegion
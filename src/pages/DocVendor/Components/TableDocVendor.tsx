import React, { useMemo, useState } from "react";  
import { Button, Space, Typography, Pagination } from "antd";  
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";  
import DataTable from "@smpm/components/DataTable";  
import { useDebounce } from "@smpm/utils/useDebounce";  
import useTableHelper from "@smpm/utils/useTableHelper";  
import { ColumnsType } from "antd/es/table";  
import { useQuery } from "@tanstack/react-query";  
import { DocVendorModel } from "@smpm/models/documentModel";  
import { findAll } from "@smpm/services/docvendorService";
import { formatDateIndo } from "@smpm/utils/dateUtils";

const { Text } = Typography;  

const TableVendor: React.FC = () => {  
  const { tableFilter, onChangeTable } = useTableHelper<DocVendorModel>({ pagination: true });  
  const [search, setSearch] = useState<string>("");  
  const searchValue = useDebounce(search, 500);  
  const [uploadedFiles] = useState<{ [key: string]: string }>({});  
  const [currentPage, setCurrentPage] = useState<number>(1);  
  const [pageSize, setPageSize] = useState<number>(10);   

  const onSearch = (value: string) => setSearch(value);  

  const {  
    data: activityJobOrder,  
    isLoading,  
  } = useQuery({  
    queryKey: ["document-vendor", { ...tableFilter, searchValue, currentPage, pageSize }],  
    queryFn: () =>  
      findAll({  
        order: tableFilter.sort.order,  
        order_by: tableFilter.sort.order_by,  
        search: searchValue,  
        search_by: tableFilter.searchBy,  
        page: currentPage,  
        take: pageSize,  
      }),  
  });  

  const columns: ColumnsType<DocVendorModel> = useMemo(  
    (): ColumnsType<DocVendorModel> => [  
      {  
        title: "No. JO",  
        dataIndex: "name",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
        width: 250,  
      },  
      {  
        title: "Jenis JO",  
        dataIndex: "jenis_jo",  
        width: 150,  
      },  
      {  
        title: "Nama Vendor",  
        dataIndex: "vendor_name",  
        width: 250,  
      },  
      {  
        title: "Merk EDC",  
        dataIndex: "merk_edc",  
        width: 150,  
      },  
      {  
        title: "Tipe EDC",  
        dataIndex: "tipe_edc",  
        width: 150,  
      },  
      {  
        title: "Tanggal Masuk",  
        dataIndex: "tanggal_masuk",  
        width: 150,  
      },  
      {  
        title: "File 1",  
        dataIndex: "file1",  
        width: 400,  
        render: (text, record) => (  
          <Space size="middle">  
            {text ? (  
              <>
              <Button type="primary" icon={<DownloadOutlined />} onClick={() => console.log(`Downloading ${text}`)}>  
                Download File  
              </Button>  
                <Text className="min-w-[100px]">{text}</Text>  
              </>
            ) : (  
              <>  
                <Button icon={<UploadOutlined />}>Choose File</Button>  
                <Text className={uploadedFiles[`file_1_${record.name}`] ? 'font-bold' : ''}>  
                  {uploadedFiles[`file_1_${record.name}`] || "No Choose File"}  
                </Text>  
                <Button type="primary" className="w-20 h-8">Save</Button>  
              </>  
            )}  
          </Space>  
        ),  
      },  
      {  
        title: "File 2",  
        dataIndex: "file2",  
        width: 400,  
        render: (text, record) => (  
          <Space size="middle">  
             {text ? (  
              <>
              <Button type="primary" icon={<DownloadOutlined />} onClick={() => console.log(`Downloading ${text}`)}>  
                Download File  
              </Button>  
                <Text className="min-w-[100px]">{text}</Text>  
              </>
            ) : (  
              <>  
                <Button icon={<UploadOutlined />}>Choose File</Button>  
                <Text className={uploadedFiles[`file_2_${record.name}`] ? 'font-bold' : ''}>  
                  {uploadedFiles[`file_2_${record.name}`] || "No Choose File"}  
                </Text>  
                <Button type="primary" className="w-20 h-8">Save</Button>  
              </>  
            )}  
          </Space>  
        ),  
      },  
    ],  
    [uploadedFiles]  
  );  

  const handlePageChange = (page: number, size?: number) => {  
    setCurrentPage(page);  
    setPageSize(size || 10);  
  };  

  const dataSource = useMemo(() => {  
    const activityData = activityJobOrder?.result.data || [];  
    return [  
      ...activityData.map((item: any) => ({  
        name: item.jobOrder.no,  
        jenis_jo: item.jobOrder.type,  
        vendor_name: item.vendor.name,  
        merk_edc: item.edc.brand,  
        tipe_edc: item.edc.brand_type,  
        tanggal_masuk: formatDateIndo(item.jobOrder.updated_at),  
        file1: item.file1,  
        file2: item.file2,  
      })),  
    ];  
  }, [currentPage, pageSize, activityJobOrder]);  

  return (  
    <div>  
      <div>  
        <DataTable<DocVendorModel>  
          dataSource={dataSource}  
          loading={isLoading}  
          bordered  
          onGlobalSearch={onSearch}  
          columns={columns}  
          useGlobalSearchInput  
          className="overflow-x-auto"  
          onChange={onChangeTable}  
          scroll={{ x: 'max-content' }}  
          pagination={false}   
        />  
      </div>  
      <div className="flex flex-col gap-4 mt-4">  
        <Pagination  
            current={currentPage}  
            pageSize={pageSize}  
            total={activityJobOrder?.result.meta.item_count || 0}  
            onChange={handlePageChange}  
            className="self-end"  
        />  
        </div>  
    </div>  
  );  
};  

export default TableVendor;
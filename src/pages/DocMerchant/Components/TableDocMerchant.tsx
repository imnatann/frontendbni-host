import React, { useMemo, useState } from "react";  
import { Button, Space, Pagination, Typography, Upload } from "antd";  
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";  
import DataTable from "@smpm/components/DataTable";  
import { DocMerchantModel } from "@smpm/models/documentModel";  
import { useDebounce } from "@smpm/utils/useDebounce";  
import useTableHelper from "@smpm/utils/useTableHelper";  
import { ColumnsType, TablePaginationConfig } from "antd/es/table";  
import { findAll } from "@smpm/services/docmerchantService";  
import { useQuery } from "@tanstack/react-query";  
import { SorterResult } from "antd/es/table/interface";  

const { Text } = Typography;  

const TableDocMerchant: React.FC = () => {  
  const { tableFilter, onChangeTable } = useTableHelper<DocMerchantModel>({ pagination: true });  
  const [search, setSearch] = useState<string>("");  
  const searchValue = useDebounce(search, 500);  
  const [_uploadedFiles, _setUploadedFiles] = useState<{ [key: string]: string }>({});  
  const [currentPage, setCurrentPage] = useState<number>(1);  
  const [pageSize, setPageSize] = useState<number>(10);  

  const onSearch = (value: string) => setSearch(value);  

  const {  
    data: merchantData,  
    isLoading,  
  } = useQuery({  
    queryKey: ["merchant-data", { ...tableFilter, searchValue, page: currentPage, pageSize }],  
    queryFn: () =>  
      findAll({  
        order: tableFilter.sort.order,  
        order_by: tableFilter.sort.order_by,  
        search: searchValue,  
        page: currentPage,  
        take: pageSize,  
      }),  
  });  

  const columns: ColumnsType<DocMerchantModel> = useMemo(  
    (): ColumnsType<DocMerchantModel> => [  
      {  
        title: "Merchant Name",  
        dataIndex: "merchant",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
        width: 200,  
        render: (merchant) => merchant ? merchant.name : "Unknown Merchant",  
      },  
      {  
        title: "Wilayah",  
        dataIndex: "region",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
        width: 200,  
        render: (region) => region ? region.name : "Unknown Region",  
      },  
      {  
        title: "File 1",  
        dataIndex: "file1",  
        width: 500,  
        render: (text, _record) => (  
          <Space>  
            {text ? (  
              <>  
                <Button  
                  type="primary"  
                  icon={<DownloadOutlined />}  
                  className="min-w-[110px]"  
                  onClick={() => console.log(`Downloading ${text}`)}  
                >  
                  Download File  
                </Button>  
                <Text className="min-w-[100px]">{text}</Text>  
              </>  
            ) : (  
              <>  
                <Upload  
                  beforeUpload={(file) => {  
                     console.log(`Uploading file: ${file.name}`);  
                    return false; 
                  }}  
                  showUploadList={false}  
                >  
                  <Button icon={<UploadOutlined />} className="min-w-[110px]">  
                    Choose File  
                  </Button>  
                </Upload>  
                <Text className="min-w-[200px]">No Choose File</Text>  
                <Button type="primary" className="min-w-[110px] h-[30px]">  
                  Save  
                </Button>  
              </>  
            )}  
          </Space>  
        ),  
      },  
      {  
        title: "File 2",  
        dataIndex: "file2",  
        width: 500,  
        render: (text, _record) => (  
          <Space>  
            {text ? (  
              <>  
                <Button  
                  type="primary"  
                  icon={<DownloadOutlined />}  
                  className="min-w-[110px]"  
                  onClick={() => console.log(`Downloading ${text}`)}  
                >  
                  Download File  
                </Button>  
                <Text className="min-w-[200px]">{text}</Text>  
              </>  
            ) : (  
              <>  
                <Upload  
                  beforeUpload={(file) => {  
                    // Handle file upload logic here  
                    console.log(`Uploading file: ${file.name}`);  
                    return false; // Prevent default upload behavior  
                  }}  
                  showUploadList={false}  
                >  
                  <Button icon={<UploadOutlined />} className="min-w-[110px]">  
                    Choose File  
                  </Button>  
                </Upload>  
                <Text className="min-w-[200px]">No Choose File</Text>  
                <Button type="primary" className="min-w-[110px] h-[30px]">  
                  Save  
                </Button>  
              </>  
            )}  
          </Space>  
        ),  
      },
      {  
        title: "Location",  
        dataIndex: "location",  
        ellipsis: true,  
        width: 500,  
        render: (text) => (  
          <Text style={{ whiteSpace: "pre-line" }} ellipsis={{ tooltip: text }}>  
            {text}  
          </Text>  
        ),  
      },  
    ],  
    []  
  );  

  const handlePageChange = (page: number, pageSize?: number) => {  
    setCurrentPage(page);  
    setPageSize(pageSize || 10);  
    onChangeTable(  
      { current: page, pageSize: pageSize || 10 },  
      {},  
      { order: tableFilter.sort.order === 'desc' ? 'descend' : 'ascend', field: tableFilter.sort.order_by }  
    );  
  };  

  const handleTableChange = (pagination: TablePaginationConfig, filters: {}, sorter: SorterResult<DocMerchantModel> | SorterResult<DocMerchantModel>[]) => {  
    onChangeTable(pagination, filters, sorter);  
  };  

  return (  
    <div>  
      <div>  
        <DataTable<DocMerchantModel>  
          dataSource={merchantData?.result?.data ?? []}  
          pagination={false}  
          loading={isLoading}  
          bordered  
          onGlobalSearch={onSearch}  
          columns={columns}  
          useGlobalSearchInput  
          className="overflow-x-auto"  
          onChange={handleTableChange}  
        />  
      </div>  
      <div className="flex flex-col gap-4 mt-4">  
        <Pagination  
          current={currentPage}  
          pageSize={pageSize}  
          total={merchantData?.result?.meta?.item_count ?? 0}  
          onChange={handlePageChange}  
          className="self-end"  
        />  
      </div>  
    </div>  
  );  
};  

export default TableDocMerchant;
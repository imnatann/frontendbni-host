import React, { useState } from "react";  
import { Button, Space, Pagination, Typography } from "antd";  
import { DownloadOutlined } from "@ant-design/icons";  
import DataTable from "@smpm/components/DataTable";  
import { DocMerchantModel } from "@smpm/models/documentModel";  
import { useDebounce } from "@smpm/utils/useDebounce";  
import useTableHelper from "@smpm/utils/useTableHelper";  
import { ColumnsType, TablePaginationConfig } from "antd/es/table";  
import { findAll, update } from "@smpm/services/docmerchantService";  
import { useQuery } from "@tanstack/react-query";  
import { SorterResult } from "antd/es/table/interface";  

const { Text } = Typography;  

const TableDocMerchant: React.FC = () => {  
  const { tableFilter, onChangeTable } = useTableHelper<DocMerchantModel>({ pagination: true });  
  const [search, setSearch] = useState<string>("");  
  const searchValue = useDebounce(search, 500);  
  const [currentPage, setCurrentPage] = useState<number>(1);  
  const [pageSize, setPageSize] = useState<number>(10);  
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: { file: File; name: string } }>({});  

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

  const columns: ColumnsType<DocMerchantModel> = [  
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
      render: (text, record) => (  
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
          <input  
                type="file"  
                onChange={(e) => {  
                  const files = e.target.files;  
                  if (files && files.length > 0) {  
                    setUploadedFiles((prev) => ({  
                      ...prev,  
                      [`${record.id}-file1`]: { file: files[0], name: files[0].name },  
                    }));  
                  }  
                }}  
              />
              <Text className="min-w-[200px]">  
                {uploadedFiles[`${record.id}-file1`]?.name || "No Choose File"}  
              </Text>  
              {uploadedFiles[`${record.id}-file1`] && (  
                <Button  
                  type="primary"  
                  className="min-w-[110px] h-[30px]"  
                  onClick={() => handleFileUpload(record.id, 'file1')}  
                >  
                  Save  
                </Button>  
              )}  
            </>  
          )}  
        </Space>  
      ),  
    },  
    {  
      title: "File 2",  
      dataIndex: "file2",  
      width: 500,  
      render: (text, record) => (  
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
              <input  
                type="file"  
                onChange={(e) => {  
                  const files = e.target.files;  
                  if (files && files.length > 0) {  
                    setUploadedFiles((prev) => ({  
                      ...prev,  
                      [`${record.id}-file2`]: { file: files[0], name: files[0].name },  
                    }));  
                  }  
                }}  
              />
              <Text className="min-w-[200px]">  
                {uploadedFiles[`${record.id}-file2`]?.name || "No Choose File"}  
              </Text>  
              {uploadedFiles[`${record.id}-file2`] && (  
                <Button  
                  type="primary"  
                  className="min-w-[110px] h-[30px]"  
                  onClick={() => handleFileUpload(record.id, 'file2')}  
                >  
                  Save  
                </Button>  
              )}  
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
  ];  

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

  const handleFileUpload = async (id: number, fileKey: 'file1' | 'file2') => {  
    const file = uploadedFiles[`${id}-${fileKey}`]?.file;  
    if (!file) {  
      alert("No file selected for upload.");  
      return;  
    }  

    const formData = new FormData();  
    formData.append(fileKey, file);  

    try {  
      const response = await update(id, formData);  
      alert("File uploaded successfully.");  
      setUploadedFiles((prev) => {  
        const updatedFiles = { ...prev };  
        delete updatedFiles[`${id}-${fileKey}`];  
        return updatedFiles;  
      });  
      console.log(response);  
    } catch (error) {  
      alert("File upload failed.");  
    }  
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
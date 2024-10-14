import React, { useMemo, useState, useRef } from "react";  
import { Button, Space, Typography, Pagination, message } from "antd";  
import { DownloadOutlined, UploadOutlined } from "@ant-design/icons";  
import DataTable from "@smpm/components/DataTable";  
import { useDebounce } from "@smpm/utils/useDebounce";  
import useTableHelper from "@smpm/utils/useTableHelper";  
import { ColumnsType } from "antd/es/table";  
import { useQuery, useQueryClient } from "@tanstack/react-query";  
import { DocVendorModel } from "@smpm/models/documentModel";  
import { findAll, update } from "@smpm/services/docvendorService";  
import { formatDateIndo } from "@smpm/utils/dateUtils";  

const { Text } = Typography;  

const TableDocVendor: React.FC = () => {  
  const { tableFilter, onChangeTable } = useTableHelper<DocVendorModel>({ pagination: true });  
  const [search, setSearch] = useState<string>("");  
  const searchValue = useDebounce(search, 500);  
  const [fileUploads, setFileUploads] = useState<{ [key: string]: { file: File; name: string } }>({});  
  const [currentPage, setCurrentPage] = useState<number>(1);  
  const [pageSize, setPageSize] = useState<number>(10);  
  const queryClient = useQueryClient();  
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});  

  const onSearch = (value: string) => setSearch(value);  

  const {  
    data: activityJobOrder,  
    isLoading,  
    refetch,  
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

  const handleFileUpload = async (id: number, fileKey: 'file1' | 'file2') => {  
    const file = fileUploads[`${id}-${fileKey}`]?.file;  
    if (!file) {  
      message.error("No file selected for upload.");  
      return;  
    }  

    const formData = new FormData();  
    formData.append(fileKey, file);  

    try {  
      await update(id, formData);  
      message.success("File uploaded successfully.");  
      setFileUploads((prev) => {  
        const updatedFiles = { ...prev };  
        delete updatedFiles[`${id}-${fileKey}`];  
        return updatedFiles;  
      });  
      await refetch(); // Refetch the table data after successful upload  
    } catch (error) {  
      message.error("File upload failed.");  
    }  
  };  

  const triggerFileInput = (recordId: number, fileKey: 'file1' | 'file2') => {  
    const inputRef = fileInputRefs.current[`${recordId}-${fileKey}`];  
    if (inputRef) {  
      inputRef.click();  
    }  
  };  

  const handleFileChange = (recordId: number, fileKey: 'file1' | 'file2', event: React.ChangeEvent<HTMLInputElement>) => {  
    const file = event.target.files?.[0];  
    if (file) {  
      setFileUploads((prev) => ({  
        ...prev,  
        [`${recordId}-${fileKey}`]: { file, name: file.name },  
      }));  
    }  
  };  

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
                <input  
                  type="file"  
                  ref={(el) => fileInputRefs.current[`${record.id}-file1`] = el}  
                  style={{ display: 'none' }}  
                  onChange={(e) => handleFileChange(record.id, 'file1', e)}  
                />  
                <Button type="primary" icon={<UploadOutlined />} onClick={() => triggerFileInput(record.id, 'file1')}>  
                  {fileUploads[`${record.id}-file1`]?.name || "Upload File 1"}  
                </Button>  
                {fileUploads[`${record.id}-file1`] && (  
                  <Button type="primary" className="ml-2" onClick={() => handleFileUpload(record.id, 'file1')}>  
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
                <input  
                  type="file"  
                  ref={(el) => fileInputRefs.current[`${record.id}-file2`] = el}  
                  style={{ display: 'none' }}  
                  onChange={(e) => handleFileChange(record.id, 'file2', e)}  
                />  
                <Button type="primary" icon={<UploadOutlined />} onClick={() => triggerFileInput(record.id, 'file2')}>  
                  {fileUploads[`${record.id}-file2`]?.name || "Upload File 2"}  
                </Button>  
                {fileUploads[`${record.id}-file2`] && (  
                  <Button type="primary" className="ml-2" onClick={() => handleFileUpload(record.id, 'file2')}>  
                    Save  
                  </Button>  
                )}  
              </>  
            )}  
          </Space>  
        ),  
      },  
    ],  
    [fileUploads]  
  );  

  const handlePageChange = (page: number, size?: number) => {  
    setCurrentPage(page);  
    setPageSize(size || 10);  
    onChangeTable({ current: page, pageSize: size || 10 }, {}, { order: tableFilter.sort.order === 'desc' ? 'descend' : 'ascend', field: tableFilter.sort.order_by });  
  };  

  const dataSource = useMemo(() => {  
    const activityData = activityJobOrder?.result.data || [];  
    return [  
      ...activityData.map((item: any) => ({  
        id: item.id,  
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

export default TableDocVendor;
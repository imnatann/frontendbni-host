import React, { useMemo, useState } from "react";  
import { Pagination } from "antd";  
import DataTable from "@smpm/components/DataTable";  
import { PaymentModel } from "@smpm/models/paymentModel";  
import { IVendorModel } from "@smpm/models/vendorModel";  
import { IBaseResponseService, IPaginationResponse } from "@smpm/models";  
import { useDebounce } from "@smpm/utils/useDebounce";  
import useTableHelper from "@smpm/utils/useTableHelper";  
import { ColumnsType } from "antd/es/table";  
import { getActivityJobOrder } from "@smpm/services/paymentService";  
import { getVendor } from "@smpm/services/vendorService";  
import { useQuery } from "@tanstack/react-query";  
import * as dayjs from "dayjs";  
import { Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';  


const TablePayment: React.FC = () => {  
  const { tableFilter, onChangeTable } = useTableHelper<PaymentModel>();  
  const [search, setSearch] = useState<string>("");  
  const searchValue = useDebounce(search, 500);  
  const [currentPage, setCurrentPage] = useState<number>(1);  
  const [pageSize, setPageSize] = useState<number>(10);
  const navigate = useNavigate();    

  const onSearch = (value: string) => setSearch(value);  
 
  const { data: vendorData, isLoading: vendorLoading } = useQuery<  
    IBaseResponseService<IPaginationResponse<IVendorModel>>  
  >({  
    queryKey: ["vendors"],  
    queryFn: () => getVendor({  
      page: 1,  
      take: 1000,  
      order: "asc",  
      order_by: "name",  
    }),  
  });  

  const {  
    data: payment,  
    isLoading: paymentLoading,  
  } = useQuery({  
    queryKey: ["payment", { ...tableFilter, search, page: currentPage, pageSize }],  
    queryFn: () =>  
      getActivityJobOrder({  
        order: tableFilter.sort.order,  
        order_by: tableFilter.sort.order_by,  
        search: searchValue,  
        search_by: tableFilter.searchBy,  
        page: currentPage,  
        take: pageSize,  
      }),  
  });  

  const columns: ColumnsType<PaymentModel> = useMemo(  
    (): ColumnsType<PaymentModel> => [  
      {  
        title: "Nama Vendor",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
        render: (record) => {  
          const vendor = vendorData?.result.data.find((v) => v.id === record.vendor_id);  
          return vendor?.name || "";  
        },  
      },  
      {  
        title: "Kode Vendor",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
        render: (record) => {  
          const vendor = vendorData?.result.data.find((v) => v.id === record.vendor_id);  
          return vendor?.code || "";  
        },  
      },  
      {  
        title: "TANGGAL",  
        dataIndex: "job_order.date",  
        sorter: true,  
        sortDirections: ["descend", "ascend"],  
        render: (date) => dayjs(date).format("DD-MMM-YYYY"),  
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (status, record) => { 
          if (status === "edit") {
            return (
              <Button type="dashed" style={{ borderColor: "orange", color: "orange" }}>
                Edit
              </Button>
            );
          }
          if (status === "submit") {
            return (
              <Button type="primary" style={{ backgroundColor: "#00474f", borderColor: "#00474f" }}>
                Submit
              </Button>
            );
          }
          if (status === "success") {
            return (
              <Button type="default" icon={<EyeOutlined />} style={{ color: "blue", borderColor: "blue" }}>
                Success
              </Button>
            );
          }
          return (
            <Button type="default" onClick={() => handleUnknownClick(record)}>  
              Unknown  
            </Button> 
          );
        },
      },
    ],
    [vendorData]  
  );  

  const handlePageChange = (page: number, pageSize?: number) => {  
    setCurrentPage(page);  
    setPageSize(pageSize || 10);  
  };  

  const handleUnknownClick = (record: PaymentModel) => {   
    navigate(`/payment/unknown/${record.id}`);  
  };

  return (  
    <div>  
      <div>  
        <DataTable<PaymentModel>  
          dataSource={payment?.result.data}  
          pagination={false}  
          loading={paymentLoading || vendorLoading}  
          bordered  
          onGlobalSearch={onSearch}  
          columns={columns}  
          useGlobalSearchInput  
          className="overflow-x-auto"  
          onChange={onChangeTable}  
        />  
      </div>  
      <div className="flex flex-col gap-4 mt-4">  
        <Pagination  
          current={currentPage}  
          pageSize={pageSize}  
          total={payment?.result.meta.item_count}  
          onChange={handlePageChange}  
          className="self-end"  
        />  
      </div>  
    </div>  
  );  
};  

export default TablePayment;
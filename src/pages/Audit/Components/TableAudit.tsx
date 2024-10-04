

import React, { useMemo, useState, useEffect } from 'react';
import DataTable from "@smpm/components/DataTable";
import { IAuditTrail } from "@smpm/models/auditModel";
import { useDebounce } from "@smpm/utils/useDebounce";
import useTableHelper from "@smpm/utils/useTableHelper";
import { ColumnsType } from "antd/es/table";
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Tag, message } from 'antd';
import { getAuditTrails } from '@smpm/services/auditService';
import { IPaginationRequest, IPaginationResponse, IBaseResponseService } from "@smpm/models";

const AuditTrailTable: React.FC = () => {
  const { onChangeTable, onChangeSearchBy } = useTableHelper<IAuditTrail>();
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  const [auditTrails, setAuditTrails] = useState<IPaginationResponse<IAuditTrail> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState<IPaginationRequest>({
    search: '',
    page: 1,
    take: 10,
    order: 'desc',
    order_by: 'ActivityDate'
  });

  const fetchAuditTrails = async () => {  
    setIsLoading(true);  
    try {  
      const response: IBaseResponseService<IPaginationResponse<IAuditTrail>> = await getAuditTrails({  
        ...pagination,  
        search: debouncedSearch,  
        search_by: ['Url', 'ActionName', 'MenuName', 'UserName', 'IpAddress', 'Browser', 'OS', 'AppSource'],  
      });  
      console.log('Full API Response:', response);  
      if (response.result && response.result.data) {  
        console.log('Audit Trails Data:', response.result.data);  
        setAuditTrails(response.result);  
      } else {  
        console.error('No data in response:', response);  
      }  
    } catch (error) {  
      console.error('Error fetching audit trails:', error);  
      if (error) {  
        console.error('Error response:', error);  
        console.error('Error status:', error);  
      } else if (error) {  
        console.error('Error request:', error);  
      } else {  
        console.error('Error message:', error);  
      }  
      message.error('Failed to fetch audit trails');  
    } finally {  
      setIsLoading(false);  
    }  
  };
  
  useEffect(() => {  
    console.log('Fetching audit trails with params:', {  
      ...pagination,  
      search: debouncedSearch,  
      search_by: ['Url', 'ActionName', 'MenuName', 'UserName', 'IpAddress', 'Browser', 'OS', 'AppSource'],  
    });  
    fetchAuditTrails();  
  }, [debouncedSearch, pagination]);  

  const onSearch = (value: string) => setSearch(value);

  const columns: ColumnsType<IAuditTrail> = useMemo((): ColumnsType<IAuditTrail> => {
    return [
      {
        title: "URL",
        dataIndex: "Url",
        sorter: true,
        ellipsis: true,
      },
      {
        title: "Action",
        dataIndex: "ActionName",
        sorter: true,
      },
      {
        title: "Menu",
        dataIndex: "MenuName",
        sorter: true,
      },
      {
        title: "User",
        dataIndex: "UserName",
        sorter: true,
      },
      {
        title: "IP Address",
        dataIndex: "IpAddress",
        sorter: true,
      },
      {
        title: "Date",
        dataIndex: "ActivityDate",
        sorter: true,
        render: (date: string) => new Date(date).toLocaleString(),
      },
      {
        title: "Browser",
        dataIndex: "Browser",
        sorter: true,
      },
      {
        title: "OS",
        dataIndex: "OS",
        sorter: true,
      },
      {
        title: "App Source",
        dataIndex: "AppSource",
        sorter: true,
        render: (source: string) => <Tag color="blue">{source}</Tag>,
      },
    ];
  }, []);

  const handleChangeSearchBy = (value: CheckboxValueType[]) => {
    onChangeSearchBy(value as string[]);
  };

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPagination(prev => ({
      ...prev,
      page: pagination.current,
      take: pagination.pageSize,
      order: sorter.order === 'descend' ? 'desc' : 'asc',
      order_by: sorter.field || 'ActivityDate'
    }));
    onChangeTable(pagination, filters, sorter);
  };

  return (
    <>
      <DataTable<IAuditTrail>
        dataSource={auditTrails?.data}
        pagination={{
          current: auditTrails?.meta.page,
          pageSize: auditTrails?.meta.take,
          total: auditTrails?.meta.item_count,
        }}
        loading={isLoading}
        bordered
        onChangeSearchBy={handleChangeSearchBy}
        onGlobalSearch={onSearch}
        columns={columns}
        useGlobalSearchInput
        onChange={handleTableChange}
      />
    </>
  );
};

export default AuditTrailTable;
 


// src/components/ListNeedApproval.tsx

import React from "react";
import { Button, List, Spin, Typography, Popconfirm } from "antd";
import { ReceivedInItem } from "@smpm/models/receivedInModel";

const { Text } = Typography;

interface ListNeedApprovalProps {
  data: ReceivedInItem[];
  loading: boolean;
  onApprove: (id: number) => void;
}

const ListNeedApproval: React.FC<ListNeedApprovalProps> = ({ data, loading, onApprove }) => {

  return (
    <div className="max-w-4xl p-4 mx-auto">
      {loading ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : data && data.length > 0 ? (
        <List
          itemLayout="vertical"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              className="p-3 mb-2 bg-white rounded-lg shadow-sm"
            >
              <div className="flex flex-col w-full">
                <div className="flex-grow mb-2">
                  <div className="font-semibold">
                    {item.joborder.type} - {item.joborder.merchant_name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {item.serial_number} | TID: {item.tid}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Region: {item.region.name} | Vendor: {item.vendor.name}
                  </div>
                  <Popconfirm
                    title="Apakah Anda yakin ingin menyetujui ReceivedIn ini?"
                    onConfirm={() => onApprove(item.id)}
                    okText="Ya"
                    cancelText="Tidak"
                  >
                    <Button type="primary">
                      Approve
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <div className="mt-4 text-center text-gray-500">
          Tidak ada item yang perlu disetujui.
        </div>
      )}
    </div>
  );
};

export default ListNeedApproval;
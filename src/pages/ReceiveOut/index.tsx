// src/pages/ReceiveOut.tsx

import React, { useEffect, useState } from "react";
import PageContent from "@smpm/components/PageContent";
import PageLabel from "@smpm/components/pageLabel";
import Page from "@smpm/components/pageTitle";
import { IconArrowRight } from "@tabler/icons-react";
import { Breadcrumb, Card, Col, Row, Typography, message } from "antd";
import TableReceiveOut from "./components/TableReceiveOut";
import ListNeedApproval from "./components/ListNeedApproval";
import { receivedOutService } from "@smpm/services/receivedOutService";
import { ReceivedOutItem } from "@smpm/models/receivedOutModel";

const { Title } = Typography;

const ReceiveOut = () => {
  // State untuk items yang perlu approval
  const [needApprovalData, setNeedApprovalData] = useState<ReceivedOutItem[]>([]);
  const [loadingNeedApproval, setLoadingNeedApproval] = useState<boolean>(false);

  // State untuk items yang sudah approved
  const [approvedData, setApprovedData] = useState<ReceivedOutItem[]>([]);
  const [loadingApproved, setLoadingApproved] = useState<boolean>(false);

  // Fetch items yang perlu approval
  const fetchNeedApprovalData = async () => {
    setLoadingNeedApproval(true);
    try {
      const response = await receivedOutService.findWaiting({
        page: 1,
        take: 10, // Sesuaikan jika diperlukan
      });
      setNeedApprovalData(response.result.data);
    } catch (error: any) {
      console.error(error);
      message.error("Failed to fetch data for items needing approval.");
    } finally {
      setLoadingNeedApproval(false);
    }
  };

  // Fetch items yang sudah approved
  const fetchApprovedData = async () => {
    setLoadingApproved(true);
    try {
      const response = await receivedOutService.findAll({
        page: 1,
        take: 10, // Sesuaikan jika diperlukan
      });
      // Filter data di frontend
      const approvedItems = response.result.data.filter(item => item.status === 'approved');
      setApprovedData(approvedItems);
    } catch (error: any) {
      console.error(error);
      message.error("Failed to fetch data for approved items.");
    } finally {
      setLoadingApproved(false);
    }
  };

  // Fetch data ketika komponen mount
  useEffect(() => {
    fetchNeedApprovalData();
    fetchApprovedData();
  }, []);

  // Handle approval
  const handleApprove = async (id: number) => {
    try {
      const userId = 1; // Ganti dengan logic untuk mendapatkan user ID yang sebenarnya
      const response = await receivedOutService.approveItem(id, {
        approved_by: userId,
        updated_by: userId,
      });
      message.success(`Item dengan ID ${id} berhasil disetujui.`);

      // Update state
      setNeedApprovalData((prevData) => prevData.filter((item) => item.id !== id));
      setApprovedData((prevData) => [response.result, ...prevData]);
    } catch (error: any) {
      console.error(error);
      message.error("Gagal menyetujui item.");
    }
  };

  return (
    <Page title={"Receive Out"}>
      <PageLabel
        title={<span className="text-2xl font-semibold">Receive Out</span>}
        subtitle={
          <Breadcrumb
            items={[
              {
                href: "",
                title: (
                  <span>
                    <IconArrowRight />
                    <span>Receive Out</span>
                  </span>
                ),
              },
            ]}
          />
        }
      />
      <PageContent>
        <Row gutter={16}>
          <Col xs={24} md={6}>
            <Card>
              <Title level={5}>Need Approval</Title>
              <ListNeedApproval
                data={needApprovalData}
                loading={loadingNeedApproval}
                onApprove={handleApprove}
              />
            </Card>
          </Col>
          <Col xs={24} md={18}>
            <Card>
              <Title level={5}>Already Approved</Title>
              <TableReceiveOut
                data={approvedData}
                loading={loadingApproved}
              />
            </Card>
          </Col>
        </Row>
      </PageContent>
    </Page>
  );
};

export default ReceiveOut;
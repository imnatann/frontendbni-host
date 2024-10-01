import { HomeOutlined } from "@ant-design/icons";
import PageContent from "@smpm/components/PageContent";
import PageLabel from "@smpm/components/PageLabel";
import Page from "@smpm/components/PageTitle";
import {
  IconBuildingSkyscraper,
  IconBuildingStore,
  IconDevicesPc,
  IconFilter,
  IconIdBadge2,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import { Breadcrumb, Card, Col, Row, Typography } from "antd";
import ChartEdcProfile from "./components/ChartEdcProfile";
import ChartKepemilikan from "./components/ChartKepemilikan";
import ChartPopulasiByVendor from "./components/ChartPopulasiByVendor";
import ChartEdcByWilayah from "./components/ChartEdcByWilayah";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import ChartStatusPenarikan from "./components/ChartStatusPenarikan";
import ChartStatusPemasangan from "./components/ChartStatusPemasangan";
import ChartStatusPm from "./components/ChartStatusPm";
import ChartStatusCm from "./components/ChartStatusCm";

const Dashboard = () => {
  const { Title } = Typography;

  const count = [
    {
      today: "User Terdaftar",
      title: "1.646",
      icon: <IconUser />,
    },
    {
      today: "Total Group Roles",
      title: "10",
      icon: <IconUsers />,
    },
    {
      today: "Total Wilayah",
      title: "21",
      icon: <IconBuildingSkyscraper />,
    },
    {
      today: "Total Vendor",
      title: "18",
      icon: <IconIdBadge2 />,
    },
    {
      today: "Total MID",
      title: "10",
      icon: <IconBuildingStore />,
    },
    {
      today: "Total TID",
      title: "10",
      icon: <IconDevicesPc />,
    },
  ];

  const onChangeYear: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Page title="Dashboard">
      <PageLabel
        title={<span className="font-semibold text-2xl">Dashboard</span>}
        subtitle={
          <Breadcrumb
            items={[
              {
                href: "",
                title: (
                  <>
                    <HomeOutlined />
                    <span>Dashboard</span>
                  </>
                ),
              },
            ]}
          />
        }
      />
      <PageContent className={"m-5"}>
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={4}
              xl={4}
              className="mb-5"
            >
              <Card bordered={false} className="criclebox">
                <div className="number">
                  <div className="icon-box">{c.icon}</div>
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={30}>
                      <span>{c.today}</span>
                      <Title level={3}>{c.title}</Title>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <Row gutter={16} className="mb-5">
          <Col span={12}>
            <Card title="EDC Profile" bordered={false} extra={<IconFilter />}>
              <ChartEdcProfile />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Kepemilikan" bordered={false} extra={<IconFilter />}>
              <ChartKepemilikan />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} className="mb-5">
          <Col span={12}>
            <Card
              title="Populasi by Vendor"
              bordered={false}
              extra={<IconFilter />}
            >
              <ChartPopulasiByVendor />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="EDC by Wilayah"
              bordered={false}
              extra={<IconFilter />}
            >
              <ChartEdcByWilayah />
            </Card>
          </Col>
        </Row>
        <Card
          title="Status Pekerjaan Vendor"
          bordered={false}
          extra={<DatePicker onChange={onChangeYear} picker="year" />}
        >
          <Row gutter={16} className="mb-5">
            <Col span={12}>
              <Card
                title="Status Pemasangan"
                bordered={false}
              >
                <ChartStatusPemasangan />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title="Status Penarikan"
                bordered={false}
              >
                <ChartStatusPenarikan />
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Card
                title="Status PM"
                bordered={false}
              >
                <ChartStatusPm />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title="Status CM"
                bordered={false}
              >
                <ChartStatusCm />
              </Card>
            </Col>
          </Row>
        </Card>
      </PageContent>
    </Page>
  );
};

export default Dashboard;

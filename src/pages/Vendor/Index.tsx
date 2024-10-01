import React from 'react';  
import {  
  CloudUploadOutlined,  
  HomeOutlined,  
  PlusOutlined,  
} from "@ant-design/icons"  
import PageContent from "@smpm/components/PageContent"  
import PageLabel from "@smpm/components/pageLabel"  
import Page from "@smpm/components/pageTitle"  
import { IconBuildingStore } from "@tabler/icons-react"  
import { Breadcrumb, Button, Card, Space } from "antd"  
import TableVendor from "./components/TableVendor"  

const Vendor: React.FC = () => {  
  return (  
    <Page title="Vendor">  
      <PageLabel  
        title={<span className="font-semibold text-2xl">Vendor</span>}  
        subtitle={  
          <Breadcrumb  
            items={[  
              {  
                href: "/",  
                title: (  
                  <>  
                    <HomeOutlined />  
                    <span>Home</span>  
                  </>  
                ),  
              },  
              {  
                title: (  
                  <div className="flex gap-1">  
                    <IconBuildingStore size="1rem" />  
                    <span>Vendor Management</span>  
                  </div>  
                ),  
              },  
              {  
                title: "Vendor",  
              },  
            ]}  
          />  
        }  
        endSection={  
          <Space>  
            <Button icon={<CloudUploadOutlined />}>Export</Button>  
            <Button type="primary" icon={<PlusOutlined />}>  
              Add New Vendor  
            </Button>  
          </Space>  
        }  
      />  
      <PageContent>  
        <Card>  
          <TableVendor />  
        </Card>  
      </PageContent>  
    </Page>  
  )  
}  

export default Vendor
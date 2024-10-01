import {
	CloudUploadOutlined,
	HomeOutlined,
	PlusOutlined,
} from "@ant-design/icons"
import PageContent from "@smpm/components/PageContent"
import PageLabel from "@smpm/components/pageLabel"
import Page from "@smpm/components/PageTitle"
import { IconUsersGroup } from "@tabler/icons-react"
import { Breadcrumb, Button, Card, Space } from "antd"
import TableView from "./components/TableRegion"
import TableRegion from "./components/TableRegion"

const Region = () => {
	return (
		<Page title="Wilayah">
			<PageLabel
				title={<span className="font-semibold text-2xl">Wilayah</span>}
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
										<IconUsersGroup size="1rem" />
										<span>Menu Management</span>
									</div>
								),
							},
							{
								title: "Wilayah",
							},
						]}
					/>
				}
				endSection={
					<Space>
						<Button icon={<CloudUploadOutlined />}>Export</Button>
						<Button type="primary" icon={<PlusOutlined />}>
							Buat Wilayah Baru
						</Button>
					</Space>
				}
			/>
			<PageContent>
				<Card>
					<TableRegion />
				</Card>
			</PageContent>
		</Page>
	)
}

export default Region

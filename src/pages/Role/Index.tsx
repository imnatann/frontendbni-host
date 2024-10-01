
import React from 'react';
import {
	CloudUploadOutlined,
	HomeOutlined,
	PlusOutlined,
} from "@ant-design/icons"
import PageContent from "@smpm/components/PageContent"
import PageLabel from "@smpm/components/pageLabel"
import Page from "@smpm/components/pageTitle"
import { IconUsersGroup } from "@tabler/icons-react"
import { Breadcrumb, Button, Card, Space } from "antd"
import TableRole from "./components/TableRole"

const Role: React.FC = () => {
	return (
		<Page title="Role">
			<PageLabel
				title={<span className="font-semibold text-2xl">Role</span>}
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
								title: "Role",
							},
						]}
					/>
				}
				endSection={
					<Space>
						<Button icon={<CloudUploadOutlined />}>Export</Button>
						<Button type="primary" icon={<PlusOutlined />}>
							Buat Role Baru
						</Button>
					</Space>
				}
			/>
			<PageContent>
				<Card>
					<TableRole />
				</Card>
			</PageContent>
		</Page>
	)
}

export default Role

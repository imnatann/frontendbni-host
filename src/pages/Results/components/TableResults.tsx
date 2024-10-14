import DataTable from "@smpm/components/DataTable"
import { IJobOrderModel } from "@smpm/models/jobOrderModel"
import { getDoneActivityJobOrder } from "@smpm/services/jobOrderService"
import { useDebounce } from "@smpm/utils/useDebounce"
import useTableHelper from "@smpm/utils/useTableHelper"
import { useQuery } from "@tanstack/react-query"
import { Badge } from "antd"
import { ColumnsType } from "antd/es/table"
import * as dayjs from "dayjs"
import { useMemo, useState } from "react"
// import { useNavigate } from "react-router-dom"

interface ITableActivityJobOrderProps {
	filter?: any
}

const Results: React.FC<ITableActivityJobOrderProps> = ({
	filter,
}) => {
	// const navigate = useNavigate()

	const { tableFilter, onChangeTable, onChangeSearchBy } =
		useTableHelper<IJobOrderModel>({pagination : true})

	const [search, setSearch] = useState<string>("")

	const searchValue = useDebounce(search, 500)

	const onSearch = (value: string) => setSearch(value)

	const {
		data: openJobOrder,
		isLoading,
 	} = useQuery({
		queryKey: ["activity-job-order", { ...tableFilter, searchValue, ...filter }],
		queryFn: () =>
			getDoneActivityJobOrder({
				order: tableFilter.sort.order,
				order_by: tableFilter.sort.order_by,
				search: searchValue,
				search_by: tableFilter.searchBy,
				page: Number(tableFilter.pagination.current),
				take: Number(tableFilter.pagination.pageSize),
				...filter,
			}),
	})

	const columns: ColumnsType<IJobOrderModel> =
		useMemo((): ColumnsType<IJobOrderModel> => {
			return [
				{
					title: "NO. JO",
					dataIndex: "no",
					sorter: true,
					sortDirections: ["descend", "ascend"],
					width: 300,
				},
				{
					title: "JENIS JO",
					dataIndex: "type",
					sorter: true,
					sortDirections: ["descend", "ascend"],
					render: (type) => {
						return type.includes("Cancel") ? <Badge color="red" text={type} /> : type
					},
				},
				{
					title: "STATUS",
					dataIndex: "status",
					sorter: true,
					sortDirections: ["descend", "ascend"],
					render: (status) => {
						return (
							<Badge
								color={status == "Cancel" ? "red" : status == "Done" ? "green" : "blue"}
								text={status}
							/>
						)
					},
				},
				{
					title: "NAMA MERCHANT",
					dataIndex: "merchant_name",
					sorter: true,
					sortDirections: ["descend", "ascend"],
				},
				{
					title: "VENDOR",
					sorter: true,
					sortDirections: ["descend", "ascend"],
					render: (record) => {
						return record.vendor.name
					},
				},
				{
					title: "TANGGAL",
					dataIndex: "date",
					sorter: true,
					sortDirections: ["descend", "ascend"],
					render: (date) => {
						return dayjs(date).format("DD-MMM-YYYY")
					},
				},
				{
					title: "ACTION",
					render: (record) => {
						if (record.type.includes("Cancel")) return "No action"
						if (["Done", "Cancel"].includes(record.status)) return "Done activity"
						return (
							<a
								onClick={() => {
									window.open(`/job-order/activity/${record.no}`, "_blank", "noreferrer")
								}}
							>
								Activity
							</a>
						)
					},
				},
			]
		}, [])

	return (
		<DataTable<IJobOrderModel>
			dataSource={openJobOrder?.result.data}
			pagination={{
				current: openJobOrder?.result.meta.page,
				pageSize: openJobOrder?.result.meta.take,
				total: openJobOrder?.result.meta.item_count,
			}}
			loading={isLoading}
			bordered
			onChangeSearchBy={onChangeSearchBy}
			searchByOptions={[
				{
					name: "NO. JO",
					value: "no",
				},
				{
					name: "Jenis",
					value: "type",
				},
				{
					name: "Nama Merchant",
					value: "merchant_name",
				},
				{
					name: "Vendor",
					value: "vendor.name",
				},
			]}
			onGlobalSearch={onSearch}
			columns={columns}
			useGlobalSearchInput
			onChange={onChangeTable}
			scroll={{
				x: 1000,
			}}
		/>
	)
}

export default Results

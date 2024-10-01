import DataTable from "@smpm/components/DataTable"
import { IJobOrderModel } from "@smpm/models/jobOrderModel"
import { getActivityJobOrder } from "@smpm/services/jobOrderService"
import { useDebounce } from "@smpm/utils/useDebounce"
import useTableHelper from "@smpm/utils/useTableHelper"
import { useQuery } from "@tanstack/react-query"
import { Badge } from "antd"
import { ColumnsType } from "antd/es/table"
import * as dayjs from "dayjs"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

interface ITableActivityJobOrderProps {
	filter?: any
}

const TableActivityJobOrder: React.FC<ITableActivityJobOrderProps> = ({
	filter,
}) => {
	const navigate = useNavigate()

	const { tableFilter, onChangeTable, onChangeSearchBy } =
		useTableHelper<IJobOrderModel>()

	const [search, setSearch] = useState<string>("")

	const searchValue = useDebounce(search, 500)

	const onSearch = (value: string) => setSearch(value)

	const {
		data: openJobOrder,
		isLoading,
		isSuccess,
	} = useQuery({
		queryKey: ["activity-job-order", { ...tableFilter, searchValue, ...filter }],
		queryFn: () =>
			getActivityJobOrder({
				order: tableFilter.sort.order,
				order_by: tableFilter.sort.order_by,
				search: searchValue,
				search_by: tableFilter.searchBy,
				page: parseInt(tableFilter.pagination.current),
				take: parseInt(tableFilter.pagination.pageSize),
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
					title: "PETUGAS",
					sorter: true,
					sortDirections: ["descend", "ascend"],
					render: (record) => {
						return (
							<>
								<span>{record.officer_name}</span>
							</>
						)
					},
				},
				{
					title: "WILAYAH",
					sorter: true,
					sortDirections: ["descend", "ascend"],
					render: (record) => {
						return record.region.name
					},
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
					title: "MID",
					dataIndex: "mid",
					sorter: true,
					sortDirections: ["descend", "ascend"],
				},
				{
					title: "TID",
					dataIndex: "tid",
					sorter: true,
					sortDirections: ["descend", "ascend"],
				},
				{
					title: "NAMA MERCHANT",
					dataIndex: "merchant_name",
					sorter: true,
					sortDirections: ["descend", "ascend"],
				},
				{
					title: "ADDRESS 1",
					dataIndex: "address1",
					sorter: true,
					sortDirections: ["descend", "ascend"],
				},
				{
					title: "ADDRESS 2",
					dataIndex: "address2",
					sorter: true,
					sortDirections: ["descend", "ascend"],
				},
				{
					title: "ADDRESS 3",
					dataIndex: "address3",
					sorter: true,
					sortDirections: ["descend", "ascend"],
				},
				{
					title: "ADDRESS 4",
					dataIndex: "address4",
					sorter: true,
					sortDirections: ["descend", "ascend"],
				},
				{
					title: "KATEGORI MERCHANT",
					dataIndex: "merchant_category",
					sorter: true,
					sortDirections: ["descend", "ascend"],
				},
				{
					title: "KATEGORI SEWA/MILIK",
					dataIndex: "ownership",
					sorter: true,
					sortDirections: ["descend", "ascend"],
					render: (ownership) => {
						return ownership == "Milik" ? (
							<Badge key="orange" color="orange" text={ownership} />
						) : (
							<Badge key="cyan" color="cyan" text={ownership} />
						)
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
					name: "Wilayah",
					value: "region.name",
				},
				{
					name: "Vendor",
					value: "vendor.name",
				},
				{
					name: "MID",
					value: "mid",
				},
				{
					name: "TID",
					value: "tid",
				},
				{
					name: "Nama Merchant",
					value: "merchant_name",
				},
				{
					name: "TID",
					value: "tid",
				},
				{
					name: "Kategori Merchant",
					value: "merchant_category",
				},
				{
					name: "Kategori Sewa/Milik",
					value: "ownership",
				},
			]}
			onGlobalSearch={onSearch}
			columns={columns}
			useGlobalSearchInput
			onChange={onChangeTable}
			scroll={{
				x: 3000,
			}}
		/>
	)
}

export default TableActivityJobOrder

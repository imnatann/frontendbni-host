export interface IJobOrderModel {
	no: string
	type: string
	date: string
	mid: string
	tid: string
	status: string
	merchant_name: string
	address1: string
	address2: string
	address3: string
	address4: string
	merchant_category: string
	ownership: string
}

export interface IFormInputImportJobOrder {
	files: File
}

export interface IFormImportJobOrder {
	onFinish?: (values: any) => void
	initialValues?: IFormInputImportJobOrder
	isLoading?: boolean
	onReset?: () => void
}

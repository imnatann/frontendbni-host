export interface IProps {
	children: React.ReactNode
}

export type IStatusCode = {
	code: number
	description: string
}

export interface IBaseResponseService<T = any | IErrorResponseService> {
	status: IStatusCode
 	result: any
	message?: string
}

export interface IErrorResponseService {
	error: string
	errors: {
		[key: string]: string[]
	}
}

export interface IDefaultColumnSearch {
	id: number
}

export interface IMetaPagination {
	page: number
	take: number
	item_count: number
	page_count: number
	has_previous_page: boolean
	has_next_page: boolean
}

export interface IPaginationResponse<T> {
  items(items: any): unknown
	data: T[]
	meta: IMetaPagination
}

export interface IPaginationRequest {
	page: number
	take: number
	search?: string
	search_by?: string[]
	order: "desc" | "asc"
	order_by: string

}

export interface IErrorTable {
	row: number
	column: string
	value: any
	message: string
}

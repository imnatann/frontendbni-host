
export const roleSearchColumn = ["id", "name", "description", "permissions"]

export interface IRoleModel {
	id: number
	name: string
	description?: string | null
	permissions: string[]
	createdAt: string
	updatedAt: string
}


export const userSearchColumn = ["id", "name", "email", "role", "status"]

export interface IUserModel {
  id: number
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive'
  createdAt: string
  updatedAt: string
}

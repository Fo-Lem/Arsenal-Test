export interface Users {
  users: userList[]
  total: number
  skip: number
  limit: number
}
export interface userList {
  id: number
  firstName: string
  lastName: string
  email: string
  username: string
  age: number
}
export interface UserData {
  firstName: string
  lastName: string
  email: string
  username: string
  age: number
}
export interface dataUpdate {
  id: number
  values: UserData
}

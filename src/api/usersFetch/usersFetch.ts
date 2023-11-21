import { $admin } from '@api/axiosInstance'
import type { UserData, Users, dataUpdate, userList } from './Interfaces'

export async function getUsers(page = 1, pageSize = 10): Promise<Users> {
  const skip = (page - 1) * pageSize
  const data = await $admin.get<Users>(`/users?limit=${pageSize}&skip=${skip}`)
    .then((res) => {
      return res.data
    }).catch((err): Users => {
      console.error(err)
      return {
        users: [],
        total: 0,
        skip: 0,
        limit: 0,
      }
    })
  return data
}
export async function createUser(newData: UserData): Promise<userList | void> {
  const data = await $admin.post<userList>('/users/add', {
    ...newData,
  })
    .then((res) => {
      return res.data
    }).catch((err) => {
      console.error(err)
    })
  return data
}

export async function updateUser(id: dataUpdate['id'], newData: dataUpdate['values']): Promise<userList | void> {
  const data = await $admin.patch<userList>(`/users/${id}`, {
    ...newData,
  })
    .then((res) => {
      return res.data
    }).catch((err) => {
      console.error(err)
    })
  return data
}

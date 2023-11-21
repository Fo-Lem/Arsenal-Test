<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { Avatar as AAvatar, Button as AButton, List as AList, ListItem as AListItem, ListItemMeta as AListItemMeta, Skeleton as ASkeleton, Space as ASpace, TypographyTitle as ATitle } from 'ant-design-vue'
import type { PaginationConfig } from 'ant-design-vue/lib/pagination'
import CreatePanel from './createPanel.vue'
import type { UserData, dataUpdate, userList } from '@/api/usersFetch/Interfaces'
import { createUser, getUsers, updateUser } from '@/api/usersFetch/usersFetch'
import UpdatePanel from '@/components/updatePanel.vue'

const users = ref<userList[]>([])
const currentIdUser = ref<number>(0)
const initLoading = ref(true)

// Инициализация пагинации
const pagination = ref<PaginationConfig>({})
function paginationInit(limit: number, skip: number, total: number): PaginationConfig {
  return {
    onChange: (page: number) => {
      updateList(page, pagination.value.pageSize!)
    },
    onShowSizeChange: (current: number, size: number) => {
      pagination.value.current = current
      pagination.value.pageSize = size
    },
    showSizeChanger: true,
    total,
    position: 'bottom',
    size: 'default',
    pageSize: limit,
    current: skip / limit + 1,

  }
}
// Логика обновления данных при изменении страницы
async function updateList(page: number, pageSize: number) {
  initLoading.value = true
  const { users: data, total, skip, limit } = await getUsers(page, pageSize)
  users.value = data
  pagination.value.current = skip / limit + 1
  pagination.value.pageSize = limit
  pagination.value.total = total
  initLoading.value = false
}

// Логика обновления данных при изменении данных пользователя

async function update(data: dataUpdate) {
  const user = await updateUser(data.id, data.values)
  if (user)
    users.value[currentIdUser.value] = user
}
async function create(data: UserData) {
  const user = await createUser(data)
  if (user)
  // Так-как на фейковом Api происходит эмуляция создания пользователя,
  // я просто перезаписываю 0 индекс массива, так-как паггинация при
  //  переходе на новую страницу запрашивает данные с сервера
    users.value[0] = user
}

// Логика открытия модального окна
const visibleUpdateModal = ref<boolean>(false)
const visibleCreateModal = ref<boolean>(false)
function showUpdateModal(index: number) {
  currentIdUser.value = index
  visibleUpdateModal.value = true
}

function showCreateModal() {
  visibleCreateModal.value = true
}

onBeforeMount(async () => {
  const { users: data, total, skip, limit } = await getUsers()
  users.value = data
  pagination.value = paginationInit(limit, skip, total)
  initLoading.value = false
})
</script>

<template>
  <UpdatePanel
    :key="currentIdUser"
    :visible="visibleUpdateModal"
    :user="users[currentIdUser]"
    @update-user="(data) => update(data)"
    @closePopup="visibleUpdateModal = false"
  />
  <CreatePanel
    :visible="visibleCreateModal"
    @create-user="(data) => create(data)"
    @closePopup="visibleCreateModal = false"
  />
  <ASpace style="justify-content: space-between; width: 100%;">
    <ATitle style="margin-top: 20px" :level="3">
      Список пользователей
    </ATitle>
    <AButton type="primary" @click="showCreateModal()">
      Добавить пользователя
    </AButton>
  </ASpace>
  <AList
    :key="pagination.current"
    :pagination="pagination"
    :data-source="users"

    :loading="initLoading"
    item-layout="horizontal"
  >
    <template #renderItem="{ item, index }">
      <AListItem>
        <ASkeleton avatar :title="false" :loading="initLoading" active>
          <AListItemMeta
            :description="item.lastName"
          >
            <template #title>
              <a href="https://www.antdv.com/">
                {{ item.firstName }}
              </a>
            </template>
            <template #avatar>
              <AAvatar :size="48" :src="item.image" />
            </template>
          </AListItemMeta>
          <AListItemMeta
            :description="item.email"
            title="Email"
          />
          <AListItemMeta
            :description="item.username"
            title="Username"
          />
          <AListItemMeta
            :description="item.age"
            title="Возраст"
          />
        </ASkeleton>
        <template #actions>
          <AButton type="link" @click="showUpdateModal(index)">
            Редактировать
          </AButton>
        </template>
      </AListItem>
    </template>
  </AList>
</template>

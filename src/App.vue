<script setup lang="ts">
import UserList from '@components/userList.vue'
import { Layout as ALayout, LayoutContent as ALayoutContent, LayoutFooter as ALayoutFooter, LayoutHeader as ALayoutHeader, TypographyTitle as ATitle } from 'ant-design-vue'
</script>

<template>
  <ALayout size style="min-height: 100vh;">
    <ALayoutHeader><ATitle>Header</ATitle> </ALayoutHeader>
    <ALayoutContent style="padding: 20px; width: clamp(300px, 100%, 1200px);  margin: 0 auto">
      <UserList />
    </ALayoutContent>
    <ALayoutFooter>Footer</ALayoutFooter>
  </ALayout>
</template>

<style scoped>
.ant-layout-header {
  background-color: #1890ff;
  display: flex;
  align-items: center;
}
.ant-layout-content {
background-color: white;
}
.ant-typography {
  margin: 0;
  color: white;
}
</style>

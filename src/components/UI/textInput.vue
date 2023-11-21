<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from 'vee-validate'
import type { InputProps } from 'ant-design-vue'
import { FormItem as AFormItem, Input as AInput } from 'ant-design-vue'

interface Props {
  name: InputProps['name']
  label: string
  type: InputProps['type']
}

const props = withDefaults(defineProps<Props>(), {
  name: 'input',
  label: '',
  type: 'text',
})

const { value } = useField<string>(toRef(props, 'name'))
</script>

<template>
  <AFormItem
    :label="label"
    :html-for="name"
  >
    <AInput
      :id="name"
      v-model:value="value"
      :type="type"
    />
  </AFormItem>
</template>

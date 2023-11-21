<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from 'vee-validate'
import type { InputProps } from 'ant-design-vue'
import { FormItem as AFormItem, InputNumber as AInputNumber } from 'ant-design-vue'

interface Props {
  name: InputProps['name']
  label: string
  type: InputProps['type']
  min?: number
  max?: number
}

const props = withDefaults(defineProps<Props>(), {
  name: 'input',
  label: '',
  type: 'number',

})

const { value } = useField<string>(toRef(props, 'name'))
</script>

<template>
  <AFormItem
    :label="label"
    :html-for="name"
  >
    <AInputNumber
      :id="name"
      v-model:value="value"
      :min="min"
      :max="max"
      :type="type"
    />
  </AFormItem>
</template>

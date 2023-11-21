<script lang="ts" setup>
import { Form as AForm, Modal as AModal } from 'ant-design-vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { ref } from 'vue'
import type { userList } from '@api/usersFetch/Interfaces'
import { bindConfig } from '@/utils/bindConfig'
import TextInput from '@/components/UI/textInput.vue'
import NumberInput from '@/components/UI/numberInput.vue'

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  user: () => {
    return {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      age: 0,
    }
  },
})
const emits = defineEmits<{
  closePopup: []
  updateUser: [data: { id: number;values: { firstName: string;lastName: string;email: string;username: string;age: number } }]
}>()

interface Props {
  visible: boolean
  user: userList
}
// Конфигурация полей

// схема валидации
const validationSchema = toTypedSchema(
  zod.object({
    firstName: zod.string().min(1, 'Поле обязательно').max(20, 'Максимальная длина 20 символов').regex(/^[a-zA-Zа-яА-Я]+$/, 'Только буквы'),
    lastName: zod.string().min(1, 'Поле обязательно').max(20, 'Максимальная длина 20 символов').regex(/^[a-zA-Zа-яА-Я]+$/, 'Только буквы'),
    email: zod.string().min(1, 'Поле обязательно').email('Некорректная email').max(30, 'Максимальная длина 30 символов'),
    username: zod.string().min(1, 'Поле обязательно').max(20, 'Максимальная длина 20 символов').regex(/^[a-zA-Zа-яА-Я1-9]+$/, 'Только буквы и цифры'),
    age: zod.number().min(1, 'Минимальный возраст 1').max(100, 'Максимальный возраст 100'),
  }),
)
// Инициализация
const { defineComponentBinds, handleSubmit, resetForm }
  = useForm({
    validationSchema,
    initialValues: {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      email: props.user.email,
      username: props.user.username,
      age: props.user.age,
    },
  })

const firstName = defineComponentBinds('firstName', bindConfig())
const lastName = defineComponentBinds('lastName', bindConfig())
const email = defineComponentBinds('email', bindConfig())
const username = defineComponentBinds('username', bindConfig())
const age = defineComponentBinds('age', bindConfig())
const confirmLoading = ref<boolean>(false)
function handleOk() {
  confirmLoading.value = true
  setTimeout(() => {
    emits('closePopup')
    confirmLoading.value = false
  }, 2000)
}
const onSubmit = handleSubmit((values) => {
  emits('updateUser', { id: props.user.id, values })
  handleOk()
})
</script>

<template>
  <AModal
    :visible="props.visible"
    title="Редактирование пользователя"
    :confirm-loading="confirmLoading"
    @ok="onSubmit"
    @cancel="() => { resetForm();emits('closePopup') }"
  >
    <AForm

      :label-col="{ span: 24 }"
      autocomplete="off"
    >
      <TextInput name="firstName" label="Имя" type="text" v-bind="firstName" />
      <TextInput name="lastName" label="Фамилия" type="text" v-bind="lastName" />
      <TextInput name="email" label="Email" type="email" v-bind="email" />
      <TextInput name="username" label="Username" type="text" v-bind="username" />
      <NumberInput name="age" label="Age" :min="1" :max="100" type="number" v-bind="age" />
    </AForm>
  </AModal>
</template>

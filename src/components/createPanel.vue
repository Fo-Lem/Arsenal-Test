<script lang="ts" setup>
import { ref } from 'vue'
import { Form as AForm, Modal as AModal } from 'ant-design-vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import type { UserData } from '@api/usersFetch/Interfaces'
import { bindConfig } from '@/utils/bindConfig'
import TextInput from '@/components/UI/textInput.vue'
import NumberInput from '@/components/UI/numberInput.vue'

interface Props {
  visible: boolean
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,

})
const emits = defineEmits<{
  closePopup: []
  createUser: [data: UserData]
}>()

const newUser = ref<UserData>({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  age: 1,
})

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
      firstName: newUser.value.firstName,
      lastName: newUser.value.lastName,
      email: newUser.value.email,
      username: newUser.value.username,
      age: newUser.value.age,
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
  }, 1000)
}
const onSubmit = handleSubmit((data) => {
  emits('createUser', data)
  handleOk()
  resetForm()
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

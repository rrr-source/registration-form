<template>
  <div class="main__container">
    <div class="form__container" v-if="!registrationCompleted">
      <div class="main__title-container">
        <div class="main__title">
          Регистрация
        </div>
      </div>
      <div class="border-div"></div>
      <div class="main__form-container">
        <div class="subtitle">
          Заполните Ваши Данные
        </div>
        <div
          v-if="!isFormValid"
          class="error-message"
        >
          * Пожалуйста, заполните все поля
        </div>
        <div class="input-container">
          <div class="casual-input">
              <input
                type="text"
                id="username"
                v-model="formData.username"
                placeholder="Имя"
                :class="{ 'error': !formData.username && !isFormValid }"
              >
              <input
                type="text"
                id="email"
                v-model="formData.email"
                placeholder="Email"
                :class="{ 'error': !formData.email && !isFormValid }"
              >
          </div>
          <div class="select-input">
            <select
              id="role"
              v-model="formData.role"
              :class="{ 'error': !formData.role && !isFormValid }"
            >
              <option
                disabled value=""
                selected
              >
                  Должность
              </option>
              <option
                v-for="option in roleOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.name }}
              </option>
            </select>
            <div
              v-if="!isFormValid && !formData.role"
              class="error-message-role"
            >
              * Выберите должность
            </div>
          </div>
          <div class="casual-input">
            <input
              :type="showPassword || isPasswordInputFocused ? 'text' : 'password'"
              id="password"
              v-model="formData.password"
              placeholder="Пароль"
              @focus="isPasswordInputFocused = true"
              @blur="isPasswordInputFocused = false"
              :class="{ 'error': !formData.password && !isFormValid }"
            >
            <img
              class="showed-icon"
              :src="showPassword ? require('@/assets/icons/hided.svg') : require('@/assets/icons/showed.svg')"
              alt="Toggle Password Visibility"
              @click="togglePasswordVisibility(1)"
            >

            <input
              :type="showRepeatedPassword || isRepeatedPasswordInputFocused ? 'text' : 'password'"
              id="password_repeat"
              v-model="formData.password_repeat"
              placeholder="Повторите пароль"
              @focus="isRepeatedPasswordInputFocused = true"
              @blur="isRepeatedPasswordInputFocused = false"
              :class="{ 'error': !formData.password_repeat && !isFormValid }"
            >
            <img
              class="hidded-icon"
              :src="showRepeatedPassword ? require('@/assets/icons/hided.svg') : require('@/assets/icons/showed.svg')"
              alt="Toggle Password Visibility"
              @click="togglePasswordVisibility(2)"
            >
          </div>
        </div>
        <div class="border-div"></div>
        <div class="main__switch-container">
          <div class="toggle-switch">
            <input type="checkbox" id="toggleSwitch" v-model="isToggleChecked">
            <label for="toggleSwitch"></label>
          </div>
          <div class="toggle-label__container">
            <div>
              <span class="toggle-title">Хотите чтобы Ваш профиль видели другие участники платформы?</span>
            </div>
            <div class="subtitle-container">
              <span class="toggle-subtitle">Включает профиль для просмотра другими пользователями по ссылке</span>
            </div>
          </div>
        </div>
        <div class="main__privacy-container">
          <div class="privacy-input__container">
            <input
              type="checkbox"
              class="default-checkbox"
              id="privacyCheckbox"
              v-model="isPrivacyChecked"
              :class="{ 'error': !isPrivacyChecked && !isFormValid }"
            >
            <label for="privacyCheckbox"></label>
            <span
              class="privacy-label">
            Регистрируясь, Вы соглашаетесь  с
            <a href="#">политикой конфиденциальности</a> и обработкой
            <a href="#">персональных данных</a>
            </span>
            <div
              v-if="!isFormValid && !isPrivacyChecked"
              class="error-message"
            >
              Пожалуйста, примите условия политики конфиденциальности
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="submit-button"
              @click="submitForm"
            >
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </div>

    <RegistrationSuccess v-if="registrationCompleted" />
  </div>
</template>

<script>
import axios from 'axios';
import RegistrationSuccess from "./RegistrationSuccess.vue";


export default {
  name: 'RegistrationForm',

  components: {
    RegistrationSuccess,
  },

  data() {
    return {
      formData: {
        public: true,
        username: '',
        email: '',
        role: '',
        password: '',
        password_repeat: '',
      },

      showPassword: false,
      isPasswordInputFocused: false,
      showRepeatedPassword: false,
      isRepeatedPasswordInputFocused: false,
      isToggleChecked: true,
      isPrivacyChecked: true,
      isFormValid: true,

      registrationCompleted: false,

      roleOptions: [
        { value: 1, name: 'Фронтенд Разработчик' },
        { value: 2, name: 'Бэкенд Разработчик' },
        { value: 3, name: 'HR менеджер' },
        { value: 4, name: 'QA специалист' },
        { value: 5, name: 'Дизайнер' },
      ]
    };
  },

  methods: {
    async submitForm() {
      try {
        if (!this.isPrivacyChecked) {
          console.log('Please agree to the Privacy Policy');
          return;
        }

        this.validateForm();

        if (this.isFormValid) {
          const response = await axios.post('https://example-api.com/posts', this.formData);

          console.log('Form submitted successfully:', response.data);

          if (response.data.success) {
            this.showForm = false;
            this.registrationCompleted = true;
            this.$emit('formSubmitted');
          }
        } else {
          console.log('Form validation failed');
        }
      } catch (error) {
        console.error('Error submitting form:', error.message);
      }
    },

    togglePasswordVisibility(inputNumber) {
      if (inputNumber === 1) {
        this.showPassword = !this.showPassword;
      } else if (inputNumber === 2) {
        this.showRepeatedPassword = !this.showRepeatedPassword;
      }
    },

    validateForm() {
      const requiredFields = ['username', 'role', 'email', 'password', 'password_repeat'];

      for (const field of requiredFields) {
        if (!this.formData[field]) {
          this.isFormValid = false;
          return;
        }
      }

      this.isFormValid = true;
    },
  }
}
</script>

<style scoped>
.main__container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form__container {
  width: 960px;
  height: 547px;
  border-radius: 15px;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
}

.main__title-container {
  display: flex;

  padding: 17px 31px;
}

.main__title {
  font-family: Montserrat, sans-serif;
  font-weight: 700;
  font-size: 19px;
  line-height: 27px;
  letter-spacing: -0.035px;
}

.border-div {
  border-bottom: 1px solid #D9D9D9;
}

.subtitle {
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;

  padding: 17px 31px;
}

.input-container {
  padding: 17px 31px;
}

input {
  width: 440px;
  height: 39px;
  padding-left: 10px;

  border: 1px solid #E6E6EB;
  border-radius: 11px;

  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.015px;
}

input::placeholder {
  color: #9292A0;
}

.casual-input {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 14px;

  position: relative;
}

.select-input {
  margin: 31px 0 31px 455px;
}

#role {
  width: 440px;
  height: 39px;
  border: 1px solid #E6E6EB;
  border-radius: 11px;
  padding-left: 10px;

  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.015px;
  color: #9292A0;
}

#role option {
  color: black;
}

.showed-icon {
  position: absolute;
  left: 405px;
  cursor: pointer;
}

.hidded-icon {
  position: absolute;
  left: 865px;
  cursor: pointer;
}

.input-container {
  padding-bottom: 31px;
}

.main__switch-container {
  display: flex;
  align-items: start;
  gap: 10px;
  padding: 21px 21px;
}

.toggle-switch {
  position: relative;
  display: flex;
  align-items: center;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-switch label {
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: #ccc;
  border-radius: 20px;
  height: 22px;
  width: 39px;
  position: relative;
}

.toggle-switch label:before {
  content: '';
  height: 18px;
  width: 18px;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.3s;
}

.toggle-switch input:checked + label {
  background-color: #3586FF;
}

.toggle-switch input:checked + label:before {
  transform: translateX(18px);
}

.toggle-label__container {
  display: flex;
  flex-direction: column;
}

.toggle-title {
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
}

.subtitle-container {
  padding-top: 10px;
}

.toggle-subtitle {
  font-family: Montserrat, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #696977;
}

.main__privacy-container {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;
}

.privacy-input__container {
  display: flex;
  flex-direction: row;
  align-items: start;
  width: 600px;
}

.main__privacy-container input:checked {
  background-color: #3586FF;
}

.privacy-label {
  line-height: 22px;
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  font-size: 14px;
}

.default-checkbox {
  width: 23px;
  height: 23px;
  margin-right: 10px;
  border: 1px solid #3586FF;
  border-radius: 5px;
  cursor: pointer;
}

.privacy-label a {
  color: #3586FF;
  text-decoration: none;
}

.privacy-label a:hover {
  text-decoration: underline;
}

.submit-button {
  border-radius: 8px;
  padding: 10px 90px;

  font-family: Montserrat, sans-serif;
  font-size: 12px;
  line-height: 19px;
  letter-spacing: -0.015px;
  background-color: rgba(73, 122, 218, 0.2);
  color: #497ADA;

  border: none;
  cursor: pointer;
}

.error {
  border: 1px solid red;
}

.error-message {
  color: red;
  margin-top: 5px;
  margin-left: 31px;
}

.error-message-role {
  color: red;
  margin-top: 5px;
}
</style>

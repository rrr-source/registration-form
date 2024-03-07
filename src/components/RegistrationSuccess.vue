<template>
  <div class="registration-success-container">
    <div class="registration-success">
      <h1>Регистрация успешно завершена!</h1>
      <span class="home-link">
         <a href="#">Вернуться на главную</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistrationSuccess',
}
</script>

<style scoped>
.registration-success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
}

.registration-success {
  width: 600px;
  height: 100px;
  text-align: center;
  padding: 50px;
  background-color: rgba(73, 122, 218, 0.2);
  color: rgba(73, 122, 218, 1);
  border-radius: 8px;

  font-family: Montserrat, sans-serif;

}

.registration-success h1 {
  margin-bottom: 10px;
}
</style>

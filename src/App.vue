<template>
  <div>
    <h2>TODOLIST</h2>姓：
    <input v-model="firstName" type="text" />
    <br />名：
    <input v-model="lastName" type="text" />
    <br />
    <h2>{{fullName}}{{msg}}</h2>
  </div>
</template>
<script>
import "styles/home/home.scss";
export default {
  name: "App",
  computed: {
    fullName() {
      return this.firstName + this.lastName;
    }
  },
  data() {
    return {
      firstName: "张",
      lastName: "三",
      msg: "使用vueLoader"
    };
  }
};
</script>
<style lang="scss">

</style>
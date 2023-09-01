<template>
  <div class="headers-container">
    <header class="headers">{{title}}</header>
  </div>
</template>
<script>
export default {
  name: "headers",
  data() {
    return {
      title: "TODOLIST"
    };
  }
};
</script>
<style lang="scss" scoped>
.headers {
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 32px;
//   color: $TDL_T_Text;
  color: #eee;
  font-family: Arial, Helvetica, sans-serif;
  text-shadow: 2px 2px 10px #f5f5f5;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  box-shadow: 1px 2px 2px #333;
}
</style>
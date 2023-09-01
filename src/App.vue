<template>
  <div class="todo-contianer">
    <headers></headers>
  </div>
</template>
<script>
import "styles/home/home.scss";
import headers from "./views/todo/headers.vue";
export default {
  name: "App",
  components: {
    headers
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
h2 {
  color: #fff;
}
.todo-contianer {
  width: 600px;
  height: 500px;
  opacity: 0.5;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 15px;
}
.todo-contianer::before {
  display: inline-block;
  content: "";
  background: #000;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  position: absolute;
  opacity: 0.5;
  box-shadow: 1px 1px 5px #333;
  border-radius: 15px;
  z-index: -1;
}
</style>
<template>
  <div class="insert">
    <input v-model="text" placeholder="请输入待办的事项" type="text" />
    <button v-show="showIn" class="increase" @click="increase">添加</button>
  </div>
</template>
<script >
export default {
  name: "Insert",
  data() {
    return {
      text: "",
      showIn: false
    };
  },
  watch: {
    text() {
      if (this.text) {
        this.showIn = true;
      } else {
        this.showIn = false;
      }
    }
  },
  methods: {
    increase() {
      this.$emit("getInsert", this.text);
      this.text = "";
    }
  }
};
</script>
<style lang="scss">
.insert {
  position: relative;
  input {
    width: 100%;
    height: 36px;
    padding: 0px 50px 0px 15px;
    box-sizing: border-box;
    background: transparent;
    font-size: 18px;
    color: #fff;
    caret-color: #fff;
    font-weight: 600;
    box-shadow: 0px 0px 3px #f5f5f5;
    border-radius: 15px;
  }
  input::placeholder {
    color: #fff;
  }
  input::after {
    display: inline-block;
    content: "";
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 1;
    // z-index: 10;
  }
  .increase {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
<template>
  <div>
    <insert @getInsert="getInsert"></insert>
    <div class="todo-list">
      <div class="item" v-for="item in todoList" @click="checked(item.id)">
        <input id="box" class="checkbox" type="checkbox" :checked="item.done" />
        <span class="txt" :class="item.done ? 'active':''">{{item.todo}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import insert from "@/components/Insert.vue";
export default {
  name: "list",
  components: {
    insert
  },
  data() {
    return {
      todoList: [],
      insertText: ""
    };
  },
  watch: {
    todoList: {
      handler(newVal, oldVal) {
        this.$bus.$emit("todoList", newVal);
      },
      deep: true
    }
  },
  created() {
    // 全选
    this.$bus.$on("all", val => {
      this.todoList.forEach(item => {
        if (val) {
          item.done = true;
        } else {
          item.done = !item.done;
        }
      });
    });
    // 反选
    this.$bus.$on("invert", () => {
      this.todoList.forEach(item => {
        item.done = !item.done;
      });
    });
  },
  methods: {
    // 添加一条待办事项
    getInsert(todo) {
      this.todoList.push({ id: this.todoList.length, todo, done: false });
    },
    // 勾选or取消勾选
    checked(id) {
      this.todoList.forEach(item => {
        if (item.id == id) {
          item.done = !item.done;
        }
      });
    },
    beforeDestroy() {
    this.$off(["all","invert"]);
  }
  }
};
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 5px;
  color: #fff;
  background: transparent;
}
.todo-list {
  color: #fff;
  height: 360px;
  font-size: 16px;
  overflow: hidden;
  overflow-y: scroll;
  user-select: none;

  .item {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: center;
    padding: 0px 15px;
    box-sizing: border-box;
    font-weight: 600;
    position: relative;
    cursor: pointer;
    .checkbox {
      width: 16px;
      height: 16px;
      vertical-align: middle;
      border-radius: 50% !important;
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
    .txt {
      flex: 1;
      padding-left: 25px;
      line-height: 40px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .txt.active {
      color: #666;
      text-decoration-line: line-through;
    }
  }
  .item:nth-of-type(odd) {
    background: #eee;
    color: #000;
  }
}
</style>
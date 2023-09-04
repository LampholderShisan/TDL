<template>
  <div>
    <insert @getInsert="getInsert"></insert>
    <div class="todo-list">
      <div
        class="item"
        v-for="(item,index) in todoList"
        @mouseenter="mouseenter(item.id)"
        @mouseleave="mouseleave"
      >
        <label for="checked" @click="checked(item.id)">
          <input id="checked" class="checkbox" type="checkbox" :checked="item.done" />
        </label>
        <input
          v-if="isEdit && item.id==currentEditId"
          :class="['txt',item.done ? 'active':'',item.id==currentEditId ? 'editActive':'']"
          :value="item.todo"
          @input="input($event,item.id)"
        />
        <span
          v-else
          :class="['txt',item.done ? 'active':'']"
          @click="edit(item,index)"
        >{{item.todo}}</span>
        <span
          class="edit"
          v-show="item.id===currentId"
          @click="edit(item,index)"
        >{{ item.id==currentEditId ? editText :'编辑' }}</span>
        <span class="delete" v-show="item.id===currentId" @click="del(item.id)">删除</span>
      </div>
    </div>
  </div>
</template>
<script>
import insert from "@/components/Insert.vue";
import { v4 as uid } from "uuid";
export default {
  name: "list",
  components: {
    insert
  },
  data() {
    return {
      // 待办列表
      todoList: !!localStorage.getItem("todoList")
        ? JSON.parse(localStorage.getItem("todoList"))
        : [],
      // 鼠标移入当前项id
      currentId: "",
      // 是否编辑
      isEdit: false,
      // 当前编辑的id
      currentEditId: "",
      // 上一次编辑的id
      prevEditId: "",
      editText: "编辑",
      // 重新编辑的值
      editVal: "",
      // 记录删除id 时索引的位置
      delIdIndex: ""
    };
  },
  watch: {
    todoList: {
      handler(newVal) {
        this.$bus.$emit("todoList", newVal);
        // 当删除时自动调用移入函数
        newVal.forEach((item, index) => {
          if (index === this.delIdIndex) {
            this.mouseenter(item.id);
          }
        });
      },
      deep: true
    }
  },
  created() {
    if (this.todoList.length > 0) {
      this.todoList = this.todoList.map(item => item);
      this.$bus.$emit("todoList", this.todoList);
    }
    // 全选
    this.$bus.$on("all", val => {
      this.todoList.forEach(item => {
        if (val) {
          item.done = true;
        } else {
          item.done = !item.done;
        }
      });
      this.save();
    });
    // 反选
    this.$bus.$on("invert", () => {
      this.todoList.forEach(item => {
        item.done = !item.done;
      });
      this.save();
    });
    // 全部删除
    this.$bus.$on("delAll", () => {
      this.todoList = [];
      this.save();
    });
  },
  methods: {
    // 缓存到浏览器中
    save() {
      localStorage.setItem("todoList", JSON.stringify(this.todoList));
    },
    // 添加一条待办事项
    getInsert(todo) {
      this.todoList.push({ id: uid(), todo, done: false });
      this.save();
    },
    // 勾选or取消勾选
    checked(id) {
      this.todoList.forEach(item => {
        if (item.id == id) {
          item.done = !item.done;
        }
      });
      this.save();
    },
    // 鼠标移入操作
    mouseenter(id) {
      this.currentId = id;
    },
    // 鼠标移出的操作
    mouseleave() {
      this.currentId = "";
    },
    // 编辑
    edit(item, index) {
      // 鼠标点击切换保存
      if (this.prevEditId !== item.id) {
        this.saveEdit();
      }
      if (this.editText == "编辑") {
        this.editText = "保存";
        this.isEdit = true;
        this.prevEditId = this.currentEditId = item.id;
        // 鼠标自动聚焦
        this.$nextTick(() => {
          this.$el.children[1].children[index].children[1].focus();
        });
      } else {
        // 按钮保存
        this.saveEdit();
      }
    },
    // 监听输入框输入的事件
    input(e, id) {
      if (e.target.value == "") return alert("编辑的内容不能为空");
      this.todoList.forEach(item => {
        if (item.id === id) {
          item.todo = e.target.value;
        }
      });
      this.editVal = e.target.value;
    },
    // 保存修改的值
    saveEdit() {
      if (this.editVal && this.currentEditId) {
        this.todoList.forEach(item => {
          if (item.id === this.currentEditId) {
            item.todo = this.editVal;
            this.save();
          }
        });
        this.editVal = "";
      }
      this.editText = "编辑";
    },
    // 删除
    del(id) {
      if (confirm("是否确定删除该项")) {
        this.todoList = this.todoList.filter((item, index) => {
          if (item.id == id) {
            this.delIdIndex = index;
          }
          return item.id !== id;
        });
        this.save();
      }
    }
  },
  beforeDestroy() {
    this.$off(["all", "invert"]);
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
      padding-right: 30px;
      line-height: 40px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: transparent;
      font-weight: 600;
      cursor: pointer;
    }
    .txt.active {
      //完成的样式
      color: #666;
      font-weight: 600;
      text-decoration-line: line-through;
    }

    .edit {
      margin-right: 15px;
    }
    .edit:hover {
      color: #f99601;
    }
    .delete:hover {
      color: #f93333;
    }
  }
  .item:nth-of-type(odd) {
    background: #eee;
    color: #000;
    .editActive {
      background: #eee;
      color: #000;
      font-size: 16px;
      caret-color: pink;
    }
  }
  .item:nth-of-type(even) {
    .editActive {
      // background: #000;
      color: #fff;
      font-size: 16px;
      caret-color: pink;
    }
  }
}
</style>
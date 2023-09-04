<template>
  <div class="footers">
    <span class="count">
      <strong>{{count}}</strong>
    </span>
    <label for="All">
      <input id="All" type="checkbox" :checked="all" @click="All" />全选
    </label>
    <label for="invert">
      <input id="invert" type="checkbox" :checked="invert" @click="Invert" /> 反选
    </label>
    <span class="complete">
      完成
      <strong>{{complete}}</strong>
    </span>
    <span class="incomplete">
      未完成
      <strong>{{incomplete}}</strong>
    </span>
    <span class="deleteAll" @click="delAll">全部删除</span>
  </div>
</template>
<script>
export default {
  name: "footers",
  data() {
    return {
      msg: "footer",
      todoList: [],
      count: 0,
      complete: 0,
      incomplete: 0,
      all: false,
      invert: false,
      frist: 0
    };
  },
  watch: {
    todoList: {
      handler(newVal, oldVal) {
        if (newVal.length == 0) {
          this.invert = false;
          this.all = false;
          return;
        }
        // 全选勾选状态
        let arr = newVal.map(item => {
          return item.done;
        });
        if (arr.includes(false)) {
          this.all = false;
        } else {
          this.all = true;
        }

        // 监听完成和未完成
        this.complete = 0;
        this.incomplete = 0;
        if (newVal.length > 0) {
          newVal.forEach(item => {
            if (item.done) {
              this.complete += 1;
            } else {
              this.incomplete += 1;
            }
          });
        }
      },
      deep: true
    }
  },
  created() {
    this.$bus.$on("todoList", val => {
      this.count = val.length;
      this.todoList = val;
    });
  },

  methods: {
    // 全选
    All() {
      this.all = !this.all;
      this.invert = false;
      this.$bus.$emit("all", this.all);
    },
    // 反选
    Invert() {
      this.invert = !this.invert;
      this.all = false;
      this.$bus.$emit("invert");
    },
    // 全部删除
    delAll() {
      if (confirm("是否确定全部删除")) this.$bus.$emit("delAll");
    }
  },
  beforeDestroy() {
    this.$off("todoList");
  }
};
</script>
<style lang="scss" scoped>
.footers {
  width: 100%;
  color: #fff;
  font-weight: 600;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  font-size: 18px;
  height: 54px;
  line-height: 54px;
  box-shadow: 1px 1px 5px #000;
  cursor: pointer;
  .count {
    display: inline-block;
    margin-left: 15px;
    font-size: 26px;
    line-height: 54px;
    vertical-align: middle;
  }
  #All {
    margin: 0 5px 0 30px;
    width: 18px;
    height: 18px;
    cursor: pointer;
    vertical-align: middle;
  }
  #invert {
    margin: 0 0px 0 10px;
    width: 18px;
    height: 18px;
    cursor: pointer;
    vertical-align: middle;
  }
  .complete {
    margin-left: 50px;
  }
  .incomplete {
    margin-left: 20px;
  }
  .deleteAll {
    margin-left: 100px;
  }
  .deleteAll:hover {
    color: pink;
  }
  strong {
    color: pink;
    font-size: 26px;
    vertical-align: middle;
  }
}
</style>
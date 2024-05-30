<template>
  <div class="main">
    <el-menu
      :default-active="activeIndex"
      :ellipsis="false"
      active-text-color="#DE7487"
      background-color="#94b1c3"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#000000"
      @select="handleSelect"
    >
      <el-menu-item class="header-text" index="0"
        >MAKE IT POSSIBLE
      </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">图片</el-menu-item>
      <el-sub-menu index="3">
        <template #title>关于</template>
        <el-menu-item index="2-1">Github</el-menu-item>
        <el-menu-item index="2-2">Bilibili</el-menu-item>
        <el-menu-item index="2-3">给我留言</el-menu-item>
        <!--      <el-sub-menu index="2-4">-->
        <!--        <template #title>图片</template>-->
        <!--        <el-menu-item index="2-4-1">item one</el-menu-item>-->
        <!--        <el-menu-item index="2-4-2">item two</el-menu-item>-->
        <!--        <el-menu-item index="2-4-3">item three</el-menu-item>-->
        <!--      </el-sub-menu>-->
      </el-sub-menu>
      <!--    <el-menu-item index="4">Orders</el-menu-item>-->
    </el-menu>
    <button @click="index--">上一页</button>
    <div>
      <img :src="photo_name[index].path" alt="demo photo" class="example" />
    </div>
    <button @click="index++">下一页</button>
    <div>
      <img
        v-for="item in photo_name"
        :key="item.id"
        :src="item.path"
        class="example"
      />
    </div>
    <div class="example_list">
      <el-input
        v-model="to_do_name"
        placeholder="请输入任务"
        @keyup.enter="add()"
      />
      <el-button type="primary" @click="add()">添加任务</el-button>
      <ul>
        <li v-for="(item, index) in list" :key="item.id">
          <span v-color="color">{{ index + 1 }}.{{ item.name }}</span>
          <el-button type="primary" @click="del(item.id)">删除</el-button>
        </li>
      </ul>
      <ul>
        <li
          v-for="(item, index) in list"
          :key="item.id"
          @click="listIndex = index"
        >
          <p :class="{ pink: index === listIndex }">{{ item.name }}</p>
        </li>
      </ul>
    </div>
    <!--    <Message>-->
    <!--      <template #example2>-->
    <!--        <div>什么东西</div>-->
    <!--      </template>-->
    <!--    </Message>-->
    <!--    <Message :news="list">-->
    <!--      <template #default="obj">-->
    <!--        {{ obj.item }}-->
    <!--        <button @click="del(obj.item.id)">删除</button>-->
    <!--        <button @click="show(obj.item)">查看</button>-->
    <!--      </template>-->
    <!--    </Message>-->
  </div>
</template>

<script>
// import Message from '@/views/layout/Message.vue'

export default {
  // components: {
  //   Message
  // },
  data() {
    return {
      listIndex: 1,
      activeIndex: '1',
      index: 0,
      to_do_name: '',
      color: 'red',
      photo_name: [
        { id: 1, path: 'src/assets/CX_20221112_090203.jpg' },
        { id: 2, path: 'src/assets/CX_20220826_081614.jpg' },
        { id: 3, path: 'src/assets/CX_20221112_092246.jpg' }
      ],
      list: [
        { id: 1, name: 'Vue' },
        { id: 2, name: 'JavaWeb' },
        { id: 3, name: '微积分' }
      ]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    add() {
      this.list.unshift({ id: +new Date(), name: this.to_do_name })
    },
    del(id) {
      this.list = this.list.filter((item) => item.id !== id)
    },
    show(row) {
      alert(`姓名：${row.name}`)
    }
  },
  directives: {
    color: {
      mounted(el, binding) {
        el.style.color = binding.value
      },
      updated(el, binding) {
        el.style.color = binding.value
      }
    }
  }
}
</script>
<style scoped>
.loading:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5) url('src/assets/IMG_20230724_181411.jpg')
    no-repeat center;
}

.pink {
  background-color: lightpink;
}

.example {
  height: 300px;
}

.example_list {
  background-color: #fff;
  width: 300px;
}

.flex-grow {
  flex-grow: 1;
}

.el-menu-demo {
  backdrop-filter: blur(200px);
  background-color: transparent;
  border: 0;
}

.main {
  background: url('@/assets/CX_20221112_090203.jpg') center/cover no-repeat;
  height: 100vh; /* 设置为视口高度，或根据需要设置具体高度 */
}

.header-text {
  font-size: 18px;
  border: 0;
}

.example2 {
  height: 300px;
  background-color: greenyellow;
}
</style>

<script>
export default {
  props: ['news'],
  data() {
    return {
      greetingMessage: 'Hello, welcome to the Vue 3.0 world!'
    }
  }
}
</script>

<template>
  <div class="main">
    <!--    <tbody>-->
    <!--      <tr v-for="(item, index) in news" :key="item.id">-->
    <!--        <td>{{ index + 1 }}</td>-->
    <!--        <td>{{ item.name }}</td>-->
    <!--        <slot :item="item" msg="Successful"></slot>-->
    <!--      </tr>-->
    <!--    </tbody>-->
    <!--    <slot name="example1"></slot>-->
    <slot :count="1" :msg="greetingMessage"></slot>
  </div>
</template>

<style scoped>
.main {
  border: 3px solid red;
}
</style>

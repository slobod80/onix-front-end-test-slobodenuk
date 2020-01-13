<template lang ="pug">
.wrapper
  .main
    .in_main
      .flex-task
        .flex-task-container
          table(style="width:100%")
            th To do
            th In progress
            th Done
            tr
              td(style="width:33%")
                div(v-for="(item,index) in myTask" :key="index")
                  p(v-if="myTask[index].status=='To do'") {{myTask[index].nameOfTask}} - {{myTask[index].dateTask}}
              td(style="width:33%")
                div(v-for="(item,index) in myTask" :key="index")
                  p(v-if="myTask[index].status=='In progress'") {{myTask[index].nameOfTask}} - {{myTask[index].dateTask}}
              td(style="width:33%")
                div(v-for="(item,index) in myTask" :key="index")
                  p(v-if="myTask[index].status=='Done'") {{myTask[index].nameOfTask}} - {{myTask[index].dateTask}}


</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {Itask} from "../../components/menu-components/types/task";

@Component
export default class tasks extends Vue 
{
  @Prop() myTask!:Itask[];

}
</script>

<style scoped>

.item-enter-active,
.item-leave-active {
  transition: font-size .3s;
}

.item-enter,
.item-leave-to {
  font-size: 20px;
}

.flex-task-container {
  height:200px;
  overflow-y: auto;
}

.flex-task {
  display: flex;
  flex-direction: column;
}

.main-task {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  text-align: center;
}
td.status:hover {
  background-color: #EAEAEA;
}
</style>
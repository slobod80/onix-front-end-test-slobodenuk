<template lang ="pug">
.wrapper
  tr(v-for="(item,index) in myTask" :key="index.id")
    td(style="width:150px") {{myTask[index].nameOfTask}}
    td(style="width:65%") {{myTask[index].myTask}}
    td {{myTask[index].dateTask}}

  <!---img(src='@/assets/photo1.jpg' alt="")--->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface Itask
    {
      nameOfTask:string;
      myTask:string;
      dateTask:string;
    }

@Component

export default class tasks extends Vue 
{
  myTask:Itask[]=[
                {nameOfTask:"Name of task1",myTask:"My task1", dateTask:"Date task 1"},
                {nameOfTask:"Name of task2",myTask:"My task2", dateTask:"Date task 2"},
                {nameOfTask:"Name of task3",myTask:"My task3", dateTask:"Date task 3"},
                {nameOfTask:"Name of task4",myTask:"My task4", dateTask:"Date task 4"}
              ]
}

</script>

<style scoped>

.main {
  display: block;
  padding-top: 40px;
  width: 100%;
  height: 100%;
  background-color: #EAEAEA;  
}
.in_main {
  width: 730px; 
  margin: auto;
  background-color: #ffffff;
  border-radius: 8px; 
}


td {
  height: 80px;
}
</style>
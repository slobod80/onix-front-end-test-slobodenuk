<template lang ="pug">
.wrapper
  .main
    .in_main
      .flex-task
        .flex-task-container
          tr(v-for="(item,index) in myTask" :key=index)
            td(style="width:170px") {{myTask[index].nameOfTask}}
            td(style="width:400px") {{myTask[index].myTask}}
            td {{myTask[index].dateTask}}
            td 
                button(type="button" @click="deleteTask(index)") X

          //div(v-for="(item,index) in myTask" :key=index)
          //  span {{myTask[index].nameOfTask}}
          //  button(type="button" @click="deleteTask(index)") X

        .main-task 
            input(v-model.trim="nameOfTask" placeholder="Имя задачи")
            input(v-model.trim="inputTask" placeholder="Задача")
            input(v-model.trim="inputDate" placeholder="Дата окончания")
            button(type="button" @click="addTask") Добавить задачу
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {Itask} from "../../components/menu-components/types/task";

@Component
export default class tasks extends Vue 
{
  @Prop() myTask!:Itask;

 //myTask1:Itask[]=  [
 //               {nameOfTask:"Name of task1",myTask:"My task1", dateTask:"Date task 1"},
 //               {nameOfTask:"Name of task2",myTask:"My task2", dateTask:"Date task 2"},
 //               {nameOfTask:"Name of task3",myTask:"My task3", dateTask:"Date task 3"},
 //               {nameOfTask:"Name of task4",myTask:"My task4", dateTask:"Date task 4"}
 //                 ];



  nameOfTask:string="";
  inputTask:string="";
  inputDate:string="";

  addTask():void {
    if (this.nameOfTask!="" && this.inputTask!="" && this.inputDate!="")
    {
      this.$emit("onAddTask",[this.nameOfTask,this.inputTask,this.inputDate]);
      this.nameOfTask="";
      this.inputTask="";
      this.inputDate="";     
      this.$emit("incOpenTasks")
    }
    else alert ("Нельзя вводить пустые задачи")

  }


  deleteTask(index:number):void {
    this.$emit("onDeleteTask",index);
    this.$emit("decOpenTasks");
  }
}

</script>

<style scoped>

.flex-task-container {
  height:400px;
  overflow-y: auto;
}

.flex-task {
  display: flex;
  flex-direction: column;
}

.main-task {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.main {
  display: block;
  padding-top: 25px;
  width: 100%;
  height: 80vh;
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
 padding-left: 10px;
 padding-top: 20px;
}
</style>
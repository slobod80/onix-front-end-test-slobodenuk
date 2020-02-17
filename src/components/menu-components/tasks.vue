<template lang ="pug">
.wrapper
  .main
    .in_main
      .flex-task
        .flex-task-container
          transition-group( name="item" @after-enter="enter")
            tr(v-for="(item,index) in myTask" :key="myTask[index].id"
              v-if=" index<idx "              
              v-bind:class="[index==indexOfNewTask-1 && isNewTask ? 'new-task' : '']")
              td.status(style="width:20%" @click="editTask(myTask[index].id)") {{myTask[index].nameOfTask}}
              td(style="width:45%") {{myTask[index].myTask}}
              td(style="width:18%") {{myTask[index].dateTask | dateTask}}
              td.status(style="width:15%" @click="changeStatusOfTask(myTask[index].id)") {{myTask[index].status}}
              button(type="button" @click="deleteTask(myTask[index].id)") X
        button(type="submit" 
          @click="addTask1") Добавить задачу
        addTaskModal(
            :activeModalAddTask="activeModalAddTask"
            v-if="activeModalAddTask"
            @closeModal="closeModal"
            @addTask="addTask")
        taskDetailsModal(
            :activeModalDetails="activeModalDetails"
            v-if="activeModalDetails"
            :idTask="idTask"
            @closeModalDetails="closeModalDetails")
</template>

<script lang="ts">
import { Component, Prop, Vue ,Watch} from "vue-property-decorator";
import {Itask} from "../../components/menu-components/types/task";
import addTaskModal from "../../components/addtaskmodal.vue";
import taskDetailsModal from "../../components/taskdetailsmodal.vue";
import taskname1 from "../../store/modules/tasks"
import taskapi from "../../service/tasksApi"
import axios from "axios"

@Component({
  components: {
    addTaskModal,
    taskDetailsModal
  }
})
export default class tasks extends Vue 
{
//  @Prop() myTask!:Itask[];
  statusOfTask=
  {
    todo:"To do",
    inprogress:"In progress",
    done:"Done"
  };
  moment=require("moment");
  myTask:Itask[]=[];
  idx:number=0;
  indexOfNewTask:number=0;
  isNewTask:boolean=false;
  idTask:number=0;
  inputTask:string="";
  activeModalAddTask:boolean=false;
  activeModalDetails:boolean=false;

  editTask(index:number):void {
    this.idTask=index;
    this.activeModalDetails=true;
  }

  changeStatusOfTask(id:number):void {
      let i=0;
      let index1=0;
      for(i=0;i<this.myTask.length;i++) if (this.myTask[i].id==id) index1=i;
      switch (this.myTask[index1].status) 
      {
      case this.statusOfTask.todo: this.myTask[index1].status=this.statusOfTask.inprogress;break;
      case this.statusOfTask.inprogress: this.myTask[index1].status=this.statusOfTask.done;break;
      case this.statusOfTask.done: this.myTask[index1].status=this.statusOfTask.todo;break;
      }
    taskname1.ACT_EDIT_TASK([id,this.myTask[index1].nameOfTask,this.myTask[index1].myTask,this.myTask[index1].dateTask,this.myTask[index1].status]);    
  }

  addTask1():void {
    this.activeModalAddTask=true;
  }

  closeModal():void {
   this.activeModalAddTask=false; 
  }

@Watch('activeModalAddTask')
  onactiveModalAddTaskChanged(val: string, oldVal: string) {
  }

  closeModalDetails():void {
    this.activeModalDetails=false;  
  }

  addTask(nameOfTask:string,inputTask:string,inputDate:string):void {

    this.indexOfNewTask++;
    this.isNewTask=true;
  }

async deleteTask(id:number) {
    this.indexOfNewTask--;
    this.isNewTask=false;
    await taskname1.ACT_DELETE_TASK(id);
  }

async mounted() 
  {
        await taskname1.GET_TASKS_FROM_API();
        this.myTask=await taskname1.GET_TASKS;
        this.run();
  }  

created() {
}

  enter():void 
  {
    this.idx=this.idx+1;
  }

  run():void 
  {
    this.idx=1;
  }

updated():void {
  this.myTask=taskname1.GET_TASKS;
}

}
</script>

<style scoped>

.new-task {
  animation-name: blinker;
  animation-iteration-count: 3;
  animation-timing-function: cubic-bezier(1.0,0,0,1.0);
  animation-duration: 1s;
}

@keyframes blinker {
  from { opacity: 1.0; }
  to { opacity: 0.0; }
  animation-duration:2s;
}


.old-task {
  color: black;
}

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
<template lang ="pug">
.wrapper
  .main
    .in_main
      .flex-task
        p Вывод просроченных/почти просроченных - на сегодняшнюю дату - {{moment().format("DD.MM.YYYY")}}
        br
        br
        span Фильтр задач  
          input(type="text" v-model="filter")
        br
        b Поиск карточек по периоду
          input(type="date" v-model="fromDate" @change="checkFromDate")
          span   до  
          input(type="date" v-model="toDate" @change="checkToDate")
        br
        hr
        .flex-task-container
          br
          table(style="width:100%")
            th To do - {{ getMyToDoTasks.length }}
            th In progress - {{ getMyInProgressTasks.length}}
            th Done - {{ getMyDoneTasks.length}}
            tr
              td(style="width:33%" 
                @dragover.prevent 
                @drop="dropToDo($event)")
                div(v-for="(item,index) in getMyToDoTasks" :key="getMyToDoTasks[index].id" 
                  @dragstart="drag(getMyToDoTasks[index].id,'todo')")
                  div.statusToDo(
                    v-bind:class="{'oneDayDeadLineStatusIds':moment().format('YYYY-MM-DD')==getMyToDoTasks[index].dateTask, 'deadLineStatusIds':moment().format('YYYY-MM-DD')>getMyToDoTasks[index].dateTask }"
                    draggable=true
                    @click="editTask(getMyToDoTasks[index].id)") {{getMyToDoTasks[index].nameOfTask }} - {{getMyToDoTasks[index].dateTask | dateTask}}

              td(style="width:33%" 
                @dragover.prevent 
                @drop="dropInProgress($event)")
                div(v-for="(item,index) in getMyInProgressTasks" :key="getMyInProgressTasks[index].id" 
                  @dragstart="drag(getMyInProgressTasks[index].id,'inprogress')")
                  div.statusInProgress(
                    v-bind:class="{'oneDayDeadLineStatusIds':moment().format('YYYY-MM-DD')==getMyInProgressTasks[index].dateTask, 'deadLineStatusIds':moment().format('YYYY-MM-DD')>getMyInProgressTasks[index].dateTask }"
                    draggable=true
                    @click="editTask(getMyInProgressTasks[index].id)") {{getMyInProgressTasks[index].nameOfTask}} - {{getMyInProgressTasks[index].dateTask | dateTask}}

              td(style="width:33%" 
                @dragover.prevent 
                @drop="dropInDone($event)")
                div(v-for="(item,index) in getMyDoneTasks" :key="getMyDoneTasks[index].id" 
                  @dragstart="drag(getMyDoneTasks[index].id,'done')")
                  div.statusDone(
                    draggable=true
                    @click="editTask(getMyDoneTasks[index].id)") {{getMyDoneTasks[index].nameOfTask}} - {{getMyDoneTasks[index].dateTask | dateTask}}
          br        
          hr
        taskDetailsModal(
            :activeModalDetails="activeModalDetails"
            v-if="activeModalDetails"
            :idTask="idTask"
            :myTask="myTask"
            @closeModalDetails="closeModalDetails")
</template>

<script lang="ts">
import { Component, Prop, Vue , Watch} from "vue-property-decorator";
import {Itask} from "../../components/menu-components/types/task";
import taskDetailsModal from "../../components/taskdetailsmodal.vue";
import axios from "axios"
import api from "../../service/tasksApi"
import taskname1 from "../../store/modules/tasks"


@Component({
  components: {
    taskDetailsModal
  }
})

export default class tasks extends Vue 
{  

  myTask:Itask[]=[];
  idTask:number=0;
  inputTask:string="";
  drugElementId:number=0;
  whereFrom:string="";
  moment=require("moment");
  fromDate:string="";
  toDate:string="";
  filter:string="Task";
  activeModalDetails:boolean=false;

  myStatusOfTask=
    {
    todo:"To do",
    inprogress:"In progress",
    done:"Done"
  };

  edit1():void {
    this.filter=taskname1.getMessage
    alert(this.filter);
  }

  mounted():void {
    this.myTask=taskname1.myTask;
    this.fromDate=this.moment("2019-12-01").format("YYYY-MM-DD");
    this.toDate=this.moment().add(2,'M').format("YYYY-MM-DD");
    if (localStorage.filter) {this.filter=localStorage.filter;}
    this.drugElementId=0;
  }

  @Watch('filter')
  onFilterChanged(val: string, oldVal: string) {
    localStorage.filter=val;
  }

  checkToDate():void {
    if (this.toDate=="") 
      {
        alert("Пустая дата, установливаю по умолчанию до 31.03.2020 !");
        this.toDate=this.moment().add(2,'M').format("YYYY-MM-DD");
      }
  }

  checkFromDate():void {
    if (this.fromDate=="") 
      {
        alert("Пустая дата, установливаю по умолчанию 01.12.2019 !");
        this.fromDate=this.moment("2019-12-01").format("YYYY-MM-DD");
      }          
  }

  get getFilteredTasks():Itask[] {
    let myFilterdTasks:Itask[]=[];
    for (var property in this.myTask)
      { 
        if (this.myTask[property].nameOfTask.toLowerCase().includes(this.filter.toLowerCase())
          && this.moment(this.myTask[property].dateTask).isBetween(this.moment(this.fromDate),this.moment(this.toDate),null,'[]'))
        {
          myFilterdTasks.push(this.myTask[property]);
        }
      }
    return myFilterdTasks;
  }

  get getMyToDoTasks():Itask[] {
    return this.getFilteredTasks.filter(getFilteredTasks=>getFilteredTasks.status===this.myStatusOfTask.todo);
  }

  get getMyInProgressTasks():Itask[] {
    return this.getFilteredTasks.filter(getFilteredTasks=>getFilteredTasks.status===this.myStatusOfTask.inprogress);
  }

  get getMyDoneTasks():Itask[] {
    return this.getFilteredTasks.filter(getFilteredTasks=>getFilteredTasks.status===this.myStatusOfTask.done);
  }

  drag(id:number,where:string):void {
    this.drugElementId=id;
    this.whereFrom=where;
  }

  dropInDone():void {
    let i=0;
    let index1=0;
    for(i=0;i<this.myTask.length;i++) if (this.myTask[i].id==this.drugElementId) index1=i;
    taskname1.ACT_EDIT_TASK([this.drugElementId,this.myTask[index1].nameOfTask,this.myTask[index1].myTask,this.myTask[index1].dateTask,this.myStatusOfTask.done]);
  }

  dropToDo():void {
    let i=0;
    let index1=0;
    for(i=0;i<this.myTask.length;i++) if (this.myTask[i].id==this.drugElementId) index1=i;
    if (this.whereFrom=="done") alert("Нельзя переносить из Done в Todo!");
    else taskname1.ACT_EDIT_TASK([this.drugElementId,this.myTask[index1].nameOfTask,this.myTask[index1].myTask,this.myTask[index1].dateTask,this.myStatusOfTask.todo]);
  }

  dropInProgress():void {
    let i=0;
    let index1=0;
    for(i=0;i<this.myTask.length;i++) if (this.myTask[i].id==this.drugElementId) index1=i;
    taskname1.ACT_EDIT_TASK([this.drugElementId,this.myTask[index1].nameOfTask,this.myTask[index1].myTask,this.myTask[index1].dateTask,this.myStatusOfTask.inprogress]);
  }

  editTask(id1:number):void {
    this.idTask=id1;
    this.inputTask=this.myTask[id1].myTask;
    this.activeModalDetails=true;
  }

  closeModalDetails():void {
    this.activeModalDetails=false;  
  }

  async created() {
    await taskname1.GET_TASKS_FROM_API();
    this.myTask=await taskname1.GET_TASKS;
} 

}
</script>

<style scoped>

.item-enter-active,
.item-leave-active {
  transition: font-size .3s;
}

.oneDayDeadLineStatusIds {
  color:orange;
}

.deadLineStatusIds {
  border-box:1px;
  color:red;
}

.statusToDo:hover,
.statusInProgress:hover,
.statusDone:hover {
  background-color: #EAEAEA;
}

.statusDone {
  color: green;
}

.statusToDo{
}

.statusToDo::before {
  content: "( - ) ";
}

.statusInProgress::before {
  content: "( ± ) ";
}

.statusDone::before {
  content: "( + ) ";
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
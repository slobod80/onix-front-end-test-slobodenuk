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
              td(style="width:33%" 
                @dragover.prevent 
                @drop="dropToDo($event)")
                div(v-for="(item,index) in myTask" :key="myTask[index].id" @dragstart="drag(index,'todo')")
                  p(v-if="myTask[index].status=='To do'"
                    draggable=true
                    @dblclick="editTask(myTask[index].id)") {{myTask[index].nameOfTask}} - {{myTask[index].dateTask}}
              td(style="width:33%"
                @dragover.prevent 
                @drop="dropInProgress")
                div(v-for="(item,index) in myTask" :key="myTask[index].id" @dragstart="drag(index,'inprogress')")
                  p(v-if="myTask[index].status=='In progress'" 
                    draggable=true
                    @dblclick="editTask(myTask[index].id)") {{myTask[index].nameOfTask}} - {{myTask[index].dateTask}}
              td(style="width:33%" 
                @dragover.prevent 
                @drop="dropInDone")
                div(v-for="(item,index) in myTask" :key="myTask[index].id" 
                  draggable=true
                  @dragstart="drag(index,'done')")
                  p(v-if="myTask[index].status=='Done'" 
                    draggable=true
                    @dblclick="editTask(myTask[index].id)") {{myTask[index].nameOfTask}} - {{myTask[index].dateTask}}
        taskDetailsModal(
            :activeModalDetails="activeModalDetails"
            v-if="activeModalDetails"
            :idTask="idTask"
            :myTask="myTask"
            @closeModalDetails="closeModalDetails")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {Itask} from "../../components/menu-components/types/task";
import taskDetailsModal from "../../components/taskdetailsmodal.vue";

@Component({
  components: {
    taskDetailsModal
  }
})

export default class tasks extends Vue 
{
  @Prop() myTask!:Itask[];

  idTask:number=0;
  inputTask:string="";
  drugElementId:number=0;
  whereFrom:string="";

  activeModalDetails:boolean=false;

  drag(index:number,where:string):void {
    this.drugElementId=index;
    this.whereFrom=where;
  }

  dropInDone():void {
    this.$emit("drug",this.drugElementId,"done",this.whereFrom);
  }

  dropToDo():void {
    this.$emit("drug",this.drugElementId,"todo",this.whereFrom);
  }

  dropInProgress():void {
    this.$emit("drug",this.drugElementId,"inprogress",this.whereFrom);
  }

  editTask(id1:number):void {
    this.idTask=id1;
    this.inputTask=this.myTask[id1].myTask;
    this.activeModalDetails=true;
  }

    closeModalDetails():void {
    this.activeModalDetails=false;  
  }

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
<template lang ="pug">
      .modal(v-if="activeModalDetails")
        .modal-background
          .modal-content 
            p Название задачи: {{this.myTask[index1].nameOfTask}}
            p Описание задачи: {{this.myTask[index1].myTask}}
            p Дата окончания: {{this.myTask[index1].dateTask}}
            p Статус: {{this.myTask[index1].status}}
            br
            b Редактировать задачу 
              input(type="button" 
              @click="edit" 
              v-bind:value="nameOfButton")
            br
            p Название задачи
            textarea(rows="3" cols="45" 
                v-bind:disabled="true"
                v-model="nameOfTask") 

            p Описание задачи
            textarea(rows="5" cols="45" 
                v-bind:disabled="isEdit ? false:true"
                @input="input"
                v-model="inputTask")

            p Дата окончания
            input(type="date"
                @input="input"
                v-bind:disabled="isEdit ? false:true"
                v-model="inputDate")

            p Статус
            select(v-model="selected" @input="input")
                option(v-for="(item,index) in myStatusOfTask" :value="item" ) {{myStatusOfTask[index]}}
            br
            input(type="button" 
              v-if="isChanged" 
              @click="saveTask"
              value=" Save ")
</template> 

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator";
import {Itask} from "./menu-components/types/task";
import taskname1 from "../store/modules/tasks"


@Component

export default class taskDetailsModal extends Vue 
{
  //@Prop() myTask!:Itask[];
  @Prop() activeModalDetails!:boolean;
  @Prop() idTask!:number;

  nameOfTask:string="";
  inputDate:string="";
  inputTask:string="";
  statusOfTask:string="";
  isEdit:boolean=false;
  isChanged:boolean=false;
  nameOfButton:string="Edit";
  selected:string="To do";
  moment=require("moment");
  myTask:Itask[]=[];
  index1:number=0;
  myStatusOfTask=
    {
    todo:"To do",
    inprogress:"In progress",
    done:"Done"
    };

  input():void {
    this.isChanged=true;
  }

  closeModal():void {
    this.isEdit=false;
    this.$emit("closeModalDetails");
  }

  edit():void {
    if (this.nameOfButton=="Edit")
      {
        this.nameOfButton="Cancel";
        this.isEdit=!this.isEdit;
        this.nameOfTask=this.myTask[this.index1].nameOfTask;
        this.inputTask=this.myTask[this.index1].myTask;
        this.inputDate=this.moment(this.myTask[this.index1].dateTask,"YYYY-MM-DD").format("YYYY-MM-DD");
        this.statusOfTask=this.myTask[this.index1].status;
        this.selected=this.myTask[this.index1].status;
      }
    else
      {
        this.isEdit=false;
        this.isChanged=false;
        this.nameOfButton="Edit";
        this.nameOfTask="";
        this.inputDate="";
        this.inputTask="";
        this.statusOfTask="";
        this.closeModal();
      }
  }

  saveTask():void {
    this.myTask[this.index1].nameOfTask=this.nameOfTask;
    this.myTask[this.index1].myTask=this.inputTask;
    this.myTask[this.index1].dateTask=this.inputDate;
    this.myTask[this.index1].status=this.selected;
    taskname1.ACT_EDIT_TASK([this.idTask,this.nameOfTask,this.inputTask,this.inputDate,this.selected]);
    
    this.isEdit=false;
    this.isChanged=false;
    this.nameOfButton="Edit"; 
    this.nameOfTask="";
    this.inputDate="";
    this.inputTask="";
    this.statusOfTask=""; 
    this.closeModal();
  }

mounted():void {
  let i=0;
  for(i=0;i<this.myTask.length;i++) if (this.myTask[i].id==this.idTask) this.index1=i;
}

created():void {
   this.myTask=taskname1.myTask; 
}

}
</script>

<style scoped>

.modal {
  overflow: hidden;
  position:fixed;
  display:none;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(10,10,10,0.7);
}
.modal-background {
  overflow: hidden;
  z-index: 40;
}

.modal-content {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding:2em;
  background-color: white;
  z-index: 50;
}


</style>
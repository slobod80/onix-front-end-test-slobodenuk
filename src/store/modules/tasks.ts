import {VuexModule, Module, getModule, MutationAction, Mutation, Action} from "vuex-module-decorators"
import store from "../index"
import {Itask} from "@/components/menu-components/types/task"
import {statusOfTask} from "../../components/menu-components/types/statusoftask"
import taskapi from "../../service/tasksApi"
import axios from "axios";

@Module({
  namespaced:true,
  name:"taskname1",
  dynamic:true,
  store:store
})

class TaskModule extends VuexModule {
  statusOfTask=
  {
    todo:"To do",
    inprogress:"In progress",
    done:"Done"
  };

  myTask:Itask[]=[];
  message:string="sdsds"

//***********DELETE TASK***********
@Mutation DELETE_TASK(id:number) {
let i=0;
let indexToDelete=0;
for(i=0;i<this.myTask.length;i++)
  if (this.myTask[i].id==id) indexToDelete=i;

  this.myTask.splice(indexToDelete,1);
}

@Action async ACT_DELETE_TASK(id:number) {
  const response = await taskapi.deteleTask(id);
  if (response==200) this.DELETE_TASK(id);
}

//***********EDIT TASK***********
@Mutation changeStatus(payload:any):void {
    switch (this.myTask[payload].status) 
      {
        case statusOfTask.todo: this.myTask[payload].status=statusOfTask.inprogress;break;
        case statusOfTask.inprogress: this.myTask[payload].status=statusOfTask.done;break;
        case statusOfTask.done: this.myTask[payload].status=statusOfTask.todo;break;
      }
}

@Mutation changeStatusDrug(payload:any):void {
  this.myTask[payload[0]].status=payload[1];
}


@Action async ACT_CHANGE_STATUS(payload:any) {
  const response = await taskapi.editStatus([payload]);
  if (response==200) {
    this.EDIT_TASK([payload]);
  }  
}

@Mutation EDIT_TASK(payload:any):void {
  let i=0;
  for(i=0;i<this.myTask.length;i++)
    if (this.myTask[i].id==payload[0][0]) 
    {
      this.myTask[i].nameOfTask=payload[0][1];
      this.myTask[i].myTask=payload[0][2];
      this.myTask[i].dateTask=payload[0][3];
      this.myTask[i].status=payload[0][4];
    }
}

@Action async ACT_EDIT_TASK(payload:any) {
  const response = await taskapi.editTask([payload]);
  if (response==200) {
    this.EDIT_TASK([payload]);
  }
}
//***********GET ALL TASKS FROM API
@Mutation getAllTask(payload:any) {
  this.myTask=payload;
}

@Action async GET_TASKS_FROM_API() {
  const response = await taskapi.getTasksFromApi();
  this.getAllTask(response);
}
//***********ADD NEW TASK API

@Mutation ADD_TASK(payload:any):void 
{
  this.myTask.push(  {
    id:payload[0],
    nameOfTask:payload[1], 
    myTask:payload[2], 
    dateTask:payload[3],
    status:this.statusOfTask.todo}  )
}

@Action async ACT_ADD_TASK(payload:any) 
{
  const response = await taskapi.addTask(payload[0], payload[1], payload[2], payload[3]);
  if (response==200) this.ADD_TASK([payload[0], payload[1], payload[2], payload[3]]);
}
//***********GETTERS

get GET_TASKS():any {
  return this.myTask;
}

get getMessage() {
      return this.message;
    }
}

export default getModule(TaskModule);
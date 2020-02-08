import {VuexModule, Module, getModule, MutationAction, Mutation, Action} from "vuex-module-decorators"
import store from "../index"
import {Itask} from "@/components/menu-components/types/task"
import {statusOfTask} from "../../components/menu-components/types/statusoftask"

@Module({
  namespaced:true,
  name:'tasksname',
  dynamic:true,
  store,
})

class TaskModule extends VuexModule {
  statusOfTask=
  {
    todo:"To do",
    inprogress:"In progress",
    done:"Done"
  };

  myTask:Itask[]=
  [
    {id:0,nameOfTask:"Name of task-1",myTask:"My task-1", dateTask:"2019-12-25",status:this.statusOfTask.todo},
    {id:1,nameOfTask:"Name of task-2",myTask:"My task-2", dateTask:"2019-12-30",status:this.statusOfTask.inprogress},
    {id:2,nameOfTask:"Name of task-3",myTask:"My task-3", dateTask:"2020-01-05",status:this.statusOfTask.done},
    {id:3,nameOfTask:"Name of task-4",myTask:"My task-4", dateTask:"2020-01-10",status:this.statusOfTask.inprogress},
    {id:4,nameOfTask:"Name of task-5",myTask:"My task-5", dateTask:"2020-01-15",status:this.statusOfTask.inprogress},
    {id:5,nameOfTask:"Name of task-6",myTask:"My task-6", dateTask:"2020-01-20",status:this.statusOfTask.todo},
    {id:6,nameOfTask:"Name of task-7",myTask:"My task-7", dateTask:"2020-01-25",status:this.statusOfTask.todo},
    {id:7,nameOfTask:"Name of task-8",myTask:"My task-8", dateTask:"2020-02-28",status:this.statusOfTask.done}
  ]
  message:string="sdsds"

@Mutation addTask(payload:any):void {
  //Так конечно делать нельзя, но я буду получать ID c сервера...
  alert(payload[0]);
  this.myTask.push({id:this.myTask.length,nameOfTask:payload[0], myTask:payload[1], dateTask:payload[2],status:this.statusOfTask.todo});
}


@Mutation deleteTask(index:number) {
  this.myTask.splice(index,1);
}

@Mutation changeStatus(payload:number):void {
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


@Mutation editTask(payload:any):void {
  this.myTask[payload[0]].myTask=payload[1];
  this.myTask[payload[0]].dateTask=payload[2];
  this.myTask[payload[0]].status=payload[3];
}


    get getMessage() {
      return this.message;
    }
}

export default getModule(TaskModule);
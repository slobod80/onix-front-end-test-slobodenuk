
import axios from "axios"
import api from "./api"



/*async function getTasks() {
	const response=await axios.get("https://cold-water-7357.getsandbox.com/tasks");
	return response.data;
}*/



/*function getTasks() {
  const promise=tasksApi.getTasks()
  .then(response=>{
  tasksname1.getAllTasks(response);
    })
  .catch(function(error){alert("Error")});
}*/

async function editStatus(payload:any){
	const response=await axios.put(api.myURL+"task", 
		JSON.stringify(
			{
			id:payload[0][0],
			nameOfTask:payload[0][1],
			myTask:payload[0][2],
			dateTask:payload[0][3],
			status:payload[0][4]
		}),
		{
			headers: {'Content-Type': 'application/json'}
		} )
	.then(response=>{
		return response.status;
	})
	.catch(response=>{
		alert("error")
	})
	return response;
}

async function editTask(payload:any) {
	const response=await axios.put(api.myURL+"task", 
		JSON.stringify(
			{
			id:payload[0][0],
			nameOfTask:payload[0][1],
			myTask:payload[0][2],
			dateTask:payload[0][3],
			status:payload[0][4]
		}),
		{
			headers: {'Content-Type': 'application/json'}
		} )
	.then(response=>{
		return response.status;
	})
	.catch(response=>{
		alert("error")
	})
	return response;	
}

async function getTasksFromApi() {
  const promise=await axios.get(api.myURL+"tasks")
  .then(response=>{
    return response.data;
  })
  .catch(function(error){alert("Error")});
  return promise;
}


async function addTask(id:number,nameOfTask:string,inputTask:string,inputDate:string) {
	const response=await axios.post(api.myURL+"add", 
		JSON.stringify(
			{
			id:id,
			nameOfTask:nameOfTask,
			myTask:inputTask,
			dateTask:inputDate,
			status:"To do"
		}),
		{
			headers: {'Content-Type': 'application/json'}
		} )
	.then(response=> {
		return response.status;
		})
	.catch(function(error) {alert(error)});
	return response;
}

async function deteleTask(index:number) {
	const response=await axios.delete("https://cold-water-7357.getsandbox.com/"+"delete", {data:{ id:index }})
	.then(response=>{
		return response.status;
	})
	.catch(response=>{
		alert("error")
	})
	return response;
}

export default {addTask,getTasksFromApi,deteleTask,editTask,editStatus}

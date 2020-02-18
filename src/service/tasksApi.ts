
import axios from "axios"
import ax from "./api"

export default class taskApi {

static getTasksFromApi() {
  const promise=ax.get("tasks")
  .then(response=>{
    return response.data;
  })
  .catch(function(error){alert("Error")});
  return promise;
}


static editStatus(payload:any){
	const response=ax.put("task", 
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


static editTask(payload:any) {
	const response=ax.put("task", 
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

static addTask(id:number,nameOfTask:string,inputTask:string,inputDate:string) {
	const response=ax.post("add", 
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

static deteleTask(index:number) {
	const response=ax.delete("delete", {data:{ id:index }})
	.then(response=>{
		return response.status;
	})
	.catch(response=>{
		alert("error")
	})
	return response;
}



}


/*async function editStatus(payload:any){
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

export default {addTask,getTasksFromApi,deteleTask,editTask,editStatus}*/

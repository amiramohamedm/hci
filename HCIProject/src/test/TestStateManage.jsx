// import { useContext, createContext, useEffect, useState } from "react";
// import { TaskStatus } from "../utils/task_status";




// export function TestSetState (){

// 		const [state , setState] = useState(TaskStatus.todo)
// const toggleStatus = () => {
//   switch (state) {
//     case TaskStatus.todo:
//       setState(TaskStatus.inProgress);
//       break;
//     case TaskStatus.inProgress:
//       setState(TaskStatus.done);
//       break;
//     case TaskStatus.done:
//       setState(TaskStatus.todo);
//       break;
//     default:
//       break;
//   }
// };
// 		return <>
// 		<div classNameName="card-item">
// 		<button type="button" onClick={toggleStatus} > {state} </button>

// 		</div>
// 		</>
// }


// export function TestEffectState(){

// 	const [change, setChange] = useState(0);

//   useEffect(() => {
//     let timer = setTimeout(() => {
//       setChange((count) => count + 1);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

// 	return (
//     <>
//       <div className="card">
//         <div className="card-header">Test useEffect</div>
//         <div className="card-body">
//           <p className="card-text">value of counter = {change}</p>
//           <button type="button" classNameName="btn btn-primary" onClick={()=>setChange(change+1)}> Update value</button>
//         </div>
//       </div>
//     </>
//   );
// }


// // function UserContext (){
// //   r
// // eturn createContext();
// // }

// className User {
// 	id;
// 	name;
//  age;
// 	constructor({id, name, age}) {
// 		this.id= id;
// 		this.name = name;
// 		this.age = age;
// 	}
// }
// export function TestUseContext (){
	
//   const [user, setUser] = useState(User({id:"1", name : "ahmed", age : 22}))
//   const CurrentUser = createContext(user);
// 	useEffect(()=>{
// 		setUser(()=> {
// 			setUser(User({id:"2", name : "ahmed", age : 22}))
// 		})
// 	})
  
// 	<NestedFunction1 />
//   </CurrentUser.Provider>

  

// }

// function NestedFunction1(){
//   return <NestedFunction2 />
// }

// function NestedFunction2(){
//   ///* we can arrive to value exist in context in any place in divition tree
//   const user = useContext(userModel)
// }


export function AddTaskTest(){
	return <div className="card text-center task-card">
      <div className="card-header" >Featured</div>
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
      <div className="card-footer text-body-secondary">2 days ago</div>
    </div>;
}
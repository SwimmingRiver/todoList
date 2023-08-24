const todo = document.querySelector("#input");
const list = document.querySelector("#list");
let arr = [];

const LoadToDo =()=>{
    const localArr = localStorage.getItem('todoList');
    const localArrValue = JSON.parse(localArr);
    localArrValue?.map((i)=>arr.push(i));
    ShowTodoList();
};
const ShowTodoList=()=>{
    list.innerHTML='';
    arr.map((i)=>{
    const listItem = document.createElement('li')
    listItem.innerHTML=`<input type="checkbox"><p>${i}</p>`;
    list.appendChild(listItem);
 })

}

const AddToDo=()=>{
    if(todo.value===""){
        return alert('값을 입력해주세요');
     };
    arr.push(todo.value);
    localStorage.setItem('todoList',JSON.stringify(arr));
    ShowTodoList();
    todo.value = '';
};

const DeleteToDo =()=>{

}


LoadToDo();
add.addEventListener("click",AddToDo);
// document.addEventListener("DOMContentLoaded",);
const todo = document.querySelector("#input");
const list = document.querySelector("#list");
let arr = [];

const LoadToDo =()=>{
    const localArr = localStorage.getItem('todoList');
    const localArrValue = JSON.parse(localArr);
    localArrValue?.map((i)=>arr.push(i));
    ShowTodoList();
};//localStorage에 있는 리스트 불러오기
const ShowTodoList=()=>{
    list.innerHTML='';
    arr.map((value,index)=>{
    const listItem = document.createElement('li')
    listItem.innerHTML=`<span key=${index}
    <input type="checkbox">
    <p>${value}</p>
    <button>Edit</button>
    <button onclick={DeleteToDo(${index})}>delete</button>
    </span>`;
    list.appendChild(listItem);
 })
};//html로 저장한 값 보여주기

const AddToDo=()=>{
    if(todo.value===""){
        return alert('값을 입력해주세요');
     };
    arr.push(todo.value);
    localStorage.setItem('todoList',JSON.stringify(arr));
    ShowTodoList();
    todo.value = '';
};//입력값 리스트에 추가하기

const DeleteToDo =(index)=>{
    arr.splice(index,1);
    localStorage.setItem("todoList",JSON.stringify(arr));
    ShowTodoList();
}


LoadToDo();
add.addEventListener("click",AddToDo);


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
    const done = arr[index].done?'checked':"";
    const listItem = document.createElement('li')
    listItem.innerHTML=`<div id="todo-box" key=${index}>
    <input id="check-box" type="checkbox" ${done} onchange="CheckToggle(${index})">
    <p id="todo-value">${value.value}</p>
    <button id="button-in-box" onclick={EditToDo(${index})}>
    <span class="material-symbols-outlined">
edit
</span>
    </button>
    <button id="button-in-box" onclick={DeleteToDo(${index})}>
    <span class="material-symbols-outlined">
    close
    </span></button>
    </div>`;
    list.appendChild(listItem);
 })
};//html로 저장한 값 보여주기

const CheckToggle =(index)=>{
    arr[index].done = !arr[index].done;
    localStorage.setItem("todoList",JSON.stringify(arr));
    ShowTodoList();
}

const AddToDo=(e)=>{
    e.preventDefault();
    const inputToDo = document.querySelector('#inputVal');
    let inputToDoVal = inputToDo.value;
    if(inputToDoVal===""){
        return alert('값을 입력해주세요');
     };
    if(inputToDoVal!==""){

    arr.push({value:inputToDoVal,done:false});
    localStorage.setItem('todoList',JSON.stringify(arr));
    ShowTodoList();
    inputToDo.value = '';
    }
};//입력값 리스트에 추가하기

const DeleteToDo =(index)=>{
    let check = confirm(`${arr[index].value}를 삭제하시겠습니까?`);
    if(check){
    arr.splice(index,1);
    localStorage.setItem("todoList",JSON.stringify(arr));
    ShowTodoList()}
};//삭제하기

const EditToDo =(index)=>{
    let edtied = prompt(`${arr[index].value}를 수정하시겠습니까?`,`${arr[index].value}`);
    if(!edtied){
        return 0;
    }
    if(edtied){
    arr.splice(index,1,{value:edtied,done:arr[index].done});
    localStorage.setItem("todoList",JSON.stringify(arr));
    ShowTodoList();}
};//수정하기


LoadToDo();
add.addEventListener("click",AddToDo);


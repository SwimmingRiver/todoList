import  styled  from 'styled-components';
import { useEffect, useRef, useState } from 'react';

const Template = styled.div`
  display: flex;
  justify-content: center;
`
const Wrapper = styled.div`
    text-align: center;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width:500px;
    height:800px;
    border: solid 2px #000051;;
    border-radius: 15px;
`;

const Title = styled.h1`
    text-align: center;
    height: 100px;
    font-size: 50px;
    color:white;
    background-color: black;
`;
const ListBox = styled.div`
    width: 500px;
    height: 400px;
    overflow: scroll;
    -ms-overflow-style:none;
    ::-webkit-scrollbar{display:none};
`;
const ListTitle=styled.div`
  text-align: center;
  width: 500px;
  height: 50px;
  font-size: 30px;
  border: solid 1px black;
  color: white;
  background-color: black;
  
`
const List = styled.li`
    list-style: none; 
    font-size:30px;
    
`;
const DoneList = styled.li`
  text-decoration: line-through;
  list-style: none;
  font-style: italic;
  font-size: 30px;
  

`;
const Input = styled.input`
  width: 491px;

`;
const AddButton = styled.button`
  width: 500px;
  background-color: transparent;
  cursor: pointer;
`;
const ListButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;


function App(){
    const [todo, setTodo] = useState("");
  let todoObj = {
    todo: todo,
    index: 0,
  };
  const [todoArr, setTodoArr] = useState([]);
  const [doneArr,setDoneArr]=useState([]); 
  const Typing = (e) => {
    setTodo(e.target.value);
  };
  const Add = (e) => {
    e.preventDefault();
    if(todo === ""){return}
    setTodoArr((i) => [todoObj.todo, ...i]);;
    setTodo("") ;
    inputRef.current.focus();
  };


  const DoOrDone = (arr,i) => {
  
    if(window.confirm(`Is ${arr[i]} done?`)){
    let gotodone = arr.splice(i,1);
    setDoneArr((e)=>[gotodone,...e]);
    }
    inputRef.current.focus();
  };//완료

  const Undo = (arr,i )=> {
    if(window.confirm(`Is ${arr[i]} undo?`)){
      arr.splice(i,1);
    setTodoArr((i)=>[...arr]);
  }
  inputRef.current.focus();
  };//삭제

  const Edit=(arr,i)=>{
    let editedTodo = prompt(`edit ${arr[i]}`,"");
    if(editedTodo === null){return null}
    else{
      arr.splice(i,1,editedTodo)
      setTodoArr(()=>[...arr])
      inputRef.current.focus();
    }
  }//수정
 
  const inputRef = useRef();
 useEffect(()=>(inputRef.current.focus()),[]);
  return (
    <Template>
    <Wrapper>
      <Title>TO DO LIST</Title>
      <form onSubmit={Add}>
        <Input ref={inputRef} onChange={Typing} placeholder="To Do" type="text" value={todo} />
        <AddButton>
        <span className="material-icons">
          add_circle_outline
        </span>        
    </AddButton>
      </form>
      <ListTitle>To Do({todoArr.length})</ListTitle>
     <ListBox>
      <ul>
        {todoArr.map((item, index) => (
    <List key={(todoObj.index = index)}>
        {item}
        <ListButton onClick={()=>DoOrDone(todoArr,index)}>
            <span className="material-icons">
                check
            </span>
        </ListButton>
        <ListButton onClick={()=>Undo(todoArr,index)}>
            <span className="material-icons">
                close
            </span>
        </ListButton>
        <ListButton onClick={()=>Edit(todoArr,index)}>
            <span className="material-icons">
                edit
            </span>
        </ListButton>
    </List>
            ))}
          </ul>
          </ListBox>
          <ListTitle> Done({doneArr.length})</ListTitle>
      <ListBox>
      <ul>
       
          {doneArr.map((item,index)=>(
          <DoneList key={index}>{item}</DoneList>
        ))}
      </ul>
      </ListBox>
    </Wrapper>
    </Template>
  );
}

export default App;
import {useEffect, useState} from 'react';
import TodoCard from './TodoCard';
import styled from 'styled-components';
import { Input,Button,FormControl,Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription } from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons'
import { useSelector,useDispatch } from 'react-redux';
import { todoSlice } from './reducer/reducer';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  background-color:#dce9fe;

`;
const ListWrapper = styled.div`
  width:35vw;
  height:30vh;
  border-radius:10px;
  display:flex;
  flex-direction:column;
  align-items:center;
  background-color:#fff; 
  margin-bottom:10px;
  overflow:auto;
`;
const List = styled.ul`
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  width:30vw;
`;
function App() {
  const {todo,doing,done}=useSelector((state)=>state.todoSlice);
  const dispatch = useDispatch();
  const [inputValue,setInputValue]=useState('');
  const [errorObj,setErrorObj]=useState({nullError:false,sameError:false});
  const ADD_Todo =(e)=>{
    e.preventDefault();
    if(inputValue===""){
    return setErrorObj((prev)=>({
          ...errorObj,
          nullError:true
       }));
    };
    if(todo.includes(inputValue)){
      return setErrorObj((prev)=>({
        ...errorObj,
        sameError:true
      }));
        };
    dispatch(todoSlice.actions.ADD_TODO(inputValue))
      setInputValue('');
      setErrorObj({nullError:false,sameError:false});
  };
  
  const onDragEnd=(e)=>{
  console.log(e)
  if(!e.destination){return }
  if(e.destination.droppableId==="doing"){
    dispatch(todoSlice.actions.ADD_DOING(e.source.index));
  }
  if(e.destination.droppableId==="done"){
    dispatch(todoSlice.actions.ADD_DONE(e.source.index));
  }
  };

  const localData = JSON.parse(localStorage.getItem('todolist'))||{todo:[],doing:[],done:[]};
  const [localTodo,setLocalTodo]=useState(localData);
  useEffect(()=>{
    localStorage.setItem('todolist',JSON.stringify(localData));

  },[localTodo])
  return (
    

    <Wrapper>
      <h1 id='title'>TO DO LIST</h1>
      <div>
        <form onSubmit={ADD_Todo}>
        <FormControl >
          <div style={{display:'flex' ,flexDirection:'column',alignItems:'center'}}>
      <Input autoFocus placeholder='write to do!!' onChange={(e)=>{setInputValue(e.target.value)}} value={inputValue}/>
      <Button style={{marginLeft:"30px"}} type='submit' colorScheme='teal'>add<AddIcon/></Button>
          </div>
        </FormControl>
        </form>
        {errorObj.nullError?(
          <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Error😣</AlertTitle>
          <AlertDescription>해야할 일을 입력해주세요!</AlertDescription>
        </Alert>
        ):null}
        {errorObj.sameError?(
          <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Error😣</AlertTitle>
          <AlertDescription>이미 입력한 값입니다!</AlertDescription>
        </Alert>
        ):null}
        
      </div>

      <DragDropContext onDragEnd={onDragEnd}>

      <Droppable droppableId="todo">
        {(provided,snapshot)=> (
          <div className="todo" ref={provided.innerRef} {...provided.droppableProps}>

          <ListWrapper >
          <h2>todo</h2>
          <List >
          {
          todo.map((value,index)=>(
          <Draggable key={`card_${value}`} draggableId={`card_${value}`} index={index}>
             {(provided)=> (
              <div
              className={`card_${value}`} 
             ref={provided.innerRef} 
             {...provided.draggableProps}
            {...provided.dragHandleProps} >
             <TodoCard value={value}  index={index} key={index}/>
                
              </div>
            
            )}

          </Draggable>)
              )}
            </List>
          </ListWrapper>
          </div>
          )}
        </Droppable>

     <Droppable droppableId='doing'>

      {(provided)=>(
        <div className='doing' ref={provided.innerRef} {...provided.droppableProps} {...provided.dragHandleProps}>
         <ListWrapper >
          <h2>doing</h2>
          <List >
          {
          doing.map((value,index)=>(
          <Draggable key={`card_${value}`} draggableId={`card_${value}`} index={index}>
             {(provided)=> (
              <div
              className={`card_${value}`} 
             ref={provided.innerRef} 
             {...provided.draggableProps}
            {...provided.dragHandleProps} >
             <TodoCard value={value} index={index} key={index}/>
                
              </div>
            
            )}

          </Draggable>)
              )}
            </List>
          </ListWrapper>


        </div>
         
      )}
      </Droppable>
      <Droppable droppableId='done'>
      {(provided)=>(
      <div ref={provided.innerRef}{...provided.droppableProps}>
      <ListWrapper >
          <h2>done</h2>
          <List >
          {
          done.map((value,index)=>(
          <Draggable key={`card_${value}`} draggableId={`card_${value}`} index={index}>
             {(provided)=> (
              <div
              className={`card_${value}`} 
             ref={provided.innerRef} 
             {...provided.draggableProps}
            {...provided.dragHandleProps} >
             <TodoCard value={value}  index={index} key={index}/>
                
              </div>
            
            )}

          </Draggable>)
              )}
            </List>
          </ListWrapper>


      </div>
      )}
      </Droppable>

      </DragDropContext>
    </Wrapper>
    

  );
}

export default App;

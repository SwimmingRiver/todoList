import {useState} from 'react';
import TodoCard from './TodoCard';
import styled from 'styled-components';
import { Input,Button,FormControl,Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription } from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons'
import { useSelector,useDispatch } from 'react-redux';
import { todoSlice } from './reducer/reducer';

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;

`;
const ListWrapper = styled.div`
  width:35vw;
  height:30vh;
  border:solid 1px black;
  border-radius:10px;
  display:flex;
  flex-direction:column;
  align-items:center;
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
  

  
  return (
    <Wrapper>
      <h1 id='title'>TO DO LIST</h1>
      <div>
        <form onSubmit={ADD_Todo}>
        <FormControl >
      <Input placeholder='write to do!!' onChange={(e)=>{setInputValue(e.target.value)}} value={inputValue}/>
      <Button type='submit' colorScheme='teal'>add<AddIcon/></Button>
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

      <ListWrapper>
        <h2>todo</h2>
        <List>
          {todo.map((value,index)=>
          <TodoCard value={value}  index={index} key={index}/>

            )}
        </List>
      </ListWrapper>

      <ListWrapper>
        <h2>doing</h2>
        <List>
          {doing.map((value,index)=>
            <TodoCard value={value}  index={index} key={index}/>
          )}
        </List>
      </ListWrapper>
      <ListWrapper>
        <h2>done</h2>
        <List>
          {done.map((value,index)=>
          <TodoCard value={value}  index={index} key={index}/>
            )}
        </List>
      </ListWrapper>
      
    </Wrapper>
  );
}

export default App;

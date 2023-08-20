import { Card, CardHeader, CardBody, CardFooter ,Button,Box} from '@chakra-ui/react'
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import { todoSlice } from './reducer/reducer';
import { EditIcon,DeleteIcon } from '@chakra-ui/icons';
const Wrapper = styled.div`

    border-radius:10px;
    background-color:#F8F4E3;
    width:20vw;
       &:hover{
        transition: 0.4s;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
        }
`;
const StyledCard = styled(Card)`

    background-color:#F8F4E3; 
    width:30vw;
    height:10vh;
`;
const CardContent =styled.div`
        display:flex;
`;

const TodoCard=(props)=>{
    const {todo,doing,done} = useSelector((state)=>state.todoSlice);
    const dispatch = useDispatch();

    const EDIT_Todo=()=>{
        const editedTodo = prompt("수정할 내용을 입력하세요",todo[props.index]);
        if(editedTodo){
        dispatch(todoSlice.actions.EDIT_TODO({index:props.index,editedTodo}))
        }
      };
      const DELETE_Todo=()=>{
        const deletedTodo = window.confirm(`${todo[props.index]}를 삭제하시겠습니까?`);
        if(deletedTodo){
        dispatch(todoSlice.actions.DELETE_TODO({index:props.index}))
        }
      };
      const ADD_Doing=()=>{
        dispatch(todoSlice.actions.ADD_DOING({index:props.index}));
      }
      const ADD_Done=()=>{
        dispatch(todoSlice.actions.ADD_DONE({index:props.index}));
      }
    return (
    <Wrapper>

        <StyledCard>
        <CardBody size='xs'>
            <h1>{props.value}</h1>
            <CardContent>

            <div>
            {doing.includes(props.value)?<Button onClick={ADD_Done}>Done</Button>:todo.includes(props.value)?<Button onClick={ADD_Doing}>Doing</Button>:null}
            </div>
            {todo.includes(props.value)?(
                <div>
                    <Button onClick={EDIT_Todo}><EditIcon/></Button>
                    <Button onClick={DELETE_Todo}><DeleteIcon/></Button>
                </div>
            ):null
        }
            
        </CardContent>
        </CardBody>
        </StyledCard>

    </Wrapper>)
}
export default TodoCard;
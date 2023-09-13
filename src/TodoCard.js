import { Card,Button} from '@chakra-ui/react'
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import { todoSlice } from './reducer/reducer';
import { EditIcon,DeleteIcon ,CheckIcon,DragHandleIcon} from '@chakra-ui/icons';



const Wrapper = styled.div`

    border-radius:10px;
    background-color:#F8F4E3;
    width:30vw;
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

      justify-content:space-between;
`;
const Title = styled.h1`
    text-align:center;  
    width:15vw;

`;
const ButtonGroup = styled.div`

`;
const TodoCard=(props)=>{
    const {todo,doing} = useSelector((state)=>state.todoSlice);
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
        dispatch(todoSlice.actions.ADD_DOING(props.index));
      }
      const ADD_Done=()=>{
        dispatch(todoSlice.actions.ADD_DONE(props.index));
      }
    return (

            <Wrapper>
        <StyledCard >
            <CardContent>
            <Title>{props.value}</Title>
            <ButtonGroup>
            {doing.includes(props.value)?<Button onClick={ADD_Done}><CheckIcon></CheckIcon></Button>:todo.includes(props.value)?<Button onClick={ADD_Doing}><CheckIcon/></Button>:null}
            </ButtonGroup>
            {todo.includes(props.value)?(
                <ButtonGroup>
                    <Button onClick={EDIT_Todo}><EditIcon/></Button>
                    <Button onClick={DELETE_Todo}><DeleteIcon/></Button>
                </ButtonGroup>
            ):null
        }
        <DragHandleIcon/>
        </CardContent>
        </StyledCard>

    </Wrapper>


    )
}
export default TodoCard;
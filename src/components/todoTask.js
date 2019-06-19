import React, {useState} from 'react'
import "./Main.module.css";

const Task = ({...props}) =>{

    const [editMode, setEditMode] = useState(false);
    const [textToDoValue , setTextValue] = useState(props.text);
    const [statusValue, setStatusValue] = useState(props.status);


    const changeStatus = () =>{
        setEditMode(editMode)
        if(textToDoValue === props.text && statusValue === props.status){
            setEditMode(false)
            setStatusValue(props.status)
            setTextValue(props.text)
        }else if((!textToDoValue.trim())){
            setEditMode(false);
            setStatusValue(props.status)
            setTextValue(props.text)
            alert('the field cannot be empty')
        } else props.changeStatusToDo(props.id, statusValue , textToDoValue);
    }

    const editToDo = () =>{
        setEditMode(!editMode);
    }

    const editTextToDo = (e) =>{
        let value = e.currentTarget.value
        setTextValue(value);
    }
    const selectValue = (e) => {
        let value = e.currentTarget.value;
        setStatusValue(value);
    }

    return (
        <div className={'task task_conteiner'}>
            <div>
                {editMode && <span>
                    <button onClick={()=>{setEditMode(false)}}>cancel</button>
                    <button onClick={()=>changeStatus()}>send</button>
                </span>

                }
                {props.isLogin && !editMode && <button  onClick={editToDo}>editToDo</button>}
                {props.id}
            </div>
            <div>
                {props.name}
            </div>
            <div>
                {props.email}
            </div>
            <div>
                {editMode ? <input value={textToDoValue} onChange={editTextToDo}/>
                : textToDoValue}
            </div>
            <div>
                {!editMode
                    ? statusValue
                    : <select onChange={(e)=>{selectValue(e)}}>
                        <option selected={props.status} value={'0'}>0</option>
                        <option selected={props.status} value={'10'}>10</option>
                    </select>
                }
            </div>
        </div>)
}

export default Task;
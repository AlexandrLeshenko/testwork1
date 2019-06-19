import {API} from "../api/API";

const SET_TASKS = 'SET_TASKS';
const GET_SORT_TASKS = 'GET_SORT_TASKS';
const ADD_TASKS = 'ADD_TASKS';
const LOGIN_USER = 'LOGIN_USER';
const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
const CHANGE_STATUS = 'CHANGE_STATUS';


const initionState= {
    tasks: [],
    total_task_count : "",
    page: '1',
    isLogin: false,
    token: '',
    loginStatus : {
        error : false,
        message: ''
    },
    titleNameSortField : [
        {title : 'id', isActive: false, sort: 'asc'},
        {title : 'username', isActive: false, sort: 'asc'},
        {title : 'email', isActive: false, sort: 'asc'},
        {title : 'text', isActive: false, sort: 'asc'},
        {title : 'status', isActive: false, sort: 'asc'}
    ]

}

export const todoReduser = (state= initionState , action) =>{
    switch (action.type) {
        case SET_TASKS: {
            return {...state,
                tasks: action.res.tasks,
                total_task_count : action.res.total_task_count,
                page : action.page
            }
        }
        case GET_SORT_TASKS: {
            return {...state,
                tasks: action.res.tasks,
                titleNameSortField : state.titleNameSortField.map(el => {
                    if (el.title === action.title)  {return{...el, isActive : true, sort: action.sort_direction}}
                    return {...el, isActive : false };
                })
            }
        }
        case ADD_TASKS: {
            return {...state,
                tasks: [...state.tasks, action.res]
            }
        }
        case LOGIN_USER: {
                return {...state,
                    loginStatus: {error: false},
                    isLogin : true,
                    token : action.res.data.message.token
                }
        }
        case LOGIN_USER_ERROR: {
                return {...state,
                    loginStatus: {...state.loginStatus ,
                        error: true ,
                        message : action.res.message.password
                    }
                }
        }
        case CHANGE_STATUS: {
            return {...state,
                tasks : state.tasks.map( (task)=>{
                    if(task.id === action.id ){
                        return {...task , status : action.status , text: action.text }
                    }
                    else return task;
                })
            }
        }


        default: return state

    }
}

const setTasks = (res , page ) => ({type: SET_TASKS, res ,page: page});
const addNewTasks = (res) => ({type: ADD_TASKS, res });
const loginUser = (res) => ({type: LOGIN_USER, res });
const getSortTasks = (res,title , sort_direction) => ({type: GET_SORT_TASKS,res ,title: title ,sort_direction });
const loginUserError = (res) => ({type: LOGIN_USER_ERROR, res });
const changeStatusToDo = (res,id ,status, text) => ({type: CHANGE_STATUS, res , id:id , status:status, text: text });


export const getTasksThunkCreator =  (pageN) => {

    return (dispatch) => {
        API.getTasks(pageN)
            .then(res => {
                dispatch(setTasks(res.data.message, pageN));
            });
    };
};

export const sortTasksThunkCreator =  (pageN,title,sort_direction) => {
    return (dispatch) => {
        API.getSortTasks(pageN, title, sort_direction)
            .then(res => { console.log(res.data.message.tasks);

                dispatch(getSortTasks(res.data.message, title, sort_direction));
            });
    };
};

export const addTaskThunkCreator = (username, email, text) => {
    return (dispatch) => {
        API.addNewTask(username, email, text)
            .then(res =>{
                dispatch(addNewTasks(res.data.message))
            })
    }
}

export const loginUserThunkCreator = (username, password) =>{
    return (dispatch)=>{
        API.loginUsers(username, password)
            .then( res => {
                if (res.data.status == 'ok'){
                    dispatch(loginUser(res))
                }

                if (res.data.status == 'error'){
                    dispatch(loginUserError(res.data))
                }

            })
    }
}

export const changeStatusThunkCreator = (id,status,text ,token) =>{
    return (dispatch) => {
        API.changeStatusToDo(id,status,text,token)
            .then(res => {
                if (res.data.status == 'ok'){
                    dispatch(changeStatusToDo(res, id ,status, text))
                }
            }
            )
    }
}

import React from 'react'
import "./Main.module.css";
import ToDoTasksList from "./todoListTasks";
import {NavLink, Route} from "react-router-dom";
import Auth from "./auth";
import {connect} from "react-redux";
import {getTasksThunkCreator} from ".././redux/todoReduser"
import {
    addTaskThunkCreator,
    changeStatusThunkCreator,
    loginUserThunkCreator,
    sortTasksThunkCreator
} from "../redux/todoReduser";

class Main extends React.Component{

    componentDidMount() {
        this.props.getTasks(this.props.page);
    }

    changeStatusToDo = (id,status, text) => {
        this.props.changeStatus(id,status,text,this.props.token)
    }

    sortColum = ( page, title,sort_direction )=>{
        this.props.sortTasks(page ,title, sort_direction);
    }


    render(props) {
        return (
          <div className = {'main'}>
              <div className={'header'}>
                  <NavLink to = '/'> home</NavLink>
                  {this.props.login ? 'hello Admin' : <NavLink to = '/log'> log in</NavLink>}

              </div>
              <div className ={'content'}>
                  <Route exact path ='/'
                         component = {()=><ToDoTasksList
                             changeStatusToDo ={this.changeStatusToDo}
                             isLogin = {this.props.login}
                             addTask ={this.props.addTask}
                             titleElement = {this.props.titleElement}
                             pageNumber = {this.props.page}
                             getTasks = {this.props.getTasks}
                             totalTask = {this.props.total}
                             sortColum = {this.sortColum}
                             tasks = {this.props.tasks}
                         />} />
                  <Route path = "/log"
                         component={()=><Auth
                             login ={this.props.login}
                             loginUser = {this.props.loginUser}
                             loginStatus={this.props.loginStatus}
                  /> } />
              </div>
          </div>
        );
    }
}


let mapStateToProps = (state) => ({
    titleElement: state.todo.titleNameSortField,
    tasks: state.todo.tasks,
    total: state.todo.total_task_count,
    page: state.todo.page,
    sortColum : state.todo.sortNameColum,
    login : state.todo.isLogin,
    loginStatus : state.todo.loginStatus,
    token : state.todo.token
});

let mapDispatchToProps = (dispatch) => ({
    getTasks:  (pageN) => {
        dispatch(getTasksThunkCreator(pageN));
    },
    sortTasks: (pageN,title,sort_direction) =>{
        dispatch(sortTasksThunkCreator(pageN,title,sort_direction));
    },
    addTask : (username,email,text) => {
        dispatch(addTaskThunkCreator(username,email,text))
    },
    loginUser : (username, password)=>{
        dispatch(loginUserThunkCreator(username, password))
    },
    changeStatus : (id , status,text, token) =>{
        dispatch(changeStatusThunkCreator(id,status,text,token))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Main);
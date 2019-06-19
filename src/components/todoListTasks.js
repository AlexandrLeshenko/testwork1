import React from 'react'
import Task from "./todoTask";
import "./Main.module.css";
import PaginationTasks from "./PaginationTasks";
import TitleElement from "./TitleElement";
import FormAddTask from "./FormAddTask";

class ToDoTasksList extends React.Component {

    render() {
        const tasksElements = this.props.tasks.map(tasks =><Task
                changeStatusToDo = {this.props.changeStatusToDo}
                isLogin = {this.props.isLogin}
                name = {tasks.username}
                text = {tasks.text}
                email = {tasks.email}
                status = {tasks.status}
                id = {tasks.id}/>

        )
        const taskHeaderEl = this.props.titleElement.map( titleEl =>(
            <TitleElement title = {titleEl.title}
                          pageNumber = {this.props.pageNumber}
                          isActive = {titleEl.isActive}
                          sort = {titleEl.sort}
                          sortColum = {this.props.sortColum}/>
        ))





        return(
          <div className={'tasks_aria'}>
              <div className={'add_task_conteiner'}>

                  <FormAddTask addTask = {this.props.addTask} />

              </div>


              <div className={'task_header task_conteiner'}>
                  {taskHeaderEl}
              </div>


              {tasksElements}
              <PaginationTasks
                  pageNumber = {this.props.pageNumber}
                  getTasks = {this.props.getTasks}
                  totalTask = {this.props.totalTask}/>
          </div>
        );
    }
}

export default ToDoTasksList;
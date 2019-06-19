import React from 'react'
import AddTask from "./AddTask";

class FormAddTask extends React.Component {

    render() {
        return <AddTask addTask={this.props.addTask} />
    }
}

export default FormAddTask
import React, { Component } from "react";
import TaskTable from "./taskTable";
import TaskDelete from "./taskDelete";
import TaskAdd from "./tasksAdd";
import Addtask from "./tasksAdd";

class TaskPage extends Component {
  state = {
    userAddFile: false,
    deletionList: []
  };

  toggle = () => {
    let currentState = this.state.userAddFile;
    this.setState({ userAddFile: !currentState });
  };

  handleCheck = id => {
    // console.log("The clicked item has ID: ", id);
    let currentState = [...this.state.deletionList];
    if (this.state.deletionList.indexOf(id) < 0) {
      currentState.push(id);
      this.setState({ deletionList: currentState });
    } else {
      let index = this.state.deletionList.indexOf(id);
      currentState.splice(index, 1);
      this.setState({ deletionList: currentState });
    }
  };

  render() {
    return (
      <div>
        {this.state.userAddFile ? (
          <div>
            <Addtask />
          </div>
        ) : (
          <div>
            <TaskTable clickToDelete={id => this.handleCheck(id)} />
            <TaskDelete deletionList={this.state.deletionList} />
          </div>
        )}
        <button onClick={this.toggle}>Add task</button>
      </div>
    );
  }
}

export default TaskPage;

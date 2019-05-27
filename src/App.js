import React from 'react';
import ContentEditable from 'react-contenteditable';

function Task(params) {
  return (
    <li className="tasks__item">
      <span
        className={" tasks__check " + (params.task.done ? " tasks__check--checked " : "")}
        onClick={_ => params.toggleDoneState(params.task)}></span>
      <span
        className="tasks__label"
        onClick={_ => params.previewTask(params.task)}>{params.task.title}</span>
    </li>
  );
}

function Tasks(params) {
  return (
    <div className="tasks col-xs-12 col-md-6">
      <ul className="tasks__list">
        { params.tasks
            .filter(task => !task.done)
            .map(task => <Task task={task} previewTask={params.previewTask} toggleDoneState={params.toggleDoneState} />)
        }
      </ul>

      <ul className="tasks__list tasks__list--done">
          { params.tasks
              .filter(task => task.done)
              .map(task => <Task task={task} previewTask={params.previewTask} toggleDoneState={params.toggleDoneState} />)
          }
      </ul>
    </div>
  );
}

function TopTasks(params) {

}

function Preview(params) {
  if (!params.task) {
    return (
      <div className="preview col-xs-12 col-md-6">
        Click on a task to preview...
      </div>
    )
  }

  return (
    <div className="preview col-xs-12 col-md-6">
      <ContentEditable className="preview__headline"
        html={params.task.title}
        onChange={ev => params.updateTask("title", ev.target.value, params.task)}
        />
      <ContentEditable className="preview__body"
        html={params.task.body}
        onChange={ev => params.updateTask("body", ev.target.value, params.task)}
        />
    </div>
  );
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        this.createTask("dummy Task"),
        this.createTask("another Task")
      ],
      preview: null,
    };
  }

  createTask(title, body) {
    return {
      title: title || "New task" ,
      body: body || "New tasks body",
      done: false,
    }
  }

  addTask() {
    const newTask = this.createTask();
    this.state.tasks.push(newTask);
    this.state.preview = newTask;
    this.forceUpdate();
  }

  toggleDoneState(task) {
    task.done = task.done ? false : true;
    this.forceUpdate();
  }

  previewTask(task) {
    this.state.preview = task;
    this.forceUpdate();
  }

  updateTask(property, newValue, task) {
    console.log("updated");
    task[property] = newValue;
    this.forceUpdate();
  }

  render() {
    return (
      <div className="container">
        <h1 className="hdl-h1 page__title"> List your TODOs </h1>
        <h2 className="hdl-h3 page__subtitle">
          You have {this.state.tasks.length} items in your list
          <button className="btn page__add-button" onClick={_ => this.addTask()} >Add Task</button>
        </h2>
        <div className="row page__content">
          <Tasks
            tasks={this.state.tasks}
            addTask={ _ => this.addTask() }
            previewTask={ task => this.previewTask(task) }
            toggleDoneState={ task => this.toggleDoneState(task)} />
          <Preview
            task={this.state.preview}
            updateTask={(p, n, t) => this.updateTask(p, n, t)}/>
        </div>
      </div>
    );
  }
}

export default Todo;

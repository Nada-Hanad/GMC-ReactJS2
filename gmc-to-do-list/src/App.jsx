import { useState } from "react";
import "./App.css";
import MyButton from "./components/button";
import MyInput from "./components/input";
import TaskItem from "./components/taskItem";

function App() {
  const [tasksList, setTasksList] = useState(["task1", "task2", "task3"]);
  const [inputValue, setInputValue] = useState("");
  function handleClick() {
    setTasksList([inputValue, ...tasksList]);
  }

  return (
    <div className="main">
      <div className="header">
        <MyInput
          inputValue={inputValue}
          setInputValue={setInputValue}
        ></MyInput>
        <MyButton handleClick={handleClick}></MyButton>
      </div>
      <div className="tasks-container">
        {tasksList.map((e, i) => {
          return <TaskItem key={i} task={e}></TaskItem>;
        })}
      </div>
    </div>
  );
}

export default App;

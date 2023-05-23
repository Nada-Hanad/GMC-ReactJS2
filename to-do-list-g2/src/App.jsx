import { useState } from "react";
import "./App.css";
import TaskItem from "./components/taskItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [taskList, setTaskList] = useState(["task1", "task2"]);
  const [inputValue, setInputValue] = useState("");
  const notify = () =>
    toast.error("You can't add an empty task", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  function handleClick() {
    // let newArray = taskList.map((e) => {
    //   return e;
    // });
    // newArray.push(inputValue);
    // setTaskList(newArray);
    if (inputValue === "") {
      notify();
    } else {
      setTaskList([...taskList, inputValue]);
      setInputValue("");
    }
  }
  return (
    <main>
      <header>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />

        <button onClick={handleClick}>Add Task</button>
      </header>
      <div className="tasks-list">
        {taskList.map((e, i) => {
          return <TaskItem task={e} />;
        })}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
}

export default App;

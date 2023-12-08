import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  editSelectedTask,
  filterTasks,
  resetFilters,
} from "../features/task/taskSlice";
import {
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "../utils/helpers";

const AddTask = () => {
  const { taskEditing } = useSelector((state) => state.task);
  const [filtering, setFiltering] = React.useState(true);
  const [value, setValue] = React.useState("");

  const dispatch = useDispatch();
  const handleInput = (e) => {
    setValue(e.target.value);
    console.log(value);
  };

  // add the input field value to the tasks

  const handleCreateNewTask = () => {
    if (/^\s*$/.test(value)) {
      return;
    }
    dispatch(addTask(value));
    setValue("");
  };

  // filter the tasks based on completed/pending

  const handleFilteringTasks = (params) => {
    setFiltering(false);
    let storedTasks = getTasksFromLocalStorage();
    let tempTasks = storedTasks.filter((item) => item.isDone === params);
    dispatch(filterTasks(tempTasks));
  };

  React.useEffect(() => {
    setValue(taskEditing.description || " ");
  }, [taskEditing.id]);

  const saveEditedTask = () => {
    if (/^\s*$/.test(value)) {
      return;
    }

    let storedTasks = getTasksFromLocalStorage();
    console.log(storedTasks);
    let result = storedTasks.map((item) => {
      if (item.id === taskEditing.id) {
        console.log(item);
        item.description = value;
      }
      return item;
    });

    saveTasksToLocalStorage(result);
    dispatch(resetFilters());
    setValue("");
    dispatch(editSelectedTask(""));
  };

  return (
    <di>
      <section className="space-x-6">
        <input
          type="text"
          onChange={handleInput}
          value={value}
          className="border-2 rounded-md px-9 py-1 "
        />
        {filtering || taskEditing ? (
          taskEditing ? (
            <button
              className="00 rounded-md px-2 text-white"
              onClick={saveEditedTask}
            >
              save edit
            </button>
          ) : (
            <button
              onClick={handleCreateNewTask}
              className="bg-blue-500 py-1 rounded-md px-2 text-white hover:bg-gray-800"
            >
              Add Task
            </button>
          )
        ) : null}

        {/* filter post section */}

        <div className="flex gap-3 items-center my-3">
          <p>Filter: </p>
          <button
            onClick={() => {
              dispatch(resetFilters());
              setFiltering(true);
            }}
            className="bg-gray-500 text-white p-1 rounded-md hover:bg-gray-800"
          >
            all
          </button>
          <button
            onClick={() => handleFilteringTasks(false)}
            className="bg-gray-500 text-white p-1 rounded-md hover:bg-gray-800"
          >
            Pending
          </button>

          {/* filter completed tasks */}

          <button
            onClick={() => handleFilteringTasks(true)}
            className="bg-green-500 text-white p-1 rounded-md hover:bg-gray-800"
          >
            Completed
          </button>
        </div>
      </section>
      {/* create post section */}
    </di>
  );
};

export default AddTask;

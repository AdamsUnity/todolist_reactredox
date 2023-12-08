import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";

const ListTask = () => {
  const tasks = useSelector((state) => state.task.userTask);

  return tasks?.length === 0 ? (
    <p>No Task Yet</p>
  ) : (
    <div>
      {tasks?.map((item) => (
        <Task key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ListTask;

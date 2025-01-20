import TaskSummary from "../components/TaskSummary";
import TaskForm from "../components/TaskForm";
import { useState } from "react";
const MyTasks = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const popUpTaskForm = () => {
    setShowForm(true);
  };

  return (
    <>
      {showForm ? (
        <TaskForm setShowForm={setShowForm} />
      ) : (
        <button
          className="bg-lightblue px-20 py-2 rounded-full font-extrabold text-white hover:bg-mediumblue border-solid border-mediumblue border-b-4 border-r-2 hover:border-lightblue"
          onClick={popUpTaskForm}
        >
          Add New Task
        </button>
      )}
      <TaskSummary />
    </>
  );
};

export default MyTasks;

import TaskSummary from "../components/TaskSummary";
import TaskForm from "../components/TaskForm";
const MyTasks = () => {

  return (
    <>
        <TaskForm />
      <TaskSummary isHomepage={false}/>
    </>
  );
};

export default MyTasks;

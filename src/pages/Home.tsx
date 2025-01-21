import TaskSummary from "../components/TaskSummary";

const Home = () => {
  return (
    <div className="home-page flex flex-col items-center justify-center">
      <h1 className="text-lg md:text-xl lg:text-2xl text-navy font-bold">Welcome to the Home Page!</h1>
      <TaskSummary/>
    </div>
  );
};

export default Home;

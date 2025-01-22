import HomepageUserInfo from "../components/HomepageUserInfo";
import TaskSummary from "../components/TaskSummary";

const Home = () => {
  return (
    <>
    <div>
    </div>
      <div className="home-page flex flex-col items-center justify-center">
        <h1 className="text-lg md:text-xl lg:text-2xl text-navy font-bold">Welcome to TailGotchi!</h1>
      <HomepageUserInfo/>
        <TaskSummary isHomepage={true}/>
      </div>
    </>
  );
};

export default Home;

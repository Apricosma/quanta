import AppHeader from "../components/AppHeader";
import Feed from "../components/Feed";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Quanta | Home</title>
      </Helmet>
      <AppHeader />
      <Feed />
    </>
  );
};

export default Home;

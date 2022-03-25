import type { NextPage } from "next";
import { useState } from "react";

const Home:NextPage = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>slide for routing</div>
      <div>list of projects</div>
    </div>
  );
};

export default Home;

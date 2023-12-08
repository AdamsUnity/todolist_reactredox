import { useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import ListTask from "./components/ListTask";

function App() {
  return (
    <>
      <section className="grid place-items-center h-screen">
        <div className="shadow-2xl p-14 rounded-xl">
          <AddTask />
          <ListTask />
        </div>
      </section>
    </>
  );
}

export default App;

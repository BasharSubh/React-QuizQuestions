import React, { useState } from 'react';
import image from "../assist/design_800x600.gif";

function Start(props) {
  const [selectData, setSelectData] = useState({
    difficulty: "",
    questions: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setSelectData(prevSelectData => ({
      ...prevSelectData,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.start();  
    props.getUserSelectionData(selectData)
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      <img className="absolute top-0 left-20 w-80" src={image} alt="" />
      <h1 className="text-4xl text-black font-bold mb-8 mt-8 z-10 relative">Quiz Questions</h1>
      <h2 className="text-3xl text-violet-500 text-center mb-5 z-10 relative">Test your knowledge<br /> and challenging quiz questions!</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <select
          className="p-2 text-lg border border-gray-300 rounded-md w-30 focus:outline-none mb-3"
          id="difficulty"
          value={selectData.difficulty}
          onChange={handleChange}
          name="difficulty"
        >
          <option value="" disabled selected hidden>Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select
          className="p-2 text-lg border border-gray-300 rounded-md w-50 focus:outline-none mb-3"
          id="questions"
          value={selectData.questions}
          onChange={handleChange}
          name="questions"
        >
          <option value="" disabled selected hidden>Number of Questions</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>

        <button
          className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-xl shadow-lg hover:bg-red-600 transition-colors duration-300 z-10 relative"

        >
          Start Quiz
        </button>
      </form>

      <img className="absolute bottom-20 right-20 w-80 lg:block hidden" src={image} alt="" />
    </div>
  );
}

export default Start;

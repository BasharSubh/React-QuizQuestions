import React, { useState} from 'react';
import Start from "./components/Start";
import Quiz from "./components/Quiz";

function App() {
  const [start, setStart] = useState(false)
  const [userSelection, setUserSelection] = useState()

  function getUserSelectionData(data) {
    setUserSelection(data)
  }

  return (
    <>
      <div className="flex justify-center items-start h-screen">
        <div className="container bg-white rounded-md p-1 border-2">
          {start && <Quiz difficulty={userSelection.difficulty} questions={userSelection.questions} />}
          {!start && <Start start={() => setStart(true)} getUserSelectionData={getUserSelectionData} />}
        </div>
      </div>
    </>
  )
}

export default App

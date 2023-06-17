import React, { useState, useEffect } from 'react';
import { decode } from 'html-entities';
import loadingGif from "../assist/loading-gif.gif"

function Quiz(props) {
  const [startQuiz, setStartQuiz] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${props.questions === null ? props.questions : 5}&category=18&type=multiple&difficulty=${props.difficulty === null ? "easy" : props.difficulty}`
        );
        const data = await response.json();
        if (response.ok) {
          const correctAnswers = data.results.map((c) => c.correct_answer);
          const incorrectAnswers = data.results.map((w) => w.incorrect_answers);
  
          const answers = incorrectAnswers.map((answers, index) => {
            const incorrectOptions = answers.map((answer) => ({
              answer,
              selected: false,
            }));
            const correctOption = {
              answer: correctAnswers[index],
              correct: true,
              selected: false,
            };
            // Combine correct and incorrect options
            const allOptions = [correctOption, ...incorrectOptions];
            // Shuffle the options
            const shuffledOptions = shuffleArray(allOptions);
            return shuffledOptions;
          });
  
          const updatedData = data.results.map((quiz, index) => ({
            ...quiz,
            answers: answers[index],
          }));
  
          setData(updatedData);
          setIsLoading(false);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const shuffleArray = (array) => {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    };
  
    fetchData();
  }, [startQuiz]);
  

  function handleAnswerClick(quizIndex, optionIndex) {
    if (!showResult) {
      setData((prevData) => {
        return prevData.map((quiz, index) => {
          if (index === quizIndex) {
            return {
              ...quiz,
              answers: quiz.answers.map((option, currentIndex) => {
                if (currentIndex === optionIndex) {
                  return {
                    ...option,
                    selected: true,
                  };
                } else {
                  return {
                    ...option,
                    selected: false,
                  };
                }
              }),
            };
          }
          return quiz;
        });
      });
    }
  }

  const countCorrectAnswer = data.reduce((count, quiz) => {
    return (
      count +
      quiz.answers.reduce((innerCount, option) => {
        if (option.selected && option.correct) {
          return innerCount + 1;
        }
        return innerCount;
      }, 0)
    );
  }, 0);
  
  const countInCorrectAnswer = data.reduce((count, quiz) => {
    return (
      count +
      quiz.answers.reduce((innerCount, option) => {
        if (option.selected && !option.correct) {
          return innerCount + 1;
        }
        return innerCount;
      }, 0)
    );
  }, 0);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen text-9xl"><img src={loadingGif} alt='/' /></div>
      ) : (
        <>
          {data.map((quiz, quizIndex) => {
            return (
              <div key={quizIndex}>
                <div className="font-bold p-2">
                  <div className="bg-gray-100 text-lg font-bold py-2 px-4 rounded-md text-center">
                    {decode(quiz.question)}
                  </div>
                </div>
                <div className="justify-around p-2 sm:flex">
                  {quiz.answers.map((answer, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`rounded-xl bg-gray-50 hover:bg-gray-100 h-auto flex justify-center items-center border-2 border-violet-900 text-l py-1 px-2 m-2 cursor-pointer ${
                        answer.selected && showResult && !answer.correct
                          ? "bg-red-300 hover:bg-red-400"
                          : answer.correct && showResult
                          ? "bg-green-800 hover:bg-green-800 text-white"
                          : answer.selected
                          ? "bg-green-300 hover:bg-green-400"
                          : ""
                      }`}
                      onClick={() => {
                        handleAnswerClick(quizIndex, optionIndex);
                      }}
                    >
                      {decode(answer.answer)}
                    </div>
                  ))}
                </div>
                <hr className="m-2 font-bold border-2 border-gray-200 w-70" />
              </div>
            );
          })}
          <div className="flex items-center justify-center border p-2 border-blue-500 rounded-xl text-lg">
            {!showResult && (
              <button
                onClick={() => setShowResult(true)}
                className="bg-violet-600 px-5 py-2 rounded-xl text-white font-bold"
              >
                Check Result
              </button>
            )}
            {showResult && (
              <p className="bg-gray-300 px-4 py-2 rounded-md">
                You Have{" "}
                <span className="font-bold p-2 bg-gray-500 w-3 h-3 rounded-full">
                  {countCorrectAnswer}
                </span>{" "}
                Correct Answer and{" "}
                <span className="font-bold p-2 bg-red-500 w-3 h-3 rounded-full">
                  {countInCorrectAnswer}
                </span>{" "}
                Wrong
              </p>
            )}
            {showResult && (
              <button
                onClick={() => {
                  setShowResult(false);
                  setStartQuiz((start) => !start);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-violet-600 px-5 py-2 rounded-xl text-white font-bold ml-2"
              >
                Play Again
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
  
}

export default Quiz;
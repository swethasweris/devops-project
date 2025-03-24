import React, { useState } from "react";
import { questions } from "../data/Questions";
import { FaRedo } from "react-icons/fa";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
      }
    }, 800);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        {quizCompleted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold">Quiz Completed!</h2>
            <p className="mt-2 text-lg">Your Score: {score} / {questions.length}</p>
            <button
              onClick={restartQuiz}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center"
            >
              <FaRedo className="mr-2" /> Restart Quiz
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">
              {questions[currentQuestion].question}
            </h2>
            <div className="flex flex-col">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`mt-2 p-2 rounded text-white ${
                    selectedAnswer === option
                      ? option === questions[currentQuestion].answer
                        ? "bg-green-500"
                        : "bg-red-500"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;

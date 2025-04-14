import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DemoQuizView = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [totalTime] = useState(600); // 10 minutes total
  const [elapsedTime, setElapsedTime] = useState(0);
  const [category, setCategory] = useState('traffic_rules');

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isFinished && timeLeft > 0 && currentQuestion < questions.length) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            if (currentQuestion < questions.length - 1) {
              setCurrentQuestion(prev => prev + 1);
              return 60;
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentQuestion, questions.length, timeLeft, isFinished]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://quizapi.io/api/v1/questions', {
        params: {
          apiKey: 'CxCAWrzdRnTLlyBju4nGk48XTPFGyLvRVSB5tZjv',
          limit: 10,
          category: 'Linux',
          difficulty: 'easy'
        }
      });
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateResults = () => {
    let correctCount = 0;
    questions.forEach(question => {
      const selectedAnswer = selectedAnswers[question.id];
      if (selectedAnswer) {
        const correctAnswerKey = Object.keys(question.correct_answers)
          .find(key => question.correct_answers[key] === "true");
        if (correctAnswerKey === `answer_${selectedAnswer}_correct`) {
          correctCount++;
        }
      }
    });
    setScore(correctCount);
    setIsFinished(true);
  };

  const formatTotalTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading questions...</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">No questions available</div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Test Results</h2>
          <div className="space-y-4">
            <p className="text-lg">Total Questions: {questions.length}</p>
            <p className="text-lg">Correct Answers: {score}</p>
            <p className="text-lg">Score: {((score / questions.length) * 100).toFixed(2)}%</p>
            <p className="text-lg">Time Taken: {formatTotalTime(elapsedTime)}</p>
            {((score / questions.length) * 100) >= 70 ? (
              <div>
                <p className="text-green-600 font-semibold">Congratulations! You have passed the test successfully.</p>
                <p className="text-sm text-gray-600 mt-2">Your knowledge is sufficient</p>
              </div>
            ) : (
              <div>
                <p className="text-red-600 font-semibold">Sorry, you did not pass the test.</p>
                <p className="text-sm text-gray-600 mt-2">Please try again</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Test Progress</span>
            <span className="text-sm font-medium text-gray-700">{getProgressPercentage()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        {/* Test info header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Question {currentQuestion + 1} / {questions.length}</h3>
            <p className="text-sm text-gray-500">Category: {category}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className={`font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-700'}`}>
              Time Left: {timeLeft}s
            </span>
            <span className="text-sm text-gray-500">
              Total Time: {formatTotalTime(elapsedTime)}
            </span>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {currentQuestionData.question}
          </h2>
          {currentQuestionData.explanation && (
            <p className="text-gray-600 text-sm mb-4">{currentQuestionData.explanation}</p>
          )}
        </div>

        <div className="space-y-3">
          {Object.entries(currentQuestionData.answers || {})
            .filter(([_, value]) => value !== null)
            .map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleAnswerSelect(currentQuestionData.id, key)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestionData.id] === key
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white hover:bg-gray-50 border-gray-200'
                }`}
              >
                {value}
              </button>
            ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
          >
            Previous
          </button>
          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={calculateResults}
              className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Finish Test
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={!selectedAnswers[currentQuestionData.id]}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-700 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoQuizView;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DemoQuizView = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds = 1 minute

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    // Reset timer when moving to a new question
    setTimeLeft(60);

    // Start countdown
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // Move to next question when time is up
          if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup timer on unmount or when question changes
    return () => clearInterval(timer);
  }, [currentQuestion, questions.length]);

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

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className={`font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-700'}`}>
            Time left: {timeLeft}s
          </span>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">
          {currentQuestionData.question}
        </h2>

        <div className="space-y-3">
          {Object.entries(currentQuestionData.answers || {})
            .filter(([_, value]) => value !== null)
            .map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleAnswerSelect(currentQuestionData.id, key)}
                className={`w-full text-left p-3 rounded ${
                  selectedAnswers[currentQuestionData.id] === key
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {value}
              </button>
            ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
            disabled={currentQuestion === questions.length - 1}
            className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoQuizView;

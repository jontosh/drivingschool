import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const API_KEY = "CxCAWrzdRnTLlyBju4nGk48XTPFGyLvRVSB5tZjv";

const Test = () => {
  const { studentId, testId } = useParams();
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://quizapi.io/api/v1/questions', {
          params: {
            apiKey: API_KEY,
            limit: 10,
            category: 'Linux',
            difficulty: 'easy'
          }
        });
        
        setQuestions(response.data);
        setLoading(false);
      } catch (err) {
        message.error("Failed to load test questions");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (!isSubmitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const handleSubmit = () => {
    let correctCount = 0;
    
    Object.entries(answers).forEach(([questionId, selectedAnswer]) => {
      const question = questions.find(q => q.id.toString() === questionId);
      if (question) {
        const correctAnswerKey = Object.keys(question.correct_answers)
          .find(key => question.correct_answers[key] === "true");
        
        if (correctAnswerKey === `answer_${selectedAnswer}_correct`) {
          correctCount++;
        }
      }
    });
    
    setScore(correctCount);
    setIsSubmitted(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="bg-white p-5 rounded-xl">
        <div className="text-center py-8">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          <h2 className="text-2xl font-bold mt-4">Loading test...</h2>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="bg-white p-5 rounded-xl">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Test Results</h2>
          <p className="text-xl">Your score: {score}/{questions.length}</p>
          <p className="text-lg mt-2">
            Percentage: {((score / questions.length) * 100).toFixed(1)}%
          </p>
          <div className="mt-6">
            {((score / questions.length) * 100) >= 70 ? (
              <p className="text-green-600 font-semibold">Congratulations! You have passed the test successfully.</p>
            ) : (
              <p className="text-red-600 font-semibold">Sorry, you did not pass the test. Please try again.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Linux Test</h2>
          <p className="text-gray-600 mt-1">Total questions: {questions.length}</p>
        </div>
        <div className="text-xl font-semibold text-indigo-600">
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold mb-3">
              {index + 1}. {question.question}
            </p>
            {question.description && (
              <p className="text-gray-600 mb-3 text-sm">{question.description}</p>
            )}
            <div className="ml-4 space-y-2">
              {Object.entries(question.answers)
                .filter(([_, value]) => value !== null)
                .map(([key, value], optionIndex) => {
                  const answerLetter = key.split('_')[1];
                  return (
                    <div key={key} className="flex items-center">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        id={`question-${question.id}-${key}`}
                        className="mr-2"
                        onChange={() => setAnswers({...answers, [question.id]: answerLetter})}
                        checked={answers[question.id] === answerLetter}
                      />
                      <label htmlFor={`question-${question.id}-${key}`}>
                        {value}
                      </label>
                    </div>
                  );
              })}
            </div>
            {question.explanation && answers[question.id] && (
              <p className="text-gray-600 mt-3 text-sm border-t pt-2">{question.explanation}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button 
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default Test;

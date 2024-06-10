import { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css"

function App() {
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [error, setError] = useState(null);
  const [val, setVal] = useState(1)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionsResponse = await axios.get('http://localhost:3000/api/questions');
        const optionsResponse = await axios.get('http://localhost:3000/api/options');

        setQuestions(questionsResponse.data);
        setOptions(optionsResponse.data);

        const firstQuestion = questionsResponse.data.find(q => q.depends_on === null);
        if (firstQuestion) {
          setCurrentQuestions([firstQuestion]);
          setCurrentOptions(optionsResponse.data.filter(option => option.question_id === firstQuestion.id));
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const handleAnswer = (optionNumber, questionId) => {


    const nextQuestions = questions.filter(
      question =>
        question.depends_on === questionId &&
        question.depends_on_option === optionNumber
    );

    if (nextQuestions.length > 0) {
      setCurrentQuestions(nextQuestions);
      setCurrentOptions(options.filter(option => nextQuestions.some(q => q.id === option.question_id)));
    } else {
      setCurrentQuestions([]);
    }
  };

  const handleSubmit = () => {

    axios.post('http://localhost:3000/api/responses', { responses })
      .then(response => {
        console.log('Response stored successfully:', response);
      })
      .catch(error => {
        console.error('Error storing response:', error);
      });

  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (currentQuestions.length === 0) {
    return <div id='lastMsg'>Thank you for completing the survey!</div>;
  }

  return (
    <div>
      <h1>Survey Questions</h1>
      <div className="container">
        {currentQuestions.map(currentQuestion => (
          <div key={currentQuestion.id}>
            <p>{currentQuestion.text}</p>
            <ul>
              {currentOptions
                .filter(option => option.question_id === currentQuestion.id)
                .map(option => (
                  <li key={option.id}>
                    <input
                      type='radio'
                      name={`option-${option.question_id}`} // Include question ID in name attribute
                      value={option.text}
                      onClick={() => {
                        const newResponses = [...responses, { user_id: 1, question_id: option.question_id, option_number: option.option_number }];
                        setResponses(newResponses);
                        if (option.question_id != 2 && option.question_id != 4) {
                          // console.log(responses)
                          setSelectedOption({ optionNumber: option.option_number, questionId: option.question_id });
                          // console.log({optionNumber: option.option_number, questionId: option.question_id})
                        }
                      }}
                      required
                    />
                    <label htmlFor={option.text}>{option.text}</label>
                  </li>
                ))}
            </ul>
          </div>
        ))}
        {(val != 3) ? <button onClick={() => { handleAnswer(selectedOption.optionNumber, selectedOption.questionId); setVal(val + 1); }}>
          Submit
        </button> : <button onClick={() => {
          handleSubmit();
          handleAnswer(selectedOption.optionNumber, selectedOption.questionId);
        }}>Submit your responses</button>}
      </div>
    </div>
  );
}

export default App;
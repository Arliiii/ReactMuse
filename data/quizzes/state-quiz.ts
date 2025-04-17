import { QuizQuestion } from '@/types/quiz';

export const stateQuiz: QuizQuestion[] = [
  {
    id: 'state-q1',
    type: 'multiple-choice',
    topicId: 'state',
    difficulty: 'beginner',
    points: 10,
    question: 'What is React state used for?',
    options: [
      'Passing data between components',
      'Storing data that may change over time and affects rendering',
      'Defining the structure of a component',
      'Handling HTTP requests'
    ],
    correctAnswer: 1,
    explanation: 'State is used to store data that may change over time and affects the component\'s rendering. When state changes, React re-renders the component to reflect those changes.'
  },
  {
    id: 'state-q2',
    type: 'multiple-choice',
    topicId: 'state',
    difficulty: 'beginner',
    points: 10,
    question: 'Which hook is used to add state to a functional component?',
    options: [
      'useEffect',
      'useContext',
      'useState',
      'useReducer'
    ],
    correctAnswer: 2,
    explanation: 'The useState hook is used to add state to functional components. It returns the current state value and a function to update it.'
  },
  {
    id: 'state-q3',
    type: 'code-completion',
    topicId: 'state',
    difficulty: 'intermediate',
    points: 15,
    question: 'Complete the code to update state based on previous state:',
    code: `function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    // Update based on previous state
    setCount(_____ => _____ + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}`,
    correctAnswer: 'prevCount,prevCount',
    explanation: 'When updating state based on its previous value, you should use the functional form of the state setter. This ensures you\'re working with the most current state value, especially for multiple updates that may be batched together.'
  },
  {
    id: 'state-q4',
    type: 'bug-fix',
    topicId: 'state',
    difficulty: 'intermediate',
    points: 20,
    question: 'Fix the bug in this component that uses state:',
    code: `function TodoList() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    setTodos(todos);
  };
  
  return (
    <div>
      <button onClick={() => addTodo("New Todo")}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}`,
    correctAnswer: `function TodoList() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };
  
  return (
    <div>
      <button onClick={() => addTodo("New Todo")}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}`,
    explanation: 'The bug is that the component is directly modifying the state array with push() and then setting the same array reference. React won\'t detect this change because the reference is the same. Instead, create a new array with the spread operator and add the new item.'
  },
  {
    id: 'state-q5',
    type: 'multiple-choice',
    topicId: 'state',
    difficulty: 'advanced',
    points: 25,
    question: 'When should you use useReducer instead of useState?',
    options: [
      'When you need to update state more frequently',
      'When state updates depend on props',
      'When you have complex state logic that involves multiple sub-values or when the next state depends on the previous one',
      'When you need to share state between components'
    ],
    correctAnswer: 2,
    explanation: 'useReducer is preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. It helps organize state updates through actions and reducers, similar to how Redux works.'
  }
];
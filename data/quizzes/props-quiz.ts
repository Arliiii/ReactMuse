import { QuizQuestion } from '@/types/quiz';

export const propsQuiz: QuizQuestion[] = [
  {
    id: 'props-q1',
    type: 'multiple-choice',
    topicId: 'props',
    difficulty: 'beginner',
    points: 10,
    question: 'What is the main purpose of props in React?',
    options: [
      'To maintain internal component state',
      'To pass data from parent to child components',
      'To handle events within a component',
      'To define component lifecycle methods'
    ],
    correctAnswer: 1,
    explanation: 'Props (short for properties) are used to pass data from parent to child components. They allow components to be configurable and reusable.'
  },
  {
    id: 'props-q2',
    type: 'multiple-choice',
    topicId: 'props',
    difficulty: 'beginner',
    points: 10,
    question: 'Which statement about props is NOT true?',
    options: [
      'Props are read-only',
      'Props can be modified by the child component',
      'Props can be of any data type',
      'Default props can be specified'
    ],
    correctAnswer: 1,
    explanation: 'Props are read-only and should not be modified by the receiving component. This is a fundamental principle in React that helps maintain the unidirectional data flow.'
  },
  {
    id: 'props-q3',
    type: 'code-completion',
    topicId: 'props',
    difficulty: 'intermediate',
    points: 15,
    question: 'Complete the code to define default props for a functional component:',
    code: `function Button({ text, onClick, type }) {
  return (
    <button 
      onClick={onClick}
      className={\`btn btn-\${type}\`}
    >
      {text}
    </button>
  );
}

Button._____ = {
  text: 'Click Me',
  type: 'primary'
};`,
    correctAnswer: 'defaultProps',
    explanation: 'defaultProps is used to define default values for props when they are not provided by the parent component. This ensures the component works even when some props are missing.'
  },
  {
    id: 'props-q4',
    type: 'bug-fix',
    topicId: 'props',
    difficulty: 'intermediate',
    points: 20,
    question: 'Fix the bug in this component that uses props:',
    code: `function ProfileCard(props) {
  props.user.name = props.user.name.toUpperCase();
  
  return (
    <div className="card">
      <h2>{props.user.name}</h2>
      <p>{props.user.bio}</p>
      {props.showContact && (
        <button onClick={props.onContact}>Contact</button>
      )}
    </div>
  );
}`,
    correctAnswer: `function ProfileCard(props) {
  const userName = props.user.name.toUpperCase();
  
  return (
    <div className="card">
      <h2>{userName}</h2>
      <p>{props.user.bio}</p>
      {props.showContact && (
        <button onClick={props.onContact}>Contact</button>
      )}
    </div>
  );
}`,
    explanation: 'The bug is that the component is directly modifying the props (props.user.name). Props should be treated as read-only. Instead, create a local variable to store the transformed value.'
  },
  {
    id: 'props-q5',
    type: 'multiple-choice',
    topicId: 'props',
    difficulty: 'advanced',
    points: 25,
    question: 'What is the purpose of the "children" prop in React?',
    options: [
      'To access child components\' state',
      'To render nested components or elements passed between component tags',
      'To define child routes in React Router',
      'To create parent-child relationships between components'
    ],
    correctAnswer: 1,
    explanation: 'The "children" prop is a special prop that contains any elements included between the opening and closing tags of a component. It allows for component composition and creating wrapper components that don\'t need to know what they\'re wrapping.'
  }
];
import { QuizQuestion } from '@/types/quiz';

export const componentsQuiz: QuizQuestion[] = [
  {
    id: 'components-q1',
    type: 'multiple-choice',
    topicId: 'components',
    difficulty: 'beginner',
    points: 10,
    question: 'Which of the following is NOT a valid way to define a React component?',
    options: [
      'Function declaration: function MyComponent() { }',
      'Arrow function: const MyComponent = () => { }',
      'Class component: class MyComponent extends React.Component { }',
      'Object literal: const MyComponent = { render() { } }'
    ],
    correctAnswer: 3,
    explanation: 'React components can be defined as function declarations, arrow functions, or classes that extend React.Component. Object literals with a render method are not valid React components.'
  },
  {
    id: 'components-q2',
    type: 'multiple-choice',
    topicId: 'components',
    difficulty: 'beginner',
    points: 10,
    question: 'What is the minimum requirement for a functional component to be valid?',
    options: [
      'It must include a render method',
      'It must return JSX or null',
      'It must have a props parameter',
      'It must include at least one hook'
    ],
    correctAnswer: 1,
    explanation: 'A functional component must return JSX (or null, a boolean, or another React element). It doesn\'t need to have a render method (that\'s for class components), doesn\'t require props, and doesn\'t need to use hooks.'
  },
  {
    id: 'components-q3',
    type: 'code-completion',
    topicId: 'components',
    difficulty: 'intermediate',
    points: 15,
    question: 'Complete the class component with a state and event handler:',
    code: `class Counter extends React.Component {
  constructor(props) {
    super(props);
    this._____ = {
      count: 0
    };
  }

  increment = () => {
    this._____({
      count: this.state.count + 1
    });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this._____}>Increment</button>
      </div>
    );
  }
}`,
    correctAnswer: 'state,setState,increment',
    explanation: 'In a class component, state is initialized in the constructor, updated using setState, and event handlers are referenced in JSX using this.handlerName.'
  },
  {
    id: 'components-q4',
    type: 'bug-fix',
    topicId: 'components',
    difficulty: 'intermediate',
    points: 20,
    question: 'Fix the bug in this functional component:',
    code: `function UserProfile({ user }) {
  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
    )
  }
  
  return (
    <div>
      <h1>No user found</h1>
      <button onClick={fetchUser()}>Load User</button>
    </div>
  )
}`,
    correctAnswer: `function UserProfile({ user }) {
  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
    )
  }
  
  return (
    <div>
      <h1>No user found</h1>
      <button onClick={() => fetchUser()}>Load User</button>
    </div>
  )
}`,
    explanation: 'The bug is in the onClick handler. Using fetchUser() directly will call the function immediately when rendering, not when the button is clicked. It should be wrapped in an arrow function: onClick={() => fetchUser()}.'
  },
  {
    id: 'components-q5',
    type: 'multiple-choice',
    topicId: 'components',
    difficulty: 'advanced',
    points: 25,
    question: 'What is the purpose of the "key" prop when rendering lists of components?',
    options: [
      'It\'s required for all components as a unique identifier',
      'It helps React identify which items have changed, been added, or removed',
      'It sets the tab order for keyboard navigation',
      'It determines the rendering order of components'
    ],
    correctAnswer: 1,
    explanation: 'The "key" prop is a special attribute that helps React identify which items in a list have changed, been added, or removed. It should be a unique identifier, typically from your data (like an ID), and is crucial for optimizing rendering performance when working with lists.'
  }
];
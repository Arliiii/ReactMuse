import { QuizQuestion } from '@/types/quiz';

export const jsxQuiz: QuizQuestion[] = [
  {
    id: 'jsx-q1',
    type: 'multiple-choice',
    topicId: 'jsx',
    difficulty: 'beginner',
    points: 10,
    question: 'What does JSX stand for?',
    options: [
      'JavaScript XML',
      'JavaScript Extension',
      'JavaScript Syntax',
      'JavaScript eXecution'
    ],
    correctAnswer: 0,
    explanation: 'JSX stands for JavaScript XML. It is a syntax extension for JavaScript that looks similar to HTML and allows you to write HTML-like code in your JavaScript files.'
  },
  {
    id: 'jsx-q2',
    type: 'multiple-choice',
    topicId: 'jsx',
    difficulty: 'beginner',
    points: 10,
    question: 'Which of the following is a valid JSX expression?',
    options: [
      '<div class="container">Hello</div>',
      '<div className="container">Hello</div>',
      '<div class-name="container">Hello</div>',
      '<div class:name="container">Hello</div>'
    ],
    correctAnswer: 1,
    explanation: 'In JSX, HTML attributes are written in camelCase. So instead of "class" (which is a reserved keyword in JavaScript), we use "className".'
  },
  {
    id: 'jsx-q3',
    type: 'code-completion',
    topicId: 'jsx',
    difficulty: 'intermediate',
    points: 15,
    question: 'Complete the JSX code to render a list of items from an array:',
    code: `function ItemList({ items }) {
  return (
    <ul>
      {items.___((item, index) => (
        <li _____={index}>{item.name}</li>
      ))}
    </ul>
  );
}`,
    correctAnswer: 'map,key',
    explanation: 'When rendering lists in JSX, we use the map() method to iterate over arrays. Each list item should have a unique "key" prop to help React identify which items have changed.'
  },
  {
    id: 'jsx-q4',
    type: 'bug-fix',
    topicId: 'jsx',
    difficulty: 'intermediate',
    points: 20,
    question: 'Fix the bug in this JSX code:',
    code: `function Greeting(props) {
  const { isLoggedIn } = props;
  
  return (
    <div>
      { isLoggedIn && <h1>Welcome back!</h1> }
      { !isLoggedIn && <h1>Please sign in</h1> }
      { isLoggedIn && logUserActivity() }
    </div>
  );
}`,
    correctAnswer: `function Greeting(props) {
  const { isLoggedIn } = props;
  
  return (
    <div>
      { isLoggedIn && <h1>Welcome back!</h1> }
      { !isLoggedIn && <h1>Please sign in</h1> }
      { isLoggedIn ? logUserActivity() : null }
    </div>
  );
}`,
    explanation: 'The bug is in the last line. Using the && operator with a function call will always execute the function regardless of the condition (because the function returns a value that gets rendered). We should use a ternary operator or move the function call outside the JSX.'
  },
  {
    id: 'jsx-q5',
    type: 'multiple-choice',
    topicId: 'jsx',
    difficulty: 'advanced',
    points: 25,
    question: 'What happens when you return multiple elements from a component without wrapping them?',
    options: [
      'React will automatically wrap them in a div',
      'It will cause a syntax error',
      'Only the first element will be rendered',
      'They will be rendered as siblings'
    ],
    correctAnswer: 1,
    explanation: 'JSX expressions must have one parent element. Without wrapping multiple elements, you\'ll get a syntax error. You can use a fragment (<> </> or <React.Fragment>) to group elements without adding an extra node to the DOM.'
  }
];
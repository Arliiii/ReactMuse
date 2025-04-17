import { TopicDetail } from '@/types/learning';

export const jsxDetails: TopicDetail = {
  id: 'jsx',
  title: 'JSX',
  definition: 'JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML and allows you to write HTML-like code in your JavaScript files.',
  keyPoints: [
    'JSX produces React "elements" that are rendered to the DOM',
    'JSX expressions can include JavaScript within curly braces {}',
    'JSX attributes use camelCase naming convention',
    'JSX must be transpiled to JavaScript before running in browsers',
    'Each JSX element must be closed (self-closing or with closing tag)'
  ],
  codeExamples: [
    {
      title: 'Basic JSX Syntax',
      code: `// JSX Element
const element = <h1>Hello, world!</h1>;

// JSX with JavaScript expressions
const name = "React Learner";
const greeting = <h1>Hello, {name}!</h1>;

// JSX with attributes
const link = <a href="https://reactjs.org">React Website</a>;

// Self-closing tags
const image = <img src="logo.png" alt="Logo" />;`,
      explanation: 'This example shows basic JSX syntax including elements, expressions in curly braces, attributes, and self-closing tags.'
    },
    {
      title: 'JSX with Conditional Rendering',
      code: `// Conditional rendering with ternary operator
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn 
        ? <h1>Welcome back!</h1> 
        : <h1>Please sign in</h1>
      }
    </div>
  );
}

// Conditional rendering with && operator
function Notification({ hasMessages }) {
  return (
    <div>
      {hasMessages && <p>You have unread messages</p>}
    </div>
  );
}`,
      explanation: 'JSX allows for conditional rendering using JavaScript expressions. The ternary operator (? :) can render different elements based on a condition, while the && operator can conditionally render an element when a condition is true.'
    },
    {
      title: 'JSX Lists and Keys',
      code: `// Rendering lists in JSX
function TodoList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

// Usage
const todos = [
  { id: 1, text: 'Learn JSX' },
  { id: 2, text: 'Build components' },
  { id: 3, text: 'Master React' }
];

<TodoList items={todos} />`,
      explanation: 'When rendering lists in JSX, each item should have a unique "key" prop to help React identify which items have changed. The key should be a stable identifier, typically an ID from your data.'
    }
  ],
  furtherReading: [
    'React Docs: Introducing JSX',
    'React Docs: JSX In Depth',
    'Babel: JSX Transform'
  ]
};
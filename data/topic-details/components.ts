import { TopicDetail } from '@/types/learning';

export const componentsDetails: TopicDetail = {
  id: 'components',
  title: 'Components',
  definition: 'Components are reusable, self-contained pieces of code that return React elements describing what should appear on the screen.',
  keyPoints: [
    'Components can be defined as functions or classes',
    'Function components are simpler and now support all features with Hooks',
    'Components can be composed together to build complex UIs',
    'Components should follow the Single Responsibility Principle',
    'Component names must start with a capital letter in JSX'
  ],
  codeExamples: [
    {
      title: 'Function Component',
      code: `// Simple function component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Arrow function component with destructuring
const Profile = ({ username, bio }) => (
  <div>
    <h2>{username}</h2>
    <p>{bio}</p>
  </div>
);

// Usage
<Welcome name="Sara" />
<Profile username="reactdev" bio="I love building UIs!" />`,
      explanation: 'Function components are the simplest way to define a component. They accept props as an argument and return React elements. With the introduction of Hooks, function components can now use all React features.'
    },
    {
      title: 'Class Component',
      code: `// Class component
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.increment = this.increment.bind(this);
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

// Usage
<Counter />`,
      explanation: 'Class components extend from React.Component and have additional features like local state and lifecycle methods. While still supported, function components with Hooks are now preferred for new code.'
    },
    {
      title: 'Component Composition',
      code: `// Button component
function Button({ onClick, children }) {
  return (
    <button 
      onClick={onClick}
      className="primary-button"
    >
      {children}
    </button>
  );
}

// Card component
function Card({ title, children }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Composing components together
function FeatureCard({ feature, onActivate }) {
  return (
    <Card title={feature.title}>
      <p>{feature.description}</p>
      <Button onClick={onActivate}>
        Activate {feature.name}
      </Button>
    </Card>
  );
}`,
      explanation: 'Component composition is a powerful pattern in React. By creating small, focused components and combining them, you can build complex UIs while keeping your code maintainable. The children prop allows components to be nested inside each other.'
    }
  ],
  furtherReading: [
    'React Docs: Components and Props',
    'React Docs: Composition vs Inheritance',
    'React Patterns: Component Composition'
  ]
};
import { TopicDetail } from '@/types/learning';

export const stateDetails: TopicDetail = {
  id: 'state',
  title: 'State',
  definition: "State is a JavaScript object that stores data that may change over time and affects the component's rendering and behavior.",
  keyPoints: [
    'State should be considered private to the component',
    'State updates may be asynchronous',
    'State updates are merged (in class components)',
    'State should be lifted up when needed by multiple components',
    'Avoid redundant state that can be computed from props or other state'
  ],
  codeExamples: [
    {
      title: 'State in Class Components',
      code: `// Class component with state
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      lastClicked: null
    };
  }

  increment = () => {
    // Wrong: Direct state mutation
    // this.state.count += 1;
    
    // Correct: Using setState
    this.setState({
      count: this.state.count + 1,
      lastClicked: new Date()
    });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        {this.state.lastClicked && (
          <p>Last clicked: {this.state.lastClicked.toString()}</p>
        )}
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}`,
      explanation: 'In class components, state is initialized in the constructor and updated using the setState method. Never modify state directly, as it won\'t trigger re-renders and can lead to bugs.'
    },
    {
      title: 'State with Functional Updates',
      code: `// Using setState with a function
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    // Using a function to update based on previous state
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  }

  incrementMultiple = () => {
    // These will batch into a single update
    this.increment();
    this.increment();
    this.increment();
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.incrementMultiple}>+3</button>
      </div>
    );
  }
}`,
      explanation: 'When updating state based on the previous state, use the functional form of setState. This ensures you\'re working with the most current state value, especially for multiple updates that may be batched together.'
    },
    {
      title: 'State with Hooks (useState)',
      code: `// Functional component with useState hook
import React, { useState } from 'react';

function Counter() {
  // Initialize state with useState hook
  const [count, setCount] = useState(0);
  const [lastClicked, setLastClicked] = useState(null);

  const increment = () => {
    setCount(count + 1);
    setLastClicked(new Date());
  };

  // Using functional updates with useState
  const incrementSafely = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      {lastClicked && <p>Last clicked: {lastClicked.toString()}</p>}
      <button onClick={increment}>Increment</button>
      <button onClick={incrementSafely}>Increment Safely</button>
    </div>
  );
}`,
      explanation: 'In functional components, the useState hook provides state capabilities. It returns the current state value and a function to update it. Like with class components, you can use functional updates when the new state depends on the previous state.'
    }
  ],
  furtherReading: [
    'React Docs: State and Lifecycle',
    'React Docs: Using the State Hook',
    'React Docs: Lifting State Up'
  ]
};
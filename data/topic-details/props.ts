import { TopicDetail } from '@/types/learning';

export const propsDetails: TopicDetail = {
  id: 'props',
  title: 'Props',
  definition: 'Props (short for properties) are a way of passing data from parent to child components, allowing components to be configurable and reusable.',
  keyPoints: [
    'Props are read-only and should not be modified by the receiving component',
    'Props can be any JavaScript value: strings, numbers, objects, functions, etc.',
    'Default props can be specified for optional values',
    'Props can include children for nested content',
    'PropTypes or TypeScript can be used for type checking'
  ],
  codeExamples: [
    {
      title: 'Basic Props Usage',
      code: `// Component with props
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}

// Using the component with props
<Greeting name="Alex" age={25} />

// Props with default values
function Button({ text = "Click me", onClick }) {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
}

// Using default props
<Button onClick={() => alert("Clicked!")} />`,
      explanation: 'Props are passed to components like HTML attributes. You can access props using destructuring in function components. Default values can be specified using the = syntax in the parameter list.'
    },
    {
      title: 'Children Props',
      code: `// Component that uses children prop
function Card({ title, children }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// Using the children prop
<Card title="Welcome">
  <p>This is some content inside the card.</p>
  <button>Learn More</button>
</Card>`,
      explanation: 'The children prop is a special prop that contains any elements included between the opening and closing tags of a component. It allows for flexible composition of components.'
    },
    {
      title: 'Props Destructuring and Spreading',
      code: `// Destructuring props with rest syntax
function ProfileCard({ name, title, ...otherProps }) {
  return (
    <div className="profile-card" {...otherProps}>
      <h2>{name}</h2>
      <p>{title}</p>
    </div>
  );
}

// Using spread operator to pass props
function UserProfile(props) {
  return (
    <div>
      <ProfileCard 
        {...props}
        className="featured"
      />
    </div>
  );
}

// Usage
<UserProfile 
  name="Jane Doe" 
  title="Software Engineer" 
  id="user-123"
  onClick={() => console.log("Profile clicked")}
/>`,
      explanation: 'Props can be destructured with the rest syntax (...otherProps) to collect remaining props. The spread operator can be used to pass all properties from an object as individual props, which is useful for forwarding props to child components.'
    }
  ],
  furtherReading: [
    'React Docs: Components and Props',
    'React Docs: Typechecking With PropTypes',
    'TypeScript: React Props Types'
  ]
};
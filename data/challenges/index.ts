import { CodingChallenge } from '@/types/quiz';

export const codingChallenges: CodingChallenge[] = [
  {
    id: 'challenge-todo-app',
    title: 'Build a Simple Todo App',
    topicId: 'state',
    difficulty: 'beginner',
    points: 50,
    description: 'Create a simple Todo application that allows users to add, toggle, and delete tasks.',
    instructions: [
      'Create a Todo component with a form to add new tasks',
      'Implement the ability to mark tasks as completed',
      'Add functionality to delete tasks',
      'Use useState to manage the list of todos'
    ],
    starterCode: `import React, { useState } from 'react';

function TodoApp() {
  // Add state for todos here
  
  const addTodo = (text) => {
    // Implement adding a new todo
  };
  
  const toggleTodo = (id) => {
    // Implement toggling a todo's completed status
  };
  
  const deleteTodo = (id) => {
    // Implement deleting a todo
  };
  
  return (
    <div>
      <h1>Todo App</h1>
      
      {/* Add form to create new todos */}
      
      <ul>
        {/* Render the list of todos */}
      </ul>
    </div>
  );
}

export default TodoApp;`,
    solutionCode: `import React, { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: input,
        completed: false
      }
    ]);
    setInput('');
  };
  
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div>
      <h1>Todo App</h1>
      
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a todo"
        />
        <button type="submit">Add</button>
      </form>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;`,
    hints: [
      'Use the useState hook to create state for your todo list and input field',
      'Each todo should have an id, text, and completed status',
      'Remember to create a new array when updating state, don\'t modify the existing one',
      'Use array methods like map and filter for updating and removing todos'
    ]
  },
  {
    id: 'challenge-theme-switcher',
    title: 'Create a Theme Switcher',
    topicId: 'context',
    difficulty: 'intermediate',
    points: 75,
    description: 'Build a theme switcher that allows users to toggle between light and dark themes using React Context.',
    instructions: [
      'Create a ThemeContext with light and dark theme values',
      'Implement a ThemeProvider component',
      'Create a toggle function to switch between themes',
      'Build UI components that consume the theme context'
    ],
    starterCode: `import React, { createContext, useState, useContext } from 'react';

// Create Theme Context
// ...

// Create Theme Provider
function ThemeProvider({ children }) {
  // Implement theme state and toggle function
  
  return (
    // Return provider with value
  );
}

// Create a hook to use the theme context
// ...

// Example component using the theme
function ThemedButton() {
  // Get theme from context
  
  return (
    <button style={{
      // Apply theme styles
    }}>
      Toggle Theme
    </button>
  );
}

function App() {
  return (
    // Wrap with ThemeProvider
    <div>
      <h1>Theme Switcher</h1>
      <ThemedButton />
    </div>
  );
}

export default App;`,
    solutionCode: `import React, { createContext, useState, useContext } from 'react';

// Create Theme Context
const ThemeContext = createContext();

// Create Theme Provider
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  const themeStyles = {
    light: {
      background: '#ffffff',
      text: '#333333',
      button: '#4A90E2'
    },
    dark: {
      background: '#333333',
      text: '#ffffff',
      button: '#9B59B6'
    }
  };
  
  return (
    <ThemeContext.Provider value={{ theme, themeStyles: themeStyles[theme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Create a hook to use the theme context
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Example component using the theme
function ThemedButton() {
  const { themeStyles, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      style={{
        backgroundColor: themeStyles.button,
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Toggle Theme
    </button>
  );
}

function ThemedPage() {
  const { themeStyles } = useTheme();
  
  return (
    <div style={{
      backgroundColor: themeStyles.background,
      color: themeStyles.text,
      padding: '20px',
      minHeight: '100vh'
    }}>
      <h1>Theme Switcher</h1>
      <p>This page uses the current theme from context.</p>
      <ThemedButton />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemedPage />
    </ThemeProvider>
  );
}

export default App;`,
    hints: [
      'Use createContext() to create your ThemeContext',
      'The ThemeProvider should manage the current theme state with useState',
      'Create a custom hook (useTheme) to easily access the theme context',
      'Remember to include both the theme values and the toggle function in your context value'
    ]
  },
  {
    id: 'challenge-fetch-data',
    title: 'Data Fetching with useEffect',
    topicId: 'useEffect',
    difficulty: 'intermediate',
    points: 75,
    description: 'Create a component that fetches and displays data from an API using the useEffect hook.',
    instructions: [
      'Create a component that fetches data when it mounts',
      'Handle loading and error states',
      'Display the fetched data in a list',
      'Implement a refresh button to fetch data again'
    ],
    starterCode: `import React, { useState, useEffect } from 'react';

function DataFetcher() {
  // Add state for data, loading, and error
  
  // Implement data fetching with useEffect
  
  // Function to refresh data
  
  return (
    <div>
      <h1>Data Fetcher</h1>
      
      {/* Handle loading state */}
      
      {/* Handle error state */}
      
      {/* Display data */}
      
      {/* Add refresh button */}
    </div>
  );
}

export default DataFetcher;`,
    solutionCode: `import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Using JSONPlaceholder API for demo
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div>
      <h1>Data Fetcher</h1>
      
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh Data'}
      </button>
      
      {loading && <p>Loading data...</p>}
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {!loading && !error && (
        <ul>
          {data.map(item => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      )}
      
      {!loading && !error && data.length === 0 && (
        <p>No data available</p>
      )}
    </div>
  );
}

export default DataFetcher;`,
    hints: [
      'Use useState to track data, loading state, and errors',
      'The useEffect hook should run once when the component mounts (empty dependency array)',
      'Remember to handle all possible states: loading, error, success with data, and success with no data',
      'Use try/catch blocks to handle fetch errors properly'
    ]
  },
  {
    id: 'challenge-form-validation',
    title: 'Form with Validation',
    topicId: 'forms',
    difficulty: 'advanced',
    points: 100,
    description: 'Build a registration form with client-side validation using React hooks.',
    instructions: [
      'Create a form with fields for name, email, password, and password confirmation',
      'Implement validation rules for each field',
      'Show validation errors next to the relevant fields',
      'Disable the submit button until the form is valid',
      'Show a success message on successful submission'
    ],
    starterCode: `import React, { useState } from 'react';

function RegistrationForm() {
  // Add state for form fields and validation
  
  // Validation functions
  
  // Handle input changes
  
  // Handle form submission
  
  return (
    <div>
      <h1>Registration Form</h1>
      
      <form onSubmit={/* Handle submission */}>
        {/* Name field */}
        
        {/* Email field */}
        
        {/* Password field */}
        
        {/* Confirm password field */}
        
        {/* Submit button */}
      </form>
      
      {/* Success message */}
    </div>
  );
}

export default RegistrationForm;`,
    solutionCode: `import React, { useState, useEffect } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Validate name
  const validateName = (name) => {
    if (!name.trim()) {
      return 'Name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    return '';
  };
  
  // Validate email
  const validateEmail = (email) => {
    if (!email.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };
  
  // Validate password
  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    return '';
  };
  
  // Validate confirm password
  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) {
      return 'Please confirm your password';
    }
    if (confirmPassword !== password) {
      return 'Passwords do not match';
    }
    return '';
  };
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Validate field on change
    let errorMessage = '';
    switch (name) {
      case 'name':
        errorMessage = validateName(value);
        break;
      case 'email':
        errorMessage = validateEmail(value);
        break;
      case 'password':
        errorMessage = validatePassword(value);
        // Also update confirm password error if it's already been entered
        if (formData.confirmPassword) {
          setErrors(prev => ({
            ...prev,
            confirmPassword: validateConfirmPassword(formData.confirmPassword, value)
          }));
        }
        break;
      case 'confirmPassword':
        errorMessage = validateConfirmPassword(value, formData.password);
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
  };
  
  // Check if form is valid
  useEffect(() => {
    const isValid = 
      !errors.name && 
      !errors.email && 
      !errors.password && 
      !errors.confirmPassword &&
      formData.name && 
      formData.email && 
      formData.password && 
      formData.confirmPassword;
    
    setIsFormValid(isValid);
  }, [errors, formData]);
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  return (
    <div>
      <h1>Registration Form</h1>
      
      {submitSuccess && (
        <div style={{ 
          backgroundColor: '#d4edda', 
          color: '#155724',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          Registration successful! Thank you for signing up.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '8px',
              borderColor: errors.name ? 'red' : '#ccc'
            }}
          />
          {errors.name && (
            <p style={{ color: 'red', margin: '5px 0 0', fontSize: '14px' }}>
              {errors.name}
            </p>
          )}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '8px',
              borderColor: errors.email ? 'red' : '#ccc'
            }}
          />
          {errors.email && (
            <p style={{ color: 'red', margin: '5px 0 0', fontSize: '14px' }}>
              {errors.email}
            </p>
          )}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '8px',
              borderColor: errors.password ? 'red' : '#ccc'
            }}
          />
          {errors.password && (
            <p style={{ color: 'red', margin: '5px 0 0', fontSize: '14px' }}>
              {errors.password}
            </p>
          )}
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '8px',
              borderColor: errors.confirmPassword ? 'red' : '#ccc'
            }}
          />
          {errors.confirmPassword && (
            <p style={{ color: 'red', margin: '5px 0 0', fontSize: '14px' }}>
              {errors.confirmPassword}
            </p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          style={{
            backgroundColor: isFormValid ? '#4A90E2' : '#cccccc',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            cursor: isFormValid ? 'pointer' : 'not-allowed'
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;`,
    hints: [
      'Use a single state object to manage all form fields',
      'Create separate validation functions for each field',
      'Use useEffect to check if the entire form is valid whenever inputs or errors change',
      'Remember to validate confirm password against the password field',
      'Disable the submit button until all validations pass'
    ]
  }
];
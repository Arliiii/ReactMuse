import { Section } from '@/types/learning';

export const learningPath: Section[] = [
  {
    id: 'fundamentals',
    title: 'React Fundamentals',
    topics: [
      {
        id: 'jsx',
        title: 'JSX',
        icon: 'Code',
        description: 'Learn the syntax extension for JavaScript that looks similar to HTML',
        difficulty: 'beginner',
      },
      {
        id: 'components',
        title: 'Components',
        icon: 'Layers',
        description: 'Understand the building blocks of React applications',
        difficulty: 'beginner',
      },
      {
        id: 'props',
        title: 'Props',
        icon: 'ArrowRightLeft',
        description: 'Pass data between components with properties',
        difficulty: 'beginner',
      },
      {
        id: 'component-composition',
        title: 'Component Composition',
        icon: 'Combine',
        description: 'Combine components to build complex UIs',
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'state-management',
    title: 'State Management',
    topics: [
      {
        id: 'state',
        title: 'State',
        icon: 'Database',
        description: 'Manage component data that changes over time',
        difficulty: 'beginner',
      },
      {
        id: 'useState',
        title: 'useState Hook',
        icon: 'SquareStack',
        description: 'Add state to functional components',
        difficulty: 'beginner',
      },
      {
        id: 'useReducer',
        title: 'useReducer Hook',
        icon: 'Workflow',
        description: 'Manage complex state logic in components',
        difficulty: 'intermediate',
      },
      {
        id: 'context',
        title: 'Context API',
        icon: 'Share2',
        description: 'Share state across the component tree without prop drilling',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'effects-lifecycle',
    title: 'Effects & Lifecycle',
    topics: [
      {
        id: 'lifecycle-methods',
        title: 'Lifecycle Methods',
        icon: 'LifeBuoy',
        description: 'Understand component lifecycle in class components',
        difficulty: 'intermediate',
      },
      {
        id: 'useEffect',
        title: 'useEffect Hook',
        icon: 'Activity',
        description: 'Perform side effects in functional components',
        difficulty: 'intermediate',
      },
      {
        id: 'custom-hooks',
        title: 'Custom Hooks',
        icon: 'Wrench',
        description: 'Create reusable logic with custom hooks',
        difficulty: 'intermediate',
      },
      {
        id: 'memoization',
        title: 'Memoization',
        icon: 'Cpu',
        description: 'Optimize performance with useMemo and useCallback',
        difficulty: 'advanced',
      },
    ],
  },
  {
    id: 'practical-skills',
    title: 'Practical Skills',
    topics: [
      {
        id: 'forms',
        title: 'Forms',
        icon: 'ClipboardList',
        description: 'Handle form inputs and validation in React',
        difficulty: 'intermediate',
      },
      {
        id: 'events',
        title: 'Events',
        icon: 'MousePointerClick',
        description: 'Respond to user interactions with event handlers',
        difficulty: 'beginner',
      },
      {
        id: 'styling',
        title: 'Styling in React',
        icon: 'Palette',
        description: 'Apply CSS, CSS-in-JS, and component libraries',
        difficulty: 'intermediate',
      },
      {
        id: 'data-fetching',
        title: 'Data Fetching',
        icon: 'Download',
        description: 'Fetch and display data from APIs',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'routing-navigation',
    title: 'Routing & Navigation',
    topics: [
      {
        id: 'react-router',
        title: 'React Router',
        icon: 'Map',
        description: 'Navigate between different views in your application',
        difficulty: 'intermediate',
      },
      {
        id: 'navigation-patterns',
        title: 'Navigation Patterns',
        icon: 'Navigation',
        description: 'Implement common navigation patterns',
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'advanced-concepts',
    title: 'Advanced Concepts',
    topics: [
      {
        id: 'performance',
        title: 'Performance Optimization',
        icon: 'Zap',
        description: 'Techniques to make React apps faster',
        difficulty: 'advanced',
      },
      {
        id: 'testing',
        title: 'Testing',
        icon: 'TestTube',
        description: 'Test React components and hooks',
        difficulty: 'advanced',
      },
      {
        id: 'error-boundaries',
        title: 'Error Boundaries',
        icon: 'ShieldAlert',
        description: 'Catch and handle errors in components',
        difficulty: 'advanced',
      },
      {
        id: 'best-practices',
        title: 'Best Practices',
        icon: 'Award',
        description: 'Follow recommended patterns and avoid common pitfalls',
        difficulty: 'advanced',
      },
    ],
  },
];
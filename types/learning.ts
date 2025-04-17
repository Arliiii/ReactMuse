export interface Topic {
    id: string;
    title: string;
    icon: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    completed?: boolean;
  }
  
  export interface Section {
    id: string;
    title: string;
    topics: Topic[];
  }
  
  export interface CodeExample {
    title: string;
    code: string;
    explanation: string;
  }
  
  export interface TopicDetail {
    id: string;
    title: string;
    definition: string;
    keyPoints: string[];
    codeExamples: CodeExample[];
    furtherReading?: string[];
  }
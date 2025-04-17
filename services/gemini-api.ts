import axios from "axios";

const apiKey = process.env.EXPO_PUBLIC_OPENROUTER_API_KEY!;

const API_CONFIG = {
    BASE_URL: "https://openrouter.ai/api/v1/chat/completions",
    DEFAULT_MODEL: "google/gemma-3-1b-it:free",
    TIMEOUT: 30000,
};

export async function getGeminiResponse(prompt: string): Promise<string> {
    try {
        if (!apiKey) {
            throw new Error("API key is not set in environment variables.");
        }

        const response = await axios.post(
            API_CONFIG.BASE_URL,
            {
                model: API_CONFIG.DEFAULT_MODEL,
                messages: [
                    {
                        role: "user",
                        content: [
                            prompt,
                            "Please answer in a friendly tone.",
                        ].join(" "),
                    },
                ],
            },
            {
                headers: {
                    Authorization: 'Bearer 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',
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data.choices[0].message.content;
    } catch (error: any) {
        console.error(
            "Error calling OpenRouter API:",
            error.response?.data || error.message
        );
        return "I apologize, but I'm having trouble connecting to the API right now.";
    }
}

/**
 * Fallback function to use when API is unavailable
 * @param prompt - The user's question or prompt
 * @returns A fallback response based on predefined patterns
 */
export function getFallbackResponse(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();

    // Basic responses for common React questions
    if (lowerPrompt.includes("what is jsx")) {
        return "JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML-like code in your JavaScript files, making it easier to create and visualize UI components in React.";
    }

    if (lowerPrompt.includes("what are props")) {
        return "Props (short for properties) are how you pass data from parent to child components in React. They're read-only and help make your components reusable and configurable. Think of them like function parameters!";
    }

    if (lowerPrompt.includes("what is state")) {
        return "State is a JavaScript object that stores data that may change over time and affects a component's rendering. Unlike props, state is managed within the component. When state changes, React re-renders the component to reflect those changes.";
    }

    if (
        lowerPrompt.includes("hook") ||
        lowerPrompt.includes("usestate") ||
        lowerPrompt.includes("useeffect")
    ) {
        return "Hooks are functions that let you 'hook into' React features from function components. useState lets you add state, useEffect handles side effects, useContext accesses context, and there are many more! They were introduced in React 16.8 to solve problems with class components.";
    }

    if (lowerPrompt.includes("virtual dom")) {
        return "The Virtual DOM is a lightweight copy of the real DOM that React keeps in memory. When state changes, React first updates this virtual representation, compares it with the previous one (diffing), and then efficiently updates only the necessary parts of the actual DOM.";
    }

    // Default response
    return "I'm Rea, your React learning assistant! I can help explain React concepts, provide code examples, or suggest what to learn next. What would you like to know about React?";
}
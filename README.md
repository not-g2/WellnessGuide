# Wellness Guide

## Project Setup & Demo

To run locally:

1. Install Vercel CLI:
   npm i -g vercel

2. Run the project:
   vercel dev

-   Demo link: https://wellness-guide-flax.vercel.app
-   GitHub link: https://github.com/not-g2/WellnessGuide

---

## Problem Understanding

-   The user inputs **age**, **gender**, and their **goal**.
-   The AI recommends **5 tips** to achieve the user’s goal.
-   The user can **regenerate tips** for different results.
-   The user can **save favorite tips** to Local Storage.

---

## AI Prompts & Iterations

### 1. Initial Prompt

You are a wellness coach.
The user is ${age} years old, identifies as ${gender}, and their goal is "${goal}".
Give 5 detailed and practical tips that are mutually exclusive if possible.

Problem: Generated extra introductory text.

---

### 2. JSON Output Prompt

You are a wellness coach.
The user is ${age} years old, identifies as ${gender}, and their goal is "${goal}".
Give 5 detailed and practical tips that are mutually exclusive if possible.
Do not add any introductions.
Output the tips in valid JSON format with the title as the key and description as the value.

Problem: No representation of tip effectiveness.

---

### 3. Including Scores

You are a wellness coach.

User Information:

-   Age: ${age} years old
-   Gender: ${gender}
-   Goal: "${goal}"

Instructions:

1. Provide exactly 5 practical tips for achieving the user's goal.
2. The tips should be mutually exclusive whenever possible.
3. Do NOT include introductions or explanations—just the tips in JSON format.
4. Format the output as valid JSON, where each tip has:
    - The title as the key.
    - The value is an object containing:
        1. description: How and when to use the tip.
        2. effectivenessScore: A number from 1 to 10 indicating the impact of this tip for achieving the goal.
        3. costScore: A number from 1 to 10 indicating how inexpensive or costly it is to follow.
        4. timeScore: A number from 1 to 10 indicating whether it takes a short or long time to implement.

Problem: Descriptions were too short.

---

### 4️. Detailed Descriptions

You are a wellness coach.

User Information:

-   Age: ${age} years old
-   Gender: ${gender}
-   Goal: "${goal}"

Instructions:

1. Provide exactly 5 practical tips for achieving the user's goal.
2. The tips should be mutually exclusive whenever possible.
3. Do NOT include introductions or explanations—just the tips in JSON format.
4. Format the output as valid JSON, where each tip has:

-   The title as the key.
-   The value is an object containing:
    1. description: Write a detailed explanation (~200 words) of how and when to apply this tip. Include practical guidance
       and use bullet points to emphasize the most important steps or recommendations.
    2. effectivenessScore: A number from 1 to 10 indicating the impact of this tip for achieving the goal.
    3. costScore: A number from 1 to 10 indicating how inexpensive or costly it is to follow.
    4. timeScore: A number from 1 to 10 indicating whether it takes a short or long time to implement.

Problem: Regenerating tips produced similar results.

---

### 5️⃣ Final Prompt with Session ID

You are a wellness coach.
Session ID: ${seed}

User Information:

-   Age: ${age} years old
-   Gender: ${gender}
-   Goal: "${goal}"

Instructions:
1. Provide exactly 5 practical tips for achieving the user's goal.
2. The tips should be mutually exclusive whenever possible.
3. Do NOT include introductions or explanations—just the tips in JSON format.
4. Format the output as valid JSON, where each tip has:
- The title as the key.
- The value is an object containing:
    1) description: Write a detailed explanation (~200 words) of how and when to apply this tip. Include practical guidance 
    and use bullet points to emphasize the most important steps or recommendations.
    2) effectivenessScore: A number from 1 to 10 indicating the impact of this tip for achieving the goal.
    3) costScore: A number from 1 to 10 indicating how inexpensive or costly it is to follow.
    4) timeScore: A number from 1 to 10 indicating whether it takes a short or long time to implement.

- Make sure the Session ID is used internally to vary responses slightly, even for identical inputs.

Solution: Adding a `Session ID` ensures more varied recommendations on regeneration.


Note:- We do use another prompt to first validate the user input goal. The Prompt is

"You are an assistant that validates user goals for a wellness app.

The user entered:"${goal}"
    
Rules:
- If the goal is a legitimate medical, fitness, or wellness goal (e.g., "Lose Weight", "Build Muscle", "Improve Flexibility"), return it exactly as written.
- If the goal is unrelated, random, or nonsensical, return the string "INVALID".
- Do not add explanations or other text.

    Output only one string"


## Architecture & Code Structure

### Architecture
- It uses Vite + React as the main framework
- Shadcn + tailwind for UI components and styling
- React Router for Routing
- ReactContext for State Management
- Uses Zod for input Validation
- wellness.js and validateGoal.js as serverless functions for AI model calls
- Uses Gemini model 2.5 flash
- "main.jsx" wraps the < App> Components with the userProvider, tipsProvider and BrowserRouter
- "App.jsx" houses the navigations logic with AnimatedRoutes

### Structure 
- Reusable Components are stored in "/src/components"
- Main 4 Pages are stores in "/src/pages/"
- Static Images are stoed in "/src/public"
- Contexts for user and tips are stored in "/src/context"
- Serverless functions are stored in "/api"

### Limitations / Known Issues
- Cannot run many AI calls due to free model restriction
    * Soln:- Switch to a model that allows more API calls
- Slow response from model
    * Soln:- Switch to a faster model
- Cannot remember previous recommendations
    * Soln:- Provide previous recommendations during prompt to avoid similar responses
- May input Random/Unrelated values as goal
    * Soln:- Restrict the input to pre-defined goals

### Bonus Work
- Added Animations between Pages
- Toast notifications
- Dynamically shifting element size making it suitable for various device sizes
- Tries to filter Random/Unrelated goals by checking it is valid first by passing it to an AI model
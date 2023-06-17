# React-QuizQuestions
The React-QuizQuestions project is a repository that provides a collection of quiz questions for use in React applications.
https://deluxe-clafoutis-5cb943.netlify.app/

##### I will keep updating this app.. 

## Features
- A comprehensive set of quiz questions covering various topics.
- Each question includes multiple-choice answer options.
- Questions are categorized and organized for easy navigation.
- The repository is regularly updated with new questions and categories.
Usage

# Quiz Component
The Quiz component is a React component that renders a quiz interface. It fetches quiz questions from an API, allows users to select answers, displays the result, and provides an option to play again.
## Props
### The Quiz component accepts the following props:
- questions (optional): The number of questions to fetch from the API. If not provided, the default value is null.
- difficulty (optional): The difficulty level of the quiz questions. If not provided, the default value is null.
### State
The component has the following states:
-         startQuiz: A boolean value indicating whether the quiz has started.
-         isLoading: A boolean value indicating whether the quiz questions are being fetched.
-         data: An array containing the quiz questions and answer options.
-         showResult: A boolean value indicating whether to display the quiz result.
### useEffect
The useEffect hook is used to fetch the quiz questions when the startQuiz state changes. It makes an asynchronous request to the Open Trivia Database API using the provided number of questions and difficulty level. 
Once the data is received, it processes the response to extract the correct and incorrect answers, shuffles the options, and updates the data state with the formatted quiz data.
handleAnswerClick Function
The handleAnswerClick function is called when a user clicks on an answer option. 
It updates the data state by marking the selected option as selected: true and all other options as selected: false. This allows visual feedback to the user for their selected answer.
### countCorrectAnswer and countInCorrectAnswer Variables
These variables calculate the total number of correct and incorrect answers respectively by iterating over the data state.
### Rendering
The component renders different elements based on the state and user interactions:
-         While loading, it displays a loading GIF image in the center of the screen.
-         Once the questions are fetched, it renders each question along with answer options.
-         Each answer option is rendered as a clickable div, which updates the state on click.
-         The selected answer options are styled differently based on correctness and whether the result is shown.
-         After showing the result, it displays the number of correct and incorrect answers.
-         It also provides a button to play again, which resets the quiz and scrolls to the top of the page.
 


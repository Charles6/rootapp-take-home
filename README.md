# rootapp-take-home

# Coding project: Suggestion Box React Web App

## How to Run Application

This application was built with Vite, and uses Yarn for npm management, and json-server as a mock backend.

At the root level run the "yarn" command to initiate and install the packages.

Then to run the server use "yarn server" which will run the server at localhost:3000.

Then to run the application use "yarn dev" which will run the client at localhost:5173.

The Login is not implemented, and is there just to show that you are logging in as "Lynette Marvin". Obviously, this would be relatively simple to implement with some encoding and password management for each user.

### Data Structure

The data structure for this is relatively flat with subcategories for "users", "suggestions", and "discussions".

I wanted the "discusssions" to be flat as it would allow for a simple search param for future functionality, such as search by user, keywords, and description.

One feature which would be simple to implement would be a user profile page that would show most recent discussion comments, and suggestions.

## Objective
This coding project will assess a web developer's ability to create a React web application with specific functionality. It allows candidates to demonstrate their proficiency in architecture, state management, and data presentation.

## Overview
Create a React web application that simulates an online “suggestion box” for an organization:
- Community members can submit new suggestions.
- Each suggestion has an associated comment thread where community members and the original submitter can discuss the idea.

Here’s an example of what that app could look like - you’re free to arrange and style the app as you choose:

![mockImage](./src/assets/mock.JPG)

## Requirements
1. In-memory data provider: Implement a data provider that stores the suggestions and comments in memory. You can use any suitable data structure for this purpose.
2. Mock data: Load some hard-coded data into your data provider so the app has a few suggestions and comments to display at startup.
3. UI: Create a screen or component to display the suggestions and comments.
4. Random suggestions: Add functionality that randomly generates new, simulated suggestions and sends them to the app.
5. User suggestions: Implement a feature that allows users to create new suggestions and add comments.

## Submission
Provide either a GitHub repository or email the code as a zip file. Include instructions on how to run the application, any dependencies needed, and any additional notes you want to share with the reviewer.

## Evaluation Criteria
The candidate's solution will be evaluated based on the following criteria:
1. Functionality: Does the application meet the specified requirements?
2. Code quality: Is the code well-organized, readable, maintainable, and annotated? Does it follow best practices for React development?
3. Architecture: Does the project demonstrate good architectural practices, is it designed to be flexible, extensible, and updatable?
4. State management: Is the state managed effectively within the application?
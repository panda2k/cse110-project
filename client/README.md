# Front End Filesystem Structure

The front end has several folders to promote organization and better readability for new developers. Below are brief explanations of how files should be organized between these folders.

## Assets
Includes images (svg, png, jpg, etc.) which are used for styling the website views.

## Components 
Contains lower level React components that make up parts of a single page (think buttons, a single event flyer, etc). If a component acts as the majority of an entire page, think about renaming it to a view and moving it to the views folder.

## Constants 
Contains static, important values that will be used throughout the application.

## Styles
Contains any *.css files.

## Tests
Contains any *.test.tsx files.

## Types
Contains any newly defined TSX types.

## Views
Contains React components that are meant to span an entire page, or close to an entire page. (think login view, bulletin board view, messages view, etc.)

# CI/CD Workflow

Once you have finished implementing a feature, whether it be a subtask or a user story, write some related tests to make sure that the component renders correctly. For better organization, put these test files in the tests directory. 

*It is required to put the suffix ".test.tsx"* after any test you write so npm test will detect and run those tests. If you do not include this suffix, the CI script will not run your test, and will potentially give a false positive.

Once your tests pass, create a pull request to merge your branch with the main branch. Wait for Github to tell you the tests pass, and then merge your branch into the main branch. For traceability, write a comment mentioning the user story or task that your pull request solves. 

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

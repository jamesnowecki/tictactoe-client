# James Nowecki - Tictactoe client (Bootstrapped with createReactApp)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

This is required to install the dependencies.

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

You will need to have the backend NodeJS server running to play.

Once that server is running, client should try to connect to the websocket instance automatically. Try to refresh page if you are struggling to connect.

Final Comments: 

 - Built with hooks and functional components. 
 - Opinionated use of conditional rendering in preference to conditional styling for showing and hiding components.
 - Fair discussion could be had over the extraction of parts of the JSX from the return into seperate functions. Currently personally I prefer this, but there is a very reasonable argument to be had for keeping ALL JSX in the return even though this muddies up the return a bit with conditional logic (admittedly I've styled a few basic show/hides on the buttons this way, I should probably be copnsistent throughout, whatever my decision is).

Refactoring comments:

 - Cleaned up favicon etc.
 - Extracting the logic to context and hooking in to context layer definitely a cleaner solution for this. Need to think now about when context is the most sensible solution to problems, and when it may not be. Are there situations that exist now where prop drilling is more suitable/preferable? Passing in the props of the 'square' data objects from board is clearly required here in order to reuse a singular component, for example, though 'hooking' the function for handling play seems optional
 - Using the Bootstrap library increased the amount of JSX, but minimised necessity for SCSS, gained consistency and modularity.

 Coded to 'With Teeth' (Nine Inch Nails, 2005), 'Twilight' (Boa, 2001), 'The Impossible Kid' (Aesop Rock, 2016), 'Conditions of My Parole' (Puscifer, 2011), 'Fox Confessor Brings the FLood' (Neko Case, 2008).

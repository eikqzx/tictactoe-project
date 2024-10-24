
# Tic-Tac-Toe Game

This is a **Tic-Tac-Toe game** built with [Next.js](https://nextjs.org), [Joy UI](https://mui.com/joy-ui/getting-started/overview/), and [Auth.js](https://authjs.dev) for authentication. The project was initialized with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/tictactoe-game.git
   ```

2. Navigate to the project folder:

   ```bash
   cd tictactoe-game
   ```

3. Install the dependencies using `npm` with the `--legacy-peer-deps` flag to resolve any peer dependency issues:

   ```bash
   npm install --legacy-peer-deps
   ```

4. Unzip the `.env.zip` file to the root directory of the project. This file contains the necessary environment variables for running the application:

   ```bash
   unzip env.zip
   ```

### Running the Development Server

To start the development server, use the following command:

```bash
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Online Demo

You can also view the game live at: [https://tictactoe-game-teal.vercel.app](https://tictactoe-game-teal.vercel.app)

## Features

- **Next.js**: Provides a fast and scalable framework for building web applications with server-side rendering and static site generation.
- **Joy UI**: A lightweight and customizable component library from Material UI for styling the UI.
- **Auth.js**: Manages authentication and session handling for users.

## Project Structure

```bash
.
├── components     # Reusable UI components like GameBoard, Scoreboard, etc.
├── pages          # Next.js page routing (e.g., index.js)
├── public         # Static assets such as images
├── styles         # Global styles and theme configurations
├── .env.zip       # Contains environment variables for development
└── README.md      # Project overview
```

## Learn More

To learn more about the tools used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) – Learn about Next.js features and API.
- [Joy UI Documentation](https://mui.com/joy-ui/getting-started/overview/) – Learn how to use Joy UI for styling components.
- [Auth.js Documentation](https://authjs.dev) – Learn about authentication handling with Auth.js.

## Deployment

This project is deployed on [Vercel](https://vercel.com), the platform created by the same team behind Next.js. To deploy your own Next.js app to Vercel:

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Go to [Vercel](https://vercel.com/) and sign in.
3. Connect your GitHub, GitLab, or Bitbucket account and import your repository.
4. Follow the deployment steps to automatically deploy your project.

For more detailed deployment instructions, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## License

This project is open-source and licensed under the [MIT License](LICENSE).

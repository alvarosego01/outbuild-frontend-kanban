
# Outbuild Frontend Assessment - Real-Time Collaborative Task Board

This project was developed by Álvaro Segovia.

- **LinkedIn**: [LinkedIn Profile](https://www.linkedin.com/in/alvarosego01/)
- **Email**: alvarosego01@gmail.com

This project is a web application that allows multiple users to manage tasks collaboratively in real-time. The application simulates a Kanban board with columns "To Do," "In Progress," and "Done," where users can create, edit, delete, and move tasks while viewing other users' interactions in real-time. This project was developed as part of a technical assessment for Outbuild.

## Key Technologies

- **React 18**: Used to build the user interface, providing reusable components and efficient state management.
- **Vite**: A modern and fast development environment that optimizes the development experience with minimal configuration.
- **Docker Compose**: Ensures portability and simplifies the environment setup on any machine.
- **React Router**: For navigation and route management within the application.
- **Redux** and **Redux Toolkit**: Manages the global state of the application, making information easily accessible across components.
- **Socket.IO**: Enables real-time communication between the client and server, supporting live collaboration.
- **Jest** and **React Testing Library**: For unit testing, ensuring the correct functionality of components and application logic.
- **TypeScript**: Adds static typing, improving code maintainability and error detection.

## Project Structure

The project follows a modular structure, facilitating scalability and maintenance. The main folders include:

- **src/**: Contains the application's source code.
  - **components/**: Reusable user interface components.
  - **pages/**: Main pages of the application.
  - **store/**: Global state configuration and management using Redux.
  - **hooks/**: Custom hooks for reusable logic.
  - **services/**: Services for communication with external APIs.
  - **sockets/**: Configuration and management of Socket.IO for real-time communication.

## Main Features

- **Task Management**: Create, edit, delete, and move tasks between the columns “To Do,” “In Progress,” and “Done.”
- **Real-Time Collaboration**: Interactions are visible to all connected clients, enabling a collaborative experience.
- **User Presence**: Each connected user receives a random name (User-number-random) to identify who is performing each action.
- **Interaction Cursor**: An indigo-colored cursor displays the movements and actions of other users in real-time, enhancing usability and the visual collaborative experience.

## Prerequisites

- Docker Desktop suite must be installed on the computer to enable the application to function correctly, allowing the socket server and client to run without issues.

## Environment Setup

To run the project, first configure the environment variable in the `.env` file, specifying the desired environment (`development` or `test`).

- **development**: Mode for interacting and using the application.
- **test**: Testing mode.

## Instructions to Run the Project

1. Ensure you have configured the `.env` file with the desired environment (`NODE_ENV=development` or `NODE_ENV=test`).
2. Run the following command to start the project in Docker, ensuring portability on any machine:

   ```bash
   docker compose up --build
   ```

   This command will start both the client and the socket server, allowing full project execution.

3. Once the project is running:
   - Access the client from any browser at: [http://localhost:5173/](http://localhost:5173/)
   - The socket server will be available at: [http://localhost:3150/](http://localhost:3150/)

## Available Scripts

- **`pnpm dev`**: Starts the development server.
- **`pnpm build`**: Builds the application for production.
- **`pnpm test`**: Runs the unit tests.
- **`pnpm lint`**: Runs ESLint to analyze the code for issues.

## Testing

Testing is conducted using Jest and React Testing Library. These tests include:
- **Unit tests** for individual components and functions.

## Implementation Decisions

- **Global State with Redux**: Redux is used along with custom hooks, allowing centralized and efficient access to information across the application. This avoids excessive use of `useState` and simplifies handling complex states in collaborative applications.
- **Real-Time Collaboration**: Using **Socket.IO**, actions are synchronized and user presence is visible, enabling a seamless collaborative experience.
- **Visual Feedback**: Each active user is represented by an indigo cursor highlighting the task they are handling, with a randomly generated name to identify who is performing each action.

## Conclusion

This project represents a robust solution for real-time collaborative task management, meeting the technical assessment requirements and focusing on a smooth, efficient user experience. The technologies and design decisions ensure that the application is scalable, easy to maintain, and highly collaborative.

---

**Note**: If you have any questions or encounter any difficulties running the project, feel free to contact me.

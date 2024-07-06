---
outline: deep
---

# Vite & JSP Demo

This demo shows how to use Vite in a Spring web application with JSP templates.

Source code: [GitHub](https://github.com/benny123tw/vite-jsp-demo)

## Prerequisites

- Java 8
- Maven 3.6.3 or later
- Tomcat 9.0.X
- Node.js 20 or later
- pnpm 9.4.0 or later

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/benny123tw/vite-jsp-demo.git
   ```

2. Install the backend dependencies:

   ```bash
   cd vite-jsp-demo
   mvn clean install
   ```

3. Install the frontend dependencies:

   ```bash
   cd vite-demo
   pnpm install --frozen-lockfile
   ```

## Run the Application

### Start the Spring MVC server

In this example, we will use Intellij IDEA to run the Spring MVC server. You could configure the server with your favorite IDE or run it with the command line.

1. Open the project with Intellij IDEA.
2. Edit Run/Debug Configurations.
3. Add a new configuration for Tomcat Server (version 9.0.x).
4. Add WAR exploded artifact at the Deployment tab.
5. You can modify the application context if you want. The default context is `/spring_mvc`.
6. Back to the Server tab, you can also modify the HTTP port if you want. The default port is `8989`.
7. Edit the URL: `http://localhost:8989/spring_mvc/hello`.
8. Switch to the Startup/Connection tab and add the Environment variable `spring.profiles.active` with the value `prod`.
9. Click run to start the server in production mode; click the debug button to start the server in debug mode.

### Start the Vite development server

```sh
cd vite-demo
pnpm dev
```

After you run the above command, you will see the following output in the console:

<<< @/snippets/init.ansi

### Build and run in production mode

1. **Build the frontend assets**:
   ```sh
   cd vite-demo
   pnpm build
   ```

2. **Build the backend**:
   ```sh
   ./mvnw package
   ```

3. **Deploy the backend to your servlet container**:
    - Copy the generated WAR file (`target/your-app-name.war`) to your servlet container's deployment directory.
    - Start your servlet container (e.g., Tomcat).
    - Access the application at the configured URL, for example, `http://localhost:8989/spring_mvc/hello`.

## Running the Application with Docker

You can also run the application using Docker:

1. **Build the Docker image**:
   ```sh
   docker build -t spring_mvc .
   ```

2. **Run the Docker container**:
   ```sh
   docker run -d -p 8989:8080 -e "SPRING_PROFILES_ACTIVE=prod" spring_mvc
   ```

3. **Access the application**:
   Open your browser and navigate to `http://localhost:8989/spring_mvc/hello`

## Project Structure

- **src/main/java/com/benny**: Contains Java source files
    - **bean**: Bean definitions
    - **config**: Configuration classes
    - **controller**: Spring MVC controllers
    - **service**: Service layer classes

- **src/main/resources**: Application resources
- **src/main/webapp**: Web application files
    - **WEB-INF**: Contains JSP views and web.xml configuration
    - **dist**: Directory where Vite builds assets

- **vite-demo**: Contains the Vite project
    - **src**: Frontend source files

## Profiles

This project uses Spring profiles to manage environment-specific configurations. The available profiles are:

- **dev**: For development environment. Uses `application-dev.properties`.
- **prod**: For production environment. Uses `application-prod.properties`.
- **default**: Fallback configuration. Uses `application.properties`.

You can activate a profile by setting the `spring.profiles.active` environment variable.
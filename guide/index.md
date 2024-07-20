# Getting Started

Welcome to JaVite! This quick start guide will help you set up JaVite in your Java web application, integrate Vite, and start modernizing your project with ease.

## Prerequisites

Before you begin, ensure you have the following installed:

- Java Development Kit (JDK) 8 or higher
- Node.js 18+ or 20+ and npm (or yarn/pnpm)
- Maven or Gradle

## Quick Look

With JaVite, you can modernize your Java web application by integrating Vite for front-end development. You can easily manage and import modern JavaScript and CSS assets into your legacy Java projects.

### Project Structure

Here's an example project structure for a Java web application with JaVite and Vite:

```plaintext
project-root/
├── server/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   ├── resources/
│   │   │   └── webapp/
│   │   │       └── WEB-INF/
│   │   │           └── views/
│   │   │               └── index.jsp
│   │   └── test/
│   └── pom.xml
└── client/
    ├── src/
    │   └── main.js
    ├── vite.config.js
    └── package.json
```

We could easily separate the client and server directories for better organization. The `server` directory contains the Java web application, while the `client` directory contains the Vite project. 

## Installation

### 1. Add JaVite to Your Project

Add the following dependency to your `build.gradle` or `pom.xml` file:

:::code-group
```groovy [build.gradle]
dependencies {
    implementation 'com.javite:javite-webmvc:0.1.6'
}
```

```kotlin [build.gradle.kts]
dependencies {
    implementation("com.javite:javite-webmvc:0.1.6")
}
```

```xml [pom.xml]
<dependency>
    <groupId>com.javite</groupId>
    <artifactId>javite-webmvc</artifactId>
    <version>0.1.6</version>
</dependency>
```
:::

For Java 8 support, please use `javite-webmvc-jre8`:

:::code-group
```groovy [build.gradle]
dependencies {
    implementation 'com.javite:javite-webmvc-jre8:0.1.6'
}
```

```kotlin [build.gradle.kts]
dependencies {
    implementation("com.javite:javite-webmvc-jre8:0.1.6")
}
```

```xml [pom.xml]
<dependency>
    <groupId>com.javite</groupId>
    <artifactId>javite-webmvc-jre8</artifactId>
    <version>0.1.6</version>
</dependency>
```
:::

### 2. Set Up Vite With Plugin

[Create a new Vite project](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) or add Vite to your existing Node.js project. In your project root, run the following command:

:::code-group
```sh [npm]
npm create vite@latest your-vite-project --template vanilla
```

```sh [pnpm]
pnpm create vite your-vite-project --template vanilla
```

```sh [yarn]
yarn create vite your-vite-project --template vanilla
```

```sh [bun]
bun create vite your-vite-project --template vanilla
```
:::

Follow the prompts to set up your Vite project. Once complete, install the dependencies:

:::code-group
```sh [npm]
cd your-vite-project
npm install
```

```sh [pnpm]
cd your-vite-project
pnpm install
```

```sh [yarn]
cd your-vite-project
yarn install
```

```sh [bun]
cd your-vite-project
bun install
```
:::

Add the JaVite plugin to your Vite project:

:::code-group
```sh [npm]
npm install -D vite-plugin-java
```

```sh [pnpm]
pnpm add -D vite-plugin-java
```

```sh [yarn]
yarn add -D vite-plugin-java
```

```sh [bun]
bun add -D vite-plugin-java
```
:::

## Configuration

### 1. Configure Vite

In your Vite project, update the `vite.config.js` file to output the manifest file:

```js twoslash
import { defineConfig } from 'vite'
import java, { createRollupInputConfig } from 'vite-plugin-java'

export default defineConfig({
  build: {
    outDir: '../server/src/main/webapp/WEB-INF/dist',
    emptyOutDir: true,
  },
  plugins: [
    java({
      // Your Java project base directory.
      javaProjectBase: '../server',

      // This should be your application context path + resource handler configuration in your Spring MVC application.
      // Example:
      // @Override
      // public void addResourceHandlers(ResourceHandlerRegistry registry) {
      //     registry.addResourceHandler("/resources/**")
      //             .addResourceLocations("/WEB-INF/dist/");
      // }
      buildDirectory: 'application_context/resources',

      // The directory in the Vite project that is treated as the public directory.
      // Static assets in this directory are served directly at the root level.
      // For example, if `publicDirectory` is set to 'public':
      // import '/vite.svg' will resolve to 'public/vite.svg'.
      publicDirectory: 'public',

      // Function to create Rollup input configuration based on the provided patterns.
      // This will fetch all the main entry files based on the provided pattern.
      input: createRollupInputConfig('src/**/main.ts', 'src'),
    }),
  ],
})
```

The `input` option in the `java` plugin configuration specifies the entry files for your Vite project. The `createRollupInputConfig` function fetches all the main entry files based on the provided pattern. You can customize this pattern based on your project structure.

### 2. Configure JaVite

Create or update your `application.properties` (or `application.yml`) file with the following settings:

```properties
vite.debug=true
vite.manifest-path=/WEB-INF/dist/.vite/manifest.json
vite.local-server-url=http://localhost:5173
vite.resource-path=/resources
```

| Prefix | Properties | Description | Default |
| --- | --- | --- | --- |
| vite | debug | Enable debug mode for JaVite. | true |
| vite | manifest-path | Path to the Vite manifest file. | /WEB-INF/dist/.vite/manifest.json |
| vite | local-server-url | Local server URL for Vite development server. | http://localhost:5173 |
| vite | resource-path | Public resource path for Vite assets. | /resources |

### 3. Configure Spring MVC

In your Spring MVC configuration, add a resource handler to serve the Vite assets:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("/WEB-INF/dist/");
    }
}
```

This configuration serves the Vite assets from the `/resources` path in your Java web application.

### 4. Enable JaVite Configuration

```java
import com.javite.EnableVite;

@Configuration
@ComponentScan(basePackages = "com.benny",
        includeFilters = @Filter(type = FilterType.ANNOTATION, value = Configuration.class))
@EnableVite
public class AppConfig {

    @Bean
    public static PropertySourcesPlaceholderConfigurer propertyConfigInDev() {
        return new PropertySourcesPlaceholderConfigurer();
    }

    @Configuration
    @Profile("dev")
    @PropertySource("classpath:application-dev.properties")
    static class DevConfig {

    }

}
```

Add the `@EnableVite` annotation to your Spring configuration class to enable JaVite in your Java web application.

## Usage

### 1. JSP Integration

Add the custom tag to your JSP files:

```html
<%@ taglib prefix="vite" uri="https://javite.com/tags" %>
```

Use the custom tags to import Vite-generated assets:

```html
<vite:import entry="/main.ts"/>
```

### 2. Thymeleaf Integration

For Thymeleaf templates, use the JaVite Thymeleaf dialect to import Vite assets. Ensure you have configured the dialect in your Spring configuration.

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org" xmlns:vite="http://www.javite.com/thymeleaf">
<head>
    <vite:import entry="/main.ts"/>
</head>
<body>
    <h1>Welcome to JaVite!</h1>
</body>
</html>
```

## Development

To start the Vite development server, run:

:::code-group
```sh [npm]
npm run dev
```

```sh [pnpm]
pnpm dev
```

```sh [yarn]
yarn dev
```

```sh [bun]
bun dev
```
:::

This will start the Vite server on `http://localhost:5173`. Your Java application will use this server for hot module replacement (HMR) and instant updates.

## Building for Production

When you're ready to build for production, run:

:::code-group
```sh [npm]
npm run build
```

```sh [pnpm]
pnpm build


```

```sh [yarn]
yarn build
```

```sh [bun]
bun build
```
:::

This will generate the production-ready assets and place them in the directory specified in your Vite configuration (`build.outDir`).

## Conclusion

That's it! You have successfully integrated JaVite with your Java web application. Enjoy the benefits of modern front-end development with Vite, seamlessly integrated into your legacy Java projects.
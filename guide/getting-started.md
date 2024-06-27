# Getting Started

Welcome to JaVite! This quick start guide will help you set up JaVite in your Java web application, integrate Vite, and start modernizing your project with ease.

## Prerequisites

Before you begin, ensure you have the following installed:

- Java Development Kit (JDK) 8 or higher
- Node.js and npm (or yarn/pnpm)
- Maven or Gradle

## Installation

### 1. Add JaVite to Your Project

Add the following dependency to your `build.gradle` or `pom.xml` file:

:::code-group
```groovy
dependencies {
    implementation 'com.javite:javite-webmvc:0.1.3'
}
```

```kotlin
dependencies {
  implementation("com.javite:javite-webmvc:0.1.3")
}
```

```xml
<dependency>
    <groupId>com.javite</groupId>
    <artifactId>javite-webmvc</artifactId>
    <version>0.1.3</version>
</dependency>
```
:::

### 2. Set Up Vite With Plugin

Create a new Vite project or add Vite to your existing project. In your project root, run the following command:

:::code-group
```sh [npm]
npm add -D vite vite-plugin-java
```

```sh [pnpm]
pnpm add -D vite vite-plugin-java
```

```sh [yarn]
yarn add -D vite vite-plugin-java
```

```sh [bun]
bun add -D vite vite-plugin-java
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

## Configuration

### 1. Configure Vite

In your Vite project, update the `vite.config.js` file to output the manifest file:

```ts
import { defineConfig } from 'vite'
import java, { createRollupInputConfig } from 'vite-plugin-java'

export default defineConfig({
  build: {
    outDir: '../src/main/webapp/WEB-INF/dist',
    emptyDir: true,
  },
  plugins: [
    java({
      input: createRollupInputConfig('src/**/main.ts', 'src'),
    }),
  ],
})
```

### 2. Configure JaVite

Create or update your `application.properties` (or `application.yml`) file with the following settings:

```properties
vite.debug=true
vite.manifest-path=/WEB-INF/dist/.vite/manifest.json
vite.local-server-url=http://localhost:5173
vite.resource-path=/resources
```

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

This will generate the production-ready assets and place them in the directory specified in your Vite configuration (`../src/main/webapp/WEB-INF/dist` by default).

## Conclusion

That's it! You have successfully integrated JaVite with your Java web application. Enjoy the benefits of modern front-end development with Vite, seamlessly integrated into your legacy Java projects.

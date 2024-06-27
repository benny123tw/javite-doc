# What is JaVite?

JaVite is a module that seamlessly integrates Vite, a modern front-end build tool, with traditional Java web applications. It is designed to help developers modernize their legacy projects by leveraging Vite's powerful bundling and development capabilities without overhauling the existing Java infrastructure.

<div class="tip custom-block" style="padding-top: 8px">

Just want to try it out? Skip to the [Quickstart](./getting-started).

</div>

## Use Cases

- **Legacy Java Applications**

  JaVite is perfect for legacy Java applications built with Spring MVC and Thymeleaf. By integrating Vite, you can enhance your existing projects with modern front-end capabilities without needing to rewrite the entire application. JaVite provides custom JSP tags and Thymeleaf dialects to simplify the integration process.

- **Modernizing Front-End Workflows**

  With JaVite, you can bring modern front-end development workflows to your Java applications. This includes using ES modules, hot module replacement (HMR), and leveraging the rich ecosystem of Vite plugins to enhance your development process.

## Developer Experience

JaVite aims to provide an excellent Developer Experience (DX) by combining the strengths of Vite and Java.

- **[Vite-Powered:](https://vitejs.dev/)** Instant server start, with edits instantly reflected (<100ms) without page reload.

- **[Custom JSP Tags & Thymeleaf Dialects:](#path-to-usage)** Easily import and manage Vite-generated assets in your JSP and Thymeleaf templates, simplifying the integration of modern JavaScript and CSS.

- **[Seamless Configuration:](#path-to-configuration)** Configure JaVite through simple properties in your `application.properties` or `application.yml` files to define paths and settings for Vite assets.

## Performance

JaVite ensures optimal performance by leveraging Vite's capabilities and modern Java practices.

- **Fast Initial Load**

  JaVite serves static, pre-rendered HTML on the initial visit, ensuring fast loading speeds and optimal SEO. The page then loads a JavaScript bundle that transforms the page into a Single Page Application (SPA) for subsequent navigation.

- **Fast Post-load Navigation**

  Subsequent navigation within the site avoids full page reloads. Instead, the content is fetched and dynamically updated, providing a smooth user experience.

- **Efficient Asset Management**

  By integrating Vite's bundling capabilities, JaVite ensures that your assets are optimized for both development and production, reducing load times and improving performance.

## Why Use JaVite?

Using JaVite in your Java web applications brings numerous benefits:

- **Enhanced Developer Experience:** Take advantage of Vite's fast development server, HMR, and rich plugin ecosystem to improve your development workflow.
- **Modern Asset Management:** Easily manage and import modern JavaScript and CSS assets into your legacy applications.
- **Seamless Integration:** Use custom JSP tags and utility functions to incorporate Vite-generated assets effortlessly.
- **Environment Flexibility:** Supports both development and production environments with appropriate asset handling.
- **Scalable Structure:** The monorepo setup helps in managing multiple modules and packages efficiently.

## What About Legacy Integration?

JaVite is designed to integrate smoothly with legacy Java applications, bringing modern front-end practices without requiring a complete rewrite. This makes it an ideal solution for projects looking to modernize their user interface and development workflows incrementally.

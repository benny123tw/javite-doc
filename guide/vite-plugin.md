---
outline: deep
---

# Vite Plugin

The `vite-plugin-java` provides an out-of-the-box pre-configured Vite setup for Java projects.

## Installation

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

## Usage

Add the plugin to your Vite configuration file:

```js
import { defineConfig } from 'vite'
import java from 'vite-plugin-java'

export default defineConfig({
  plugins: [
    java({
      // Options
    })
  ]
})
```

Then, set up your entry files. You can use the [`createRollupInputConfig`](#createrollupinputconfig) utility function to create a Rollup input configuration based on the provided patterns.

The following example sets up each `main.ts` file in the `src` directory as an entry file:

```js
import { createRollupInputConfig } from 'vite-plugin-java'

export default defineConfig({
  plugins: [
    java({
      input: createRollupInputConfig('src/**/main.ts', 'src')
    })
  ]
})
```

Vite will now handle your entry files and output the assets and manifest file to the specified directory.
For more information, see: [Backend Integration](https://vitejs.dev/guide/backend-integration.html#backend-integration).

## Real World Example

Here's an example of a Vite configuration file for a Java project:

```js
import { defineConfig } from 'vite'
import java, { createRollupInputConfig } from 'vite-plugin-java'

export default defineConfig({
  build: {
    // same as option outputDirectory below
    outDir: '../server/src/main/webapp/WEB-INF/dist',

    // clear the external output directory before building
    emptyOutDir: true
  },
  plugins: [
    java({
      input: createRollupInputConfig('src/**/main.ts', 'src'),
      javaProjectBase: '../server',
      publicDirectory: 'public',
      
      // same as option build.outDir
      outputDirectory: '../server/src/main/webapp/WEB-INF/dist',
      buildDirectory: 'resources'
    })
  ]
})
```

You can see [benny123tw/vite-jsp-demo](https://github.com/benny123tw/vite-jsp-demo/blob/main/vite-demo/vite.config.ts) for a real-world example.

## Options

The `vite-plugin-java` plugin accepts the following options:

### `input`

- Type: `string | string[] | { [entryAlias: string]: string }`
- Required: `true`
- See also: [`createRollupInputConfig`](#createRollupInputConfig)

The entry file(s) of your Java project. This can be a single file, an array of files, or an object mapping entry aliases to files.

### `javaProjectBase`

- Type: `string`
- Default: `process.cwd()`

The base directory of your Java project. This is used to resolve the paths of your Java assets.

### `publicDirectory`

- Type: `string`
- Default: `public`

The directory where your public assets are located. This directory is served by Vite's development server and copied to the output directory during the build process.

### `outputDirectory`

- Type: `string`
- Default: `dist`

The directory where the Vite-generated assets are outputted. Same as the `outDir` option in the Vite configuration.

If you are using a Java framework like Spring MVC, you can set this option to the directory where your Java application serves static assets. For example, in a Spring MVC application:

```java
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.example",
        includeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, value = Controller.class))
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**") // Change this to the buildDirectory
                .addResourceLocations("/WEB-INF/dist/"); // Change this to the outputDirectory
    }

}
```

Also, if you set the `outputDirectory` or `outDir` to the external directory, you can use the `emptyOutDir` option to clear the external output directory before building.

```js
export default defineConfig({
  build: {
    outDir: '../server/src/main/webapp/WEB-INF/dist',
    emptyOutDir: true
  }
})

// or

export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  plugins: [
    java({
      outputDirectory: '../server/src/main/webapp/WEB-INF/dist',
    })
  ]
})
```

### `buildDirectory`

- Type: `string`
- Default: `resources`

The directory where the Vite-generated assets are served from in your Java application.

You can use this option to configure the resource handler in your Java application. For example, in a Spring MVC application:

```java
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.example",
        includeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, value = Controller.class))
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**") // Change this to the buildDirectory
                .addResourceLocations("/WEB-INF/dist/"); // Change this to the outputDirectory
    }

}
```

### `transformOnSave`

- Type: `(code: string, url: DevServerUrl) => string`

A function that transforms the code before saving it to the disk. This can be used to modify the output of the Vite build process.

## Utility Functions

### `createRollupInputConfig`

- Type: `(pattern: string, baseDir: string, options?: globby.GlobbyOptions) => { [entryAlias: string]: string }`

The `createRollupInputConfig` function creates a Rollup input configuration based on the provided patterns. This function fetches all the main entry files based on the provided pattern.

**Basic Example**:

```js
import { createRollupInputConfig } from 'vite-plugin-java'

export default defineConfig({
  plugins: [
    java({
      input: createRollupInputConfig('src/**/main.ts', 'src')
    })
  ]
})
```

### `readPropertiesFile`

- Type: `(pattern?: string | string[], options?: GlobOptions) => Map<string, string>`

The `readPropertiesFile` function reads a Java properties file and returns a `Map` of key-value pairs.

**Basic Example**:

```js
import { readPropertiesFile } from 'vite-plugin-java'

const properties = readPropertiesFile('src/main/resources/*.properties')
```

## Custom Base URLs

If your Vite compiled assets are deployed to a domain separate from your application, such as via a CDN, you must specify the `ASSET_URL` environment variable within your application's `.env` file:

```properties
ASSET_URL=https://cdn.example.com/
```

After configuring the asset URL, all re-written URLs to your assets will be prefixed with the configured value:

```markdown
https://cdn.example.com/build/assets/app.9dce8d17.js
```

Remember that absolute URLs are not re-written by Vite, so they will not be prefixed.

## Environment Variables

The `vite-plugin-java` plugin uses the following environment variables:

- `VITE_PORT`: The port number for the Vite development server. Default is `5137`.
- `VITE_DEV_SERVER_KEY`: The key used to certify the Vite development server.
- `VITE_DEV_SERVER_CERT`: The certificate used to certify the Vite development server.
- `APP_URL`: The URL of the Java application.
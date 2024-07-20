# Java Servlet Pages (JSP) Integration 🌐

The JaVite JSP integration allows you to use Vite in your Java web application with JSP templates.

## Installation

Add the `javite-webmvc` dependency to your project:

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

For more information, see the [Vite Plugin](/guide/vite-plugin) documentation.

## Usage

`JaVite` provides a custom JSP tag to include the Vite assets in your JSP templates. Add the following tag to your JSP file:

```html
<%@ taglib uri="http://javite.com/jsp" prefix="javite" %>
```

Then, include the Vite assets in your JSP file:

```html
<vite:import entry="src/main.ts" />
```

The `entry` attribute specifies the entry file for the Vite project. The tag will automatically detect the development or production environment and include the appropriate assets.

**Development Environment**

```html
<script type="module" src="http://localhost:5137/@vite/client"></script>
<script type="module" src="http://localhost:5137/src/main.ts"></script>
```

**Production Environment**

```html
<script type="module" src="/resource/main-4Ei20194.js"></script>
<link rel="stylesheet" href="/resource/style-4Ei20194.css" />
```

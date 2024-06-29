# Java Servlet Pages (JSP) Integration

The JaVite JSP integration allows you to use Vite in your Java web application with JSP templates.

## Installation

:::code-group
```groovy [build.gradle]
dependencies {
    implementation 'com.javite:javite-webmvc:0.1.3'
}
```

```kotlin [build.gradle.kts]
dependencies {
    implementation("com.javite:javite-webmvc:0.1.3")
}
```

```xml [pom.xml]
<dependency>
    <groupId>com.javite</groupId>
    <artifactId>javite-webmvc</artifactId>
    <version>0.1.3</version>
</dependency>
```
:::

For Java 8 support, please use `javite-webmvc-jre8`:

:::code-group
```groovy [build.gradle]
dependencies {
    implementation 'com.javite:javite-webmvc-jre8:0.1.3'
}
```

```kotlin [build.gradle.kts]
dependencies {
    implementation("com.javite:javite-webmvc-jre8:0.1.3")
}
```

```xml [pom.xml]
<dependency>
    <groupId>com.javite</groupId>
    <artifactId>javite-webmvc-jre8</artifactId>
    <version>0.1.3</version>
</dependency>
```
:::

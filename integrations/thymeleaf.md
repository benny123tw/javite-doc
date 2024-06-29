# Thymeleaf Integration

The JaVite Thymeleaf dialect allows you to use Vite in your Java web application with Thymeleaf templates. Ensure you have configured the dialect in your Spring configuration.

```html

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
# Troubleshooting

## Dependencies issues

Since `JaVite` module use `jackson` and `spring-boot-starter-web` dependencies, you may have some issues with the them.

For example, if you have an issue with the `log4j-to-slf4j` dependency, you can exclude it from the `JaVite` module and add it to your project.

```xml
<dependency>
  <groupId>com.javite</groupId>
  <artifactId>javite-webmvc-jre8</artifactId>
  <version>0.1.6</version>
  <exclusions>
    <exclusion>
      <groupId>org.apache.logging.log4j</groupId>
      <artifactId>log4j-to-slf4j</artifactId>
    </exclusion>
  </exclusions>
</dependency>
```

Another example is the `jackson` dependency. If you have an issue with the `jackson` dependency, you may check your `jackson` version and make sure the version of `jackson-core` has to be the compatible with `jackson-databind` that `JaVite` module uses.

```xml
<properties>
  <jackson.version>2.17.2</jackson.version>
</properties>

<dependencies>
  <dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>${jackson.version}</version>
  </dependency>

  <dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>${jackson.version}</version>
  </dependency>
</dependencies>
```

## Configuration

### properties name in the properties file

In the [the properties file example](/guide/index#2-configure-javite), we wrote the properties name with `-` in the name. This is only works in Spring boot project. If you are using a traditional Spring project, you should use camel case in the properties name.

```properties
vite.debug=true
vite.manifestPath=/WEB-INF/dist/.vite/manifest.json
vite.localServerUrl=http://localhost:5173
vite.resourcePath=/resources
```
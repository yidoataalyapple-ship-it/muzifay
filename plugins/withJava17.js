const { withGradleProperties } = require('@expo/config-plugins');

module.exports = function withJava17(config) {
  return withGradleProperties(config, (config) => {
    // Remove existing org.gradle.java.home if present
    config.modResults = config.modResults.filter(
      (item) => !(item.type === 'property' && item.key === 'org.gradle.java.home')
    );

    // Add Java 17 path
    config.modResults.push({
      type: 'property',
      key: 'org.gradle.java.home',
      value: '/usr/lib/jvm/java-17-openjdk-amd64',
    });

    return config;
  });
};

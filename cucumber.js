module.exports = {
  default: {
    require: ['features/step_definitions/**/*.ts'],  // Path to your step definitions
    format: [
      '@serenity-js/cucumber',                      // Serenity/JS formatter for interaction with Serenity BDD
     // 'json:target/site/serenity/cucumber_report.json',          // JSON formatter to generate Cucumber JSON report
      'progress'                                    // Shows progress in the console while tests run
    ],
    formatOptions: {
      specDirectory: './features'
  },
    parallel: 1,                                    // Optional: Use 1 if you don’t want to run tests in parallel
    requireModule: ['ts-node/register'],            // Required to handle TypeScript step definitions
    defaultTimeout: 60 * 1000,                      // Timeout for each step in milliseconds
  }
};


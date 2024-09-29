module.exports = {
    default: {
      require: ['features/step_definitions/**/*.ts'], // Path to your step definitions
      format: [
        '@serenity-js/cucumber',
        'progress'
      ],
      parallel: 1,  // Remove 'publishQuiet' as it's deprecated
      requireModule: ['ts-node/register'],  // Ensures TypeScript support
    }
  };
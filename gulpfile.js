'use strict';

const build = require('@microsoft/sp-build-web');
const fs = require('fs');
const path = require('path');

// Suppress SASS camelCase warning
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

// Replace 'serve' with 'serve-deprecated'
const getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  const result = getTasks.call(build.rig);
  result.set('serve', result.get('serve-deprecated'));
  return result;
};

const ENV = process.env.BUILD_ENV || 'dev';
console.log(`Current environment: ${ENV}`);

const configFilePath = path.resolve(__dirname, `config/env/config.${ENV}.json`);
const outputTsFilePath = path.resolve(__dirname, 'src/env/generatedConfig.ts');

const generateConfigTask = build.task('generate-config', {
  execute: () => {
    if (!fs.existsSync(configFilePath)) {
      return Promise.reject(`Missing config file: ${configFilePath}`);
    }

    const configJson = fs.readFileSync(configFilePath, 'utf8');
    const configObject = JSON.parse(configJson);

    const outputTs = `// This file is auto-generated from ${path.basename(configFilePath)}
export const EnvConfig = ${JSON.stringify(configObject, null, 2)};\n`;

    // Only write if content has changed (prevents infinite loop)
    let shouldWrite = true;
    if (fs.existsSync(outputTsFilePath)) {
      const existingContent = fs.readFileSync(outputTsFilePath, 'utf8');
      if (existingContent === outputTs) {
        shouldWrite = false;
      }
    }

    if (shouldWrite) {
      fs.mkdirSync(path.dirname(outputTsFilePath), { recursive: true });
      fs.writeFileSync(outputTsFilePath, outputTs, 'utf8');
      console.log(`Config written to ${outputTsFilePath}`);
    } 

    return Promise.resolve();
  }
});

// Inject the task before build starts
build.rig.addPreBuildTask(generateConfigTask);

build.initialize(require('gulp'));
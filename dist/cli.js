#!/usr/bin/env node
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var argparse_1 = require("argparse");
var debug = require("debug");
var fs = require("fs");
var path_1 = require("path");
var path = require("path");
var ts = require("typescript");
var YAML = require("yamljs");
var config_1 = require("./config");
var metadataGenerator_1 = require("./metadata/metadataGenerator");
var generator_1 = require("./swagger/generator");
var debugLog = debug('typescript-rest-swagger');
var packageJson = require("../package.json");
var workingDir = process.cwd();
var versionDefault = getPackageJsonValue('version');
var nameDefault = getPackageJsonValue('name');
var descriptionDefault = getPackageJsonValue('description');
var licenseDefault = getPackageJsonValue('license');
var parser = new argparse_1.ArgumentParser({
    addHelp: true,
    description: 'Typescript-REST Swagger tool',
    version: packageJson.version
});
parser.addArgument(['-c', '--config'], {
    help: 'The swagger config file (swagger.json or swagger.yml or swaggerCongig.js).'
});
parser.addArgument(['-t', '--tsconfig'], {
    action: 'storeTrue',
    defaultValue: false,
    help: 'Load tsconfig.json file',
});
parser.addArgument(['-p', '--tsconfig_path'], {
    help: 'The tsconfig file (tsconfig.json) path. Default to {cwd}/tsconfig.json.',
});
var parameters = parser.parseArgs();
var config = getConfig(parameters.config);
var compilerOptions = getCompilerOptions(parameters.tsconfig, parameters.tsconfig_path);
debugLog('Starting Swagger generation tool');
debugLog('Compiler Options: %j', compilerOptions);
var swaggerConfig = validateSwaggerConfig(config.swagger);
debugLog('Swagger Config: %j', swaggerConfig);
debugLog('Processing Services Metadata');
var metadata = new metadataGenerator_1.MetadataGenerator(swaggerConfig.entryFile, compilerOptions, swaggerConfig.ignore).generate();
debugLog('Generated Metadata: %j', metadata);
new generator_1.SpecGenerator(metadata, swaggerConfig).generate()
    .then(function () {
    console.info('Generation completed.');
})
    .catch(function (err) {
    console.error("Error generating swagger. ".concat(err));
});
function getPackageJsonValue(key) {
    try {
        var projectPackageJson = require("".concat(workingDir, "/package.json"));
        return projectPackageJson[key] || '';
    }
    catch (err) {
        return '';
    }
}
function getConfig(configPath) {
    if (configPath === void 0) { configPath = 'swagger.json'; }
    var configFile = "".concat(workingDir, "/").concat(configPath);
    if (configFile.endsWith('.yml') || configFile.endsWith('.yaml')) {
        return YAML.load(configFile);
    }
    else if (configFile.endsWith('.js')) {
        return require(path.join(configFile));
    }
    else {
        return JSON.parse(fs.readFileSync(configFile).toString('utf8'));
    }
}
function validateSwaggerConfig(conf) {
    if (!conf.outputDirectory) {
        throw new Error('Missing outputDirectory: onfiguration most contain output directory');
    }
    if (!conf.entryFile) {
        throw new Error('Missing entryFile: Configuration must contain an entry point file.');
    }
    conf.version = conf.version || versionDefault;
    conf.name = conf.name || nameDefault;
    conf.description = conf.description || descriptionDefault;
    conf.license = conf.license || licenseDefault;
    conf.yaml = conf.yaml === false ? false : true;
    conf.outputFormat = conf.outputFormat ? config_1.Specification[conf.outputFormat] : config_1.Specification.Swagger_2;
    return conf;
}
function getCompilerOptions(loadTsconfig, tsconfigPath) {
    if (!loadTsconfig && tsconfigPath) {
        loadTsconfig = true;
    }
    if (!loadTsconfig) {
        return {};
    }
    var cwd = process.cwd();
    var defaultTsconfigPath = (0, path_1.join)(cwd, 'tsconfig.json');
    tsconfigPath = tsconfigPath
        ? getAbsolutePath(tsconfigPath, cwd)
        : defaultTsconfigPath;
    try {
        var tsConfig = require(tsconfigPath);
        if (!tsConfig) {
            throw new Error('Invalid tsconfig');
        }
        return tsConfig.compilerOptions
            ? ts.convertCompilerOptionsFromJson(tsConfig.compilerOptions, cwd).options
            : {};
    }
    catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            throw Error("No tsconfig file found at '".concat(tsconfigPath, "'"));
        }
        else if (err.name === 'SyntaxError') {
            throw Error("Invalid JSON syntax in tsconfig at '".concat(tsconfigPath, "': ").concat(err.message));
        }
        else {
            throw Error("Unhandled error encountered loading tsconfig '".concat(tsconfigPath, "': ").concat(err.message));
        }
    }
}
function getAbsolutePath(p, basePath) {
    if ((0, path_1.isAbsolute)(p)) {
        return p;
    }
    else {
        return (0, path_1.join)(basePath, p);
    }
}

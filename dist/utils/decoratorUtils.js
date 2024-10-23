"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecorators = getDecorators;
exports.getDecoratorName = getDecoratorName;
exports.getDecoratorTextValue = getDecoratorTextValue;
exports.getDecoratorOptions = getDecoratorOptions;
exports.isDecorator = isDecorator;
var ts = require("typescript");
var metadataGenerator_1 = require("../metadata/metadataGenerator");
function getDecorators(node, isMatching) {
    if (!ts.canHaveDecorators(node)) {
        return [];
    }
    var decorators = ts.getDecorators(node);
    if (!decorators || !decorators.length) {
        return [];
    }
    return decorators
        .map(function (d) {
        var result = {
            arguments: [],
            typeArguments: []
        };
        var x = d.expression;
        if (ts.isCallExpression(x)) {
            if (x.arguments) {
                result.arguments = x.arguments.map(function (argument) {
                    if (ts.isStringLiteral(argument)) {
                        return argument.text;
                    }
                    else if (ts.isNumericLiteral(argument)) {
                        return argument.text;
                    }
                    else {
                        return argument;
                    }
                });
            }
            if (x.typeArguments) {
                result.typeArguments = x.typeArguments;
            }
            x = x.expression;
        }
        result.text = x.text || x.name.text;
        return result;
    })
        .filter(isMatching);
}
function getDecorator(node, isMatching) {
    var decorators = getDecorators(node, isMatching);
    if (!decorators || !decorators.length) {
        return undefined;
    }
    return decorators[0];
}
function getDecoratorName(node, isMatching) {
    var decorator = getDecorator(node, isMatching);
    return decorator ? decorator.text : undefined;
}
function getDecoratorTextValue(node, isMatching) {
    var decorator = getDecorator(node, isMatching);
    if (!decorator || !decorator.arguments.length) {
        return undefined;
    }
    var arg = decorator.arguments[0];
    if (typeof arg === 'string') {
        return arg;
    }
    if (ts.isStringLiteral(arg)) {
        return arg.text;
    }
    if (ts.isIdentifier(arg) || ts.isPropertyAccessExpression(arg)) {
        var symbol = metadataGenerator_1.MetadataGenerator.current.typeChecker.getSymbolAtLocation(arg);
        if (symbol && symbol.valueDeclaration) {
            var declaration = symbol.valueDeclaration;
            if (ts.isVariableDeclaration(declaration) || ts.isPropertyDeclaration(declaration)) {
                if (declaration.initializer && ts.isStringLiteral(declaration.initializer)) {
                    return declaration.initializer.text;
                }
            }
        }
    }
    return undefined;
    // return decorator && typeof decorator.arguments[0] === 'string' ? decorator.arguments[0] as string : undefined;
}
function getDecoratorOptions(node, isMatching) {
    var decorator = getDecorator(node, isMatching);
    return decorator && typeof decorator.arguments[1] === 'object' ? decorator.arguments[1] : undefined;
}
function isDecorator(node, isMatching) {
    var decorators = getDecorators(node, isMatching);
    if (!decorators || !decorators.length) {
        return false;
    }
    return true;
}

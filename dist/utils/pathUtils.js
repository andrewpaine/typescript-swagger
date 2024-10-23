'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePath = normalizePath;
function normalizePath(path) {
    if (!path) {
        return path;
    }
    var parts = path.split('/');
    parts = parts.map(function (part) { return part.startsWith(':') ? "{".concat(part.slice(1), "}") : part; });
    return parts.join('/');
}

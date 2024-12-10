import fs from 'fs';
import path from 'path';
import { DynamicLineClassificationEngine } from './src/core/classifiers/line-classifier';
import { classifyFile, determineLanguage, printFileResults } from './src/utils';
import {
    registerJavaClassifiers,
    registerPythonClassifiers,
} from './src/languages';

// Initialize and register classifiers
const classificationEngine = new DynamicLineClassificationEngine();
registerJavaClassifiers(classificationEngine);
registerPythonClassifiers(classificationEngine);

// Process a directory or file
export function processInput(inputPath: string): Record<
    string,
    { counts: Record<string, number>; total: number }
> {
    const stats = fs.statSync(inputPath);

    const results: Record<
        string,
        { counts: Record<string, number>; total: number }
    > = {};

    if (stats.isFile()) {
        const language = determineLanguage(inputPath);
        if (!language) {
            console.log(`Skipping unsupported file: ${inputPath}`);
            return results;
        }
        results[inputPath] = classifyFile(
            inputPath,
            language,
            classificationEngine,
        );
    } else if (stats.isDirectory()) {
        processDirectory(inputPath, results);
    } else {
        console.error(
            'Invalid input path. Please provide a file or directory.',
        );
        return results;
    }

    return results;
}

// Process a directory recursively
function processDirectory(
    dirPath: string,
    results: Record<string, { counts: Record<string, number>; total: number }>,
): void {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
            processDirectory(itemPath, results);
        } else if (stats.isFile()) {
            const language = determineLanguage(itemPath);
            if (language) {
                results[itemPath] = classifyFile(
                    itemPath,
                    language,
                    classificationEngine,
                );
            }
        }
    }
}

// Read input from CLI and run the program
const inputPath = process.argv[2];
if (require.main === module) {
    if (!inputPath) {
        console.error('Usage: node index.js <file-or-directory-path>');
        process.exit(1);
    }

    const results = processInput(inputPath);
    // Print file-wise results
    printFileResults(results);
}

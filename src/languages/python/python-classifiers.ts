import { DynamicLineClassificationEngine, registerBaseClassifiers } from '../../core/classifiers';

export function registerPythonClassifiers(
    classificationEngine: DynamicLineClassificationEngine,
): void {
    registerBaseClassifiers('python', classificationEngine);

    classificationEngine.registerClassifier({
        id: 'import-classifier',
        name: 'Import Classifier',
        validator: (line) => /^\s*(import|from)\s+/.test(line.trim()),
        lineTypeId: 'IMPORT',
        language: 'python',
        priority: 90,
    });

    classificationEngine.registerClassifier({
        id: 'comment-classifier',
        name: 'Comment Classifier',
        validator: (line) => /^\s*#/.test(line.trim()),
        lineTypeId: 'COMMENT',
        language: 'python',
        priority: 80,
    });
}

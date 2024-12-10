import { DynamicLineClassificationEngine, registerBaseClassifiers } from '../../core/classifiers';

export function registerJavaClassifiers(
    classificationEngine: DynamicLineClassificationEngine,
): void {
    registerBaseClassifiers('java', classificationEngine);

    classificationEngine.registerClassifier({
        id: 'comment-classifier',
        name: 'Comment Classifier',
        validator: (line) => /^\s*\/\//.test(line.trim()),
        lineTypeId: 'COMMENT',
        language: 'java',
        priority: 80,
    });
}

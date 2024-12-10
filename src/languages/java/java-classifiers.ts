import { DynamicLineClassificationEngine, registerBaseClassifiers } from '../../core/classifiers';

export function registerJavaClassifiers(
    classificationEngine: DynamicLineClassificationEngine,
): void {
    registerBaseClassifiers('java', classificationEngine);

    classificationEngine.registerClassifier({
        id: 'single-line-comment-classifier',
        name: 'Single Line Comment Classifier',
        validator: (line) => /^\s*\/\//.test(line.trim()),
        lineTypeId: 'COMMENT',
        language: 'java',
        priority: 80,
    });

    classificationEngine.registerClassifier({
        id: 'multi-line-comment-classifier',
        name: 'Multi-line Comment Classifier',
        validator: (line, state) => {
            if (state.insideMultiLineComment) {
                // If inside a multi-line comment, all lines are considered part of it
                if (line.trim().endsWith('*/')) {
                    state.insideMultiLineComment = false; // End of multi-line comment
                    return true;
                }
                return true; // In-between multi-line comment
            }

            // Check if the line starts a multi-line comment
            if (line.trim().startsWith('/*')) {
                state.insideMultiLineComment = true;
                return true;
            }

            return false; // Not a multi-line comment line
        },
        lineTypeId: 'MULTI_LINE_COMMENT',
        language: 'java',
        priority: 70,
    });
}

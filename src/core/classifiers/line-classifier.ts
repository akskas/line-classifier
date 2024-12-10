import { LineClassifier } from '../../interfaces/line-classifier.interface';
import { BaseLineType } from '../../interfaces/line-type.interface';

export class DynamicLineClassificationEngine {
    private classifiers: Map<string, LineClassifier[]> = new Map();
    private state: { insideMultiLineComment: boolean } = { insideMultiLineComment: false };

    constructor() {}

    registerClassifier(classifier: LineClassifier): void {
        if (!this.classifiers.has(classifier.language!)) {
            this.classifiers.set(classifier.language!, []);
        }

        // Add the classifier for the specified language
        this.classifiers.get(classifier.language!)?.push(classifier);

        // Sort the classifiers for this language based on priority
        const sortedClassifiers = this.classifiers.get(classifier.language!)?.sort(
            (a, b) => (b.priority || 0) - (a.priority || 0)
        );

        // Update the language-specific classifiers map with sorted classifiers
        if (sortedClassifiers) {
            this.classifiers.set(classifier.language!, sortedClassifiers);
        }
    }

    classifyLine(language: string, line: string): BaseLineType {
        const languageClassifiers = this.classifiers.get(language);

        for (const classifier of languageClassifiers || []) {
            if (classifier.validator(line, this.state)) {
                return {
                    id: classifier.lineTypeId,
                    name: classifier.name,
                    description: `${classifier.name} description`,
                };
            }
        }

        // Default to 'CODE' type if no classifier matches
        return {
            id: 'CODE',
            name: 'Code Line',
            description: 'Executable code line that could not be classified otherwise',
        };
    }
}

import { DynamicLineClassificationEngine } from '../../core/classifiers/line-classifier';

export function registerBaseClassifiers(
    language: string,
    classificationEngine: DynamicLineClassificationEngine,
): void {
    classificationEngine.registerClassifier({
        id: 'blank-line-classifier',
        name: 'Blank Line Classifier',
        validator: (line: string) => line.trim() === '',
        lineTypeId: 'BLANK',
        language: language,
        priority: 110, 
    });
}

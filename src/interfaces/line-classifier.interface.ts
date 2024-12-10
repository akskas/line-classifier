export interface LineClassifier {
    id: string;
    name: string;
    validator: (line: string) => boolean;
    priority?: number;
    lineTypeId: string;
    language?: string;
}

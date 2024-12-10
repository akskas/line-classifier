export interface LineClassifier {
    id: string;
    name: string;
    validator: (line: string, state: any) => boolean;
    priority?: number;
    lineTypeId: string;
    language?: string;
}

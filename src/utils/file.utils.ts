import fs from 'fs';
import { DynamicLineClassificationEngine } from '../core/classifiers/line-classifier';

export function classifyFile(
    filePath: string,
    language: string,
    engine: DynamicLineClassificationEngine,
): { counts: Record<string, number>; total: number } {
    const lineCounts: Record<string, number> = {};
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    let totalLines = 0;

    for (const line of lines) {
        const lineType = engine.classifyLine(language, line);
        const typeName = `${language}_${lineType.id}`;
        lineCounts[typeName] = (lineCounts[typeName] || 0) + 1;
        totalLines++;
    }

    return { counts: lineCounts, total: totalLines };
}

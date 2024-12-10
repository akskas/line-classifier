export function printFileResults(
    results: Record<string, { counts: Record<string, number>; total: number }>,
): void {
    console.log('Classification Results:\n');
    for (const [filePath, result] of Object.entries(results)) {
        console.log(`File: ${filePath}`);
        for (const [type, count] of Object.entries(result.counts)) {
            console.log(`  ${type.toUpperCase()}: ${count}`);
        }
        console.log(`  Total Lines: ${result.total}\n`);
    }
}

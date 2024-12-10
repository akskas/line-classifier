import path from 'path';

// Supported languages and their extensions
const languageExtensions: Record<string, string[]> = {
    java: ['.java'],
    python: ['.py'],
};

// Determine the language of a file based on its extension
export function determineLanguage(filePath: string): string | undefined {
    const ext = path.extname(filePath).toLowerCase();
    for (const [language, extensions] of Object.entries(languageExtensions)) {
        if (extensions.includes(ext)) {
            return language;
        }
    }
    return undefined;
}

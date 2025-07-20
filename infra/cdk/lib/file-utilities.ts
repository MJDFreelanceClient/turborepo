import * as fs from 'fs';
import * as path from 'path';

/**
 * Recursively traverses folders to find and collect JSON files with a specific name.
 * @param {string} startDir - The root directory to start from.
 * @param {string} targetFileName - The JSON file name to look for.
 * @param {number} [maxDepth=0] - The maximum depth to traverse.
 * @returns {Object[]} - An array of parsed JSON objects.
 */
export function collectJsonObjects(startDir: string, targetFileName: string, maxDepth: number = 5): any[] {
    const jsonObjects: any[] = [];

    function traverse(currentDir: string, depth: number = 0) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);

            if (entry.isDirectory() && entry.name!=="node_modules" && (depth < maxDepth)) {
                traverse(fullPath, depth + 1);
            } else if (entry.isFile() && entry.name === targetFileName) {
                try {
                    const fileContent = fs.readFileSync(fullPath, 'utf8');
                    const jsonObject = JSON.parse(fileContent);
                    jsonObjects.push(jsonObject);
                } catch (err: any) {
                    console.error(`Failed to read or parse JSON at ${fullPath}:`, err.message);
                }
            }
        }
    }

    traverse(startDir);
    return jsonObjects;
}

export function normalizeByName<T extends { name: string }>(arr: T[]): Record<string, T> {
    return Object.fromEntries(arr.map(obj => [obj.name, obj]));
}

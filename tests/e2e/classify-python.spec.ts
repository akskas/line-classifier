import { processInput } from '../../index';

describe('Python File Classification', () => {
    it('should classify the Python file correctly', () => {
        const inputPath = './examples/test.py';
        const results = processInput(inputPath);

        expect(results[inputPath].counts).toEqual({
            COMMENT: 4,
            IMPORT: 2,
            BLANK: 2,
            CODE: 4
        });
        expect(results[inputPath].total).toBe(12);
    });
});
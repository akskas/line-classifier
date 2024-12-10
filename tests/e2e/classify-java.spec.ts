import { processInput } from '../../index';

describe('File Classification', () => {
    it('should classify the Java file correctly', () => {
        const inputPath = './examples/Test.java';
        const results = processInput(inputPath);
        expect(results[inputPath].counts).toEqual({
            CODE: 6,
            COMMENT: 3,
            BLANK: 3,
        });
        expect(results[inputPath].total).toBe(12);
    });
});

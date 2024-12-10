import { processInput } from '../../index';

describe('File Classification', () => {
    it('should classify the Java file correctly', () => {
        const inputPath = './examples/sample-java-project/Multiline.java';
        const results = processInput(inputPath);
        expect(results[inputPath].counts).toEqual({
            CODE: 6,
            COMMENT: 1,
            BLANK: 3,
            MULTI_LINE_COMMENT: 9
        });
        expect(results[inputPath].total).toBe(19);
    });
});
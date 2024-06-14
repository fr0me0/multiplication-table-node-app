import fs from 'fs';
import { SaveFile } from './save-file.use-case';

describe('Test save-file.use-case.ts', () => {
    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name',
    };
    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    // Limpieza del antes de cada prueba
    afterEach(() => {
        const outputFolderExists = fs.existsSync('outputs');
        if (outputFolderExists) fs.rmSync('outputs', { recursive: true });

        const customOutputFolderExists = fs.existsSync(customOptions.fileDestination);
        if (customOutputFolderExists) fs.rmSync(customOptions.fileDestination, { recursive: true });
    });

    test('Should save file with default values', () => {
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content',
        };
        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath); // Puede ser falso positivo si ya fue creado el archivo
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });

    test('Should save file with custom values', () => {
        const saveFile = new SaveFile();

        const result = saveFile.execute(customOptions);
        const fileExists = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' });

        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(customOptions.fileContent);
    });

    test('Should return false if directory could not be created', () => {

    });
});
import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

// Contendrá la lógica del servidor
interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    fileDestination: string;
    fileName: string;
}

export class ServerApp {
    static run({
        base,
        limit,
        showTable,
        fileDestination,
        fileName
    }: RunOptions) {
        console.log('Server running....');

        const table = new CreateTable().execute({ base, limit });
        const wasCreated = new SaveFile()
            .execute({
                fileContent: table,
                fileDestination,
                fileName
            });

        if (showTable) console.log(table);

        (wasCreated)
            ? console.log('File created!')
            : console.error('File not created!');
    };
};
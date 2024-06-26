import { CreateTable } from './create-table.use-case';

describe('Test create-table.use-case.ts', () => {
    test('Should create table with default values', () => {
        const createTable = new CreateTable();
        const table = createTable.execute({base: 2});
        const rows = table.split('\n').length;

        // console.log(table);

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain('2 x 1 = 2');
        expect(table).toContain('2 x 10 = 20');
        // expect(rows).toBe(11) // Uno mas por el salto de linea
        expect(rows).toBe(10) // Despues de cambiar el salto de linea
    });

    test('Should create table with custom values', () => {
        const options = {
            base: 3,
            limit: 20,
        };
        const createTable = new CreateTable();
        const table = createTable.execute(options);
        const rows = table.split('\n').length;

        expect(rows).toBe(options.limit);
        expect(table).toContain(`${options.base} x`);
    });
});
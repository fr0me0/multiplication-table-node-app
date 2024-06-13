import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

const { b: base, l: limit, s: showTable } = yarg;

// console.log(yarg);

let outputMessage = '';
const headerMessage =
    `=====================
    Tabla ${base}
=====================\n
`

for (let i = 1; i <= limit; i++) {
    outputMessage += `${base} x ${i} = ${base * i}\n`;
}

outputMessage = headerMessage + outputMessage;

if (showTable) {
    console.log(outputMessage);
}

const outputPath = `outputs`;

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);
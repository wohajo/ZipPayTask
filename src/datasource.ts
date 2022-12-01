import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

const AppDataSource = new DataSource(
  JSON.parse(
    fs.readFileSync(path.resolve(__dirname, './ormconfig.json')).toString(),
  ),
);

export default AppDataSource;

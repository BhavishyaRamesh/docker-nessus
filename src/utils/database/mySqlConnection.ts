
import { createPool } from 'mysql';
import { config } from '../common/config';

export const connection = createPool(config.mysql);

export function getConnection() {
    return  Promise.resolve(connection);
}
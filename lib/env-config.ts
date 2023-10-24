import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({path: path.resolve(__dirname, '../.env')});

export type ConfigProps = {
    STAGE: string;
    MONGO_URL: string;
    OPENAI_API_KEY: string;
    SAGE_MAKER_ENDPOINT: string;
}

export const config = {
    STAGE: process.env.STAGE!,
    MONGO_URL: process.env.MONGO_URL!,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
    SAGE_MAKER_ENDPOINT: process.env.SAGE_MAKER_ENDPOINT!
}
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// creates a Neon connection string using environment variables
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

// this sql object can be used to run SQL queries against the Neon database
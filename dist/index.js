"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const zod_1 = require("zod");
const client = new pg_1.Client({
    connectionString: 'postgresql://ballylondhe20:1K0BCuSZHpkG@ep-aged-brook-a5ynef01.us-east-2.aws.neon.tech/myProject?sslmode=require'
});
function usersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect().then(() => {
            console.log('dB connected for query');
        });
        const result = yield client.query(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
    `);
        console.log(result);
    });
}
function InsertUsers(Uname, Uemail, Upass) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect().then(() => console.log('dB connected'));
        const insertQuery = `INSERT INTO users (username, email, password) VALUES ('${Uname}','${Uemail}','${Upass}')`;
        const res = yield client.query(insertQuery).then(() => {
            console.log('success adding query');
        });
        client.end();
    });
}
function updateUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect().then(() => console.log('dB connected'));
        const updateQuery = `UPDATE users SET username='TestUser' WHERE id='6'`;
        yield client.query(updateQuery).then(() => console.log('success adding query'));
        client.end();
    });
}
function deleteUsers(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect().then(() => console.log('dB connected'));
        const deleteQuery = `DELETE FROM users WHERE id='${id}'`;
        yield client.query(deleteQuery).then(() => console.log('success adding query'));
        client.end();
    });
}
const emailSchema = zod_1.z.string().email();
function showUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const userEmail = emailSchema.safeParse(email);
        yield client.connect().then(() => console.log('dB coonected'));
        if (!userEmail.success) {
            console.log('Wrong email');
        }
        else {
            const result = yield client.query(`SELECT * FROM users WHERE email='${email}'`);
            console.log(result.rows[0]);
        }
        client.end();
    });
}
showUser("arjun@email.com");

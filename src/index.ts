import { Client } from 'pg';
import {z} from 'zod';

const client  = new Client({
    connectionString:'postgresql://ballylondhe20:1K0BCuSZHpkG@ep-aged-brook-a5ynef01.us-east-2.aws.neon.tech/myProject?sslmode=require'
})





async function usersTable() {
    await client.connect().then(()=>{
        console.log('dB connected for query')
    })
    const result = await client.query(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
    `)
    console.log(result)


    
}

async function InsertUsers(Uname:string,Uemail:string,Upass:string) {
   
    await client.connect().then(()=> console.log('dB connected'))
    const insertQuery = `INSERT INTO users (username, email, password) VALUES ('${Uname}','${Uemail}','${Upass}')`
    const res = await  client.query(insertQuery).then(()=>{
        console.log('success adding query')
    })
    
    client.end();
    

    
}

async function updateUsers() {
    await client.connect().then(()=> console.log('dB connected'));
    const updateQuery = `UPDATE users SET username='TestUser' WHERE id='6'`
    await client.query(updateQuery).then(()=> console.log('success adding query'))
    client.end();
    
}
async function deleteUsers(id:string) {
    await client.connect().then(()=> console.log('dB connected'));
    const deleteQuery = `DELETE FROM users WHERE id='${id}'`
    await client.query(deleteQuery).then(()=> console.log('success adding query'))
    client.end();
    
}

const emailSchema:any = z.string().email();

async function showUser(email:string) {
    const userEmail= emailSchema.safeParse(email);

    
    await client.connect().then(()=> console.log('dB coonected'))
    if (!userEmail.success) {
        console.log('Wrong email')
        
    }
    else{

        const result = await client.query(`SELECT * FROM users WHERE email='${email}'`)
        console.log(result.rows[0])
    }
    

    client.end();

    
}
showUser("arjun@email.com")



import { db } from "@vercel/postgres";

// Conecting to the database
const client = await db.connect();

// Async function to execute a SQL query
async function listInvoices() {
    const data = await client.sql`
        SELECT invoices.amount, customers.name
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        WHERE invoices.amount = 666;
    `;

    return data.rows;
}

export async function GET() {
    try {
        // Returning the result from the SQL query
        return Response.json(await listInvoices());
    } catch (error) {
        // In the case of an error, returning and error
        return Response.json({ error }, { status: 500 });
    }
}
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    const data = await request.json();
    const filePath = path.join(process.cwd(), 'contact_mail.json');

    // Read existing data
    let existingData = [];
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        existingData = JSON.parse(fileData);
    }

    // Append new data
    existingData.push(data);

    // Write updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });
}

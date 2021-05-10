// This is a test API endpoint for testing the employee adding form. It tries to
// replicate live API's expected behavior and responses. There is a designated
// server key that needs to match whatever the user provides, otherwise the data
// will not be added to the database.
//
// Note that the security of this process should be greatly improved on the live
// API.
//
// POST /api/employees

import { Employee } from '@/components/employees/EmployeeData';
import { NextApiRequest, NextApiResponse } from 'next';

import * as path from 'path';
import * as fs from 'fs';

type EmployeeWithAuthCode = Employee & { authCode: string };

const SERVER_SECRET = 'are-ya-winning-watson'; // devserver secret
const DB_PATH = path.join(process.cwd(), 'temp', 'employees.json');

const randomString = (len: number): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

  let output = '';

  for (let i = 0; i < len; i++) {
    output += chars[Math.floor(Math.random() * chars.length)];
  }

  return output;
};

// This is literally the hackiest code I have ever written but it works and it's
// not important anyway.
const parseBody = (input: string) => {
  const obj = {};

  input
    .replace(/\r/g, '')
    .split(/------.+/g)
    .slice(1)
    .forEach(item => {
      const rows = item.split('\n');
      const key = rows[1].split('"')[1];
      const isImage = [ 'photo', 'idScan' ].includes(key);

      if (!key || isImage) {
        return;
      }

      const value =  rows.slice(2).join('\n').trim();
      obj[key] = value;
    });

  return obj;
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb'
    }
  }
};

export default async function addEmployee(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      code: 405,
      message: 'Only POST method is allowed.'
    });
  }

  const fields: EmployeeWithAuthCode = parseBody(req.body) as EmployeeWithAuthCode;

  if (fields.authCode !== SERVER_SECRET) {
    return res.status(403).json({
      code: 403,
      message: 'Incorrect server secret.'
    });
  }

  delete fields.authCode;

  const employeeId = randomString(6);
  const uniqueId = randomString(10);

  const db = fs.existsSync(DB_PATH)
    ? JSON.parse(fs.readFileSync(DB_PATH, { encoding: 'utf8' }))
    : [];

  fields.photo = 'https://i.imgur.com/PrgFA6p.jpg';
  fields.idScan = 'https://crouton.net';

  db.push({
    employeeId,
    uniqueId,
    ...fields
  });

  fs.writeFileSync(DB_PATH, JSON.stringify(db), { encoding: 'utf8' });

  return res.json({
    code: 0,
    message: 'success',
    data: {
      employee_id: employeeId,
      unique_id: uniqueId
    }
  });
};

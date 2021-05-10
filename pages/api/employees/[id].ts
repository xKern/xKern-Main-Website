// This is a test API endpoints for testing employee data fetching. It tries to
// replicate the live API's expected behavior and responses.
//
// GET /api/employees/:id

import { NextApiRequest, NextApiResponse } from 'next';

import * as path from 'path';
import * as fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'temp', 'employees.json');

export default function get(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const db = fs.existsSync(DB_PATH)
    ? JSON.parse(fs.readFileSync(DB_PATH, { encoding: 'utf8' }))
    : [];

  const targetEmployee = db.find(employee => employee.employeeId === id);
  if (!targetEmployee) {
    return res.status(404).json({
      code: 404,
      message: 'Employee not found.'
    });
  }

  return res.json({
    code: 0,
    message: 'success',
    data: targetEmployee
  });
};


## Installation
git clone <repository-url>
cd leave-management-system

### Install dependencies
npm install

## Environment Variables
Create a `.env` file by copying `.env.example`.

Add your Supabase credentials:
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

## Database Setup

Open the SQL Editor in Supabase and execute:

```sql
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    leave_balance INT NOT NULL DEFAULT 10
);

CREATE TABLE leaves (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL
        REFERENCES employees(id)
        ON DELETE CASCADE,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    days INT NOT NULL,
    reason TEXT NOT NULL,
    leave_status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## Seed the Database

Insert one employee into the `employees` table.

Example:

| name | username | leave_balance |
|------|----------|---------------|
| Ajay |   ajay   |       10      |

---

## Start the Project
npm run dev


## Notes

- Employee Login is mocked.
- Admin Login is mocked.
- The application is designed for **one employee and one admin**.
- In case if you feel this process is lengthy, I made it simple for you by deploying it in vercel
- You can check it out here 
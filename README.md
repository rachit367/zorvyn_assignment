# Finance Dashboard Backend

Backend API for managing financial transactions and user roles, built with Node.js, Express, and MongoDB.

## Setup

1. Add your `.env` file in the root folder. You need:
   ```
   PORT=3000
   MONGO_URI=your_mongo_url
   JWT_SECRET=your_jwt_secret
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the server:
   ```bash
   npm start
   ```

*Note: When the server starts, it automatically seeds 3 test users if they don't exist: `admin@test.com`, `analyst@test.com`, and `viewer@test.com` (all using password `123456`).*

## API Overview

**Auth**
- `POST /api/auth/register` - Form a new account
- `POST /api/auth/login` - Get JWT token

**Dashboard**
- `GET /api/dashboard/summary` - Aggregated stats (Income, Expenses, Net Balance, Categories, Monthly Trends)

**Transactions**
- `GET /api/transaction` - List all transactions
- `GET /api/transaction/:id` - Get a specific transaction
- `POST /api/transaction` - Create new transaction
- `PUT /api/transaction/:id` - Update transaction
- `DELETE /api/transaction/:id` - Soft delete a transaction

**Admin**
- `PATCH /api/admin/users/:id/status` - Toggle user active status (isActive flag)

## Access Control

- **Viewer:** Can view the dashboard summary, but cannot access raw transactions.
- **Analyst:** Can view both the dashboard and read raw transactions. Cannot modify records.
- **Admin:** Full access. Can create/update/delete transactions and manage user statuses.

## Assumptions & Tradeoffs

- **Organization Data:** Assumed this backend handles a single organization. Queries pull all active transactions rather than isolating them by user ID.
- **Soft Deletes:** Used an `isDeleted` flag on records and users rather than hard-deleting them from the database to retain historical context.
- **Authentication:** Used standard JWT tokens for stateless auth. Passwords are hashed automatically via bcrypt.

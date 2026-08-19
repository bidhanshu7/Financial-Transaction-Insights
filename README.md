# Financial Transactions Insights

## Overview

The **Financial Transactions Insights** is an application designed to efficiently extract, analyze, and present transactional data from relational databases. It provides a powerful and user-friendly interface for users to generate insightful reports. This system enables users to view income and expense data, success or failure rates, and overall transaction trends.

The platform is built to handle financial transactions and offers comprehensive features for data visualization, trends analysis, and generating various reports. It supports **role-based access control**, ensuring that users have different levels of access based on their assigned roles. This customization of report visibility according to role-specific permissions ensures data privacy and security.

### Key Features:

- Extracts transactional data from relational databases.
- Displays income, expense data, success/failure rates, and transaction trends.
- Role-based access control for fine-grained user permissions.
- Provides a secure environment with customized visibility of reports for different roles.
- User-friendly interface for generating detailed financial reports.

## Project Flow and Sequence

### 1. Data Extraction

The application connects to relational databases to extract transactional data. This data is then organized and stored in an internal format for further analysis.

### 2. Data Analysis

The extracted data is analyzed based on pre-configured algorithms to generate key financial metrics, including:

- Income and expenses.
- Success and failure rates of transactions.
- General trends and patterns in the financial data.

### 3. Report Generation

Once the analysis is completed, users can generate reports based on different criteria (time periods, transaction types, etc.) through an intuitive interface.

### 4. Role-based Access Control

The system applies role-based access control to ensure that each user only has access to the data relevant to their role. This allows for secure management and display of sensitive financial information.

### 5. User Interface

The user interface is designed to be simple and user-friendly, allowing both technical and non-technical users to generate insightful financial reports with ease.

## Technology Stack

- **Frontend:** React (depending on your design choice)
- **Backend:** Node.js
- **Database:** SQL Server
- **Authentication & Authorization:** JWT

## GETTING STARTED WITH PROJECT SETUP

### 1. Clone this repository

First clone the project inside any folder.Copy the code below:

```sh
 git clone https://github.com/AbiskarLc10/FinancialTransactionInsights.git
```

### 2. `Server`

#### Server Env file

Create a configuration file inside the `Server`.

- **server:**
  ```
  BCRYPT_SALT_ROUNDS=10
  ```

#### `Server Dependencies`

To install dependencies

```sh
  cd backend/server && npm install
```

#### `Migrations`

To setup database schema through migration

```sh
npx sequelize-cli db:migrate
```

#### `Seeds`

To seed the inital transaction data to the transaction table from excel sheeet

```sh

  node data/intialseed.js

```

To seed the filter types and users into the database
**note**: You can modify the data as per your choice

```sh

  npx sequelize-cli db:seed:all
```

### `gateway`

### Gateway env file

- **gateway:**
  ```
  PORT=3000
  JWTPRIVATEKEY = "FINANCIALTRANSACTIONSINSIGHTS"
  ```

#### `gateway Dependencies`

To install dependencies

```sh
  cd backend/gateway && npm install
```

### `frontend`

### Frontend env file

- **frontend:**
  ```
  VITE_API_URL = "http://localhost:3000"
  ```

#### `front Dependencies`

To install dependencies

```sh
  cd frontend && npm install
```

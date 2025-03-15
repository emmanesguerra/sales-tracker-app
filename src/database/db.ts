import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

// Initialize the database asynchronously
export const initializeDatabase = async () => {
  try {
    db = await SQLite.openDatabaseAsync('sales_tracker.db');
    await setupDatabase();
    console.log('Database initialized');
  } catch (error) {
    console.error('Error opening database:', error);
  }
};

// Ensure `db` is available before use
const getDb = (): SQLite.SQLiteDatabase => {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return db;
};

// Setup the table
export const setupDatabase = async () => {
  try {
    const database = getDb();
    await database.execAsync(
      `CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        scanned_text TEXT NOT NULL, 
        quantity INTEGER NOT NULL, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );`
    );
    console.log('Sales table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

// Insert a new sales record
export const insertSalesRecord = async (scannedText: string, quantity: number) => {
  try {
    const database = getDb();
    await database.runAsync(
      'INSERT INTO sales (scanned_text, quantity) VALUES (?, ?);',
      [scannedText, quantity]
    );
    console.log('Sales record inserted successfully');
  } catch (error) {
    console.error('Error inserting sales record:', error);
  }
};

// Get all sales records
export const getSalesRecords = async (): Promise<any[]> => {
  try {
    const database = getDb();
    const result = await database.getAllAsync('SELECT * FROM sales ORDER BY created_at DESC;');
    return result;
  } catch (error) {
    console.error('Error fetching sales records:', error);
    return [];
  }
};

// Clear sales records
export const clearSalesRecords = async () => {
  try {
    const database = getDb();
    await database.runAsync('DELETE FROM sales;');
    console.log('Sales records cleared');
  } catch (error) {
    console.error('Error clearing sales records:', error);
  }
};

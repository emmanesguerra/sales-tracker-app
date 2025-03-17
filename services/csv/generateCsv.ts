import * as FileSystem from 'expo-file-system';

export const generateCsv = async (salesRecords: any[]): Promise<string> => {
  const headers = 'Item Name, Quantity, Date Created\n'; // Simplified headers
  const rows = salesRecords.map(record => {
    return `${record.item_name}, ${record.quantity}, ${record.created_at}`; // No date formatting
  }).join('\n');

  const csvContent = headers + rows;

  const fileUri = FileSystem.documentDirectory + 'sales_records.csv'; // Path in app's document directory

  try {
    await FileSystem.writeAsStringAsync(fileUri, csvContent, { encoding: FileSystem.EncodingType.UTF8 });
    console.log('CSV file created at:', fileUri);
    return fileUri; // Return the file path to be used later
  } catch (error) {
    console.error('Error generating CSV:', error);
    throw error; // Reject if there's an error
  }
};

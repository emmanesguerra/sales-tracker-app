# Sales Tracker App

## Overview
This is a React Native mobile application for tracking sales records. The app allows users to scan product barcodes/QR codes, input quantities, store sales records locally, and send sales data via email as a CSV file.

## Features
- **QR Code Scanning**: Scan product qrcodes to retrieve product details.
- **Sales Entry**: Enter product quantity and save records locally.
- **Local Database**: Uses Expo SQLite for offline storage.
- **Export to CSV**: Generates a CSV file of sales records.
- **Send Email**: Sends the CSV file via email.

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- A mobile device or emulator with Expo Go installed.

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/emmanesguerra/sales-tracker.git
   cd sales-tracker
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm start
   ```

## Project Structure
```
/src
 ├── app
 │   ├── (tabs)
 │   │   ├── index.tsx
 │   │   ├── history.tsx
 │   │   ├── explore.tsx
 ├── components
 │   ├── _salestracker
 │   │   ├── QRCodeScanner.tsx
 │   │   ├── ...
 │   ├── ...
 │
 ├── src
 │   ├── database
 │   │   ├── db.ts
 │
 ├── services
 │   ├── email
 │   │   ├── sendEmail.ts
 │   ├── csv
 │   │   ├── generateCsv.ts
 │   ├──permission.ts
 │
 ├── screens
 │   ├── HomeScreen.tsx
 │   ├── HistoryScreen.tsx
```

## Usage
### Scanning and Saving Sales Records
1. Open the app and scan a product qrcode.
2. Enter the quantity and save the record.

### Generating and Sending CSV
1. The app generates a CSV file from stored sales records.
2. The CSV file is attached to an email.

## Technologies Used
- React Native (Expo)
- Expo SQLite
- Expo FileSystem
- Expo MailComposer

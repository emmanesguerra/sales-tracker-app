import * as MailComposer from 'expo-mail-composer';
import { EMAIL_RECIPIENT } from 'react-native-dotenv';

export const sendEmail = async (filePath: string) => {
  try {
    const mailOptions = {
      subject: 'Sales Records CSV',
      recipients: [EMAIL_RECIPIENT],  // Use your email recipient
      body: '<b>Attached is the CSV file of sales records.</b>',
      isHtml: true,
      attachments: [filePath],  // Pass the file path as an array of strings
    };

    const result = await MailComposer.composeAsync(mailOptions);

    if (result.status === 'sent') {
      console.log('Email sent successfully');
    } else {
      console.log('Email sending failed');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

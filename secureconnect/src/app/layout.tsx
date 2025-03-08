import React from 'react';
import '../globals.css';

export const metadata = {
  title: 'Secure Connect',
  description: 'A secure authentication system',
  icons: {
    icon: '/favicon.ico',
  }
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
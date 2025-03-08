'use client';

import React from 'react';
import '../globals.css';

// Using a separate metadata export isn't needed in client components
// The metadata will be provided by a separate metadata.ts file

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>Secure Connect</title>
        <meta name="description" content="A secure authentication system" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
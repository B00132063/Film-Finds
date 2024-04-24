import { Inter } from 'next/font/google'
import './globals.css'
import { metadata } from './metadata'; // Import metadata from separate file

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <div className="navbar">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>


        {children}
        </body>
        </html>
    );
}

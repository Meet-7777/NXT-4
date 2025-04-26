// root.jsx
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
  Link,
} from "@remix-run/react";
import Navbar from "./components/Navbar";
import "./tailwind.css";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Lobster&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "icon", href: "/logo.svg", type: "image/svg+xml" },
  { rel: "alternate icon", href: "/favicon.ico" },
];

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
function Document({ title, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <Meta />
        <Links />
        <link rel="stylesheet" href="/build/tailwind.css" /> {/* Add this line explicitly */}
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}


export default function App() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const year = new Date().getFullYear();
  
  let title = "Error - NXT4";
  let heading = "Something went wrong";
  let message = "We apologize for the inconvenience. Please try again later.";
  
  // Provide more meaningful error messages based on status codes
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        title = "Page Not Found - NXT4";
        heading = "Oops! Page Not Found";
        message = "We're sorry, but the page you're looking for doesn't exist yet. We're working on it!";
        break;
      case 401:
        heading = "Unauthorized Access";
        message = "You need to be logged in to access this page.";
        break;
      case 403:
        heading = "Access Denied";
        message = "You don't have permission to access this resource.";
        break;
      case 500:
        heading = "Server Error";
        message = "Our server encountered a problem. Our team has been notified.";
        break;
      default:
        heading = `Error ${error.status}`;
        message = error.data?.message || "An unexpected error occurred.";
    }
  } else if (error instanceof Error) {
    heading = "Application Error";
    message = "Our application encountered an unexpected error. Please try again later.";
    // Log the actual error for developers but don't show to users
    console.error(error);
  }
  
  return (
    <Document title={title}>
      <Navbar />
      <main className="flex-grow flex flex-col justify-center items-center px-4 py-16 text-center" role="main" aria-labelledby="error-heading">
        <h1 id="error-heading" className="text-4xl font-bold text-[#03346E]" tabIndex="-1">
          {heading}
        </h1>
        <p className="text-lg mt-4 max-w-lg">
          {message}
        </p>
        <p className="mt-6">
          <Link 
            to="/" 
            className="bg-[#F5004F] hover:bg-[#d60648] text-white py-2 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#F5004F] focus:ring-offset-2"
            aria-label="Return to home page"
          >
            Return to Home
          </Link>
        </p>
      </main>
      
      <footer className="bg-gray-50 p-4 mt-auto border-t border-gray-200 text-center" role="contentinfo">
        <div className="max-w-4xl mx-auto">
          <p className="mb-1 text-gray-600">© {year} NXT4. All rights reserved.</p>
          <p className="mb-2 text-gray-600">Proudly crafted in India ❤️</p>
        </div>
      </footer>
    </Document>
  );
}

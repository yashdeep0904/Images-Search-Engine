Image Search Engine

A dynamic, responsive image search application that allows users to find, view, and download high-resolution images using the Unsplash API. Built with HTML, CSS, and vanilla JavaScript.

✨ Features

Real-time Search: Debounced search inputs prevent API spamming and provide a smooth typing experience.

Dynamic Image Grid: A responsive masonry-style grid that beautifully displays search results across all screen sizes.

Lightbox Modal: Click any image to view a larger version with its description in a sleek, blurred-background modal.

High-Resolution Downloads: Direct download capability for high-res images, properly integrated with Unsplash's download tracking endpoint.

Pagination ("Load More"): Easily browse through hundreds of search results without reloading the page.

Quick-Select Filters: Pre-defined category buttons (Technology, Architecture, Minimalist, Abstract) for one-click searching.

Modern UI: A bright, high-contrast interface featuring vibrant colors, glassmorphism effects, and glossy 3D interactive buttons.

🛠️ Technologies Used

HTML5: Semantic structure.

CSS3: Custom styling, CSS Grid, Flexbox, transitions, and modern UI effects.

JavaScript (ES6+): Asynchronous API fetching (fetch, async/await), DOM manipulation, event handling, and debouncing.

Unsplash API: External data source for high-quality, royalty-free images.

🚀 Setup & Installation

To run this project locally, follow these steps:

Clone or Download the Repository:
Save the index.html, style.css, and script.js files into a single project folder on your computer.

Get an Unsplash API Key:

Go to the Unsplash Developer Portal.

Log in or create a free account.

Navigate to Your Apps (top right) and click New Application.

Accept the terms, name your app, and generate an Access Key.

Configure the API Key:

Open script.js in your preferred text editor.

Locate the variable at the very top: const UNSPLASH_API_KEY = 'YOUR_ACCESS_KEY_HERE';

Replace 'YOUR_ACCESS_KEY_HERE' with your actual Access Key.

Run the Application:

Since this is a vanilla frontend project, you can simply double-click the index.html file to open it in your web browser.

(Note: For the download feature to work completely seamlessly without CORS issues, it's recommended to run the files through a local development server like VS Code's "Live Server" extension).

💡 Usage

Type any keyword into the search bar (e.g., "cats", "mountains", "neon"). The search will trigger automatically after you stop typing.

Click the "Load More" button at the bottom of the grid to fetch the next page of results.

Click any image to open it in the lightbox.

In the lightbox, click "Download High-Res" to save the image to your device, or click the "X" (or press ESC) to close it.

📄 License

This project is open-source and available for educational and personal use. Images are provided by Unsplash and are subject to the Unsplash License.
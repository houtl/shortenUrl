# URL Shortener Project

## Overview

This project is a URL shortener application designed to convert long URLs into shorter, more manageable links. When a user provides a long URL, the service returns a tiny URL that looks like this:

> *https://<my-domain>/<short-slug>*

- **<my-domain>**: Refers to the domain of the API (not the frontend app). The API is responsible for generating and managing shortened URLs.
- **<short-slug>**: A unique, random string made up of letters, numbers, and potentially other characters to ensure the URL is concise but still unique.

When a user visits the short URL in their browser, the service automatically redirects them to the original URL.

## Features

- **URL Shortening**: Converts long URLs into short, unique links.
- **Automatic Redirection**: When a user visits the short URL, they are seamlessly redirected to the original link.
- **Slug Generation**: The short slug is generated as a random string, designed to be as concise as possible while maintaining uniqueness.
- **RESTful API**: Provides simple endpoints for URL creation and retrieval.

## How to Use

### Getting Started

1. **Install dependencies**:

   ```bash
   npm i
   ```

2. **Run the app**:

   This will start the front-end portion of the URL shortener.

   ```bash
   npm run dev -w app
   ```

3. **Run the API**:

   This will start the back-end API service responsible for handling URL shortening requests and managing redirects.

   ```bash
   npm run dev -w api
   ```

4. **Format code**:

   Ensure consistency in the codebase with:

   ```bash
   npm run format
   ```

## API Example

To shorten a URL, make a `POST` request to the `/shorten` endpoint of the API with the original URL. The API will return a response that includes the shortened URL, structured like this:

```json
{
  "short_url": "https://<my-domain>/<short-slug>"
}
```

When a user visits the `short_url`, the server will look up the associated `original_url` and redirect the user to it.
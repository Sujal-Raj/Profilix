# Portfolio Generator

A Next.js application that lets users register, upload a resume (PDF), parse it using Google Gemini AI, and generate a polished portfolio. User data and portfolios are persisted in MongoDB.

## Features

- User registration (Clerk) and session management
- PDF resume parsing with Google Gemini AI
- Edit and save generated portfolios
- REST API endpoints for integrations and automation
- Built with Next.js App Router, TypeScript, Tailwind CSS

## Tech Stack

- Next.js 13+ (App Router)
- TypeScript
- MongoDB
- Google Gemini AI
- pdf-parse
- Clerk (authentication)
- Zustand (state management)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Google Gemini API key
- Clerk API keys

### Installation

1. Clone the repository:

```powershell
git clone https://github.com/Sujal-Raj/portfilio-generator.git
cd portfilio-generator
```

2. Install dependencies:

```powershell
npm install
```

3. Create a `.env.local` file in the project root and add the required variables (example):

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
MONGODB_URI=your_mongodb_connection_string
```

### Available Scripts

- `npm run dev` — start development server (localhost:3000)
- `npm run build` — build for production
- `npm start` — run production build
- `npm run lint` — run linters
- `npm run format` — run code formatter (Prettier)
- `npm test` — run tests (if present)

### Run locally

```powershell
npm run dev
```

Open http://localhost:3000 in your browser.

## API Endpoints (high level)

- `POST /api/v1/auth/register` — register a user
- `POST /api/v1/ai/parse` — upload resume (multipart/form-data) and parse

See the `app/api` folder for full route implementations. A Postman collection is available at `postman_collection.json` for quick testing.

## Project Structure (truncated)

```
app/
  api/
    v1/
      ai/parse/route.ts
      auth/register/route.ts
  create/portfolio/page.tsx
  layout.tsx
  page.tsx
components/
  layout/
  portfolio/
lib/
models/
store/
public/
```

## Troubleshooting

- 404 errors: ensure the dev server is running and the route exists
- MongoDB errors: verify `MONGODB_URI` and that MongoDB is accessible
- Gemini/Clerk errors: verify API keys and permissions

## Contributing

Contributions are welcome — see `Contributing.md` for guidelines.

## License

MIT

---

Made with ❤️ using Next.js, Clerk, and Google Gemini AI
models/
  user.model.ts         # Mongoose user schema
  portfolio.model.ts    # Mongoose portfolio schema
store/
  useUserStore.ts       # Zustand store for user registration
public/
  ...                   # Static assets
README.md
```

## Troubleshooting

- **404 Not Found:**  
  Ensure the API route exists and the server is running. Restart the server after adding new files.

- **MongoDB Errors:**  
  Check your `MONGODB_URI` and ensure MongoDB is running.

- **Gemini API Errors:**  
  Make sure your `GEMINI_API_KEY` is valid and has access.

- **Clerk Errors:**  
  Ensure your Clerk keys are correct and environment variables are set.

## License

MIT

---

**Made with ❤️ using Next.js, Clerk, and Google Gemini AI**
# 📚 Profilix - AI-Powered Portfolio Generator

> Transform your resume into a stunning, professional portfolio with the power of AI

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Node](https://img.shields.io/badge/Node-18+-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-13+-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)

---

## ✨ Overview

**Profilix** is a cutting-edge Next.js application that empowers users to create professional portfolios effortlessly. Simply upload your resume as a PDF, and our AI-powered engine leverages Google Gemini to intelligently parse your information and generate a polished, portfolio-ready profile. All your data is securely stored in MongoDB.

### 🎯 Key Benefits

- ⚡ **Instant Portfolio Generation** - Upload → Parse → Polish in minutes
- 🤖 **AI-Powered Parsing** - Google Gemini intelligently extracts resume data
- 🎨 **Fully Customizable** - Edit and refine your portfolio before publishing
- 🔐 **Secure & Scalable** - Enterprise-grade authentication and data persistence
- 📱 **REST API Ready** - Integrate seamlessly with external tools

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| 👤 **User Authentication** | Seamless registration and session management via Clerk |
| 📄 **PDF Resume Parsing** | Intelligent extraction using Google Gemini AI |
| ✏️ **Portfolio Editor** | Edit and customize your generated portfolio |
| 💾 **Data Persistence** | Secure MongoDB storage for users and portfolios |
| 🔌 **REST APIs** | Full-featured endpoints for automation and integration |
| 🎯 **Production-Ready** | Built with best practices and modern architecture |

---

## 🛠 Tech Stack

<table>
<tr>
<td>
  
**Frontend**
- ![Next.js](https://img.shields.io/badge/Next.js-13+-000?style=flat&logo=next.js) App Router
- ![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat&logo=typescript) for type safety
- ![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react) components
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3+-06B6D4?style=flat&logo=tailwindcss)

</td>
<td>

**Backend & Infrastructure**
- ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)
- ![MongoDB](https://img.shields.io/badge/MongoDB-Latest-13AA52?style=flat&logo=mongodb)
- ![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-EA4335?style=flat&logo=google)
- ![Clerk](https://img.shields.io/badge/Clerk-Auth-000?style=flat)

</td>
</tr>
<tr>
<td>

**State & Utilities**
- ![Zustand](https://img.shields.io/badge/Zustand-State-000?style=flat) management
- ![pdf-parse](https://img.shields.io/badge/pdf--parse-Parser-F37726?style=flat)
- ![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?style=flat)

</td>
<td>

**Development Tools**
- ![ESLint](https://img.shields.io/badge/ESLint-Linter-4B32C3?style=flat&logo=eslint)
- ![Prettier](https://img.shields.io/badge/Prettier-Formatter-F7B93E?style=flat&logo=prettier)
- ![PostCSS](https://img.shields.io/badge/PostCSS-CSS-DD3A0A?style=flat&logo=postcss)

</td>
</tr>
</table>

---

## 🏗 Project Structure

```
portfilio-generator/
├── app/                          # Next.js App Router
│   ├── api/                      # REST API endpoints
│   │   ├── v1/                  # Version 1 routes
│   │   │   ├── ai/parse/        # Resume parsing endpoint
│   │   │   ├── auth/register/   # User registration
│   │   │   └── user/            # User management
│   │   └── v2/                  # Version 2 (future)
│   ├── (web)/
│   │   ├── create/portfolio/    # Portfolio creation flow
│   │   └── preview/portfolio/   # Portfolio preview
│   ├── [slug]/                  # Dynamic portfolio routes
│   └── layout.tsx               # Root layout
├── components/                   # React components
│   ├── layout/                  # Layout components
│   ├── portfolio/               # Portfolio-specific components
│   └── ui/                      # Reusable UI components
├── lib/                         # Utility functions
│   ├── db.ts                    # Database connection
│   └── utils.ts                 # Helper utilities
├── models/                      # Mongoose schemas
│   ├── user.model.ts           # User schema
│   └── portfolio.model.ts       # Portfolio schema
├── store/                       # State management
│   └── useUserStore.ts         # Zustand user store
└── public/                      # Static assets
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have the following installed and configured:

| Requirement | Version | Setup |
|------------|---------|-------|
| **Node.js** | 18+ | [Download](https://nodejs.org/) |
| **npm** | 8+ | Included with Node.js |
| **MongoDB** | Latest | [Local](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas) |
| **Google Gemini API Key** | - | [Get Key](https://makersuite.google.com/app/apikey) |
| **Clerk API Keys** | - | [Get Keys](https://dashboard.clerk.com) |

### 💻 Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Sujal-Raj/portfilio-generator.git
cd portfilio-generator
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# AI & Parsing (Google Gemini)
GEMINI_API_KEY=your_google_gemini_api_key

# Database (MongoDB)
MONGODB_URI=your_mongodb_connection_string
```

> ⚠️ **Security Note:** Never commit `.env.local` to version control. Add it to `.gitignore`.

#### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 📚 Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Run ESLint checks |
| `npm run format` | Format code with Prettier |
| `npm test` | Run tests (if configured) |

---

## 🔌 API Endpoints

### Base URLs
- **Development:** `http://localhost:3000/api`
- **Production:** `https://yourdomain.com/api`

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v1/auth/register` | Register a new user |

**Example Request:**
```json
POST /v1/auth/register
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

### AI & Resume Parsing

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v1/ai/parse` | Parse resume PDF using Gemini AI |

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/v1/ai/parse \
  -F "resume=@resume.pdf"
```

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/user` | Get user profile |
| `GET` | `/v1/user/[slug]` | Get user by slug |
| `POST` | `/v1/user/portfolio/publish` | Publish portfolio |

> 📖 **Full API Documentation:** See [Postman Collection](postman_collection.json) for complete endpoint details.

---

## 🧪 Testing the API

A Postman collection is included in the repository for quick API testing:

```bash
# Import postman_collection.json into Postman
# All endpoints are pre-configured with examples
```

---

## 🐛 Troubleshooting

### ❌ 404 Not Found

**Problem:** Getting 404 errors on API routes  
**Solution:**
- Ensure the development server is running (`npm run dev`)
- Verify the route exists in `app/api/`
- Restart the server after adding new route files
- Check the URL for typos

### ❌ MongoDB Connection Errors

**Problem:** Cannot connect to MongoDB  
**Solution:**
- Verify `MONGODB_URI` is correct in `.env.local`
- Ensure MongoDB is running (local or check Atlas connection)
- Whitelist your IP in MongoDB Atlas (if using cloud)
- Check network connectivity

### ❌ Gemini API Errors

**Problem:** Resume parsing fails with Gemini errors  
**Solution:**
- Verify `GEMINI_API_KEY` is valid and active
- Check API quotas and usage limits
- Ensure API is enabled in Google Cloud Console
- Test with a simple request first

### ❌ Clerk Authentication Issues

**Problem:** Authentication not working  
**Solution:**
- Confirm `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is correct
- Verify `CLERK_SECRET_KEY` matches your environment
- Check Clerk dashboard for app configuration
- Clear browser cache and cookies

---

## 🤝 Contributing

We welcome contributions from the community! Please follow our guidelines:

📖 See [Contributing.md](Contributing.md) for detailed contribution instructions.

**Quick Start for Contributors:**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- 🎯 Built with [Next.js](https://nextjs.org/)
- 🔐 Authentication by [Clerk](https://clerk.com/)
- 🤖 AI powered by [Google Gemini](https://ai.google.dev/)
- 💾 Database by [MongoDB](https://www.mongodb.com/)
- 💅 Styled with [Tailwind CSS](https://tailwindcss.com/)

---

<div align="center">

**Made with ❤️ by the Profilix Team**

[⬆ Back to Top](#-profilix---ai-powered-portfolio-generator)

</div>
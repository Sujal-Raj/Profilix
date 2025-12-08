# Contributing to Portfolio Generator

Thanks for your interest in contributing! We welcome bug reports, improvements, and new features.

## Quickstart

1. Fork the repository on GitHub and clone your fork:

```powershell
git clone https://github.com/Sujal-Raj/portfilio-generator.git
cd portfilio-generator
```

2. Install dependencies:

```powershell
npm install
```

3. Create a `.env.local` with the required environment variables (see `README.md`).

## Branching & Commits

- Create a descriptive branch name: `feature/your-feature`, `fix/issue-123`, or `chore/deps`
- Make small, focused commits with clear messages. Use the imperative tense, e.g. `Add resume parsing endpoint`.

Example:

```powershell
git checkout -b feature/add-gemini-parse
# make changes
git add .
git commit -m "Add resume parsing using Google Gemini"
git push origin feature/add-gemini-parse
```

## Tests & Linting

- Run tests (if available): `npm test`
- Run linters and formatters before opening a PR: `npm run lint` and `npm run format`

## Pull Request Checklist

Before opening a PR, please ensure:

- [ ] Your code builds and runs locally
- [ ] Relevant tests were added or updated
- [ ] Linting and formatting pass
- [ ] The PR description explains the problem and the solution
- [ ] References to related issues (if any)

When opening a PR, include screenshots or short GIFs for UI changes and a short summary of behavior changes.

## Reporting Issues

- Open an issue at: `https://github.com/Sujal-Raj/portfilio-generator/issues`
- Provide a clear title, steps to reproduce, expected vs actual behavior, environment (Node, OS), and any logs or screenshots.

## Code Style

- We use Prettier for formatting. Please format changes before committing.
- Follow existing patterns in the codebase and prefer clarity over cleverness.

## Community & Conduct

Be respectful and constructive. By contributing, you agree to follow the project's Code of Conduct (we follow the Contributor Covenant):

https://www.contributor-covenant.org/

## License

By contributing, you agree your contributions will be licensed under the project's MIT License.

---

Thanks — your contributions make this project better!
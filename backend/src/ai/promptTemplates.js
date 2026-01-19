export const TECH_DEBT_DETECTION_PROMPT = `
You are a senior software architect.

Analyze the following code and detect:
- Code smells
- Performance issues
- Security vulnerabilities
- Maintainability problems
- Bad practices

Return results in JSON with:
- issueType
- severity (low | medium | high)
- description
- file
- line
`;

export const AUTO_FIX_PROMPT = `
You are a senior engineer.

Fix the following technical debt issue.
Rules:
- Do not change functionality
- Improve readability & performance
- Follow best practices
- Return ONLY the fixed code
`;

export const EXPLANATION_PROMPT = `
Explain the fix in simple terms:
- What was wrong
- Why it is a problem
- How the fix helps
- Any trade-offs
`;

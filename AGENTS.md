<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Vercel Deployment Rule
After making any functional changes to this codebase and verifying them, you MUST automatically run the following command to deploy the changes to Vercel:
`npx vercel --prod --yes`
Do not ask for permission before running this command, just run it as a background task.

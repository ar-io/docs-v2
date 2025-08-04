# WebContainer Setup

## Overview

WebContainer is a WebAssembly-based technology that runs a full Node.js environment directly in the browser. This allows for real npm package installation and file system operations within the documentation.

## CORS Headers Requirement

WebContainer requires specific CORS headers to work properly:

- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: require-corp`

## Development Setup

### Option 1: Use the Custom Development Server (Recommended)

1. Build the project:

   ```bash
   yarn build
   ```

2. Start the development server with WebContainer support:

   ```bash
   yarn dev:webcontainer
   ```

3. Open http://localhost:3001

This server includes the required CORS headers for WebContainer to work properly.

### Option 2: Use Next.js Dev Server (Limited WebContainer Support)

1. Start the regular Next.js dev server:

   ```bash
   yarn dev
   ```

2. Open http://localhost:3000

**Note:** WebContainer may not work properly in the regular dev server due to missing CORS headers.

## Production Deployment

For production deployments (like GitHub Pages), WebContainer requires the hosting server to include the required CORS headers. This is typically configured at the server level.

### GitHub Pages

GitHub Pages doesn't support custom headers, so WebContainer will show an error message directing users to use the browser-based CodeExecutor instead.

### Self-Hosted

If self-hosting, configure your web server to include:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

## Usage

The WebContainer is available as a component in MDX files:

```jsx
<WebContainerExecutor
  title="My Node.js Example"
  language="javascript"
  code={`console.log('Hello from Node.js!');
console.log('Node version:', process.version);`}
/>
```

## Fallback

If WebContainer fails to initialize (due to CORS headers), it will display a helpful error message directing users to use the browser-based CodeExecutor instead.

## Troubleshooting

### "WebAssembly.Memory object cannot be serialized" Error

This error occurs when the required CORS headers are not present. Solutions:

1. Use the custom development server: `yarn dev:webcontainer`
2. Configure your hosting server to include the required CORS headers
3. Use the browser-based CodeExecutor as a fallback

### "Unable to create more instances" Error

This error occurs when too many WebContainer instances are created. The component now uses a global singleton pattern to prevent this issue.

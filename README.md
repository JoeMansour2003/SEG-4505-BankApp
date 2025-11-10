# Banking App Demo

A small single-page demo banking interface built with React + Vite.

## Features

- Login screen (demo creds: `admin` / `1234`)
- Account overview with balance & recent transactions
- Money transfer simulation with basic validation
- Cheque (check) deposit mock via file upload (random amount)
- Simple bottom nav between screens
- Settings placeholder panel
- Framer Motion animated screen transitions

## Tech Stack

- React 18
- Vite 5
- Framer Motion
- lucide-react icon set

## Getting Started

```bash
npm install
npm start
```

Then open the URL printed in the terminal (default: http://localhost:5173).

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  App.jsx            # Main app component (screen state machine)
  main.jsx           # Entry point
  global.css         # Minimal global styles
  components/ui/     # Light-weight UI primitives (Card, Button, Input)
```

## Customization Ideas

- Replace alerts with toast notifications
- Persist data using localStorage or a backend
- Integrate Tailwind or a design system
- Add dark mode state & toggle
- Internationalization for bilingual title

## License

MIT

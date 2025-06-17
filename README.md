# Same Day Ramps Website

A professional website for Same Day Ramps, a wheelchair ramp rental business serving the Dallas-Fort Worth metroplex.

## Features

- Responsive, mobile-first design
- Instant quote calculator
- Google Maps integration for address autocomplete
- Contact information and service area details
- FAQ section
- Professional, trust-focused design

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Headless UI
- React Hook Form
- Zod
- Google Maps API

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   GOOGLE_MAPS_API_KEY=your_server_key_here
   NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_client_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- `GOOGLE_MAPS_API_KEY`: Server-side Google Maps API key for distance calculations
- `NEXT_PUBLIC_GOOGLE_MAPS_KEY`: Client-side Google Maps API key for Places autocomplete

## Project Structure

```
src/
  ├── app/              # Next.js app router pages
  ├── components/       # React components
  │   ├── layout/      # Layout components
  │   ├── ui/          # Reusable UI components
  │   └── forms/       # Form components
  ├── lib/             # Utility functions and constants
  └── styles/          # Global styles
```

## Development

- Use `npm run dev` for development
- Use `npm run build` for production build
- Use `npm run start` to start the production server
- Use `npm run lint` to run ESLint

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is proprietary and confidential.
# samedayramps-new-website

# FlipPDF

Transform your PDFs into beautiful, interactive flipbooks with smooth page-turning animations.

## Features

- Upload PDFs and convert them to interactive flipbooks
- Smooth page-turning animations
- Responsive design for all devices
- Touch-enabled for mobile devices
- Zoom controls for better readability
- Easy sharing with generated links
- Secure storage using Cloudflare CDN

## Tech Stack

- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS for styling
- Prisma with PostgreSQL
- Cloudflare CDN for PDF storage
- Framer Motion for animations

## Prerequisites

- Node.js 18+
- PostgreSQL
- Cloudflare account with R2 Storage enabled

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd flippdf
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your actual credentials.

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
- `CLOUDFLARE_ACCESS_KEY`: Cloudflare R2 access key
- `CLOUDFLARE_SECRET_KEY`: Cloudflare R2 secret key

## Development

The project structure follows Next.js 13+ conventions:

- `/src/app`: Main application code
  - `/components`: Reusable React components
  - `/lib`: Utility functions and shared code
  - `/api`: API routes
- `/prisma`: Database schema and migrations
- `/public`: Static assets

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT

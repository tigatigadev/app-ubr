# App UBR - Unit Bisnis Ritel ERP System

Modern ERP web application for managing operations at PT. Padma Unit Bisnis Ritel (Wasabi Kitchen & Bukari Mart retail outlets).

## 🏢 About

App UBR is a comprehensive ERP system built with Next.js 16, TypeScript, and modern web technologies to manage retail operations including:

- HR & Personnel Management
- Daily Financial Reporting
- Inventory & Utilities Management
- Facility Booking System
- Project Management
- KPI Monitoring & Compliance

## 🛠️ Technology Stack

- **Frontend**: Next.js 16 with App Router, TypeScript
- **Backend**: Next.js API Routes
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Prisma ORM + MySQL
- **Authentication**: NextAuth.js + JWT
- **State Management**: React Query
- **Forms**: Zod + react-hook-form
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MySQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd app-ubr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/app_ubr"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

4. **Setup database**
   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push

   # Seed initial data
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with initial data

## 🔐 Default Login Credentials

After seeding the database, you can use these credentials to login:

- **Super Admin**: `admin@appubr.com` / `admin123`
- **HR Manager**: `budi.santoso@appubr.com` / `password123`
- **Finance Manager**: `dewi.kartika@appubr.com` / `password123`
- **Employee**: `ahmad.rizki@appubr.com` / `password123`

## 🏪 Business Structure

### Outlets
- **WK-JTN**: Wasabi Kitchen Jatinangor
- **WK-KCR**: Wasabi Kitchen Kiaracondong
- **BM-JTN**: Bukari Mart Jatinangor

### User Roles
- **SUPER_ADMIN**: Full system access
- **ADMIN**: Management access across modules
- **HR**: Employee management and attendance
- **FINANCIAL_MANAGER**: Financial reporting and analysis
- **INVENTORY_MANAGER**: Inventory and stock management
- **BOOKING_MANAGER**: Facility booking system
- **EMPLOYEE**: Basic access for daily operations

## 📊 Core Modules

### HR & Personnel Management
- Employee profiles and contracts
- Attendance tracking (QR/PIN check-in/out)
- KPI calculation based on activities
- Monthly appraisal system
- HR document management (SOPs, memos, warning letters)

### Finance & Daily Reporting
- Cashier daily revenue input
- Revenue type categorization (Dine In, Takeaway, Online Orders, Facility Rentals)
- Expense tracking and categorization
- Customer count and transaction tracking
- Integrated Chart of Accounts (COA)

### Inventory & Utilities
- Building inventory management
- Daily utility checks
- Maintenance logging
- Barcode/QR code generation
- Inventory label printing

### Facility Booking
- Indoor/Outdoor dining reservations
- Lesehan seating areas
- Singing rooms (karaoke)
- Puspawarna building facilities

### Daily Activities
- Auto-generated checklists from shift duties
- Photo upload for activity verification
- KWH meter reading input
- Automatic database submission

### HPP Calculator
- Cost analysis for F&B menu items
- Retail product profit margin analysis
- Real-time profitability calculations

### Project Management
- Marketing program tracking
- CRM program management
- New menu development coordination

## 🔧 Development

### Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable React components
│   └── ui/             # shadcn/ui components
├── lib/                # Utility functions and configurations
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── store/              # State management
└── styles/             # Global CSS and styles

prisma/
├── schema.prisma       # Database schema
└── seed.ts            # Database seeding script
```

### Adding New Components

1. Install shadcn/ui components:
   ```bash
   npx shadcn-ui@latest add [component-name]
   ```

2. Follow the existing component patterns in `src/components/ui/`

3. Use consistent TypeScript types from `src/types/`

### Database Schema Changes

1. Modify `prisma/schema.prisma`
2. Generate migration: `npm run db:migrate`
3. Update TypeScript types: `npm run db:generate`
4. Update related components and API routes

## 🚀 Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Export static files (if needed):
   ```bash
   npm run export
   ```

3. Deploy to your preferred hosting platform

## 📝 License

This project is proprietary to PT. Padma Unit Bisnis Ritel.

## 🆘 Support

For technical support or questions:
- Contact the development team
- Check the documentation in `/documentation` folder
- Review the task management system using `task-manager list-tasks`

## 🔄 Task Management

This project uses a task management system. To view and manage tasks:

```bash
task-manager list-tasks
task-manager start-task <task-id>
task-manager complete-task <task-id> "description"
```

Current project status: ✅ Database schema completed, ✅ Authentication system completed, 🔄 UI components in progress
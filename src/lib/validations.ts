import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

export const employeeSchema = z.object({
  firstName: z.string().min(1, 'Nama depan wajib diisi'),
  lastName: z.string().min(1, 'Nama belakang wajib diisi'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().optional(),
  position: z.string().min(1, 'Posisi wajib diisi'),
  department: z.string().min(1, 'Departemen wajib diisi'),
  outletId: z.string().min(1, 'Outlet wajib dipilih'),
  joinDate: z.date(),
  contractEnd: z.date().optional(),
  salary: z.number().min(0, 'Gaji harus positif').optional(),
})

export const attendanceSchema = z.object({
  employeeId: z.string().min(1, 'Employee wajib dipilih'),
  outletId: z.string().min(1, 'Outlet wajib dipilih'),
  date: z.date(),
  shift: z.enum(['MORNING', 'EVENING', 'NIGHT', 'FULL_DAY']),
  status: z.enum(['PRESENT', 'ABSENT', 'LATE', 'SICK_LEAVE', 'ANNUAL_LEAVE']),
  notes: z.string().optional(),
})

export const financialRecordSchema = z.object({
  outletId: z.string().min(1, 'Outlet wajib dipilih'),
  date: z.date(),
  shift: z.enum(['MORNING', 'EVENING', 'NIGHT', 'FULL_DAY']),
  revenueDineIn: z.number().min(0),
  revenueTakeaway: z.number().min(0),
  revenueOnline: z.number().min(0),
  revenueFacility: z.number().min(0),
  expenseStock: z.number().min(0),
  expenseUtilities: z.number().min(0),
  expenseStaffMeals: z.number().min(0),
  expenseMaintenance: z.number().min(0),
  expenseOther: z.number().min(0),
  customerCount: z.number().min(0),
  transactionCount: z.number().min(0),
  notes: z.string().optional(),
})

export const inventoryItemSchema = z.object({
  outletId: z.string().min(1, 'Outlet wajib dipilih'),
  name: z.string().min(1, 'Nama item wajib diisi'),
  description: z.string().optional(),
  category: z.string().min(1, 'Kategori wajib diisi'),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  quantity: z.number().min(0),
  unit: z.string().min(1, 'Satuan wajib diisi'),
  minStock: z.number().min(0),
  maxStock: z.number().optional(),
  purchasePrice: z.number().min(0).optional(),
  sellingPrice: z.number().min(0).optional(),
  location: z.string().optional(),
  condition: z.enum(['GOOD', 'DAMAGED', 'MAINTENANCE']),
  notes: z.string().optional(),
})

export const bookingSchema = z.object({
  outletId: z.string().min(1, 'Outlet wajib dipilih'),
  type: z.enum([
    'INDOOR_DINING',
    'OUTDOOR_DINING',
    'INDOOR_LESEHAN',
    'OUTDOOR_LESEHAN',
    'SINGING_ROOM',
    'PUSPAWARNA_AUDITORIUM',
    'PUSPAWARNA_CLASS_ROOM',
  ]),
  customerName: z.string().min(1, 'Nama pelanggan wajib diisi'),
  customerPhone: z.string().optional(),
  customerEmail: z.string().email().optional().or(z.literal('')),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  participants: z.number().min(1),
  totalAmount: z.number().min(0).optional(),
  depositAmount: z.number().min(0).optional(),
  notes: z.string().optional(),
  specialRequests: z.string().optional(),
})

export const menuItemSchema = z.object({
  name: z.string().min(1, 'Nama menu wajib diisi'),
  description: z.string().optional(),
  category: z.string().min(1, 'Kategori wajib diisi'),
  sellingPrice: z.number().min(0),
  hpp: z.number().min(0),
  ingredients: z.array(z.string()),
  allergens: z.array(z.string()),
  status: z.enum(['ACTIVE', 'INACTIVE', 'SEASONAL']),
})

export const retailProductSchema = z.object({
  name: z.string().min(1, 'Nama produk wajib diisi'),
  description: z.string().optional(),
  category: z.string().min(1, 'Kategori wajib diisi'),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  sellingPrice: z.number().min(0),
  purchasePrice: z.number().min(0),
  stock: z.number().min(0),
  minStock: z.number().min(0),
  supplier: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DISCONTINUED']),
})

export const projectSchema = z.object({
  title: z.string().min(1, 'Judul project wajib diisi'),
  description: z.string().min(1, 'Deskripsi project wajib diisi'),
  type: z.enum(['MARKETING_PROGRAM', 'CRM_PROGRAM', 'NEW_MENU_DEVELOPMENT']),
  startDate: z.date(),
  endDate: z.date().optional(),
  budget: z.number().min(0).optional(),
  managerId: z.string().optional(),
  teamMembers: z.array(z.string()),
  deliverables: z.array(z.string()),
  risks: z.string().optional(),
  mitigation: z.string().optional(),
})

export const activityLogSchema = z.object({
  outletId: z.string().min(1, 'Outlet wajib dipilih'),
  employeeId: z.string().optional(),
  taskType: z.string().min(1, 'Tipe task wajib diisi'),
  taskName: z.string().min(1, 'Nama task wajib diisi'),
  description: z.string().min(1, 'Deskripsi task wajib diisi'),
  priority: z.enum(['HIGH', 'MEDIUM', 'LOW']),
  kwhReading: z.number().optional(),
  notes: z.string().optional(),
})

export const userSchema = z.object({
  email: z.string().email('Email tidak valid'),
  role: z.enum([
    'SUPER_ADMIN',
    'ADMIN',
    'HR',
    'FINANCIAL_MANAGER',
    'INVENTORY_MANAGER',
    'BOOKING_MANAGER',
    'EMPLOYEE',
  ]),
  password: z.string().min(6, 'Password minimal 6 karakter').optional(),
})

export const outletSchema = z.object({
  code: z.string().min(1, 'Kode outlet wajib diisi'),
  name: z.string().min(1, 'Nama outlet wajib diisi'),
  address: z.string().min(1, 'Alamat wajib diisi'),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  isActive: z.boolean().default(true),
})
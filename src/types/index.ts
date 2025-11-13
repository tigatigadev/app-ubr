export interface User {
  id: string
  email: string
  role: UserRole
  employee?: Employee
}

export interface Employee {
  id: string
  employeeCode: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  position: string
  department: string
  outletId: string
  status: EmployeeStatus
  joinDate: Date
  contractEnd?: Date
  salary?: number
  photo?: string
  createdAt: Date
  updatedAt: Date
  outlet: Outlet
}

export interface Outlet {
  id: string
  code: string
  name: string
  address: string
  phone?: string
  email?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Attendance {
  id: string
  employeeId: string
  outletId: string
  date: Date
  checkInTime?: Date
  checkOutTime?: Date
  status: AttendanceStatus
  shift: WorkShift
  notes?: string
  location?: string
  qrCode?: string
  pin?: string
  createdAt: Date
  updatedAt: Date
  employee: Employee
  outlet: Outlet
}

export interface FinancialRecord {
  id: string
  outletId: string
  date: Date
  shift: WorkShift
  cashierId?: string
  revenueDineIn: number
  revenueTakeaway: number
  revenueOnline: number
  revenueFacility: number
  totalRevenue: number
  expenseStock: number
  expenseUtilities: number
  expenseStaffMeals: number
  expenseMaintenance: number
  expenseOther: number
  totalExpense: number
  netProfit: number
  customerCount: number
  transactionCount: number
  notes?: string
  status: string
  approvedBy?: string
  approvedAt?: Date
  createdAt: Date
  updatedAt: Date
  outlet: Outlet
}

export interface InventoryItem {
  id: string
  outletId: string
  name: string
  description?: string
  category: string
  sku?: string
  barcode?: string
  qrCode?: string
  quantity: number
  unit: string
  minStock: number
  maxStock?: number
  purchasePrice?: number
  sellingPrice?: number
  location?: string
  condition: string
  lastChecked: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
  outlet: Outlet
  maintenanceLogs: MaintenanceLog[]
}

export interface Booking {
  id: string
  outletId: string
  type: BookingType
  customerName: string
  customerPhone?: string
  customerEmail?: string
  date: Date
  startTime: Date
  endTime: Date
  participants: number
  totalAmount?: number
  depositAmount?: number
  status: BookingStatus
  notes?: string
  specialRequests?: string
  createdBy?: string
  createdAt: Date
  updatedAt: Date
  outlet: Outlet
}

export interface ActivityLog {
  id: string
  outletId: string
  employeeId?: string
  date: Date
  taskType: string
  taskName: string
  description: string
  status: string
  priority: string
  completedAt?: Date
  photoUrls: string[]
  kwhReading?: number
  notes?: string
  createdAt: Date
  updatedAt: Date
  outlet: Outlet
}

export interface MenuItem {
  id: string
  name: string
  description?: string
  category: string
  sellingPrice: number
  hpp: number
  profitMargin: number
  ingredients: string[]
  allergens: string[]
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface RetailProduct {
  id: string
  name: string
  description?: string
  category: string
  sku?: string
  barcode?: string
  sellingPrice: number
  purchasePrice: number
  profitMargin: number
  stock: number
  minStock: number
  supplier?: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  title: string
  description: string
  type: ProjectType
  status: ProjectStatus
  startDate: Date
  endDate?: Date
  budget?: number
  actualCost?: number
  progress: number
  managerId?: string
  teamMembers: string[]
  deliverables: string[]
  risks?: string
  mitigation?: string
  createdAt: Date
  updatedAt: Date
}

export interface DashboardStats {
  totalEmployees: number
  activeEmployees: number
  todayAttendance: number
  monthlyRevenue: number
  monthlyExpenses: number
  netProfit: number
  pendingBookings: number
  lowStockItems: number
  pendingTasks: number
}

export interface KPIData {
  attendancePercentage: number
  taskCompletionRate: number
  revenueGrowth: number
  expenseControl: number
  customerSatisfaction: number
  employeeSatisfaction: number
}

// Enums from Prisma schema
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  HR = 'HR',
  FINANCIAL_MANAGER = 'FINANCIAL_MANAGER',
  INVENTORY_MANAGER = 'INVENTORY_MANAGER',
  BOOKING_MANAGER = 'BOOKING_MANAGER',
  EMPLOYEE = 'EMPLOYEE',
}

export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  TERMINATED = 'TERMINATED',
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  SICK_LEAVE = 'SICK_LEAVE',
  ANNUAL_LEAVE = 'ANNUAL_LEAVE',
}

export enum WorkShift {
  MORNING = 'MORNING',
  EVENING = 'EVENING',
  NIGHT = 'NIGHT',
  FULL_DAY = 'FULL_DAY',
}

export enum BookingType {
  INDOOR_DINING = 'INDOOR_DINING',
  OUTDOOR_DINING = 'OUTDOOR_DINING',
  INDOOR_LESEHAN = 'INDOOR_LESEHAN',
  OUTDOOR_LESEHAN = 'OUTDOOR_LESEHAN',
  SINGING_ROOM = 'SINGING_ROOM',
  PUSPAWARNA_AUDITORIUM = 'PUSPAWARNA_AUDITORIUM',
  PUSPAWARNA_CLASS_ROOM = 'PUSPAWARNA_CLASS_ROOM',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ProjectStatus {
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
  CANCELLED = 'CANCELLED',
}

export enum ProjectType {
  MARKETING_PROGRAM = 'MARKETING_PROGRAM',
  CRM_PROGRAM = 'CRM_PROGRAM',
  NEW_MENU_DEVELOPMENT = 'NEW_MENU_DEVELOPMENT',
}
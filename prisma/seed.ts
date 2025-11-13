import { PrismaClient, UserRole, EmployeeStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create outlets
  const outlets = await Promise.all([
    prisma.outlet.upsert({
      where: { code: 'WK-JTN' },
      update: {},
      create: {
        code: 'WK-JTN',
        name: 'Wasabi Kitchen Jatinangor',
        address: 'Jl. Raya Jatinangor No. 123, Sumedang',
        phone: '+62-22-1234567',
        email: 'wk-jatinangor@wasabi.co.id',
      },
    }),
    prisma.outlet.upsert({
      where: { code: 'WK-KCR' },
      update: {},
      create: {
        code: 'WK-KCR',
        name: 'Wasabi Kitchen Kiaracondong',
        address: 'Jl. Kiaracondong No. 456, Bandung',
        phone: '+62-22-7654321',
        email: 'wk-kiaracondong@wasabi.co.id',
      },
    }),
    prisma.outlet.upsert({
      where: { code: 'BM-JTN' },
      update: {},
      create: {
        code: 'BM-JTN',
        name: 'Bukari Mart Jatinangor',
        address: 'Jl. Raya Jatinangor No. 789, Sumedang',
        phone: '+62-22-9876543',
        email: 'bm-jatinangor@bukari.co.id',
      },
    }),
  ])

  console.log('✅ Outlets created:', outlets.map(o => o.name))

  // Create super admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)

  const superAdminUser = await prisma.user.upsert({
    where: { email: 'admin@appubr.com' },
    update: {},
    create: {
      email: 'admin@appubr.com',
      password: hashedPassword,
      role: UserRole.SUPER_ADMIN,
    },
  })

  // Create super admin employee
  const superAdminEmployee = await prisma.employee.upsert({
    where: { employeeCode: 'ADMIN001' },
    update: {},
    create: {
      employeeCode: 'ADMIN001',
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@appubr.com',
      phone: '+62-812-3456-7890',
      position: 'Super Administrator',
      department: 'IT',
      outletId: outlets[0].id, // Assign to first outlet
      status: EmployeeStatus.ACTIVE,
      joinDate: new Date(),
      salary: 15000000,
      userId: superAdminUser.id,
    },
  })

  console.log('✅ Super admin created:', superAdminEmployee.email)

  // Create sample employees
  const sampleEmployees = [
    {
      employeeCode: 'EMP001',
      firstName: 'Ahmad',
      lastName: 'Rizki',
      email: 'ahmad.rizki@appubr.com',
      position: 'Cashier',
      department: 'Finance',
      role: UserRole.EMPLOYEE,
    },
    {
      employeeCode: 'EMP002',
      firstName: 'Siti',
      lastName: 'Nurhaliza',
      email: 'siti.nurhaliza@appubr.com',
      position: 'Cook',
      department: 'Kitchen',
      role: UserRole.EMPLOYEE,
    },
    {
      employeeCode: 'HR001',
      firstName: 'Budi',
      lastName: 'Santoso',
      email: 'budi.santoso@appubr.com',
      position: 'HR Manager',
      department: 'Human Resources',
      role: UserRole.HR,
    },
    {
      employeeCode: 'FIN001',
      firstName: 'Dewi',
      lastName: 'Kartika',
      email: 'dewi.kartika@appubr.com',
      position: 'Finance Manager',
      department: 'Finance',
      role: UserRole.FINANCIAL_MANAGER,
    },
  ]

  for (const empData of sampleEmployees) {
    const userPassword = await bcrypt.hash('password123', 12)

    const user = await prisma.user.upsert({
      where: { email: empData.email },
      update: {},
      create: {
        email: empData.email,
        password: userPassword,
        role: empData.role,
      },
    })

    await prisma.employee.upsert({
      where: { employeeCode: empData.employeeCode },
      update: {},
      create: {
        employeeCode: empData.employeeCode,
        firstName: empData.firstName,
        lastName: empData.lastName,
        email: empData.email,
        position: empData.position,
        department: empData.department,
        outletId: outlets[Math.floor(Math.random() * outlets.length)].id,
        status: EmployeeStatus.ACTIVE,
        joinDate: new Date(),
        userId: user.id,
      },
    })
  }

  console.log('✅ Sample employees created')

  // Create system configurations
  const systemConfigs = [
    {
      key: 'APP_NAME',
      value: 'App UBR - Unit Bisnis Ritel',
      description: 'Application name',
      category: 'GENERAL',
    },
    {
      key: 'COMPANY_NAME',
      value: 'PT. Padma Unit Bisnis Ritel',
      description: 'Company name',
      category: 'GENERAL',
    },
    {
      key: 'CURRENCY',
      value: 'IDR',
      description: 'Default currency',
      category: 'FINANCE',
    },
    {
      key: 'WORK_START_TIME',
      value: '08:00',
      description: 'Default work start time',
      category: 'SCHEDULE',
    },
    {
      key: 'WORK_END_TIME',
      value: '17:00',
      description: 'Default work end time',
      category: 'SCHEDULE',
    },
    {
      key: 'LATE_TOLERANCE',
      value: '15',
      description: 'Late tolerance in minutes',
      category: 'ATTENDANCE',
    },
  ]

  for (const config of systemConfigs) {
    await prisma.systemConfig.upsert({
      where: { key: config.key },
      update: {},
      create: config,
    })
  }

  console.log('✅ System configurations created')

  // Create sample menu items
  const menuItems = [
    {
      name: 'Chicken Teriyaki',
      description: 'Grilled chicken with teriyaki sauce',
      category: 'FOOD',
      sellingPrice: 45000,
      hpp: 18000,
      ingredients: ['Chicken', 'Teriyaki Sauce', 'Rice', 'Vegetables'],
      allergens: ['Soy', 'Gluten'],
    },
    {
      name: 'Salmon Sushi',
      description: 'Fresh salmon sushi roll',
      category: 'FOOD',
      sellingPrice: 65000,
      hpp: 28000,
      ingredients: ['Salmon', 'Rice', 'Nori', 'Wasabi'],
      allergens: ['Fish', 'Soy'],
    },
    {
      name: 'Green Tea Latte',
      description: 'Japanese green tea with milk',
      category: 'BEVERAGE',
      sellingPrice: 28000,
      hpp: 8000,
      ingredients: ['Green Tea Powder', 'Milk', 'Sugar'],
      allergens: ['Milk'],
    },
  ]

  for (const menuItem of menuItems) {
    const profitMargin = ((menuItem.sellingPrice - menuItem.hpp) / menuItem.hpp) * 100

    await prisma.menuItem.upsert({
      where: { name: menuItem.name },
      update: {},
      create: {
        ...menuItem,
        profitMargin,
      },
    })
  }

  console.log('✅ Sample menu items created')

  // Create sample retail products
  const retailProducts = [
    {
      name: 'Japanese Soy Sauce',
      description: 'Premium Japanese soy sauce 500ml',
      category: 'Groceries',
      sku: 'JSS-001',
      sellingPrice: 35000,
      purchasePrice: 25000,
      stock: 50,
      minStock: 10,
      supplier: 'PT. Japanese Foods Indonesia',
    },
    {
      name: 'Rice Cooker',
      description: 'Automatic rice cooker 1.8L',
      category: 'Electronics',
      sku: 'RC-002',
      sellingPrice: 450000,
      purchasePrice: 380000,
      stock: 15,
      minStock: 5,
      supplier: 'PT. Electronic Solutions',
    },
  ]

  for (const product of retailProducts) {
    const profitMargin = ((product.sellingPrice - product.purchasePrice) / product.purchasePrice) * 100

    await prisma.retailProduct.upsert({
      where: { sku: product.sku },
      update: {},
      create: {
        ...product,
        profitMargin,
      },
    })
  }

  console.log('✅ Sample retail products created')

  console.log('🎉 Database seeding completed successfully!')
  console.log('')
  console.log('📝 Login credentials:')
  console.log('   Super Admin: admin@appubr.com / admin123')
  console.log('   Sample Users: (any employee email) / password123')
  console.log('')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
const nextJest = require('next/jest')

// Proporciona la ruta a tu app Next.js para cargar next.config.js y archivos .env
const createJestConfig = nextJest({
  dir: './',
})

// Configuración personalizada de Jest
const customJestConfig = {
  // Directorio de setup antes de ejecutar tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Entorno de testing (jsdom simula el navegador)
  testEnvironment: 'jest-environment-jsdom',
  
  // Patrones para encontrar archivos de test
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  
  // Archivos a ignorar
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  
  // Alias de módulos (mismo que en tsconfig.json)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  
  // Collectar coverage de estos archivos
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
}

// createJestConfig se exporta de esta forma para asegurar que next/jest pueda cargar la config de Next.js
module.exports = createJestConfig(customJestConfig)

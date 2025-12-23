// Importar matchers personalizados de @testing-library/jest-dom
// Esto nos permite usar cosas como expect(element).toBeInTheDocument()
import '@testing-library/jest-dom'

// Mock de window.matchMedia (necesario para temas y responsive)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock de IntersectionObserver (usado por algunos componentes de UI)
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
}

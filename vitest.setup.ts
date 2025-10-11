// Vitest setup file
// This file runs before all tests
// Docs: https://vitest.dev/config/#setupfiles

import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Cleanup after each test (unmount React components)
afterEach(() => {
  cleanup()
})

// Optional: Add custom matchers or global test utilities here
// Example: Custom DOM matchers from @testing-library/jest-dom
// import '@testing-library/jest-dom'

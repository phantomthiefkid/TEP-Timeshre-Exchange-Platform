import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    overlay: {
      warnings: true,  // Hiển thị cảnh báo trên giao diện
      errors: true,    // Hiển thị lỗi trên giao diện
    }
  }
})

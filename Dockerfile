# Menggunakan Node.js slim sebagai base image
FROM node:slim

# Set working directory dalam container
WORKDIR /app

# Menyalin seluruh kode aplikasi ke container
COPY . .

# Expose port aplikasi
EXPOSE 3000

# Menjalankan aplikasi
CMD ["node", "app.js"]

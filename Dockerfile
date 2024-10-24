# Menggunakan Node.js slim sebagai base image
FROM node:slim

# Set working directory dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json ke container
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Menyalin seluruh kode aplikasi ke container
COPY . .

# Set environment variable (optional)
ENV PORT=3000

# Expose port aplikasi
EXPOSE 3000

# Menjalankan aplikasi
CMD ["node", "app.js"]

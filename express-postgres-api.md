# Express.js va PostgreSQL API Dokumentatsiyasi

Express.js va PostgreSQL bilan qurilgan API endpointlari va ularning xususiyatlari haqida ma'lumot.

## API Endpointlar

### 1. Barcha foydalanuvchilarni olish

- **Method:** GET
- **Path:** `/api/users`

**Request:**

- Query parametrlar (ixtiyoriy):
  - `limit`: Integer - Qaytariladigan maksimal foydalanuvchilar soni
  - `offset`: Integer - Nechta foydalanuvchini o'tkazib yuborish

**Response - Muvaffaqiyatli (200):**

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "Anvar Sanayev",
      "email": "anvar@example.com",
      "age": 28,
      "created_at": "2023-01-15T13:45:30.000Z"
    },
    ...
  ]
}
```

**Response - Xatolik (500):**

```json
{
  "success": false,
  "error": "Xatolik haqida ma'lumot"
}
```

### 2. Yangi foydalanuvchi yaratish

- **Method:** POST
- **Path:** `/api/user`

**Request Body:**

```json
{
  "name": "Sardor Rahimov",
  "email": "sardor@example.com",
  "age": 32
}
```

- `name`: String - Majburiy
- `email`: String - Majburiy, noyob bo'lishi kerak
- `age`: Integer - Ixtiyoriy

**Response - Muvaffaqiyatli (201):**

```json
{
  "success": true,
  "data": {
    "id": 5,
    "name": "Sardor Rahimov",
    "email": "sardor@example.com",
    "age": 32,
    "created_at": "2023-01-15T14:30:45.000Z"
  }
}
```

**Response - Xatolik (400) - Noto'g'ri so'rov:**

```json
{
  "success": false,
  "error": "Barcha majburiy maydonlarni to'ldiring"
}
```

**Response - Xatolik (409) - Takroriy email:**

```json
{
  "success": false,
  "error": "Bu email bilan foydalanuvchi allaqachon mavjud"
}
```

**Response - Xatolik (500) - Server xatosi:**

```json
{
  "success": false,
  "error": "Xatolik haqida ma'lumot"
}
```

### 3. Foydalanuvchi ma'lumotlarini ID bo'yicha olish

- **Method:** GET
- **Path:** `/api/users/:id`

**Request Parameters:**

- `id`: Integer - Foydalanuvchi identifikatori

**Response - Muvaffaqiyatli (200):**

```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "Gulnora Karimova",
    "email": "gulnora@example.com",
    "age": 25,
    "created_at": "2023-01-15T13:50:30.000Z"
  }
}
```

**Response - Xatolik (404) - Foydalanuvchi topilmadi:**

```json
{
  "success": false,
  "error": "Berilgan ID bo'yicha foydalanuvchi topilmadi"
}
```

**Response - Xatolik (500) - Server xatosi:**

```json
{
  "success": false,
  "error": "Xatolik haqida ma'lumot"
}
```

### 4. Foydalanuvchi ma'lumotlarini yangilash

- **Method:** PUT
- **Path:** `/api/users/:id`

**Request Parameters:**

- `id`: Integer - Foydalanuvchi identifikatori

**Request Body (kamida bitta maydon bo'lishi kerak):**

```json
{
  "name": "Yangilangan ism",
  "email": "yangi@example.com",
  "age": 35
}
```

- `name`: String - Ixtiyoriy
- `email`: String - Ixtiyoriy, noyob bo'lishi kerak
- `age`: Integer - Ixtiyoriy

**Response - Muvaffaqiyatli (200):**

```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "Yangilangan ism",
    "email": "yangi@example.com",
    "age": 35,
    "created_at": "2023-01-15T13:50:30.000Z"
  }
}
```

**Response - Xatolik (400) - Bo'sh so'rov:**

```json
{
  "success": false,
  "error": "Yangilash uchun kamida bitta maydon taqdim etilishi kerak"
}
```

**Response - Xatolik (404) - Foydalanuvchi topilmadi:**

```json
{
  "success": false,
  "error": "Berilgan ID bo'yicha foydalanuvchi topilmadi"
}
```

**Response - Xatolik (409) - Takroriy email:**

```json
{
  "success": false,
  "error": "Bu email bilan foydalanuvchi allaqachon mavjud"
}
```

**Response - Xatolik (500) - Server xatosi:**

```json
{
  "success": false,
  "error": "Xatolik haqida ma'lumot"
}
```

## Ma'lumotlar bazasi sxemasi

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

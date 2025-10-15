// User database (in production, use a real database)
// Passwords are hashed using bcrypt
const users = [
  {
    id: 1,
    username: "admin",
    // Password: admin123 (hashed with bcrypt)
    // Never store plain text passwords! Always hash them
    passwordHash:
      "$2a$10$hSkOnXiBbJotLo7Ixeyg8OALR8WUqollrGks6iYfMi9BUd6m80D7a",
    role: "admin",
    email: "admin@example.com",
  },
  {
    id: 2,
    username: "user",
    // Password: user123 (hashed with bcrypt)
    passwordHash:
      "$2a$10$VdxjnjKg1SzAH6MKY2W/MuZlVqZJHymIj0xM1Mr1vT5cVgLnz7lEy",
    role: "user",
    email: "user@example.com",
  },
];

// Sample data - items that users create
let data = [
  { id: 1, name: "Item 1", owner: "admin" },
  { id: 2, name: "Item 2", owner: "user" },
];

let nextId = data.length + 1;

// Storage for valid refresh tokens
// In production, use Redis or a database
// A Set is like an array but faster for checking if something exists
const refreshTokens = new Set();
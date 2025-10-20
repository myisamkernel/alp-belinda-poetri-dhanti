// User database (in production, use a real database)
// Passwords are hashed using bcrypt
const users = [
  {
    id: 1,
    username: "belinda",
    // Password: admin123 (hashed with bcrypt)
    // Never store plain text passwords! Always hash them
    passwordHash:
      "$2a$10$hSkOnXiBbJotLo7Ixeyg8OALR8WUqollrGks6iYfMi9BUd6m80D7a",
    startShift: "00:00",
    endShift: "23:59",
    role: "supervisor",
    email: "beluco991@gmail.com",
  },
  {
    id: 2,
    username: "clara",
    // Password: user123 (hashed with bcrypt)
    passwordHash:
      "$2a$10$VdxjnjKg1SzAH6MKY2W/MuZlVqZJHymIj0xM1Mr1vT5cVgLnz7lEy",
    startShift: "09:00",
    endShift: "18:00",
    role: "admin",
    email: "user@example.com",
  },
  {
    id: 3,
    username: "tiara",
    // Password: user123 (hashed with bcrypt)
    passwordHash:
      "$2a$10$VdxjnjKg1SzAH6MKY2W/MuZlVqZJHymIj0xM1Mr1vT5cVgLnz7lEy",
    startShift: "18:00",
    endShift: "03:00",
    role: "admin",
    email: "user@example.com",
  },
  {
    id: 4,
    username: "andi",
    // Password: guest123 (hashed with bcrypt)
    passwordHash:
      "$2a$12$9QFjTPV/7R/uzLO7CZMwLuS7F9rJuDZnxTprGuZDIpbAFLpeTJpGu",
    startShift: "00:00",
    endShift: "23:59",
    role: "operator",
    email: "guest@example.com",
  },
];

let data = [
  { id: 1, name: "Item 1", created_by_name: "belinda", created_by: 1 },
  { id: 2, name: "Item 2", created_by_name: "belinda", created_by: 1 },
];

const rolesPermissions = {
  supervisor: ["read", "write", "delete"],
  admin: ["read", "write"],
  operator: ["read"],
};

let nextId = data.length + 1;

// Storage for valid refresh tokens
const refreshTokens = new Set();

module.exports = {
  users,
  data,
  nextId,
  refreshTokens,
  rolesPermissions,
};

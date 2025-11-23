const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Get All Users
export async function getUsers() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
}

// Create User
export async function createUser(userData) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Failed to create user');
    return await response.json();
}

// Update User
export async function updateUser(id, userData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Failed to update user');
    return await response.json(); 
}

// Delete Users
export async function deleteUserById(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return true;
}
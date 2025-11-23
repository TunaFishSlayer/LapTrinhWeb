import './style.css'; 
import * as api from './api.js';
import * as ui from './ui.js';

// State
let users = [];
let filteredUsers = [];
let currentPage = 1;
const rowsPerPage = 5;

// Initialization
window.addEventListener('DOMContentLoaded', init);

async function init() {
    ui.toggleLoader(true);
    try {
        users = await api.getUsers();
        filteredUsers = [...users];
        ui.renderTable(filteredUsers, currentPage, rowsPerPage);
    } catch (err) {
        alert(err.message);
    } finally {
        ui.toggleLoader(false);
    }
}

// Event Listeners

// 1. Search
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    filteredUsers = users.filter(u => u.name.toLowerCase().includes(term));
    currentPage = 1;
    ui.renderTable(filteredUsers, currentPage, rowsPerPage);
});

// 2. Pagination Buttons
document.getElementById('prevBtn').addEventListener('click', () => changePage(-1));
document.getElementById('nextBtn').addEventListener('click', () => changePage(1));

function changePage(direction) {
    currentPage += direction;
    ui.renderTable(filteredUsers, currentPage, rowsPerPage);
}

// 3. Modal Opening (Add Button)
document.getElementById('addBtn').addEventListener('click', () => {
    ui.setModalMode('add');
    ui.toggleModal(true);
});

// 4. Modal Closing
document.getElementById('closeModalBtn').addEventListener('click', () => ui.toggleModal(false));
window.onclick = (event) => {
    if (event.target == document.getElementById('userModal')) ui.toggleModal(false);
};

// 5. Table Actions (Edit/Delete)
document.getElementById('userTableBody').addEventListener('click', async (e) => {
    const btn = e.target.closest('button');

    if (!btn) return;

    const id = btn.dataset.id; 
    
    if (btn.classList.contains('btn-delete')) {
        await handleDelete(id);
    } 
    else if (btn.classList.contains('btn-edit')) {
        const user = users.find(u => u.id == id); 
        
        if (user) {
            ui.setModalMode('edit');
            ui.fillModalForm(user);
            ui.toggleModal(true);
        } else {
            console.error("User not found in memory");
        }
    }
});

// 6. Form Submit (Create/Update)
document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('userId').value;
    
    const formData = {
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        phone: document.getElementById('userPhone').value
    };

    ui.toggleModal(false);
    ui.toggleLoader(true);

    try {
        if (id) {
            // UPDATE
            await api.updateUser(id, formData);
            // Manual State Update
            const index = users.findIndex(u => u.id == id);
            if (index !== -1) users[index] = { ...users[index], ...formData };
            alert('Updated successfully');
        } else {
            // CREATE
            const newUser = await api.createUser(formData);
            // Fake ID generation 
            newUser.id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
            users.push(newUser);
            alert('Created successfully');
        }
        
        // Refresh UI
        // Re-apply search filter 
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm));
        ui.renderTable(filteredUsers, currentPage, rowsPerPage);

    } catch (err) {
        alert(err.message);
    } finally {
        ui.toggleLoader(false);
    }
});

// Logic Helpers
async function handleDelete(id) {
    if (!confirm('Are you sure?')) return;
    
    ui.toggleLoader(true);
    try {
        await api.deleteUserById(id);
        users = users.filter(u => u.id != id);
        
        // Re-filter
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm));
        
        ui.renderTable(filteredUsers, currentPage, rowsPerPage);
    } catch (err) {
        alert(err.message);
    } finally {
        ui.toggleLoader(false);
    }
}
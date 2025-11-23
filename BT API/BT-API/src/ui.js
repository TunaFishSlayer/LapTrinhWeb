const tableBody = document.getElementById('userTableBody');
const pageInfo = document.getElementById('pageInfo');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const modal = document.getElementById('userModal');
const loader = document.getElementById('loader');

export function renderTable(users, currentPage, rowsPerPage) {
    tableBody.innerHTML = '';

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = users.slice(start, end);

    if (paginatedItems.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center">No users found</td></tr>';
    } else {
        paginatedItems.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>
                    <button class="btn-edit" data-id="${user.id}">Edit</button>
                    <button class="btn-delete" data-id="${user.id}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    updatePaginationControls(users.length, currentPage, rowsPerPage);
}
export function updatePaginationControls(totalItems, currentPage, rowsPerPage) {
    if (totalItems === 0) {
        pageInfo.textContent = "No Results";
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return; 
    }
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

export function toggleModal(show) {
    modal.style.display = show ? 'flex' : 'none';
}

export function setModalMode(mode) {
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('userForm');
    title.innerText = mode === 'edit' ? 'Edit User' : 'Add New User';
    
    if (mode === 'add') {
        form.reset();
        document.getElementById('userId').value = '';
    }
}

export function fillModalForm(user) {
    document.getElementById('userId').value = user.id;
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userPhone').value = user.phone;
}

export function toggleLoader(show) {
    loader.style.display = show ? 'block' : 'none';
}
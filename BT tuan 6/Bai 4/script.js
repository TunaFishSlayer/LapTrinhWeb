document.addEventListener('DOMContentLoaded', () => {
    const toggleFormBtn = document.getElementById('toggleFormBtn');
    const addBookForm = document.getElementById('addBookForm');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const booksList = document.querySelector('.books-list');
    const errorMsg = document.getElementById('errorMsg');
    const cancelBtn = document.getElementById('cancelBtn');

    // an hien Form add sach
    toggleFormBtn.addEventListener('click', () => {
        addBookForm.classList.toggle('hidden');
    });

    // loc sach theo ten
    const filterBooks = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const bookCards = document.querySelectorAll('.book-card'); // them de update danh sach sach
        bookCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    };

    searchBtn.addEventListener('click', filterBooks);
    searchInput.addEventListener('keyup', filterBooks);

    // Them sach moi qua form
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('bookTitle').value.trim();
        const author = document.getElementById('bookAuthor').value.trim();
        const price = document.getElementById('bookPrice').value.trim();
        const description = document.getElementById('bookDescription').value.trim();
        const imageUrl = document.getElementById('bookImage').value.trim();

        if (!title || !author || !price || !description) {
            errorMsg.textContent = 'Please fill in all required fields.';
            return;
        }

        if (isNaN(parseFloat(price)) || parseFloat(price) < 0) {
            errorMsg.textContent = 'Please enter a valid, non-negative number for the price.';
            return;
        }

        errorMsg.textContent = '';

        // tao the article cho sach moi
        const newBookCard = document.createElement('article');
        newBookCard.className = 'book-card';

        // tao the img va gan link anh
        const img = document.createElement('img');
        img.src = imageUrl || 'https://tse1.mm.bing.net/th/id/OIP.WXV2awHCNEEbCJwroH_p_AHaHa?cb=12&w=600&h=600&rs=1&pid=ImgDetMain&o=7&rm=3';
        img.alt = `Cover of ${title}`;

        // tao the va gan ten sach & tac gia
        const h3 = document.createElement('h3');
        h3.textContent = `"${title}" by ${author}`;

        // tao the mo ta va gan noi dung
        const p = document.createElement('p');
        p.textContent = description;

        // tao the gia va gan gia tri
        const span = document.createElement('span');
        span.textContent = `$${parseFloat(price).toFixed(2)}`;

        // them cac the vao the article
        newBookCard.append(img, h3, p, span);

        // them the article vao danh sach sach
        booksList.appendChild(newBookCard);

        // reset form sau khi them sach
        addBookForm.classList.add('hidden');
        addBookForm.reset();
    });

    // Nut huy
    cancelBtn.addEventListener('click', () => {
        addBookForm.reset();
        errorMsg.textContent = '';
        addBookForm.classList.add('hidden');
    });
});
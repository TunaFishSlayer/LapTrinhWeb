document.addEventListener('DOMContentLoaded', () => {

    let books = []; // Mang luu sach

    const toggleFormBtn = document.getElementById('toggleFormBtn');
    const addBookForm = document.getElementById('addBookForm');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const booksList = document.querySelector('.books-list');    
    const errorMsg = document.getElementById('errorMsg');
    const cancelBtn = document.getElementById('cancelBtn');
    const successMessage = document.getElementById('successMessage');


    // Ham luu sach vao localStorage
    const saveBooks = () => {
        localStorage.setItem('products', JSON.stringify(books));
    };

    // Ham load danh sach tu localStorage
    const loadBooks = () => {
        const savedBooks = localStorage.getItem('products');
        if (savedBooks) {
            // Co data thi load tu localStorage
            books = JSON.parse(savedBooks);
        } else {
            // 4 sach mac dinh tu HTML chuyen sang
            books = [
                {
                    title: "The Great Gatsby",
                    author: "F. Scott Fitzgerald",
                    price: "10.99",
                    description: "A novel about the American dream.",
                    imageUrl: "https://tse2.mm.bing.net/th/id/OIP.0jKsYa7NA4f-atP8k37ipgHaLS?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
                },
                {
                    title: "1984",
                    author: "George Orwell",
                    price: "9.99",
                    description: "A dystopian novel about totalitarianism.",
                    imageUrl: "https://cdn.kobo.com/book-images/c9472126-7f96-402d-ba57-5ba4c0f4b238/1200/1200/False/nineteen-eighty-four-1984-george.jpg"
                },
                {
                    title: "To Kill a Mockingbird",
                    author: "Harper Lee",
                    price: "12.99",
                    description: "A novel about racial injustice in the Deep South.",
                    imageUrl: "https://m.media-amazon.com/images/I/81gepf1eMqL._SL1500_.jpg"
                },
                {
                    title: "The Hunger Games",
                    author: "Suzanne Collins",
                    price: "11.99",
                    description: "A dystopian novel about survival and rebellion.",
                    imageUrl: "https://tse2.mm.bing.net/th/id/OIP.iXT1k2bLKV6pZLvUPAciCgHaLN?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3"
                }
            ];
        }
    };


    // Ham hien thi sach ra Website
    const displayBooks = () => {
        // Clear the current list to avoid duplicates
        booksList.innerHTML = '';

        // Loop qua mang books
        books.forEach(book => {
            // tao the article cho sach moi
            const newBookCard = document.createElement('article');
            newBookCard.className = 'book-card';

            // tao the img va gan link anh
            const img = document.createElement('img');
            img.src = book.imageUrl || 'https://tse1.mm.bing.net/th/id/OIP.WXV2awHCNEEbCJwroH_p_AHaHa?cb=12&w=600&h=600&rs=1&pid=ImgDetMain&o=7&rm=3';
            img.alt = `Cover of ${book.title}`;

            // tao the va gan ten sach & tac gia
            const h3 = document.createElement('h3');
            h3.textContent = `"${book.title}" by ${book.author}`;

            // tao the mo ta va gan noi dung
            const p = document.createElement('p');
            p.textContent = book.description;

            // tao the gia va gan gia tri
            const span = document.createElement('span');
            span.textContent = `$${parseFloat(book.price).toFixed(2)}`;

            // them cac the vao the article
            newBookCard.append(img, h3, p, span);

            // them the article vao danh sach sach
            booksList.appendChild(newBookCard);
        });
    };

    // Event Listeners

    // An/hien form them sach moi
    toggleFormBtn.addEventListener('click', () => addBookForm.classList.toggle('hidden'));

    // Nut huy
    cancelBtn.addEventListener('click', () => {
        addBookForm.reset();
        errorMsg.textContent = '';
        addBookForm.classList.add('hidden');
    });

    // tim kiem/loc sach
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

        // Kiem tra du lieu
        if (!title || !author || !price || !description) {
            errorMsg.textContent = 'Please fill in all required fields.';
            return;
        }
        if (isNaN(parseFloat(price)) || parseFloat(price) < 0) {
            errorMsg.textContent = 'Please enter a valid price.';
            return;
        }
        errorMsg.textContent = '';

        // Tao doi tuong sach moi
        const newBook = { title, author, price, description, imageUrl };

        // them sach moi vao mang state
        books.push(newBook);

        // Luwu vao localStorage
        saveBooks();

        // load lai danh sach sach tren giao dien
        displayBooks();

        // Ap dung loc neu co 
        filterBooks();

        // Thong bao thanh cong
        successMessage.textContent = `"${title}" was added successfully!`;
        successMessage.classList.remove('hidden');
        setTimeout(() => successMessage.classList.add('hidden'), 3000);

        // Reset form 
        addBookForm.reset();
        addBookForm.classList.add('hidden');
    });

    // Load mang books va hien thi
    loadBooks();
    displayBooks();
});
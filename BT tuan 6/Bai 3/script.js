document.addEventListener('DOMContentLoaded', () => {

    // An/hien form them sach moi
    const toggleFormBtn = document.getElementById('toggleFormBtn');
    const addBookForm = document.getElementById('addBookForm');

  
    // Add su kien an/hien form
    toggleFormBtn.addEventListener('click', () => {
        addBookForm.classList.toggle('hidden');
    });


    // tim kiem/loc sach
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const bookCards = document.querySelectorAll('.book-card');

    const filterBooks = () => {
        const searchTerm = searchInput.value.toLowerCase();
        bookCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    };
    
    // tim kiem khi nhan nut hoac go phim
    searchBtn.addEventListener('click', filterBooks);
    searchInput.addEventListener('keyup', filterBooks);
});
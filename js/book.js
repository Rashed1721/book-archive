// function for clear data
const ClearData = () => {

    const bookContainer = document.getElementById('books-container');
    bookContainer.innerHTML = '';
    const Message = document.getElementById('message');
    Message.innerHTML = '';
    const booksNumber = document.getElementById('books-number');
    booksNumber.innerHTML = '';

}
const searchBooks = () => {
    let inputField = document.getElementById('input-field');
    const serachText = inputField.value;
    //clear data of input field
    inputField.value = '';

    if (serachText == '') {

        ClearData();

        // message show for empty search
        const Message = document.getElementById('message');
        const div = document.createElement('div');
        div.innerHTML = `<h4>Please write Something !!</h4>`;
        div.style.textAlign = "center";
        div.style.color = "red";
        div.style.display = "inline"
        Message.appendChild(div);

    }
    else {
        const url = `http://openlibrary.org/search.json?q=${serachText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data.docs))
    }

}

const displayBooks = (books) => {

    if (books.length === 0) {

        ClearData();

        // message show for no result
        const Message = document.getElementById('message');
        const div = document.createElement('div');
        div.innerHTML = `<h4>no result found!!</h4>`;
        div.style.textAlign = "center";
        div.style.color = "red";
        div.style.display = "inline"
        Message.appendChild(div);


    }
    else {

        const bookContainer = document.getElementById('books-container');
        const booksNumber = document.getElementById('books-number');
        const Message = document.getElementById('message');
        let count = 0;
        Message.innerHTML = '';
        bookContainer.innerHTML = '';
        books.forEach(book => {
            const div = document.createElement('div');
            count++;
            div.classList.add('col');
            div.innerHTML = `
        <div class="card">
          <img height="300px" src="${`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}" class="card-img-top " alt="...">
           <div class="card-body">
               <h5 class="card-title">${book.title.slice(0, 10)}</h5>
                <p class="card-text"><h6 style="display:inline;">Author:</h6>${book.author_name}</p>
                <p class="card-text"><h6 style="display:inline;">publisher:</h6>${book.publisher}</p>
                <p class="card-text"><h6 style="display:inline;">First publish year:<h6>${book.first_publish_year}</p>
            </div>
         </div>
        `
            bookContainer.appendChild(div);

        })
        // message of total books found
        booksNumber.innerHTML = '';
        const h6 = document.createElement('h6');
        h6.innerText = `Total Books found:${count}`;
        booksNumber.appendChild(h6);
    }




}
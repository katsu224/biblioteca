let libros = [];
const librosPorPagina = 10;
let paginaActual = 1;

async function fetchLibros() {
    try {
        const response = await fetch('../json/biblio.json');
        libros = await response.json();

        renderBooks();
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }

}


let pagina2="libro.html"
function renderBooks() {
  

    const container = document.getElementById('libros-container');
    container.innerHTML = ''; // Limpiar contenedor
    const inicio = (paginaActual - 1) * librosPorPagina;
    const fin = inicio + librosPorPagina;
    const librosPagina = libros.slice(inicio, fin);
    librosPagina.forEach(libro => {
        const bookDiv = document.createElement('a');

        bookDiv.setAttribute('href',`../html/${pagina2}?inforlibro=${libro.n}`)
        bookDiv.classList.add('libro');
        const bookImg= document.createElement('div')
        bookImg.classList.add('slibro')
        bookImg.setAttribute('style',`background-image: url(${libro.imagen}port${libro.n}.jpg);`)
      
        const bookTitle = document.createElement('h4');
        bookTitle.textContent = libro.titulo;
        
        bookDiv.addEventListener('click',function mostrar() {
            const informacionpag2=libros[(libro.n)-1]
            console.log(informacionpag2)
        
        })
        /*
      
        
        const bookDescription = document.createElement('p');
        bookDescription.textContent = libro.descripcion;

        
        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `Autor: ${libro.autor}`;
        
        const bookPrice = document.createElement('p');
        bookPrice.textContent = `Precio: $${libro.precio}`;
        
        const bookYear = document.createElement('p');
        bookYear.textContent = `Año: ${libro.año}`;
        
        const bookEditorial = document.createElement('p');
        bookEditorial.textContent = `Editorial: ${libro.editorial}`;

     
       bookDiv.appendChild(bookDescription);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPrice);
        bookDiv.appendChild(bookYear);
        bookDiv.appendChild(bookEditorial);
   */

        bookDiv.appendChild(bookImg);
        bookDiv.appendChild(bookTitle);
        container.appendChild(bookDiv);

    });

    updatePagination();
}
function updatePagination() {
    const totalPaginas = Math.ceil(libros.length / librosPorPagina);
    document.getElementById('page-info').textContent = `Página ${paginaActual} de ${totalPaginas}`;
    
    document.getElementById('prev-page').disabled = paginaActual === 1;
    document.getElementById('next-page').disabled = paginaActual === totalPaginas;
}

function prevPage() {
    if (paginaActual > 1) {
        paginaActual--;
        renderBooks();  
    }
}

function nextPage() {
    const totalPaginas = Math.ceil(libros.length / librosPorPagina);
    if (paginaActual < totalPaginas) {
        paginaActual++;
        renderBooks();
    }
}


document.addEventListener('DOMContentLoaded', fetchLibros);

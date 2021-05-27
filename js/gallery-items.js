import images from "./gallery.js";

// console.log(images)


const imagesList = document.querySelector(".js-gallery");
const modal = document.querySelector(".js-lightbox");
const close = document.querySelector('[data-action="close-lightbox"]');
const modalImage = document.querySelector(".lightbox__image")


// Создание галереи изображений------------------------------------

const imageMarkup = createImageCardsMarkup(images)

imagesList.insertAdjacentHTML('beforeend',imageMarkup)

// console.log(createImageCardsMarkup(images))



function createImageCardsMarkup(images) {
    return images
           .map(({ preview, original, description }) => {

         return `
         <li class="gallery__item">
            <a
                class="gallery__link"
             href="${original}"
            >
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
         </li >
            `;
        
           })
        .join('');
}
//---------------------------------------------------------

// Делегирование и открытие модального окна----------------

imagesList.addEventListener('click', onImageListClick)

function onImageListClick(event) {
  event.preventDefault()
    const isImageSwatchEl = event.target.classList.contains("gallery__image")

    if (!isImageSwatchEl) {
        return
    }   
    const imageUrl = event.target.dataset.source;
    modal.classList.add("is-open");

    modalImage.src = imageUrl
    
}
//-----------------------------------------------------------

// Закрытие модального окна кнопкой ------------


close.addEventListener('click', onCloseClick);
function onCloseClick(event) {
    modal.classList.remove("is-open");
    modalImage.src = ''
}

//-----------------------------------------------------------

// Закрытие модалки  клавишей esc ---------------------

document.addEventListener('keydown', onEscClick);
function onEscClick(event) {
    if (event.keyCode !== 27) {
        return
    }
    modal.classList.remove("is-open");
    modalImage.src = ''
}
//-----------------------------------------------------------

// Закрытие модалки кликом по полю модалки ---------------------

modal.addEventListener('click', onModalWindowClick);

function onModalWindowClick(event) {
    const isModalImageEl = event.target.classList.contains("lightbox__image");
     if (isModalImageEl) {
        return
    }
    modal.classList.remove("is-open");
    modalImage.src = ''
}
//---------------------------------------------------------------
// Слайдшоу стрелками  ArrowLeft || ArrowRight---------------------

const arrayImages = [];
images.forEach(({original})=> {
    arrayImages.push(original);

 })
// console.log(arrayImages);

document.addEventListener('keydown', onArrowClick);
function onArrowClick(event) {
    let newIndex;
    const currentId = arrayImages.indexOf(modalImage.src);
    if (event.key === 'ArrowLeft') {
        if (currentId > -1) {
            newIndex = currentId - 1;
        }
        if (newIndex === -1) {
            newIndex = arrayImages.length - 1;
        }
    } else if (event.key === 'ArrowRight') {
        newIndex = currentId + 1;
        if (newIndex === arrayImages.length) {
            newIndex = 0;
        }
    } else return;
    modalImage.src = arrayImages[newIndex];
};

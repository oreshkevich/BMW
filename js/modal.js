import blockScroll from './blockScrolled.js';

const {enableScroll, disabledScroll} = blockScroll;
export default function modal() {
  const moreElems = document.querySelectorAll('.more');
  const modalElem = document.querySelector('.modal');
  
  const openModal = () => {
    modalElem.classList.remove('hidden');
    disabledScroll();
  };
  
  const closeModal = () => {
    modalElem.classList.add('hidden');
    enableScroll();
  };

  moreElems.forEach(moreElem => {
    moreElem.addEventListener('click', openModal);
  });
  
  modalElem.addEventListener('click', (event) => {
  
    const target = event.target;
    if(target.classList.contains('overlay') || 
    target.classList.contains('modal__close')) {
      closeModal()
    }
  
    if(target.classList.contains('modal__title')) {
      target.style.color = 'red'
    }
  
  })
}

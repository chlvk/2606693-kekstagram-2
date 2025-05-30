import {toggleClass, isEscapeKey} from './util.js';
import {initImageEditor, resetImageEditor} from './image-editor.js';
import {initValidator} from './form-validator.js';
import {sendData} from './api.js';
import {onSendDataSuccess, onSendDataError} from './notifications.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const overlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionInputElement = uploadFormElement.querySelector('.text__description');
const closeOverlayElement = uploadFormElement.querySelector('.img-upload__cancel');
const uploadButtonElement = uploadFormElement.querySelector('.img-upload__submit');

let validationHandler;

const toggleModal = () => {
  toggleClass(overlayElement, 'hidden');
  toggleClass(document.body, 'modal-open');
};

const openForm = () => {
  toggleModal();

  document.addEventListener('keydown', onEscKeydown);
};

const closeForm = () => {
  uploadInputElement.value = '';
  uploadFormElement.reset();
  uploadButtonElement.disabled = false;

  validationHandler.reset();
  resetImageEditor();

  toggleModal();

  document.removeEventListener('keydown', onEscKeydown);
};

function onEscKeydown (evt) {
  if (isEscapeKey(evt) && !document.body.classList.contains('notification-open') && document.activeElement !== hashtagsInputElement && document.activeElement !== descriptionInputElement) {
    evt.preventDefault();
    closeForm();
  }
}

const onUploadInputChange = () => {
  openForm();
};

const onCloseOverlayClick = () => {
  closeForm();
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (validationHandler.validate()) {
    uploadButtonElement.disabled = true;

    sendData(new FormData(evt.target))
      .then(onSendDataSuccess)
      .catch(onSendDataError);
  }
};

const initUploadForm = () => {
  uploadInputElement.addEventListener('change', onUploadInputChange);
  closeOverlayElement.addEventListener('click', onCloseOverlayClick);
  uploadFormElement.addEventListener('submit', onUploadFormSubmit);

  validationHandler = initValidator();
  initImageEditor();
};

export {initUploadForm, closeForm};



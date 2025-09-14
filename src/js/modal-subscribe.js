import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  fontSize: '1.6rem',
  success: {
    background: '#fd9222',
    textColor: '#000000',
  },
});

(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-subscribe-open]'),
    closeModalBtn: document.querySelector('[data-modal-subscribe-close]'),
    modal: document.querySelector('[data-modal-subscribe]'),
    form: document.querySelector('.modal-form.subscribe-js'),
  };

  if (!refs.form) return;

  const emailInput = refs.form.querySelector('input[type="email"]');
  const errorRequired = refs.form.querySelector('.error-message.required');
  const errorInvalid = refs.form.querySelector('.error-message.required-email');

  hideErrors();

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    if (refs.modal.classList.contains('is-hidden')) {
      resetForm();
    } else {
      emailInput.focus();
    }
  }

  emailInput.addEventListener('blur', () => {
    validateEmail();
  });

  refs.form.addEventListener('submit', e => {
    if (!validateEmail()) {
      e.preventDefault();
    } else {
      e.preventDefault();
      toggleModal();
      Notify.success('Success');
    }
  });

  function validateEmail() {
    const value = emailInput.value.trim();

    hideErrors();
    emailInput.classList.remove('is-invalid');

    if (value === '') {
      errorRequired.style.display = 'block';
      emailInput.classList.add('is-invalid');
      return false;
    } else if (!emailInput.checkValidity()) {
      errorInvalid.style.display = 'block';
      emailInput.classList.add('is-invalid');
      return false;
    } else {
      return true;
    }
  }

  function hideErrors() {
    errorRequired.style.display = 'none';
    errorInvalid.style.display = 'none';
  }

  function resetForm() {
    emailInput.value = '';
    emailInput.classList.remove('is-invalid', 'is-valid');
    hideErrors();
  }
})();

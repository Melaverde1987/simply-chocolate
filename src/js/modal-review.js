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
    openModalBtn: document.querySelector('[data-modal-review-open]'),
    closeModalBtn: document.querySelector('[data-modal-review-close]'),
    modal: document.querySelector('[data-modal-review]'),
    form: document.querySelector('.modal-form.review-js'),
  };

  if (!refs.form) return;

  const nameInput = refs.form.querySelector('#reviewform-name');
  const emailInput = refs.form.querySelector('#reviewform-mail');
  const msgInput = refs.form.querySelector('#reviewform-message');

  hideAllErrors();

  refs.openModalBtn?.addEventListener('click', toggleModal);
  refs.closeModalBtn?.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    if (refs.modal.classList.contains('is-hidden')) {
      resetForm();
    } else {
      nameInput?.focus();
    }
  }

  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  msgInput.addEventListener('blur', validateMessage);

  refs.form.addEventListener('submit', e => {
    e.preventDefault();

    const ok = validateName() & validateEmail() & validateMessage(); // побітово для виконання всіх функцій

    if (ok) {
      e.preventDefault();
      Notify.success('Success');
      toggleModal();
    }
  });

  function findErrorBelow(input, className) {
    let el = input.nextElementSibling;
    while (el && el.tagName !== 'LABEL') {
      if (
        el.classList?.contains('error-message') &&
        el.classList.contains(className)
      ) {
        return el;
      }
      el = el.nextElementSibling;
    }
    return null;
  }

  function showError(input, className) {
    input.classList.add('is-invalid');
    const err = findErrorBelow(input, className);
    if (err) err.style.display = 'block';
  }

  function clearErrorsFor(input) {
    input.classList.remove('is-invalid', 'is-valid');
    let el = input.nextElementSibling;
    while (el && el.tagName !== 'LABEL') {
      if (el.classList?.contains('error-message')) el.style.display = 'none';
      el = el.nextElementSibling;
    }
  }

  function hideAllErrors() {
    refs.form
      .querySelectorAll('.error-message')
      .forEach(el => (el.style.display = 'none'));
    refs.form
      .querySelectorAll('input, textarea')
      .forEach(el => el.classList.remove('is-invalid', 'is-valid'));
  }

  function validateName() {
    const value = nameInput.value.trim();
    clearErrorsFor(nameInput);

    const nameRegex = /^[A-Za-z' -]+$/;

    if (value === '') {
      showError(nameInput, 'required');
      return 0;
    }
    if (!nameRegex.test(value)) {
      showError(nameInput, 'required-pattern');
      return 0;
    }
    nameInput.classList.add('is-valid');
    return 1;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    clearErrorsFor(emailInput);

    if (value === '') {
      showError(emailInput, 'required');
      return 0;
    }
    if (!emailInput.checkValidity()) {
      showError(emailInput, 'required-email');
      return 0;
    }
    emailInput.classList.add('is-valid');
    return 1;
  }

  function validateMessage() {
    const value = msgInput.value.trim();
    clearErrorsFor(msgInput);

    if (value === '') {
      showError(msgInput, 'required');
      return 0;
    }
    msgInput.classList.add('is-valid');
    return 1;
  }

  function resetForm() {
    refs.form.reset();
    hideAllErrors();
  }
})();

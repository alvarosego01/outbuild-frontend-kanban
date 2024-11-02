import '@testing-library/jest-dom';
import 'dialog-polyfill/dialog-polyfill.css';
import dialogPolyfill from 'dialog-polyfill';

if (typeof HTMLDialogElement === 'undefined') {
    dialogPolyfill.registerDialog(window.HTMLDialogElement.prototype);
}
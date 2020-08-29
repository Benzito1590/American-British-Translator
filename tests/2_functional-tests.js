/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

let Translator;

suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load translator then run tests
    Translator = require('../public/translator.js');
  });

  suite('Function translate()', () => {
    /* 
      The translated sentence is appended to the `translated-sentence` `div`
      and the translated words or terms are wrapped in 
      `<span class="highlight">...</span>` tags when the "Translate" button is pressed.
    */
    test("Translation appended to the `translated-sentence` `div`", done => {
      const click = new window.Event('click', {
        bubbles: true
      })
      
      const textArea = document.getElementById('text-input')
      const button = document.getElementById('translate-btn')
      const dropdown = document.getElementById('locale-select')
      const translatedDiv = document.getElementById('translated-sentence')
      
      textArea.value = "To play hooky means to skip class or work."
      
      dropdown.selectedIndex = 0
      
      button.dispatchEvent(click)
      
      assert.equal(translatedDiv.innerHTML, 'To <span class="highlight">bunk</span> <span class="highlight">off</span> means to skip class or work.')
      
      done();
    });

    /* 
      If there are no words or terms that need to be translated,
      the message 'Everything looks good to me!' is appended to the
      `translated-sentence` `div` when the "Translate" button is pressed.
    */
    test("'Everything looks good to me!' message appended to the `translated-sentence` `div`", done => {
      const click = new window.Event('click', {
        bubbles: true
      })
      
      const textArea = document.getElementById('text-input')
      const button = document.getElementById('translate-btn')
      const dropdown = document.getElementById('locale-select')
      const translatedDiv = document.getElementById('translated-sentence')
      
      textArea.value = "Hello World."
      
      dropdown.value = 'british-to-american'
      
      button.dispatchEvent(click)

      assert.equal(translatedDiv.innerHTML, 'Everything looks good to me!')
      
      done();
    });

    /* 
      If the text area is empty when the "Translation" button is
      pressed, append the message 'Error: No text to translate.' to 
      the `error-msg` `div`.
    */
    test("'Error: No text to translate.' message appended to the `translated-sentence` `div`", done => {
      const click = new window.Event('click', {
        bubbles: true
      })
      
      const textArea = document.getElementById('text-input')
      const button = document.getElementById('translate-btn')
      const dropdown = document.getElementById('locale-select')
      const errorMsg = document.getElementById('error-msg')
      
      textArea.value = ""
      
      dropdown.value = 'british-to-american'
      
      button.dispatchEvent(click)
      
      assert.equal(errorMsg.innerHTML, 'Error: No text to translate.')
      
      done();
    });

  });

  suite('Function clear()', () => {
    /* 
      The text area and both the `translated-sentence` and `error-msg`
      `divs` are cleared when the "Clear" button is pressed.
    */
    test("Text area, `translated-sentence`, and `error-msg` are cleared", done => {
      const click = new window.Event('click', {
        bubbles: true
      })
      
      const textArea = document.getElementById('text-input')
      const translateButton = document.getElementById('translate-btn')
      const clearButton = document.getElementById('clear-btn')
      const dropdown = document.getElementById('locale-select')
      const translatedDiv = document.getElementById('translated-sentence')
      const errorDiv = document.getElementById('error-msg')
      
      textArea.value = "Hello"
      
      dropdown.value = 'american-to-british'
      
      translateButton.dispatchEvent(click)
      
      clearButton.dispatchEvent(click)
      
      assert.equal(translatedDiv.innerHTML, '')
      
      translateButton.dispatchEvent(click)
      
      clearButton.dispatchEvent(click)
      
      assert.equal(errorDiv.innerHTML, '')
      
      done();
    });

  });

});

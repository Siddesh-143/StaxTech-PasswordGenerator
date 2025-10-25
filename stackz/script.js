// Password Generator
(function(){
  const el = id => document.getElementById(id);
  const lengthInput = el('length');
  const lower = el('lower');
  const upper = el('upper');
  const numbers = el('numbers');
  const symbols = el('symbols');
  const generateBtn = el('generate');
  const copyBtn = el('copy');
  const passwordOut = el('password');
  const msg = el('msg');

  function getRandomValues(len){
    // Use crypto if available for secure randomness
    if(window.crypto && window.crypto.getRandomValues){
      const arr = new Uint32Array(len);
      window.crypto.getRandomValues(arr);
      return Array.from(arr).map(n=>n >>> 0);
    }
    // Fallback
    return Array.from({length: len}, ()=>Math.floor(Math.random()*0xFFFFFFFF));
  }

  function generatePassword(length, opts){
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()-_=+[]{};:,.<>/?~';

    let pool = '';
    if(opts.lower) pool += lowerChars;
    if(opts.upper) pool += upperChars;
    if(opts.numbers) pool += numberChars;
    if(opts.symbols) pool += symbolChars;

    if(!pool) return '';

    const poolLen = pool.length;
    const rnd = getRandomValues(length);
    let out = '';
    for(let i=0;i<length;i++){
      const idx = rnd[i] % poolLen;
      out += pool.charAt(idx);
    }
    return out;
  }

  function showMessage(text, timeout=2500){
    msg.textContent = text;
    if(timeout>0){
      setTimeout(()=>{
        if(msg.textContent === text) msg.textContent = '';
      }, timeout);
    }
  }

  generateBtn.addEventListener('click', ()=>{
    const len = parseInt(lengthInput.value, 10) || 0;
    if(len < 4 || len > 128){
      showMessage('Length should be between 4 and 128.');
      return;
    }
    const opts = {lower: lower.checked, upper: upper.checked, numbers: numbers.checked, symbols: symbols.checked};
    if(!opts.lower && !opts.upper && !opts.numbers && !opts.symbols){
      showMessage('Select at least one character set.');
      return;
    }
    const pwd = generatePassword(len, opts);
    passwordOut.value = pwd;
    showMessage('Password generated');
  });

  copyBtn.addEventListener('click', async ()=>{
    const val = passwordOut.value;
    if(!val){ showMessage('Nothing to copy'); return; }
    try{
      if(navigator.clipboard && navigator.clipboard.writeText){
        await navigator.clipboard.writeText(val);
      } else {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = val; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
      }
      showMessage('Copied to clipboard');
    }catch(e){
      showMessage('Copy failed');
      console.error(e);
    }
  });

})();

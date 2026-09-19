

(function () {
  const AUTH_ENABLED = true;
  const AUTH_KEY = 'dilshaj_portal_auth_token';
  const ROLE_KEY = 'dilshaj_portal_user_role';
  const CUSTOM_HASH_KEY = 'dilshaj_portal_custom_passcode_hash';
  const MASTER_TRACK_KEY = 'dilshaj_portal_master_passcode_hash';
  const DEFAULT_PASSCODE_HASH = '51ccb4068ef2cd314efee0df1ebea8fc5470f9dbd50dad5b9b14322b333eb57c';


  const PREVIEW_HASHES = [
    '0bc8511dcc92ee35be271c194f509a25141616d646fe5d919a99c147237d7220', // 
    '5975cf1bba432391c94667f5886225f69377c0aa8b9fa21fddfb21c89bcf9092'  // 
  ];

  const LOGIN_PAGE = 'login.html';

  const lastKnownMasterHash = localStorage.getItem(MASTER_TRACK_KEY);
  if (lastKnownMasterHash !== DEFAULT_PASSCODE_HASH) {
    localStorage.removeItem(CUSTOM_HASH_KEY);
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(ROLE_KEY);
    localStorage.setItem(MASTER_TRACK_KEY, DEFAULT_PASSCODE_HASH);
  }

  function sha256Fallback(ascii) {
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }
    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length';
    var i, j;
    var result = '';
    var words = [];
    var asciiLength = ascii[lengthProperty] * 8;

    var hash = [
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ];
    var k = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];

    ascii += '\x80';
    while (ascii[lengthProperty] % 64 !== 56) ascii += '\x00';
    for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words[lengthProperty]] = Math.floor(asciiLength / maxWord);
    words[words[lengthProperty]] = asciiLength;

    for (j = 0; j < words[lengthProperty];) {
      var w = words.slice(j, j += 16);
      var oldHash = hash.slice(0);

      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2];
        var a = hash[0], e = hash[4];
        var temp1 = hash[7]
          + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
          + ((e & hash[5]) ^ ((~e) & hash[6]))
          + k[i]
          + (w[i] = (i < 16) ? w[i] : (
            w[i - 16]
            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
            + w[i - 7]
            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
          ) | 0);
        var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
          + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));

        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
      }
      for (i = 0; i < 8; i++) {
        hash[i] = (hash[i] + oldHash[i]) | 0;
      }
    }
    for (i = 0; i < 8; i++) {
      for (j = 3; j >= 0; j--) {
        var b = (hash[i] >> (j * 8)) & 255;
        result += (b < 16 ? '0' : '') + b.toString(16);
      }
    }
    return result;
  }

  async function hashString(str) {
    if (window.crypto && window.crypto.subtle && typeof window.crypto.subtle.digest === 'function') {
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      } catch (e) {
        // Fallback to pure JS below
      }
    }
    return sha256Fallback(str);
  }

  function getActivePasscodeHash() {
    return localStorage.getItem(CUSTOM_HASH_KEY) || DEFAULT_PASSCODE_HASH;
  }

  function getSessionRole() {
    const role = sessionStorage.getItem(ROLE_KEY);
    if (role) return role;
    const token = sessionStorage.getItem(AUTH_KEY);
    if (token && token === getActivePasscodeHash()) return 'admin';
    if (token && PREVIEW_HASHES.includes(token)) return 'preview';
    return 'preview';
  }

  const path = window.location.pathname;
  const pageName = path.split('/').pop().toLowerCase() || 'index.html';

  const token = sessionStorage.getItem(AUTH_KEY);
  const activeAdminHash = getActivePasscodeHash();
  const isAuthenticated = !AUTH_ENABLED || (token === activeAdminHash || PREVIEW_HASHES.includes(token));

  // Security URL parameter guard against tampering
  const urlParams = new URLSearchParams(window.location.search);
  const requestedMode = urlParams.get('mode');
  const userRole = getSessionRole();

  if (requestedMode === 'admin' && userRole !== 'admin') {
    // Strip illegal ?mode=admin from URL if user is not Admin
    urlParams.delete('mode');
    const newQuery = urlParams.toString() ? '?' + urlParams.toString() : '';
    window.history.replaceState({}, '', window.location.pathname + newQuery);
  }

  // Enforce Preview Mode: keep sidebar visible, lock non-financial fields, keep financial/amount fields editable
  function applyModeClass() {
    if (!AUTH_ENABLED) return;
    if (getSessionRole() === 'preview') {
      document.documentElement.classList.add('mode-preview');
      if (document.body) document.body.classList.add('mode-preview');

      // Lock personal/company fields and keep salary/amount inputs editable
      setTimeout(lockNonFinancialFields, 50);
      setTimeout(lockNonFinancialFields, 300);

      setupPreviewProtection();
    } else {
      document.documentElement.classList.remove('mode-preview');
      if (document.body) document.body.classList.remove('mode-preview');
    }
  }

  let _fieldObserver = null;
  function lockNonFinancialFields() {
    if (getSessionRole() !== 'preview') return;

    const financialKeywords = [
      'ctc', 'salary', 'stipend', 'amount', 'pay', 'hra', 'basic', 'bonus',
      'allowance', 'deduction', 'settlement', 'fee', 'rent', 'incentive',
      'rate', 'takehome', 'gross', 'net', 'increment', 'totalctc', 'annualctc'
    ];

    function isFinancialField(el) {
      if (el.type === 'number') return true;
      const id = (el.id || '').toLowerCase();
      const name = (el.name || '').toLowerCase();
      const parent = el.closest('.form-group') || el.parentElement;
      const labelText = (parent ? parent.innerText || '' : '').toLowerCase();

      return financialKeywords.some(kw => id.includes(kw) || name.includes(kw) || labelText.includes(kw));
    }

    const inputs = document.querySelectorAll('.form-sidebar input, .form-sidebar select, .form-sidebar textarea');
    inputs.forEach(el => {
      if (isFinancialField(el)) {
        el.readOnly = false;
        el.disabled = false;
        el.classList.add('input-editable-preview');
        el.classList.remove('input-locked-preview');
        el.setAttribute('title', 'Editable amount field in Preview Mode');
      } else {
        if (el.dataset.lockedVal === undefined) {
          el.dataset.lockedVal = el.value || '';
        }
        if (el.tagName === 'SELECT') {
          el.disabled = true;
        } else {
          el.readOnly = true;
        }
        el.classList.add('input-locked-preview');
        el.classList.remove('input-editable-preview');
        el.setAttribute('title', 'Locked in Preview Mode');

        // Event Guard: Revert value if user tries to force value changes via console
        if (!el._lockGuardAttached) {
          el._lockGuardAttached = true;
          const enforceLock = function () {
            if (getSessionRole() === 'preview') {
              if (el.tagName === 'SELECT') el.disabled = true;
              else el.readOnly = true;
              if (el.dataset.lockedVal !== undefined && el.value !== el.dataset.lockedVal) {
                el.value = el.dataset.lockedVal;
                if (typeof updatePreview === 'function') updatePreview();
              }
            }
          };
          el.addEventListener('input', enforceLock, true);
          el.addEventListener('change', enforceLock, true);
        }
      }
    });

    // Disable field visibility toggle eye buttons and non-calc buttons in sidebar
    document.querySelectorAll('.form-sidebar .btn-field-toggle, .form-sidebar button:not(.btn-calc)').forEach(btn => {
      btn.disabled = true;
      btn.style.opacity = '0.5';
      btn.style.pointerEvents = 'none';
    });

    // MutationObserver Guard: Instantly re-locks fields if DevTools / Inspect Element tries to remove disabled or readonly attributes
    if (!_fieldObserver && window.MutationObserver) {
      _fieldObserver = new MutationObserver(function (mutations) {
        if (getSessionRole() !== 'preview') return;
        mutations.forEach(function (m) {
          const target = m.target;
          if (target && target.classList && target.classList.contains('input-locked-preview')) {
            if (target.tagName === 'SELECT' && !target.disabled) {
              target.disabled = true;
            } else if (target.tagName !== 'SELECT' && !target.readOnly) {
              target.readOnly = true;
            }
          }
        });
      });

      inputs.forEach(el => {
        if (el.classList.contains('input-locked-preview')) {
          _fieldObserver.observe(el, { attributes: true, attributeFilter: ['disabled', 'readonly', 'class'] });
        }
      });
    }
  }

  // Anti-Print, Anti-Save & Anti-Copy Event Guards for Preview Mode
  let _protectionAttached = false;
  function setupPreviewProtection() {
    if (_protectionAttached) return;
    _protectionAttached = true;

    // Block Print (Ctrl+P / Cmd+P) and Save (Ctrl+S / Cmd+S) key combinations
    document.addEventListener('keydown', function (e) {
      if (getSessionRole() === 'preview' && (e.ctrlKey || e.metaKey)) {
        const key = e.key ? e.key.toLowerCase() : '';
        if (key === 'p' || key === 's') {
          e.preventDefault();
          e.stopPropagation();
          if (typeof showToast === 'function') {
            showToast('Printing and saving is disabled in Preview Mode.');
          } else {
            alert('Printing and saving is disabled in Preview Mode.');
          }
          return false;
        }
      }
    }, true);

    // Block Right-Click context menu in Preview Mode
    document.addEventListener('contextmenu', function (e) {
      if (getSessionRole() === 'preview') {
        e.preventDefault();
        return false;
      }
    }, true);

    // Hide body if print is invoked via browser menu
    window.addEventListener('beforeprint', function () {
      if (getSessionRole() === 'preview') {
        document.body.style.visibility = 'hidden';
      }
    });

    window.addEventListener('afterprint', function () {
      document.body.style.visibility = 'visible';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyModeClass);
  } else {
    applyModeClass();
  }

  if (AUTH_ENABLED) {
    if (pageName === LOGIN_PAGE) {
      if (isAuthenticated) {
        window.location.href = 'index.html';
      }
    } else {
      if (!isAuthenticated) {
        document.documentElement.style.display = 'none';
        window.location.href = LOGIN_PAGE;
      }
    }
  }

  window.PortalAuth = {
    login: async function (passcode) {
      if (!passcode || !passcode.trim()) {
        return { success: false, message: 'Please enter the passcode.' };
      }
      try {
        const inputHash = await hashString(passcode.trim());
        const targetAdminHash = getActivePasscodeHash();

        if (inputHash === targetAdminHash) {
          sessionStorage.setItem(AUTH_KEY, targetAdminHash);
          sessionStorage.setItem(ROLE_KEY, 'admin');
          return { success: true, role: 'admin' };
        } else if (PREVIEW_HASHES.includes(inputHash)) {
          sessionStorage.setItem(AUTH_KEY, inputHash);
          sessionStorage.setItem(ROLE_KEY, 'preview');
          return { success: true, role: 'preview' };
        } else {
          return { success: false, message: 'Incorrect passcode. Please try again.' };
        }
      } catch (err) {
        console.error('Crypto error:', err);
        return { success: false, message: 'Authentication error. Please try again.' };
      }
    },
    changePassword: async function (currentPasscode, newPasscode) {
      if (!currentPasscode || !newPasscode) {
        return { success: false, message: 'Both current and new passcodes are required.' };
      }
      if (newPasscode.trim().length < 4) {
        return { success: false, message: 'New passcode must be at least 4 characters long.' };
      }
      try {
        const activeHash = getActivePasscodeHash();
        const currentHash = await hashString(currentPasscode.trim());
        if (currentHash !== activeHash) {
          return { success: false, message: 'Current passcode is incorrect.' };
        }
        const newHash = await hashString(newPasscode.trim());
        localStorage.setItem(CUSTOM_HASH_KEY, newHash);
        sessionStorage.setItem(AUTH_KEY, newHash);
        sessionStorage.setItem(ROLE_KEY, 'admin');
        return { success: true, message: 'Passcode changed successfully!' };
      } catch (err) {
        return { success: false, message: 'Error changing passcode: ' + err.message };
      }
    },
    resetPassword: function () {
      localStorage.removeItem(CUSTOM_HASH_KEY);
      sessionStorage.setItem(AUTH_KEY, DEFAULT_PASSCODE_HASH);
      sessionStorage.setItem(ROLE_KEY, 'admin');
      return { success: true, message: 'Passcode reset to default successfully!' };
    },
    logout: function () {
      sessionStorage.removeItem(AUTH_KEY);
      sessionStorage.removeItem(ROLE_KEY);
      window.location.href = LOGIN_PAGE;
    },
    isAuthenticated: function () {
      const token = sessionStorage.getItem(AUTH_KEY);
      return !AUTH_ENABLED || (token === getActivePasscodeHash() || PREVIEW_HASHES.includes(token));
    },
    getRole: function () {
      return getSessionRole();
    },
    isAdmin: function () {
      return getSessionRole() === 'admin';
    },
    isEnabled: function () {
      return AUTH_ENABLED;
    }
  };
})();

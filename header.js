/**
 * header.js - Centralized Header Navigation & Shared HR Profile Manager
 * Dilshaj Infotech HR Document Generator Suite
 */

// Single Centralized Source of Truth for Role / Designation Presets
const ROLE_PRESETS = {
  "Software Engineer": {
    department: "Engineering",
    duties: "You will perform the duties normally associated with the position of Software Engineer and other reasonable responsibilities assigned by your reporting manager. Your responsibilities include developing, testing, maintaining and documenting software, participating in debugging and code reviews, and complying with the Company's development and information security standards. You are expected to perform your duties with professionalism, initiative and appropriate standards of quality and productivity."
  },
  "AI Engineer": {
    department: "Engineering",
    duties: "You will perform the duties normally associated with the position of AI Engineer and other reasonable responsibilities assigned by your reporting manager. Your responsibilities include researching, architecting, and deploying machine learning and deep learning models, fine-tuning large language models (LLMs), building intelligent AI workflows and agentic pipelines, optimizing model inference and performance, integrating AI features into production systems, and complying with data privacy and Company engineering standards. You are expected to perform your duties with professionalism, initiative and appropriate standards of quality and productivity."
  },
  "UI/UX Designer": {
    department: "Design",
    duties: "You will perform the duties normally associated with the position of UI/UX Designer and other reasonable responsibilities assigned by your reporting manager. Your responsibilities include researching user needs, designing wireframes, prototypes, and intuitive user interfaces, conducting usability testing, collaborating with development teams, and ensuring brand consistency across digital products. You are expected to perform your duties with professionalism, initiative and appropriate standards of quality and productivity."
  },
  "Data Analyst": {
    department: "Data & Analytics",
    duties: "You will perform the duties normally associated with the position of Data Analyst and other reasonable responsibilities assigned by your reporting manager. Your responsibilities include collecting, cleaning, and analyzing complex datasets, building interactive dashboards and statistical models, identifying business trends, generating actionable insights, and supporting data-driven decision-making. You are expected to perform your duties with professionalism, initiative and appropriate standards of quality and productivity."
  },
  "Cyber Security Engineer": {
    department: "Engineering",
    duties: "You will perform the duties normally associated with the position of Cyber Security Engineer and other reasonable responsibilities assigned by your reporting manager. Your responsibilities include monitoring network traffic and security systems, conducting vulnerability assessments and penetration testing, implementing security controls, responding to security incidents, and ensuring compliance with information security standards. You are expected to perform your duties with professionalism, initiative and appropriate standards of quality and productivity."
  },
  "DevOps Engineer": {
    department: "Engineering",
    duties: "You will perform the duties normally associated with the position of DevOps Engineer and other reasonable responsibilities assigned by your reporting manager. Your responsibilities include designing, implementing, and managing CI/CD pipelines, automating infrastructure provisioning and deployment, monitoring system performance and uptime, optimizing cloud resource utilization, ensuring high reliability and security, and collaborating with development and operations teams. You are expected to perform your duties with professionalism, initiative and appropriate standards of quality and productivity."
  },
  "Cloud Engineer": {
    department: "Engineering",
    duties: "You will perform the duties normally associated with the position of Cloud Engineer and other reasonable responsibilities assigned by your reporting manager. Your responsibilities include architecting, configuring, and maintaining secure cloud environments, managing compute and storage resources, implementing automated backup and disaster recovery solutions, optimizing cloud infrastructure costs, and ensuring high availability and compliance across systems. You are expected to perform your duties with professionalism, initiative and appropriate standards of quality and productivity."
  },
  "Business Analyst": {
    department: "Data & Analytics",
    duties: "You will perform the duties normally associated with the position of Business Analyst and other reasonable responsibilities assigned by your reporting manager. Your responsibilities include gathering and documenting business requirements, analyzing workflows and processes, creating detailed functional specifications, bridging communication between stakeholders and technical teams, and facilitating project delivery. You are expected to perform your duties with professionalism, initiative and appropriate standards of quality and productivity."
  },
  "Digital Marketing Analyst": {
    department: "Marketing",
    duties: "You will perform the duties normally associated with the position of Digital Marketing Analyst and other reasonable responsibilities assigned by your reporting manager. Your responsibilities include managing online marketing campaigns, analyzing web traffic, SEO/SEM performance, and conversion metrics, optimizing digital advertising strategies, producing performance reports, and driving customer engagement. You are expected to perform your duties with professionalism, initiative and appropriate standards of quality and productivity."
  },
  "Video Editor": {
    department: "Media & Production",
    duties: "You will perform the duties normally associated with the position of Video Editor and other reasonable responsibilities assigned by your reporting manager. Your responsibilities include assembling raw footage, editing video and audio content, color grading, creating motion graphics and visual assets, collaborating with creative and marketing teams, and delivering high-quality video content aligned with brand guidelines. You are expected to perform your duties with professionalism, initiative and appropriate standards of quality and productivity."
  },
  "HR Executive": {
    department: "Human Resources",
    duties: "You will perform the duties normally associated with the position of HR Executive and other reasonable responsibilities assigned by your reporting manager. Your responsibilities include facilitating recruitment and onboarding processes, maintaining employee records and HR documentation, coordinating employee engagement activities, addressing staff inquiries, and assisting in the smooth execution of daily HR operations. You are expected to perform your duties with professionalism, initiative and appropriate standards of quality and productivity."
  },
  "HR Manager": {
    department: "Human Resources",
    duties: "You will perform the duties normally associated with the position of HR Manager and other reasonable responsibilities assigned by your reporting manager. Your responsibilities include formulating and administering HR policies, overseeing talent acquisition and retention, managing employee relations and statutory compliance, designing performance appraisal and compensation frameworks, and aligning human resource strategies with business goals. You are expected to perform your duties with professionalism, initiative and appropriate standards of quality and productivity."
  }
};

// Global Safe Stubs to guarantee no runtime ReferenceErrors
window.loadSettings = window.loadSettings || function () { };

// Global Shared HR Profile Storage Keys
const SHARED_KEYS = {
  empName: 'shared_empName',
  empPrefix: 'shared_empPrefix',
  empId: 'shared_empId',
  designation: 'shared_designation',
  department: 'shared_department',
  address: 'shared_address',
  location: 'shared_location',
  docDate: 'shared_docDate',
  doj: 'shared_doj',
  dol: 'shared_dol',
  companyName: 'shared_companyName',
  sigName: 'shared_sigName',
  sigDesig: 'shared_sigDesig',
  bankName: 'shared_bankName',
  bankAcc: 'shared_bankAcc',
  panNo: 'shared_panNo',
  pfNo: 'shared_pfNo',
  uanNo: 'shared_uanNo',
  annualCTC: 'shared_annualCTC'
};

/**
 * Universal Toast notification
 */
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  const msgEl = document.getElementById('toast-msg') || toast;
  msgEl.innerText = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

/**
 * Inject Print-Specific Styles to ensure clean multi-page document printing
 */
function injectPrintStyles() {
  if (document.getElementById('hr-print-styles')) return;
  const style = document.createElement('style');
  style.id = 'hr-print-styles';
  style.textContent = `
    @media print {
      @page {
        size: A4 portrait;
        margin: 0mm;
      }
      html, body {
        background: #ffffff !important;
        color: #000000 !important;
        margin: 0 !important;
        padding: 0 !important;
        height: auto !important;
        min-height: 100% !important;
        max-height: none !important;
        overflow: visible !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .top-bar, .doc-tabs-bar, .top-nav-suite, .form-sidebar, .toast, #toast, .doc-selector-group, .top-actions, .universal-datepicker-popover {
        display: none !important;
      }
      .app-layout {
        display: block !important;
        margin: 0 !important;
        padding: 0 !important;
        height: auto !important;
        max-height: none !important;
        overflow: visible !important;
        grid-template-columns: 1fr !important;
      }
      .preview-workspace {
        display: block !important;
        margin: 0 !important;
        padding: 0 !important;
        background: none !important;
        height: auto !important;
        max-height: none !important;
        overflow: visible !important;
      }
      #pdf-export-container {
        display: block !important;
        margin: 0 !important;
        padding: 0 !important;
        background: none !important;
        height: auto !important;
        max-height: none !important;
        overflow: visible !important;
        box-shadow: none !important;
        gap: 0 !important;
      }
      .a4-page {
        margin: 0 auto !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        box-sizing: border-box !important;
        height: 297mm !important;
        min-height: 297mm !important;
        max-height: 297mm !important;
        overflow: hidden !important;
        background-size: 100% 100% !important;
        background-position: top center !important;
        background-repeat: no-repeat !important;
        page-break-after: auto !important;
        break-after: auto !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
      body.mode-letter .a4-page {
        height: 279.4mm !important;
        min-height: 279.4mm !important;
        max-height: 279.4mm !important;
        padding: 38mm 20mm 10mm 20mm !important;
        line-height: 1.34 !important;
        background-size: 100% 100% !important;
      }
      /* Force page breaks ONLY between pages, never after the last page */
      .a4-page + .a4-page {
        page-break-before: always !important;
        break-before: page !important;
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Global print trigger from header icon
 */
function triggerPrintDocument() {
  saveSharedProfile();
  window.print();
}

/**
 * Global background toggle handler called when BG switch changes
 */
function toggleBackground() {
  const bgToggle = document.getElementById('bgToggle');
  if (!bgToggle) return;
  const isChecked = bgToggle.checked;
  if (isChecked) {
    document.body.classList.add('show-letterhead-bg');
    localStorage.setItem('hr_doc_showBg', 'true');
    showToast('Letterhead background enabled');
  } else {
    document.body.classList.remove('show-letterhead-bg');
    localStorage.setItem('hr_doc_showBg', 'false');
    showToast('Letterhead background disabled');
  }
}

/**
 * Global page size handler called when Size dropdown changes
 */
function changePageSize() {
  const pageSizeSelect = document.getElementById('pageSizeSelect');
  if (!pageSizeSelect) return;
  const pageSize = pageSizeSelect.value;
  localStorage.setItem('hr_doc_pageSize', pageSize);
  if (pageSize === 'letter') {
    document.body.classList.add('mode-letter');
    showToast('Page mode changed to US Letter');
  } else {
    document.body.classList.remove('mode-letter');
    showToast('Page mode changed to A4');
  }
}

/**
 * Helper to get non-empty value from candidate input element IDs
 */
function getFirstVal(ids = []) {
  for (let id of ids) {
    const el = document.getElementById(id);
    if (el && el.value && el.value.trim() !== '') {
      return el.value.trim();
    }
  }
  return '';
}

/**
 * Save current page input fields into global shared profile
 */
function saveSharedProfile() {
  const profile = {
    empPrefix: getFirstVal(['empPrefix', 'salutationPrefix', 'prefix']),
    empName: getFirstVal(['empName', 'employeeName', 'name']),
    empId: getFirstVal(['empId', 'employeeId', 'employeeNo']),
    designation: getFirstVal(['designation', 'desig']),
    department: getFirstVal(['department', 'dept']),
    address: getFirstVal(['employeeAddress', 'candidateAddress', 'address']),
    location: getFirstVal(['location', 'workLocation']),
    docDate: getFirstVal(['offerDate', 'letterDate', 'expDate', 'fnfDate', 'terminationDate', 'docDate']),
    doj: getFirstVal(['doj', 'dateOfJoining', 'joiningDate', 'fromDate']),
    dol: getFirstVal(['dol', 'relievingDate', 'dateOfLeaving', 'relieveDate', 'effectiveDate', 'toDate']),
    companyName: getFirstVal(['companyName']) || 'Dilshaj Infotech Private Limited',
    sigName: getFirstVal(['sigName', 'signatoryName']),
    sigDesig: getFirstVal(['sigDesig', 'signatoryDesignation']),
    bankName: getFirstVal(['bankName']),
    bankAcc: getFirstVal(['bankAcc', 'bankAccountNo']),
    panNo: getFirstVal(['panNo', 'panNumber']),
    pfNo: getFirstVal(['pfNo', 'pfNumber']),
    uanNo: getFirstVal(['uanNo', 'pfUan']),
    annualCTC: getFirstVal(['annualCTC', 'ctc', 'totalCtc'])
  };

  Object.keys(profile).forEach(k => {
    if (profile[k]) {
      localStorage.setItem(SHARED_KEYS[k], profile[k]);
    }
  });

  const pageSizeSelect = document.getElementById('pageSizeSelect');
  const bgToggle = document.getElementById('bgToggle');
  const dateFormatSelect = document.getElementById('dateFormatSelect');
  if (pageSizeSelect) localStorage.setItem('hr_doc_pageSize', pageSizeSelect.value);
  if (bgToggle) localStorage.setItem('hr_doc_showBg', bgToggle.checked ? 'true' : 'false');
  if (dateFormatSelect) localStorage.setItem(DATE_FORMAT_KEY, dateFormatSelect.value);
}

let _saveProfileTimer = null;
/**
 * Debounced Save: Prevents excessive disk writes during rapid typing
 */
function debouncedSaveSharedProfile() {
  if (_saveProfileTimer) clearTimeout(_saveProfileTimer);
  _saveProfileTimer = setTimeout(() => {
    saveSharedProfile();
  }, 150);
}

/**
 * Load global shared profile values into input fields
 */
function loadSharedProfile(explicitMap = null) {
  const savedSize = localStorage.getItem('hr_doc_pageSize');
  const savedBg = localStorage.getItem('hr_doc_showBg');

  const pageSizeSelect = document.getElementById('pageSizeSelect');
  if (savedSize && pageSizeSelect) {
    pageSizeSelect.value = savedSize;
    if (savedSize === 'letter') {
      document.body.classList.add('mode-letter');
    } else {
      document.body.classList.remove('mode-letter');
    }
  }

  const bgToggle = document.getElementById('bgToggle');
  if (bgToggle) {
    if (savedBg === 'true') {
      bgToggle.checked = true;
      document.body.classList.add('show-letterhead-bg');
    } else {
      bgToggle.checked = false;
      document.body.classList.remove('show-letterhead-bg');
    }
  }

  const dateFormatSelect = document.getElementById('dateFormatSelect');
  if (dateFormatSelect) {
    dateFormatSelect.value = getActiveDateFormat();
  }

  // Auto mappings for candidate IDs on each page
  const autoMap = {
    empPrefix: ['empPrefix', 'salutationPrefix', 'prefix'],
    empName: ['empName', 'employeeName'],
    empId: ['empId', 'employeeId'],
    designation: ['designation'],
    department: ['department'],
    address: ['employeeAddress', 'candidateAddress', 'address'],
    location: ['location', 'workLocation'],
    docDate: ['offerDate', 'letterDate', 'expDate', 'fnfDate', 'terminationDate', 'docDate'],
    doj: ['doj', 'dateOfJoining'],
    dol: ['dol', 'relievingDate', 'dateOfLeaving', 'relieveDate', 'effectiveDate'],
    companyName: ['companyName'],
    sigName: ['sigName', 'signatoryName'],
    sigDesig: ['sigDesig', 'signatoryDesignation'],
    bankName: ['bankName'],
    bankAcc: ['bankAcc'],
    panNo: ['panNo'],
    pfNo: ['pfNo'],
    uanNo: ['uanNo'],
    annualCTC: ['annualCTC', 'ctc', 'totalCtc']
  };

  Object.keys(autoMap).forEach(key => {
    const savedVal = localStorage.getItem(SHARED_KEYS[key]);
    if (savedVal) {
      autoMap[key].forEach(elemId => {
        const inputElem = document.getElementById(elemId);
        if (inputElem) {
          inputElem.value = savedVal;
        }
      });
    }
  });

  if (explicitMap && typeof explicitMap === 'object') {
    Object.keys(explicitMap).forEach(elemId => {
      const key = explicitMap[elemId];
      const savedVal = localStorage.getItem(SHARED_KEYS[key]);
      const inputElem = document.getElementById(elemId);
      if (savedVal && inputElem) {
        inputElem.value = savedVal;
      }
    });
  }

  // Sync role preset dropdown with active designation
  syncRolePresetWithDesignation();

  // Trigger updatePreview if present
  if (typeof updatePreview === 'function') {
    updatePreview();
  }
}

/**
 * Navigate between document tools with automatic profile save
 */
function navigateDocType(targetUrl) {
  if (targetUrl) {
    saveSharedProfile();
    window.location.href = targetUrl;
  }
}

/**
 * Populates any <select id="rolePresetSelect"> dynamically from ROLE_PRESETS
 */
function populateRolePresets(selectEl, selectedValue = '') {
  if (!selectEl) return;
  selectEl.innerHTML = '';

  Object.keys(ROLE_PRESETS).forEach(roleName => {
    const opt = document.createElement('option');
    opt.value = roleName;
    opt.textContent = roleName;
    if (roleName === selectedValue) {
      opt.selected = true;
    }
    selectEl.appendChild(opt);
  });

  const customOpt = document.createElement('option');
  customOpt.value = 'Custom';
  customOpt.textContent = 'Custom Role...';
  if (selectedValue === 'Custom' || (selectedValue && !(selectedValue in ROLE_PRESETS))) {
    customOpt.selected = true;
  }
  selectEl.appendChild(customOpt);
}

/**
 * Syncs the <select id="rolePresetSelect"> with the current value in <input id="designation">
 */
function syncRolePresetWithDesignation() {
  const desigInput = document.getElementById('designation');
  const presetSelect = document.getElementById('rolePresetSelect');
  if (!presetSelect || !desigInput) return;

  const currentVal = desigInput.value.trim();
  if (currentVal in ROLE_PRESETS) {
    presetSelect.value = currentVal;
  } else if (currentVal !== '') {
    presetSelect.value = 'Custom';
  }
}

/**
 * Centralized onchange handler for Role/Designation Preset Dropdowns
 */
function onRoleSelectChange() {
  const select = document.getElementById('rolePresetSelect');
  if (!select) return;
  const selectedRole = select.value;
  const desigInput = document.getElementById('designation');
  const deptInput = document.getElementById('department');
  const dutiesInput = document.getElementById('dutiesTextarea');

  if (selectedRole in ROLE_PRESETS) {
    if (desigInput) desigInput.value = selectedRole;
    if (deptInput && ROLE_PRESETS[selectedRole].department) {
      deptInput.value = ROLE_PRESETS[selectedRole].department;
    }
    if (dutiesInput && ROLE_PRESETS[selectedRole].duties) {
      dutiesInput.value = ROLE_PRESETS[selectedRole].duties;
    }
  } else if (selectedRole === 'Custom') {
    if (desigInput && (desigInput.value in ROLE_PRESETS)) {
      desigInput.focus();
    }
  }

  if (typeof updatePreview === 'function') {
    updatePreview();
  }
  saveSharedProfile();
}

/**
 * Centralized oninput handler for manual Designation typing
 */
function onCustomDesignationInput() {
  const desigInput = document.getElementById('designation');
  const select = document.getElementById('rolePresetSelect');
  if (!desigInput) return;
  const val = desigInput.value.trim();

  if (select) {
    if (val in ROLE_PRESETS) {
      select.value = val;
    } else {
      select.value = 'Custom';
      const dutiesBox = document.getElementById('dutiesTextarea');
      if (dutiesBox && (!dutiesBox.value || Object.values(ROLE_PRESETS).some(p => p.duties === dutiesBox.value))) {
        dutiesBox.value = `You will perform the duties normally associated with the position of ${val || 'the specified role'} and other reasonable responsibilities assigned by your reporting manager. Your responsibilities include carrying out core role functions, collaborating with teams, and complying with Company standards. You are expected to perform your duties with professionalism, initiative and appropriate standards of quality and productivity.`;
      }
    }
  }

  if (typeof updatePreview === 'function') {
    updatePreview();
  }
  saveSharedProfile();
}

/**
 * Setup and populate Designation dropdowns across all pages automatically
 */
function setupDesignationControls() {
  const desigInput = document.getElementById('designation');
  if (!desigInput) return;

  // Wire up typing handler
  desigInput.addEventListener('input', onCustomDesignationInput);

  let presetSelect = document.getElementById('rolePresetSelect');

  // If page doesn't have the preset dropdown yet, dynamically inject it right before designation
  if (!presetSelect) {
    const parentGroup = desigInput.closest('.form-group');
    if (parentGroup && parentGroup.parentNode) {
      const presetGroup = document.createElement('div');
      presetGroup.className = 'form-group full-width';
      presetGroup.id = 'rolePresetGroup';
      presetGroup.innerHTML = `
        <label for="rolePresetSelect">Select Role / Designation Preset</label>
        <select id="rolePresetSelect"></select>
      `;
      parentGroup.parentNode.insertBefore(presetGroup, parentGroup);
      presetSelect = document.getElementById('rolePresetSelect');
    }
  }

  if (presetSelect) {
    presetSelect.addEventListener('change', onRoleSelectChange);
    const initialVal = desigInput.value.trim() || 'Software Engineer';
    populateRolePresets(presetSelect, initialVal);
    syncRolePresetWithDesignation();
  }
}

/**
 * Inject Centralized Top Navigation Bar HTML
 */
function renderCentralHeader() {
  const currentPath = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';

  const documents = [
    { file: 'index.html', label: 'Offer Letter', num: '1' },
    { file: 'relieving_letter.html', label: 'Relieving Letter', num: '2' },
    { file: 'experience_letter.html', label: 'Experience Letter', num: '3' },
    { file: 'internship_letter.html', label: 'Internship Letter', num: '4' },
    { file: 'promotion_letter.html', label: 'Promotion Letter', num: '5' },
    { file: 'salary_increment_letter.html', label: 'Salary Increment', num: '6' },
    { file: 'fnf_settlement.html', label: 'F&F Settlement', num: '7' },
    { file: 'noc_exit_agreement.html', label: 'NOC & Exit NDA', num: '8' },
    { file: 'payslip.html', label: 'Monthly Payslip', num: '9' },
    { file: 'termination_letter.html', label: 'Termination Letter', num: '10' },
    //{ file: 'lop_letter.html', label: 'LOP Letter', num: '11' }
  ];

  const tabsHTML = documents.map(doc => {
    const active = (doc.file === 'index.html' && (currentPath === '' || currentPath === 'index.html')) || currentPath === doc.file;
    return `
      <button type="button" class="doc-tab-item ${active ? 'active' : ''}" onclick="navigateDocType('${doc.file}')" title="${doc.label}">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
        <span class="doc-tab-num">${doc.num}.</span>
        <span class="doc-tab-label">${doc.label}</span>
      </button>
    `;
  }).join('');

  const isPreviewRole = window.PortalAuth && window.PortalAuth.getRole && window.PortalAuth.getRole() === 'preview';

  const headerHTML = `
  <header class="top-nav-suite">
    <div class="top-bar">
      <!-- Brand Logo -->
      <div class="brand-title">
        <img src="Logo.png" alt="Dilshaj Infotech Logo" style="height: 32px; width: auto; object-fit: contain; display: block;">
      </div>

      <!-- Toolbar Actions Group -->
      <div class="top-actions">
        <div class="toolbar-group">
          <div class="top-toggle-item">
            <span>BG</span>
            <label class="switch">
              <input type="checkbox" id="bgToggle" onchange="toggleBackground()">
              <span class="slider"></span>
            </label>
          </div>
          <div style="width: 1px; height: 16px; background: var(--border-color-light);"></div>
          <div class="page-size-picker">
            <label for="pageSizeSelect">Size:</label>
            <select id="pageSizeSelect" onchange="changePageSize()">
              <option value="a4" selected>A4</option>
              <option value="letter">Letter</option>
            </select>
          </div>
          <div style="width: 1px; height: 16px; background: var(--border-color-light);"></div>
          <div class="date-format-picker" title="Standardize date format across all documents">
            <label for="dateFormatSelect">Format:</label>
            <select id="dateFormatSelect" onchange="changeDateFormat(this.value)">
              <option value="DD Mon YYYY" selected>19 Apr 2026</option>
              <option value="DD/MM/YYYY">19/04/2026</option>
              <option value="DD-MM-YYYY">19-04-2026</option>
              <option value="YYYY-MM-DD">2026-04-19</option>
              <option value="Month DD, YYYY">April 19, 2026</option>
            </select>
          </div>
        </div>

        ${!isPreviewRole ? `
        <button class="btn-sm btn-icon-secondary" onclick="saveSharedProfile(); showToast('HR Profile saved & synced!');" title="Save profile & sync across documents">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          Save
        </button>

        <button class="btn-sm btn-icon-secondary" onclick="resetForm()" title="Reset form to defaults">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
          </svg>
          Reset
        </button>

        <button class="btn-sm btn-icon-secondary" onclick="openChangePasswordModal()" title="Change authorization passcode">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          Password
        </button>
        ` : ''}

        <button class="btn-sm btn-icon-secondary" onclick="window.PortalAuth && window.PortalAuth.logout()" title="Sign out of portal" style="color: #dc2626;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>

        ${!isPreviewRole ? `
        <!-- Download Word DOCX Button -->
        <button class="btn-sm btn-action-docx" id="btnDownloadDocx" onclick="generateDOCX()" title="Export document as Microsoft Word (.docx)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <line x1="10" y1="9" x2="8" y2="9"></line>
          </svg>
          <span id="btnDocxText">Download DOCX</span>
        </button>

        <!-- Print / Vector PDF Document Button (Primary High Quality Exporter) -->
        <button class="btn-sm btn-action-primary" onclick="triggerPrintDocument()" title="Print or Save as Vector PDF with 100% crisp vector text & original graphics (Ctrl+P)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          <span>Print / Save PDF</span>
        </button>
        ` : ''}
      </div>
    </div>

    <!-- Browser-Style Document Tabs Bar -->
    <nav class="doc-tabs-bar">
      ${tabsHTML}
    </nav>
  </header>
  `;

  // Preload html-docx script if not already present
  if (!document.getElementById('html-docx-script') && typeof window.htmlDocx === 'undefined') {
    const script = document.createElement('script');
    script.id = 'html-docx-script';
    script.src = 'html-docx.js';
    document.head.appendChild(script);
  }

  const headerContainer = document.getElementById('header-placeholder');
  if (headerContainer) {
    headerContainer.outerHTML = headerHTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  }

  // Attach auto-save listener on all inputs (debounced for input, immediate on change/blur)
  document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', debouncedSaveSharedProfile);
    el.addEventListener('change', saveSharedProfile);
  });
}

/**
 * Universal Zero-Import Dark Calendar Engine
 */
let activeDatePickerInput = null;
let datePickerCurrentYear = new Date().getFullYear();
let datePickerCurrentMonth = new Date().getMonth();

const MONTH_NAMES_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function getOrCreateDatePickerPopover() {
  let popover = document.getElementById('universalDatePickerPopover');
  if (popover) return popover;

  popover = document.createElement('div');
  popover.id = 'universalDatePickerPopover';
  popover.className = 'universal-datepicker-popover';
  popover.style.display = 'none';
  document.body.appendChild(popover);

  // Close on outside click
  document.addEventListener('mousedown', (e) => {
    if (popover.style.display !== 'none' && !popover.contains(e.target) && !e.target.closest('.date-picker-btn') && !e.target.closest('.date-input-wrapper')) {
      closeUniversalDatePicker();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popover.style.display !== 'none') {
      closeUniversalDatePicker();
    }
  });

  return popover;
}

function closeUniversalDatePicker() {
  const popover = document.getElementById('universalDatePickerPopover');
  if (popover) {
    popover.style.display = 'none';
  }
  activeDatePickerInput = null;
}

const DATE_FORMAT_KEY = 'hr_doc_dateFormat';
const DEFAULT_DATE_FORMAT = 'DD Mon YYYY'; // Matches strictly "25 May 2026"

function getActiveDateFormat() {
  return localStorage.getItem(DATE_FORMAT_KEY) || DEFAULT_DATE_FORMAT;
}

function parseExistingDate(val) {
  if (!val || typeof val !== 'string') return null;
  val = val.trim();

  // Pattern: YYYY-MM-DD
  let match = val.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (match) {
    return new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]));
  }

  // Pattern: DD-MM-YYYY or DD/MM/YYYY
  match = val.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (match) {
    return new Date(parseInt(match[3]), parseInt(match[2]) - 1, parseInt(match[1]));
  }

  // Pattern: DD Mon YYYY or DD Month YYYY (e.g. 25 May 2026, 01 Oct 2026, or 21 September 2023)
  match = val.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (match) {
    const day = parseInt(match[1]);
    const mStr = match[2].toLowerCase();
    const year = parseInt(match[3]);
    let mIdx = MONTH_NAMES_FULL.findIndex(m => m.toLowerCase().startsWith(mStr.substring(0, 3)));
    if (mIdx !== -1) {
      return new Date(year, mIdx, day);
    }
  }

  // Pattern: Mon DD , YYYY or Month DD, YYYY (e.g. Nov 14 , 2024 or May 25, 2026)
  match = val.match(/^([A-Za-z]+)\s+(\d{1,2})\s*,?\s*(\d{4})$/);
  if (match) {
    const mStr = match[1].toLowerCase();
    const day = parseInt(match[2]);
    const year = parseInt(match[3]);
    let mIdx = MONTH_NAMES_FULL.findIndex(m => m.toLowerCase().startsWith(mStr.substring(0, 3)));
    if (mIdx !== -1) {
      return new Date(year, mIdx, day);
    }
  }

  // Fallback to native parse
  const fallback = new Date(val);
  if (!isNaN(fallback.getTime())) {
    return fallback;
  }

  return null;
}

function formatByPattern(day, monthIndex, year, formatKey) {
  const pad = n => String(n).padStart(2, '0');
  const d = pad(day);
  const m = pad(monthIndex + 1);
  const monShort = MONTH_NAMES_SHORT[monthIndex]; // "May", "Oct", etc.
  const monthFull = MONTH_NAMES_FULL[monthIndex]; // "May", "October", etc.

  switch (formatKey) {
    case 'DD/MM/YYYY':
      return `${d}/${m}/${year}`;
    case 'DD-MM-YYYY':
      return `${d}-${m}-${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${m}-${d}`;
    case 'Month DD, YYYY':
      return `${monthFull} ${d}, ${year}`;
    case 'MM/DD/YYYY':
      return `${m}/${d}/${year}`;
    case 'DD Mon YYYY':
    default:
      // Strictly follows "25 May 2026" standard across all documents
      return `${d} ${monShort} ${year}`;
  }
}

function formatChosenDate(day, monthIndex, year, originalVal, inputType) {
  const pad = n => String(n).padStart(2, '0');

  // If native input type="date", HTML spec requires YYYY-MM-DD
  if (inputType === 'date') {
    return `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
  }

  // All date fields follow active format (default: "25 May 2026")
  return formatByPattern(day, monthIndex, year, getActiveDateFormat());
}

function changeDateFormat(newFormat) {
  localStorage.setItem(DATE_FORMAT_KEY, newFormat);
  reformatAllDatesOnPage(newFormat);
  const sample = formatByPattern(25, 4, 2026, newFormat);
  showToast(`Date format standardized to "${sample}"`);
}

function getAllDateFieldSelectors() {
  return [
    'input[type="date"]',
    'input[data-datepicker]',
    'input#offerDate',
    'input#dateOfJoining',
    'input#letterDate',
    'input#relieveDate',
    'input#doj',
    'input#dol',
    'input#expDate',
    'input#effectiveDate',
    'input#terminationDate',
    'input#paymentDate',
    'input#fnfDate',
    'input#docDate'
  ];
}

function reformatAllDatesOnPage(newFormat) {
  const selectors = getAllDateFieldSelectors();
  const allInputs = document.querySelectorAll('input');
  const targetInputs = new Set();

  document.querySelectorAll(selectors.join(', ')).forEach(el => targetInputs.add(el));
  allInputs.forEach(input => {
    const id = (input.id || '').toLowerCase();
    const name = (input.name || '').toLowerCase();
    if (id.includes('date') || id.includes('doj') || id.includes('dol') || name.includes('date')) {
      targetInputs.add(input);
    }
  });

  targetInputs.forEach(input => {
    if (input.type === 'date') return;
    const parsed = parseExistingDate(input.value);
    if (parsed && !isNaN(parsed.getTime())) {
      input.value = formatByPattern(parsed.getDate(), parsed.getMonth(), parsed.getFullYear(), newFormat);
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  if (typeof updatePreview === 'function') {
    updatePreview();
  }
}

function openUniversalDatePicker(targetInput, triggerBtn) {
  if (activeDatePickerInput === targetInput) {
    closeUniversalDatePicker();
    return;
  }

  activeDatePickerInput = targetInput;
  const parsed = parseExistingDate(targetInput.value);
  const now = new Date();

  if (parsed && !isNaN(parsed.getTime())) {
    datePickerCurrentYear = parsed.getFullYear();
    datePickerCurrentMonth = parsed.getMonth();
  } else {
    datePickerCurrentYear = now.getFullYear();
    datePickerCurrentMonth = now.getMonth();
  }

  renderDatePickerPopover(parsed);

  const popover = getOrCreateDatePickerPopover();
  popover.style.display = 'block';

  // Smart Position
  const rect = targetInput.getBoundingClientRect();
  let top = rect.bottom + window.scrollY + 6;
  let left = rect.left + window.scrollX;

  // When form is on the right side of the screen, align popover to input's right edge
  if (rect.right + window.scrollX - 275 > 10 && (left + 280 > window.innerWidth || rect.left > window.innerWidth / 2)) {
    left = rect.right + window.scrollX - 275;
  }
  if (left + 280 > window.innerWidth) {
    left = window.innerWidth - 290;
  }
  if (left < 10) {
    left = 10;
  }
  if (top + 330 > window.innerHeight + window.scrollY && rect.top > 330) {
    top = rect.top + window.scrollY - 335;
  }

  popover.style.top = `${Math.max(10, top)}px`;
  popover.style.left = `${Math.max(10, left)}px`;
}

function renderDatePickerPopover(selectedDateObj = null) {
  const popover = getOrCreateDatePickerPopover();
  const today = new Date();

  // Year options for quick select (2018 to 2036)
  let yearOptions = '';
  for (let y = 2018; y <= 2036; y++) {
    yearOptions += `<option value="${y}" ${y === datePickerCurrentYear ? 'selected' : ''}>${y}</option>`;
  }

  let monthOptions = '';
  MONTH_NAMES_FULL.forEach((m, idx) => {
    monthOptions += `<option value="${idx}" ${idx === datePickerCurrentMonth ? 'selected' : ''}>${m}</option>`;
  });

  const firstDayIndex = new Date(datePickerCurrentYear, datePickerCurrentMonth, 1).getDay();
  const daysInMonth = new Date(datePickerCurrentYear, datePickerCurrentMonth + 1, 0).getDate();

  let daysHTML = '';
  // Empty padding cells for preceding days of week (Sunday is 0)
  for (let i = 0; i < firstDayIndex; i++) {
    daysHTML += `<div class="datepicker-day empty"></div>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = today.getDate() === d && today.getMonth() === datePickerCurrentMonth && today.getFullYear() === datePickerCurrentYear;
    const isSelected = selectedDateObj && selectedDateObj.getDate() === d && selectedDateObj.getMonth() === datePickerCurrentMonth && selectedDateObj.getFullYear() === datePickerCurrentYear;

    let classes = ['datepicker-day'];
    if (isToday) classes.push('today');
    if (isSelected) classes.push('selected');

    daysHTML += `<button type="button" class="${classes.join(' ')}" onclick="onDateDayChosen(${d})">${d}</button>`;
  }

  popover.innerHTML = `
    <div class="datepicker-header">
      <div class="datepicker-title-group">
        <select class="datepicker-select" onchange="onDatePickerMonthChange(this.value)">
          ${monthOptions}
        </select>
        <select class="datepicker-select" onchange="onDatePickerYearChange(this.value)">
          ${yearOptions}
        </select>
      </div>
      <div style="display: flex; gap: 4px;">
        <button type="button" class="datepicker-nav-btn" onclick="onDatePickerPrevMonth()" title="Previous Month">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button type="button" class="datepicker-nav-btn" onclick="onDatePickerNextMonth()" title="Next Month">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </div>

    <div class="datepicker-weekdays">
      <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
    </div>

    <div class="datepicker-days-grid">
      ${daysHTML}
    </div>

    <div class="datepicker-footer">
      <button type="button" class="datepicker-footer-btn" onclick="onDatePickerJumpToday()">Today</button>
      <button type="button" class="datepicker-footer-btn" onclick="closeUniversalDatePicker()">Close</button>
    </div>
  `;
}

function onDatePickerPrevMonth() {
  datePickerCurrentMonth--;
  if (datePickerCurrentMonth < 0) {
    datePickerCurrentMonth = 11;
    datePickerCurrentYear--;
  }
  const parsed = activeDatePickerInput ? parseExistingDate(activeDatePickerInput.value) : null;
  renderDatePickerPopover(parsed);
}

function onDatePickerNextMonth() {
  datePickerCurrentMonth++;
  if (datePickerCurrentMonth > 11) {
    datePickerCurrentMonth = 0;
    datePickerCurrentYear++;
  }
  const parsed = activeDatePickerInput ? parseExistingDate(activeDatePickerInput.value) : null;
  renderDatePickerPopover(parsed);
}

function onDatePickerMonthChange(val) {
  datePickerCurrentMonth = parseInt(val);
  const parsed = activeDatePickerInput ? parseExistingDate(activeDatePickerInput.value) : null;
  renderDatePickerPopover(parsed);
}

function onDatePickerYearChange(val) {
  datePickerCurrentYear = parseInt(val);
  const parsed = activeDatePickerInput ? parseExistingDate(activeDatePickerInput.value) : null;
  renderDatePickerPopover(parsed);
}

function onDatePickerJumpToday() {
  const now = new Date();
  datePickerCurrentYear = now.getFullYear();
  datePickerCurrentMonth = now.getMonth();
  onDateDayChosen(now.getDate());
}

function onDateDayChosen(day) {
  if (!activeDatePickerInput) return;

  const targetInput = activeDatePickerInput;

  const formatted = formatChosenDate(
    day,
    datePickerCurrentMonth,
    datePickerCurrentYear,
    targetInput.value,
    targetInput.type
  );

  targetInput.value = formatted;

  // Always close the popover immediately upon date selection
  closeUniversalDatePicker();

  try {
    targetInput.dispatchEvent(new Event('input', { bubbles: true }));
    targetInput.dispatchEvent(new Event('change', { bubbles: true }));
  } catch (err) {
    console.warn('Error during date input dispatch:', err);
  }

  try {
    if (typeof updatePreview === 'function') {
      updatePreview();
    }
  } catch (err) {
    console.warn('Error during updatePreview:', err);
  }

  try {
    if (typeof saveSharedProfile === 'function') {
      saveSharedProfile();
    }
  } catch (err) {
    console.warn('Error during saveSharedProfile:', err);
  }
}

/**
 * Automatically discovers all date fields across all 9 pages and wraps them with calendar triggers
 */
function setupUniversalDatePickers() {
  const explicitSelectors = getAllDateFieldSelectors();
  const allInputs = document.querySelectorAll('input');
  const targetInputs = new Set();

  document.querySelectorAll(explicitSelectors.join(', ')).forEach(el => targetInputs.add(el));

  allInputs.forEach(input => {
    const id = (input.id || '').toLowerCase();
    const name = (input.name || '').toLowerCase();
    if (id.includes('date') || id.includes('doj') || id.includes('dol') || name.includes('date')) {
      targetInputs.add(input);
    }
  });

  targetInputs.forEach(input => {
    // If already wrapped, skip
    if (input.parentElement && input.parentElement.classList.contains('date-input-wrapper')) {
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'date-input-wrapper';

    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'date-picker-btn';
    btn.title = 'Choose date from calendar';
    btn.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    `;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openUniversalDatePicker(input, btn);
    });

    if (input.type !== 'date') {
      input.addEventListener('click', (e) => {
        // Open picker on field click
        openUniversalDatePicker(input, btn);
      });
    }

    wrapper.appendChild(btn);
  });
}

// Auto-render header, designation controls, print styles, and load shared profile
const initHeaderSuite = () => {
  injectPrintStyles();
  renderCentralHeader();
  setupDesignationControls();
  loadSharedProfile();
  setupUniversalDatePickers();

  // Normalize all dates on page to active date format (default: "25 May 2026")
  const activeFormat = getActiveDateFormat();
  const explicitSelectors = getAllDateFieldSelectors();
  const allInputs = document.querySelectorAll('input');
  const targetInputs = new Set();
  document.querySelectorAll(explicitSelectors.join(', ')).forEach(el => targetInputs.add(el));
  allInputs.forEach(input => {
    const id = (input.id || '').toLowerCase();
    if (id.includes('date') || id.includes('doj') || id.includes('dol')) {
      targetInputs.add(input);
    }
  });

  targetInputs.forEach(input => {
    if (input.type === 'date') return;
    const parsed = parseExistingDate(input.value);
    if (parsed && !isNaN(parsed.getTime())) {
      input.value = formatByPattern(parsed.getDate(), parsed.getMonth(), parsed.getFullYear(), activeFormat);
    }
  });

  if (typeof updatePreview === 'function') {
    updatePreview();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeaderSuite);
} else {
  initHeaderSuite();
}

/**
 * ==========================================================================
 * Centralized Suite Utilities (DRY - Single Source of Truth)
 * ==========================================================================
 */

/**
 * Universal Indian Rupees Currency-to-Words Formatter (Lakh, Crore)
 */
function numberToWordsINR(num) {
  if (isNaN(num) || num <= 0) return 'Rupees Zero Only';
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(n) {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? '-' + a[n % 10] : '');
    if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + inWords(n % 100) : '');
    if (n < 100000) return inWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + inWords(n % 1000) : '');
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + inWords(n % 100000) : '');
    return inWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + inWords(n % 10000000) : '');
  }
  return 'Rupees ' + inWords(Math.floor(num)) + ' Only';
}
window.numberToWordsINR = numberToWordsINR;

/**
 * Universal Reset Form Handler
 */
function resetForm() {
  if (confirm('Reset form fields to defaults?')) {
    location.reload();
  }
}
window.resetForm = resetForm;

/**
 * Universal High-Resolution PDF Exporter (Zero Duplicate Code)
 */
async function generateUniversalPDF(customDocPrefix = null) {
  const btnDownload = document.getElementById('btnDownload');
  const btnText = document.getElementById('btnText');
  const pageSize = (document.getElementById('pageSizeSelect') ? document.getElementById('pageSizeSelect').value : 'a4') || 'a4';

  const pageWidthMM = pageSize === 'letter' ? 215.9 : 210;
  const pageHeightMM = pageSize === 'letter' ? 279.4 : 297;
  const pageNameLabel = pageSize === 'letter' ? 'US Letter' : 'A4';

  if (btnDownload) btnDownload.disabled = true;
  if (btnText) btnText.innerText = `Rendering ${pageNameLabel} PDF...`;
  showToast(`Rendering ultra-sharp ${pageNameLabel} PDF...`);

  try {
    if (!window.jspdf || !window.html2canvas) {
      throw new Error('PDF libraries (jsPDF / html2canvas) not loaded yet.');
    }
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('portrait', 'mm', pageSize);

    const pages = document.querySelectorAll('.a4-page');
    if (!pages || pages.length === 0) {
      throw new Error('No printable .a4-page document found to render.');
    }

    // Determine employee name from any standard field
    const empInput = document.getElementById('employeeName') || document.getElementById('empName') || document.getElementById('name');
    const empName = empInput ? (empInput.value.trim() || 'Employee') : 'Employee';

    // Determine document label prefix
    let docTitle = customDocPrefix;
    if (!docTitle) {
      const currentFile = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
      const docEntry = [
        { file: 'index.html', label: 'Offer_Letter' },
        { file: 'relieving_letter.html', label: 'Relieving_Letter' },
        { file: 'experience_letter.html', label: 'Experience_Letter' },
        { file: 'internship_letter.html', label: 'Internship_Letter' },
        { file: 'promotion_letter.html', label: 'Promotion_Letter' },
        { file: 'salary_increment_letter.html', label: 'Salary_Increment' },
        { file: 'fnf_settlement.html', label: 'FnF_Settlement' },
        { file: 'noc_exit_agreement.html', label: 'NOC_Exit_NDA' },
        { file: 'payslip.html', label: 'Monthly_Payslip' },
        { file: 'termination_letter.html', label: 'Termination_Letter' }
      ].find(d => currentFile.includes(d.file.toLowerCase()));
      docTitle = docEntry ? docEntry.label : 'HR_Document';
    }

    for (let i = 0; i < pages.length; i++) {
      const pageEl = pages[i];

      // Optimized Crisp High-Resolution 2.5x scale (~300 DPI print quality)
      const canvas = await html2canvas(pageEl, {
        scale: 2.5,
        useCORS: true,
        logging: false,
        allowTaint: true,
        imageTimeout: 0,
        backgroundColor: '#ffffff',
        windowWidth: pageEl.scrollWidth,
        windowHeight: pageEl.scrollHeight
      });

      // High quality JPEG (0.92) to preserve background graphics & sharp text without massive PNG bloat
      const imgData = canvas.toDataURL('image/jpeg', 0.92);

      if (i > 0) {
        pdf.addPage(pageSize, 'portrait');
      }

      // Fast PDF stream compression ('FAST' compresses stream, reducing size from 200MB+ to ~1.5-3MB)
      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidthMM, pageHeightMM, undefined, 'FAST');
    }

    const cleanEmp = empName.replace(/\s+/g, '_');
    const filename = `${docTitle}_${cleanEmp}_${pageSize.toUpperCase()}.pdf`;
    pdf.save(filename);
    showToast(`${pageNameLabel} PDF downloaded successfully!`);
  } catch (err) {
    console.error('Universal PDF Generation Error:', err);
    showToast('Error generating PDF document');
  } finally {
    if (btnDownload) btnDownload.disabled = false;
    if (btnText) btnText.innerText = 'Download PDF';
  }
}
window.generatePDF = generateUniversalPDF;
window.generateUniversalPDF = generateUniversalPDF;

/**
 * Universal DOCX Generator
 * Exports current active document as a formatted Microsoft Word (.docx) file
 * with exact matching Aptos typography, line heights, letterhead spacing, and paragraph margins.
 */
async function generateUniversalDOCX(customDocPrefix = '') {
  const btnDocx = document.getElementById('btnDownloadDocx');
  const btnText = document.getElementById('btnDocxText');
  if (btnDocx) btnDocx.disabled = true;
  if (btnText) btnText.innerText = 'Rendering DOCX...';
  showToast('Preparing Word document (.docx)...');

  try {
    // Ensure htmlDocx library is loaded
    if (typeof window.htmlDocx === 'undefined') {
      await new Promise((resolve, reject) => {
        let script = document.getElementById('html-docx-script');
        if (!script) {
          script = document.createElement('script');
          script.id = 'html-docx-script';
          script.src = 'html-docx.js';
          document.head.appendChild(script);
        }
        if (typeof window.htmlDocx !== 'undefined') {
          resolve();
        } else {
          script.onload = () => resolve();
          script.onerror = () => {
            const cdnScript = document.createElement('script');
            cdnScript.src = 'https://cdn.jsdelivr.net/npm/html-docx-js@0.3.1/dist/html-docx.js';
            cdnScript.onload = () => resolve();
            cdnScript.onerror = () => reject(new Error('Failed to load Word DOCX engine.'));
            document.head.appendChild(cdnScript);
          };
        }
      });
    }

    const pages = document.querySelectorAll('.a4-page');
    if (!pages || pages.length === 0) {
      throw new Error('No printable document page found to export.');
    }

    // Determine employee name from candidate inputs
    const empInput = document.getElementById('employeeName') || document.getElementById('empName') || document.getElementById('name');
    const empName = empInput ? (empInput.value.trim() || 'Employee') : 'Employee';

    // Determine document label prefix
    let docTitle = customDocPrefix;
    if (!docTitle) {
      const currentFile = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
      const docEntry = [
        { file: 'index.html', label: 'Offer_Letter' },
        { file: 'relieving_letter.html', label: 'Relieving_Letter' },
        { file: 'experience_letter.html', label: 'Experience_Letter' },
        { file: 'internship_letter.html', label: 'Internship_Letter' },
        { file: 'promotion_letter.html', label: 'Promotion_Letter' },
        { file: 'salary_increment_letter.html', label: 'Salary_Increment' },
        { file: 'fnf_settlement.html', label: 'FnF_Settlement' },
        { file: 'noc_exit_agreement.html', label: 'NOC_Exit_NDA' },
        { file: 'payslip.html', label: 'Monthly_Payslip' },
        { file: 'termination_letter.html', label: 'Termination_Letter' }
      ].find(d => currentFile.includes(d.file.toLowerCase()));
      docTitle = docEntry ? docEntry.label : 'HR_Document';
    }

    // Process page content
    let pagesHtml = '';
    pages.forEach((page, index) => {
      const clone = page.cloneNode(true);

      // 1. Remove interactive / UI buttons not meant for Word
      clone.querySelectorAll('.date-picker-btn, .no-print, button').forEach(el => el.remove());

      // 2. Convert white-space: pre-line or textarea text to real <br> tags so linebreaks persist in Word
      clone.querySelectorAll('[style*="pre-line"], #prev_address').forEach(el => {
        if (el.children.length === 0 && el.textContent.includes('\n')) {
          el.innerHTML = el.textContent.trim().replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>');
        }
      });

      if (index > 0) {
        pagesHtml += '<div style="page-break-before: always; mso-break-type: section-break;"></div>';
      }
      pagesHtml += `<div class="word-page">${clone.innerHTML}</div>`;
    });

    const wordHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${docTitle}</title>
        <!--[if gte mso 9]>
        <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
          <w:Compatibility>
            <w:BreakWrappedTables/>
            <w:SplitPgBreakAndParaMark/>
          </w:Compatibility>
        </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: 210mm 297mm;
            margin: 38mm 20mm 15mm 20mm;
            mso-page-orientation: portrait;
            mso-header-margin: 0pt;
            mso-footer-margin: 0pt;
          }
          * {
            font-family: 'Aptos', 'Calibri', Arial, sans-serif !important;
            mso-ascii-font-family: 'Aptos';
            mso-hansi-font-family: 'Aptos';
            mso-bidi-font-family: 'Aptos';
          }
          body {
            font-family: 'Aptos', 'Calibri', Arial, sans-serif !important;
            font-size: 10.5pt !important;
            mso-ansi-font-size: 10.5pt !important;
            line-height: 132% !important;
            mso-line-height-rule: exactly;
            color: #0f172a !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .word-page {
            padding: 0 !important;
            margin: 0 !important;
            box-sizing: border-box !important;
          }
          p, div {
            font-family: 'Aptos', 'Calibri', Arial, sans-serif !important;
            font-size: 10.5pt !important;
            line-height: 132% !important;
            mso-line-height-rule: exactly;
            color: #0f172a !important;
            margin-top: 0pt !important;
            margin-bottom: 5pt !important;
            mso-para-margin-top: 0pt !important;
            mso-para-margin-bottom: 5pt !important;
          }
          b, strong, .font-bold, .section-heading, .subject-title, .doc-title-bar, .term-subject-line, th, td.label-col {
            font-weight: bold !important;
            mso-bidi-font-weight: bold !important;
            color: #0f172a !important;
          }
          .doc-paragraph {
            margin-top: 0pt !important;
            margin-bottom: 5.5pt !important;
            mso-para-margin-top: 0pt !important;
            mso-para-margin-bottom: 5.5pt !important;
            text-align: justify !important;
            line-height: 132% !important;
            mso-line-height-rule: exactly;
          }
          .doc-title-bar, .subject-title {
            font-size: 12.5pt !important;
            font-weight: bold !important;
            text-align: center !important;
            margin-top: 8pt !important;
            margin-bottom: 10pt !important;
            mso-para-margin-top: 8pt !important;
            mso-para-margin-bottom: 10pt !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            color: #0f172a !important;
          }
          .term-subject-line {
            font-size: 11pt !important;
            font-weight: bold !important;
            color: #0f172a !important;
            margin-top: 8pt !important;
            margin-bottom: 8pt !important;
            mso-para-margin-top: 8pt !important;
            mso-para-margin-bottom: 8pt !important;
            text-decoration: underline !important;
          }
          .recipient-address-block, .meta-block {
            margin-top: 4pt !important;
            margin-bottom: 10pt !important;
            mso-para-margin-top: 4pt !important;
            mso-para-margin-bottom: 10pt !important;
            line-height: 128% !important;
            mso-line-height-rule: exactly;
          }
          .meta-line {
            margin-top: 0pt !important;
            margin-bottom: 2pt !important;
            mso-para-margin-top: 0pt !important;
            mso-para-margin-bottom: 2pt !important;
          }
          ol, ul, .term-ordered-list, .bullet-list {
            margin-top: 4pt !important;
            margin-bottom: 6pt !important;
            mso-para-margin-top: 4pt !important;
            mso-para-margin-bottom: 6pt !important;
            padding-left: 18pt !important;
            margin-left: 0pt !important;
            mso-para-margin-left: 18pt !important;
          }
          li, .term-ordered-list li, .bullet-list li {
            margin-top: 0pt !important;
            margin-bottom: 4.5pt !important;
            mso-para-margin-top: 0pt !important;
            mso-para-margin-bottom: 4.5pt !important;
            line-height: 132% !important;
            mso-line-height-rule: exactly;
            text-align: justify !important;
            font-size: 10.5pt !important;
            font-family: 'Aptos', 'Calibri', Arial, sans-serif !important;
          }
          table, .details-table, .annexure-table, .payslip-table {
            width: 100% !important;
            border-collapse: collapse !important;
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
            margin-top: 6pt !important;
            margin-bottom: 8pt !important;
            mso-para-margin-top: 6pt !important;
            mso-para-margin-bottom: 8pt !important;
          }
          table.details-table td {
            border: none !important;
            padding: 2.5pt 4pt !important;
            font-size: 10.5pt !important;
            line-height: 128% !important;
            vertical-align: top !important;
          }
          table.annexure-table td, table.annexure-table th,
          table.payslip-table td, table.payslip-table th {
            border: 1pt solid #cbd5e1 !important;
            padding: 3.5pt 5.5pt !important;
            font-size: 10pt !important;
            vertical-align: top !important;
            line-height: 122% !important;
          }
          table.annexure-table th, table.payslip-table th {
            background-color: #f1f5f9 !important;
            font-weight: bold !important;
            mso-bidi-font-weight: bold !important;
            color: #0f172a !important;
          }
          .signature-box, .signature-container {
            margin-top: 20pt !important;
            mso-para-margin-top: 20pt !important;
            page-break-inside: avoid !important;
          }
          .signature-line {
            margin-top: 32pt !important;
            mso-para-margin-top: 32pt !important;
            border-top: 1pt solid #475569 !important;
            width: 210pt !important;
            padding-top: 3pt !important;
            line-height: 122% !important;
          }
        </style>
      </head>
      <body>
        ${pagesHtml}
      </body>
      </html>
    `;

    const converted = window.htmlDocx.asBlob(wordHtml, {
      orientation: 'portrait',
      margins: { top: 2380, right: 1134, bottom: 850, left: 1134 }
    });

    const cleanEmp = empName.replace(/\s+/g, '_');
    const filename = `${docTitle}_${cleanEmp}.docx`;

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(converted);
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setTimeout(() => URL.revokeObjectURL(downloadLink.href), 10000);

    showToast(`Word document (.docx) downloaded successfully!`);
  } catch (err) {
    console.error('Word DOCX Generation Error:', err);
    showToast('Error generating DOCX document: ' + (err.message || 'Unknown error'));
  } finally {
    if (btnDocx) btnDocx.disabled = false;
    if (btnText) btnText.innerText = 'Download DOCX';
  }
}
window.generateDOCX = generateUniversalDOCX;
window.generateUniversalDOCX = generateUniversalDOCX;

/**
 * Universal Zero-Backend Password Change Modal Engine
 */
function openChangePasswordModal() {
  let modal = document.getElementById('changePasswordModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'changePasswordModal';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.6);z-index:99999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);';
    modal.innerHTML = `
      <div style="background:#ffffff;border-radius:16px;width:100%;max-width:380px;padding:28px 24px;box-shadow:0 20px 40px rgba(0,0,0,0.2);font-family:'Inter',sans-serif;position:relative;">
        <h3 style="margin:0 0 6px 0;font-family:'Outfit',sans-serif;font-size:1.2rem;color:#0f172a;font-weight:700;">Change Portal Passcode</h3>
        <p style="margin:0 0 16px 0;font-size:0.82rem;color:#64748b;line-height:1.4;">Update your authorization passcode. Stored 100% securely in your browser with zero backend requirements.</p>
        <div id="pwdModalError" style="display:none;background:#fef2f2;border:1px solid #fecaca;color:#991b1b;padding:8px 12px;border-radius:6px;font-size:0.8rem;margin-bottom:14px;"></div>
        <form onsubmit="handleModalChangePassword(event)">
          <div style="margin-bottom:12px;text-align:left;">
            <label style="display:block;font-size:0.75rem;font-weight:600;color:#334155;margin-bottom:4px;text-transform:uppercase;">Current Passcode</label>
            <input type="password" id="pwdCurrent" required placeholder="Enter current passcode" style="width:100%;padding:10px 12px;font-size:0.9rem;border:1px solid #cbd7e4;border-radius:6px;box-sizing:border-box;outline:none;">
          </div>
          <div style="margin-bottom:12px;text-align:left;">
            <label style="display:block;font-size:0.75rem;font-weight:600;color:#334155;margin-bottom:4px;text-transform:uppercase;">New Passcode</label>
            <input type="password" id="pwdNew" required placeholder="Enter new passcode (min 4 chars)" style="width:100%;padding:10px 12px;font-size:0.9rem;border:1px solid #cbd7e4;border-radius:6px;box-sizing:border-box;outline:none;">
          </div>
          <div style="margin-bottom:20px;text-align:left;">
            <label style="display:block;font-size:0.75rem;font-weight:600;color:#334155;margin-bottom:4px;text-transform:uppercase;">Confirm New Passcode</label>
            <input type="password" id="pwdConfirm" required placeholder="Re-enter new passcode" style="width:100%;padding:10px 12px;font-size:0.9rem;border:1px solid #cbd7e4;border-radius:6px;box-sizing:border-box;outline:none;">
          </div>
          <div style="display:flex;gap:10px;justify-content:space-between;align-items:center;">
            <button type="button" onclick="handleModalResetPassword()" style="padding:8px 10px;font-size:0.75rem;border:none;background:transparent;color:#dc2626;cursor:pointer;text-decoration:underline;">Reset to Default</button>
            <div style="display:flex;gap:8px;">
              <button type="button" onclick="closeChangePasswordModal()" style="padding:9px 14px;font-size:0.85rem;border:1px solid #cbd7e4;background:#f8fafc;color:#475569;border-radius:6px;cursor:pointer;">Cancel</button>
              <button type="submit" id="btnSavePwd" style="padding:9px 16px;font-size:0.85rem;border:none;background:#1d6bf3;color:#ffffff;font-weight:600;border-radius:6px;cursor:pointer;">Save Passcode</button>
            </div>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  } else {
    modal.style.display = 'flex';
  }
  document.getElementById('pwdCurrent').value = '';
  document.getElementById('pwdNew').value = '';
  document.getElementById('pwdConfirm').value = '';
  document.getElementById('pwdModalError').style.display = 'none';
  document.getElementById('pwdCurrent').focus();
}

function closeChangePasswordModal() {
  const modal = document.getElementById('changePasswordModal');
  if (modal) modal.style.display = 'none';
}

async function handleModalChangePassword(e) {
  e.preventDefault();
  const currentP = document.getElementById('pwdCurrent').value;
  const newP = document.getElementById('pwdNew').value;
  const confirmP = document.getElementById('pwdConfirm').value;
  const errorEl = document.getElementById('pwdModalError');

  errorEl.style.display = 'none';
  if (newP !== confirmP) {
    errorEl.textContent = 'New passcode and confirmation do not match.';
    errorEl.style.display = 'block';
    return;
  }

  const res = await window.PortalAuth.changePassword(currentP, newP);
  if (res.success) {
    closeChangePasswordModal();
    if (typeof showToast === 'function') {
      showToast('Passcode changed successfully!');
    } else {
      alert('Passcode changed successfully!');
    }
  } else {
    errorEl.textContent = res.message;
    errorEl.style.display = 'block';
  }
}

function handleModalResetPassword() {
  if (confirm('Reset portal passcode back to default master passcode?')) {
    const res = window.PortalAuth.resetPassword();
    closeChangePasswordModal();
    if (typeof showToast === 'function') {
      showToast(res.message);
    } else {
      alert(res.message);
    }
  }
}

window.openChangePasswordModal = openChangePasswordModal;
window.closeChangePasswordModal = closeChangePasswordModal;
window.handleModalChangePassword = handleModalChangePassword;
window.handleModalResetPassword = handleModalResetPassword;

/**
 * Global Field Toggle Visibility Helper for Company & Signatory Block
 */
function toggleFieldVisibility(inputId, previewSelector, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const isHidden = input.dataset.hidden === "true";
  const newState = !isHidden;
  input.dataset.hidden = newState ? "true" : "false";

  const wrapper = btn.closest('.field-toggle-wrapper');
  const eyeOpen = btn.querySelector('.eye-open');
  const eyeOff = btn.querySelector('.eye-off');

  if (newState) {
    btn.classList.add('off');
    btn.setAttribute('title', 'Field hidden from document page');
    if (wrapper) wrapper.classList.add('is-hidden-field');
    if (eyeOpen) eyeOpen.style.display = 'none';
    if (eyeOff) eyeOff.style.display = 'inline-block';
  } else {
    btn.classList.remove('off');
    btn.setAttribute('title', 'Field visible in document page');
    if (wrapper) wrapper.classList.remove('is-hidden-field');
    if (eyeOpen) eyeOpen.style.display = 'inline-block';
    if (eyeOff) eyeOff.style.display = 'none';
  }

  applyFieldVisibility(inputId, previewSelector, newState);
}

function applyFieldVisibility(inputId, previewSelector, isHidden) {
  let targets = [];
  if (!previewSelector) {
    // Default fallback mappings based on inputId
    if (inputId === 'companyName') previewSelector = '#prev_companyName, #prev_compName, #prev_compName2, #prev_sigComp';
    else if (inputId === 'companyCin') previewSelector = '#prev_companyCin';
    else if (inputId === 'companyType') previewSelector = '#prev_companyType';
    else if (inputId === 'companyAddress') previewSelector = '#prev_companyAddress';
    else if (inputId === 'sigName' || inputId === 'signatoryName') previewSelector = '#prev_signatory, #prev_signatoryName, #prev_signatoryName_annex';
    else if (inputId === 'sigDesig' || inputId === 'signatoryDesignation') previewSelector = '#prev_signatoryDesig, #prev_signatoryDesig_annex';
    else if (inputId === 'sigContact') previewSelector = '#prev_sigContact, #prev_companyContact';
    else if (inputId === 'grievanceName') previewSelector = '#prev_grievanceName';
    else if (inputId === 'grievanceDesignation') previewSelector = '#prev_grievanceDesignation';
    else if (inputId === 'grievanceEmail') previewSelector = '#prev_grievanceEmail';
    else if (inputId === 'grievancePhone') previewSelector = '#prev_grievancePhone';
  }

  if (typeof previewSelector === 'string') {
    const selectors = previewSelector.split(',').map(s => s.trim()).filter(Boolean);
    selectors.forEach(sel => {
      targets.push(...document.querySelectorAll(sel));
    });
  } else if (Array.isArray(previewSelector)) {
    previewSelector.forEach(sel => {
      targets.push(...document.querySelectorAll(sel));
    });
  }

  targets.forEach(el => {
    if (isHidden) {
      if (!el.dataset.origDisplay) {
        el.dataset.origDisplay = window.getComputedStyle(el).display || '';
      }
      el.style.display = 'none';
    } else {
      const orig = el.dataset.origDisplay;
      el.style.display = (orig && orig !== 'none') ? orig : '';
    }
  });
}

function refreshHiddenFields() {
  document.querySelectorAll('[data-hidden="true"]').forEach(input => {
    applyFieldVisibility(input.id, null, true);
  });
}

window.toggleFieldVisibility = toggleFieldVisibility;
window.applyFieldVisibility = applyFieldVisibility;
window.refreshHiddenFields = refreshHiddenFields;

/**
 * Auto-scaling A4 Document Preview Engine for Mobile Devices (320px - 800px)
 */
function autoScaleMobilePreview() {
  const container = document.getElementById('pdf-export-container');
  if (!container) return;

  const viewportWidth = window.innerWidth;
  if (viewportWidth < 840) {
    const padding = 16;
    const targetWidth = 794; // 210mm in px at standard DPI
    const scale = Math.max(0.30, Math.min(1, (viewportWidth - padding) / targetWidth));
    container.style.transform = `scale(${scale})`;
    container.style.transformOrigin = 'top center';
    
    const firstPage = container.querySelector('.a4-page');
    const originalHeight = firstPage ? firstPage.offsetHeight : 1123;
    const totalPages = container.querySelectorAll('.a4-page').length || 1;
    const scaledHeight = (originalHeight * totalPages + (totalPages - 1) * 30) * scale;
    const originalTotalHeight = originalHeight * totalPages + (totalPages - 1) * 30;
    container.style.marginBottom = `-${(originalTotalHeight - scaledHeight)}px`;
  } else {
    container.style.transform = '';
    container.style.transformOrigin = '';
    container.style.marginBottom = '';
  }
}

window.autoScaleMobilePreview = autoScaleMobilePreview;
window.addEventListener('resize', autoScaleMobilePreview);
window.addEventListener('orientationchange', () => setTimeout(autoScaleMobilePreview, 100));

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(autoScaleMobilePreview, 50));
} else {
  setTimeout(autoScaleMobilePreview, 50);
}




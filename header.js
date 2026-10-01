
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

const FormatUtils = {
  parseNum: function (val) {
    if (val === null || val === undefined) return 0;
    const clean = String(val).replace(/[^0-9.-]/g, '');
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : num;
  },
  formatINR: function (num, options = {}) {
    if (num === null || num === undefined) return '0';
    const parsed = typeof num === 'number' ? num : FormatUtils.parseNum(num);
    if (isNaN(parsed)) return '0';
    const rounded = Math.round(parsed);
    return rounded.toLocaleString('en-IN', {
      maximumFractionDigits: options.decimals || 0,
      minimumFractionDigits: options.decimals || 0
    });
  },
  numberToWordsINR: function (num) {
    const n = typeof num === 'number' ? num : FormatUtils.parseNum(num);
    if (isNaN(n) || n <= 0) return 'Rupees Zero Only';
    const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function inWords(val) {
      if (val < 20) return a[val];
      if (val < 100) return b[Math.floor(val / 10)] + (val % 10 ? '-' + a[val % 10] : '');
      if (val < 1000) return a[Math.floor(val / 100)] + ' Hundred' + (val % 100 ? ' and ' + inWords(val % 100) : '');
      if (val < 100000) return inWords(Math.floor(val / 1000)) + ' Thousand' + (val % 1000 ? ' ' + inWords(val % 1000) : '');
      if (val < 10000000) return inWords(Math.floor(val / 100000)) + ' Lakh' + (val % 100000 ? ' ' + inWords(val % 100000) : '');
      return inWords(Math.floor(val / 10000000)) + ' Crore' + (val % 10000000 ? ' ' + inWords(val % 10000000) : '');
    }
    return 'Rupees ' + inWords(Math.floor(n)) + ' Only';
  }
};
window.FormatUtils = FormatUtils;
window.formatINR = FormatUtils.formatINR;
window.parseNum = FormatUtils.parseNum;
window.numberToWordsINR = FormatUtils.numberToWordsINR;

const SHARED_KEYS = {
  empName: 'shared_empName',
  empPrefix: 'shared_empPrefix',
  empId: 'shared_empId',
  designation: 'shared_designation',
  department: 'shared_department',
  address: 'shared_address',
  companyAddress: 'shared_companyAddress',
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
  esiNo: 'shared_esiNo',
  esiEnabled: 'shared_esiEnabled',
  salaryRatio: 'shared_salaryRatio',
  pfWageCap: 'shared_pfWageCap',
  ptEnabled: 'shared_ptEnabled',
  ptState: 'shared_ptState',
  ptCustomAmount: 'shared_ptCustomAmount',
  paymentMode: 'shared_paymentMode',
  annualCTC: 'shared_annualCTC',
  monthlyGrossSalary: 'shared_monthlyGrossSalary',
  reportingManager: 'shared_reportingManager',
  customBenefit1Name: 'shared_customBenefit1Name',
  customBenefit1Monthly: 'shared_customBenefit1Monthly',
  customBenefit1Val: 'shared_customBenefit1Val',
  customBenefit2Name: 'shared_customBenefit2Name',
  customBenefit2Monthly: 'shared_customBenefit2Monthly',
  customBenefit2Val: 'shared_customBenefit2Val'
};

const SHARED_KEY_MAP = {
  empPrefix: ['empPrefix', 'salutationPrefix', 'prefix'],
  empName: ['empName', 'employeeName', 'name', 'candidateName'],
  empId: ['empId', 'employeeId', 'employeeNo'],
  designation: ['designation', 'desig'],
  department: ['department', 'dept'],
  address: ['employeeAddress', 'candidateAddress', 'address'],
  companyAddress: ['companyAddress'],
  location: ['location', 'workLocation', 'candidateLocation'],
  docDate: ['offerDate', 'letterDate', 'expDate', 'fnfDate', 'terminationDate', 'docDate'],
  doj: ['doj', 'dateOfJoining', 'joiningDate', 'fromDate'],
  dol: ['dol', 'relievingDate', 'dateOfLeaving', 'lastWorkingDate', 'toDate'],
  companyName: ['companyName'],
  sigName: ['sigName', 'signatoryName'],
  sigDesig: ['sigDesig', 'signatoryDesignation'],
  bankName: ['bankName'],
  bankAcc: ['bankAcc', 'bankAccountNo'],
  panNo: ['panNo', 'panNumber'],
  pfNo: ['pfNo', 'pfNumber'],
  uanNo: ['uanNo', 'pfUan'],
  esiNo: ['esiNo', 'esiNumber'],
  paymentMode: ['paymentMode', 'payMode'],
  annualCTC: ['annualCTC', 'annualCtc', 'ctc', 'totalCtc', 'currentCtcAnnual', 'confirmedCtc'],
  monthlyGrossSalary: ['totalGrossSalary', 'monthlyGrossSalary', 'currentCtcMonthly'],
  reportingManager: ['reportingManager', 'reportingTo', 'managerInfo'],
  customBenefit1Name: ['customBenefit1Name'],
  customBenefit1Monthly: ['customBenefit1Monthly'],
  customBenefit1Val: ['customBenefit1Val'],
  customBenefit2Name: ['customBenefit2Name'],
  customBenefit2Monthly: ['customBenefit2Monthly'],
  customBenefit2Val: ['customBenefit2Val']
};

function hasAnyElement(ids = []) {
  return ids.some(id => document.getElementById(id) !== null);
}

function setInputValueSafe(el, val) {
  if (!el || val === undefined || val === null) return;
  if (el.tagName === 'SELECT') {
    let matched = false;
    const sVal = String(val).trim().toLowerCase();
    for (let i = 0; i < el.options.length; i++) {
      const optVal = el.options[i].value.trim().toLowerCase();
      const optText = el.options[i].text.trim().toLowerCase();
      if (optVal === sVal || optVal.includes(sVal) || sVal.includes(optVal) || optText === sVal) {
        el.selectedIndex = i;
        matched = true;
        break;
      }
    }
    if (!matched) el.value = val;
  } else {
    el.value = val;
  }
  if (el.dataset) {
    el.dataset.lockedVal = el.value;
  }
}

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
      .a4-page + .a4-page {
        page-break-before: always !important;
        break-before: page !important;
      }
    }
  `;
  document.head.appendChild(style);
}

function isCurrentRolePreview() {
  return (typeof DilshajAuth !== 'undefined' && DilshajAuth.getRole && DilshajAuth.getRole() === 'preview') ||
    (window.PortalAuth && window.PortalAuth.getRole && window.PortalAuth.getRole() === 'preview') ||
    document.documentElement.classList.contains('mode-preview') ||
    (document.body && document.body.classList.contains('mode-preview'));
}

function isPayslipPage() {
  const currentPath = (window.location.pathname.split(/[/\\]/).pop() || '').toLowerCase();
  if (currentPath === 'payslip.html' || currentPath === 'stipend_payslip.html') return true;
  if (currentPath.includes('payslip')) return true;
  return !!(document.querySelector('.payslip-unified-box') || document.querySelector('.payslip-period-title'));
}

function initSignaturesAndStamps() {
  if (isCurrentRolePreview()) {
    document.querySelectorAll('.sig-seal-wrap, img[data-admin-src], img.doc-signature-img, img.doc-stamp-img').forEach(el => el.remove());
  } else {
    document.querySelectorAll('img[data-admin-src]').forEach(img => {
      const rawSrc = img.getAttribute('data-admin-src');
      const decrypted = (typeof window.getDecryptedAsset === 'function') ? window.getDecryptedAsset(rawSrc) : null;
      img.src = decrypted || rawSrc;
      img.removeAttribute('data-admin-src');
    });
  }
}
document.addEventListener('DOMContentLoaded', initSignaturesAndStamps);

function triggerPrintDocument() {
  saveSharedProfile();
  window.print();
}

function toggleBackground() {
  if (isCurrentRolePreview()) return;
  const bgToggle = document.getElementById('bgToggle');
  if (!bgToggle) return;
  const isChecked = bgToggle.checked;
  if (isChecked) {
    document.body.classList.add('show-letterhead-bg');
    if (!isPayslipPage()) {
      localStorage.setItem('hr_doc_showBg', 'true');
    }
    showToast('Letterhead background enabled');
  } else {
    document.body.classList.remove('show-letterhead-bg');
    if (!isPayslipPage()) {
      localStorage.setItem('hr_doc_showBg', 'false');
    }
    showToast('Letterhead background disabled');
  }
}

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

function getFirstVal(ids = []) {
  for (let id of ids) {
    const el = document.getElementById(id);
    if (el && el.value && el.value.trim() !== '') {
      return el.value.trim();
    }
  }
  return '';
}

function getActiveEmployeeName() {
  const val = getFirstVal(['employeeName', 'empName', 'name', 'candidateName']);
  if (val) return val;
  const saved = localStorage.getItem(SHARED_KEYS.empName);
  if (saved && saved.trim() !== '') return saved.trim();
  return 'Employee Name';
}
window.getActiveEmployeeName = getActiveEmployeeName;

function updateHeaderDocTitle() {
  const empName = getActiveEmployeeName();
  const currentFile = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
  const docEntry = [
    { file: 'index.html', label: 'Offer Letter', prefix: 'Offer_Letter' },
    { file: 'relieving_letter.html', label: 'Relieving Letter', prefix: 'Relieving_Letter' },
    { file: 'experience_letter.html', label: 'Experience Letter', prefix: 'Experience_Letter' },
    { file: 'internship_letter.html', label: 'Internship Letter', prefix: 'Internship_Letter' },
    { file: 'promotion_letter.html', label: 'Promotion Letter', prefix: 'Promotion_Letter' },
    { file: 'salary_increment_letter.html', label: 'Salary Increment', prefix: 'Salary_Increment' },
    { file: 'fnf_settlement.html', label: 'F&F Settlement', prefix: 'FnF_Settlement' },
    { file: 'noc_exit_agreement.html', label: 'NOC & Exit NDA', prefix: 'NOC_Exit_NDA' },
    { file: 'payslip.html', label: 'Monthly Payslip', prefix: 'Monthly_Payslip' },
    { file: 'stipend_payslip.html', label: 'Stipend Payslip', prefix: 'Stipend_Payslip' },
    { file: 'confirmation_letter.html', label: 'Confirmation Letter', prefix: 'Confirmation_Letter' },
    { file: 'resignation_acceptance.html', label: 'Acceptance of Resignation', prefix: 'Resignation_Acceptance' },
    { file: 'termination_letter.html', label: 'Termination Letter', prefix: 'Termination_Letter' },
    { file: 'lop_letter.html', label: 'Loss of Pay Letter', prefix: 'LOP_Letter' }
  ].find(d => currentFile === d.file.toLowerCase() || (d.file === 'index.html' && (currentFile === '' || currentFile === 'index.html')));

  const docLabel = docEntry ? docEntry.label : 'HR Document';
  const docPrefix = docEntry ? docEntry.prefix : 'HR_Document';
  const cleanEmp = empName.replace(/\s+/g, '_');

  const headerTitleEl = document.getElementById('headerEmpDocTitle');
  if (headerTitleEl) {
    headerTitleEl.textContent = docLabel;
  }

  const activeTabLabel = document.querySelector('.doc-tab-item.active .doc-tab-label');
  if (activeTabLabel) {
    activeTabLabel.textContent = docLabel;
  }

  document.title = `${cleanEmp}_${docPrefix}`;
}
window.updateHeaderDocTitle = updateHeaderDocTitle;

function saveSharedProfile() {
  const isMonthlyOnlyPage = !document.getElementById('customBenefit1Monthly') && document.getElementById('customBenefit1Val');
  let b1m = getFirstVal(['customBenefit1Monthly']);
  let b1a = getFirstVal(['customBenefit1Val']);
  if (isMonthlyOnlyPage && b1a) {
    b1m = b1a;
    const num = parseFloat(b1a.replace(/[^0-9.]/g, '')) || 0;
    b1a = String(Math.round(num * 12));
  } else if (b1m && !b1a) {
    const num = parseFloat(b1m.replace(/[^0-9.]/g, '')) || 0;
    b1a = String(Math.round(num * 12));
  } else if (b1a && !b1m) {
    const num = parseFloat(b1a.replace(/[^0-9.]/g, '')) || 0;
    b1m = String(Math.round(num / 12));
  }

  let b2m = getFirstVal(['customBenefit2Monthly']);
  let b2a = getFirstVal(['customBenefit2Val']);
  if (isMonthlyOnlyPage && b2a) {
    b2m = b2a;
    const num = parseFloat(b2a.replace(/[^0-9.]/g, '')) || 0;
    b2a = String(Math.round(num * 12));
  } else if (b2m && !b2a) {
    const num = parseFloat(b2m.replace(/[^0-9.]/g, '')) || 0;
    b2a = String(Math.round(num * 12));
  } else if (b2a && !b2m) {
    const num = parseFloat(b2a.replace(/[^0-9.]/g, '')) || 0;
    b2m = String(Math.round(num / 12));
  }

  const profile = {
    empPrefix: getFirstVal(SHARED_KEY_MAP.empPrefix),
    empName: getFirstVal(SHARED_KEY_MAP.empName),
    empId: getFirstVal(SHARED_KEY_MAP.empId),
    designation: getFirstVal(SHARED_KEY_MAP.designation),
    department: getFirstVal(SHARED_KEY_MAP.department),
    address: getFirstVal(SHARED_KEY_MAP.address),
    companyAddress: getFirstVal(SHARED_KEY_MAP.companyAddress),
    location: getFirstVal(SHARED_KEY_MAP.location),
    docDate: getFirstVal(SHARED_KEY_MAP.docDate),
    doj: getFirstVal(SHARED_KEY_MAP.doj),
    dol: getFirstVal(SHARED_KEY_MAP.dol),
    companyName: getFirstVal(SHARED_KEY_MAP.companyName) || 'Dilshaj Infotech Private Limited',
    sigName: getFirstVal(SHARED_KEY_MAP.sigName),
    sigDesig: getFirstVal(SHARED_KEY_MAP.sigDesig),
    bankName: getFirstVal(SHARED_KEY_MAP.bankName),
    bankAcc: getFirstVal(SHARED_KEY_MAP.bankAcc),
    panNo: getFirstVal(SHARED_KEY_MAP.panNo),
    pfNo: getFirstVal(SHARED_KEY_MAP.pfNo),
    uanNo: getFirstVal(SHARED_KEY_MAP.uanNo),
    esiNo: getFirstVal(SHARED_KEY_MAP.esiNo),
    paymentMode: getFirstVal(SHARED_KEY_MAP.paymentMode),
    annualCTC: getFirstVal(SHARED_KEY_MAP.annualCTC),
    monthlyGrossSalary: getFirstVal(SHARED_KEY_MAP.monthlyGrossSalary),
    reportingManager: getFirstVal(SHARED_KEY_MAP.reportingManager),
    customBenefit1Name: getFirstVal(['customBenefit1Name']),
    customBenefit1Monthly: b1m,
    customBenefit1Val: b1a,
    customBenefit2Name: getFirstVal(['customBenefit2Name']),
    customBenefit2Monthly: b2m,
    customBenefit2Val: b2a
  };

  const isPreview = isCurrentRolePreview();
  const nonFinancialKeys = [
    'empPrefix', 'empName', 'empId', 'designation', 'department',
    'address', 'companyAddress', 'location', 'docDate', 'doj', 'dol',
    'companyName', 'sigName', 'sigDesig', 'reportingManager'
  ];

  Object.keys(profile).forEach(k => {
    const val = profile[k];
    const keyIds = SHARED_KEY_MAP[k] || [k];
    const elemExistsOnPage = hasAnyElement(keyIds);

    if (isPreview && nonFinancialKeys.includes(k)) {
      const existing = localStorage.getItem(SHARED_KEYS[k]);
      if (existing) return;
    }

    if (val !== undefined && val !== null && val !== '') {
      localStorage.setItem(SHARED_KEYS[k], val);
    } else if (elemExistsOnPage) {
      localStorage.removeItem(SHARED_KEYS[k]);
    }
  });

  const pageSizeSelect = document.getElementById('pageSizeSelect');
  const bgToggle = document.getElementById('bgToggle');
  const dateFormatSelect = document.getElementById('dateFormatSelect');
  if (pageSizeSelect) localStorage.setItem('hr_doc_pageSize', pageSizeSelect.value);
  if (bgToggle && !isPayslipPage()) localStorage.setItem('hr_doc_showBg', bgToggle.checked ? 'true' : 'false');
  if (dateFormatSelect) localStorage.setItem(DATE_FORMAT_KEY, dateFormatSelect.value);

  const esiDisableEl = document.getElementById('esiCoverageDisable');
  const esiEnableEl = document.getElementById('esiCoverageEnable');
  if (esiDisableEl || esiEnableEl) {
    const isEsiActive = esiEnableEl ? esiEnableEl.checked : !esiDisableEl.checked;
    localStorage.setItem(SHARED_KEYS.esiEnabled, isEsiActive ? 'true' : 'false');
  }

  const ratio55El = document.getElementById('ratio_55_45');
  const ratio50El = document.getElementById('ratio_50_40_10');
  if (ratio55El || ratio50El) {
    const activeRatio = (ratio55El && ratio55El.checked) ? '55_45' : '50_40_10';
    localStorage.setItem(SHARED_KEYS.salaryRatio, activeRatio);
  }

  const pfCap15El = document.getElementById('pfCap_15000');
  const pfCap25El = document.getElementById('pfCap_25000');
  const pfCapNoneEl = document.getElementById('pfCap_none');
  if (pfCap15El || pfCap25El || pfCapNoneEl) {
    let activePfCap = '15000';
    if (pfCap25El && pfCap25El.checked) activePfCap = '25000';
    else if (pfCapNoneEl && pfCapNoneEl.checked) activePfCap = 'none';
    localStorage.setItem(SHARED_KEYS.pfWageCap, activePfCap);
  }

  const ptDisableEl = document.getElementById('ptCoverageDisable');
  const ptEnableEl = document.getElementById('ptCoverageEnable');
  if (ptDisableEl || ptEnableEl) {
    const isPtActive = ptEnableEl ? ptEnableEl.checked : !ptDisableEl.checked;
    localStorage.setItem(SHARED_KEYS.ptEnabled, isPtActive ? 'true' : 'false');
  }

  const ptStateEl = document.getElementById('ptStateSelect');
  if (ptStateEl) {
    localStorage.setItem(SHARED_KEYS.ptState, ptStateEl.value);
  }

  const ptCustomEl = document.getElementById('ptCustomAmount');
  if (ptCustomEl) {
    localStorage.setItem(SHARED_KEYS.ptCustomAmount, ptCustomEl.value);
  }

  updateHeaderDocTitle();
}

let _saveProfileTimer = null;

function debouncedSaveSharedProfile() {
  if (_saveProfileTimer) clearTimeout(_saveProfileTimer);
  _saveProfileTimer = setTimeout(() => {
    saveSharedProfile();
  }, 150);
}

function loadSharedProfile(explicitMap = null) {
  // 1. FIRST: Populate all input elements across the page from shared profile storage
  const autoMap = SHARED_KEY_MAP;
  Object.keys(autoMap).forEach(key => {
    const savedVal = localStorage.getItem(SHARED_KEYS[key]);
    if (savedVal !== null && savedVal !== '') {
      autoMap[key].forEach(elemId => {
        const inputElem = document.getElementById(elemId);
        if (inputElem) {
          setInputValueSafe(inputElem, savedVal);
        }
      });
    }
  });

  if (explicitMap && typeof explicitMap === 'object') {
    Object.keys(explicitMap).forEach(elemId => {
      const key = explicitMap[elemId];
      const storageKey = SHARED_KEYS[key] || (key && key.startsWith('shared_') ? key : null);
      if (storageKey) {
        const savedVal = localStorage.getItem(storageKey);
        const inputElem = document.getElementById(elemId);
        if (savedVal !== null && savedVal !== '' && inputElem) {
          setInputValueSafe(inputElem, savedVal);
        }
      }
    });
  }

  // 2. Load page layout, background and format options
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
  if (isCurrentRolePreview()) {
    document.body.classList.remove('show-letterhead-bg');
    if (bgToggle) bgToggle.checked = false;
  } else if (isPayslipPage()) {
    // Monthly and Stipend payslips: Letterhead BG toggle must always be disabled by default on visit
    if (bgToggle) bgToggle.checked = false;
    document.body.classList.remove('show-letterhead-bg');
  } else if (savedBg !== 'false') {
    if (bgToggle) bgToggle.checked = true;
    document.body.classList.add('show-letterhead-bg');
    localStorage.setItem('hr_doc_showBg', 'true');
  } else {
    if (bgToggle) bgToggle.checked = false;
    document.body.classList.remove('show-letterhead-bg');
  }
  initSignaturesAndStamps();

  // 3. Load statutory toggle states safely
  const savedEsi = localStorage.getItem(SHARED_KEYS.esiEnabled);
  if (savedEsi !== null) {
    const isEsiActive = savedEsi !== 'false';
    const esiDisableEl = document.getElementById('esiCoverageDisable');
    const esiEnableEl = document.getElementById('esiCoverageEnable');
    if (esiEnableEl) esiEnableEl.checked = isEsiActive;
    if (esiDisableEl) esiDisableEl.checked = !isEsiActive;
    if (typeof updateEsiCoverageUI === 'function') {
      updateEsiCoverageUI(isEsiActive);
    }
  }

  const savedRatio = localStorage.getItem(SHARED_KEYS.salaryRatio);
  if (savedRatio !== null) {
    const is55 = savedRatio === '55_45';
    const ratio55El = document.getElementById('ratio_55_45');
    const ratio50El = document.getElementById('ratio_50_40_10');
    if (ratio55El) ratio55El.checked = is55;
    if (ratio50El) ratio50El.checked = !is55;
    if (typeof updateSalaryRatioUI === 'function') {
      updateSalaryRatioUI(savedRatio);
    }
  }

  const savedPfCap = localStorage.getItem(SHARED_KEYS.pfWageCap) || '15000';
  if (typeof updatePfCapUI === 'function') {
    updatePfCapUI(savedPfCap);
  }

  const savedPt = localStorage.getItem(SHARED_KEYS.ptEnabled);
  if (savedPt !== null) {
    const isPtActive = savedPt !== 'false';
    const ptDisableEl = document.getElementById('ptCoverageDisable');
    const ptEnableEl = document.getElementById('ptCoverageEnable');
    if (ptEnableEl) ptEnableEl.checked = isPtActive;
    if (ptDisableEl) ptDisableEl.checked = !isPtActive;
    if (typeof updatePtCoverageUI === 'function') {
      updatePtCoverageUI(isPtActive);
    }
  }

  const savedPtState = localStorage.getItem(SHARED_KEYS.ptState);
  if (savedPtState) {
    const ptStateEl = document.getElementById('ptStateSelect');
    if (ptStateEl) {
      ptStateEl.value = savedPtState;
      const customInput = document.getElementById('ptCustomAmount');
      if (customInput) customInput.style.display = (savedPtState === 'CUSTOM') ? 'inline-block' : 'none';
      const badge = document.getElementById('ptBadgeStatus');
      const isEnabled = !document.getElementById('ptCoverageDisable')?.checked;
      if (badge && isEnabled) {
        badge.innerText = savedPtState === 'AP_TS' ? 'Active (AP/TS)' : (savedPtState === 'KA' ? 'Active (KA)' : (savedPtState === 'MH' ? 'Active (MH)' : 'Active (Custom)'));
      }
    }
  }

  const savedPtCustom = localStorage.getItem(SHARED_KEYS.ptCustomAmount);
  if (savedPtCustom) {
    const ptCustomEl = document.getElementById('ptCustomAmount');
    if (ptCustomEl) ptCustomEl.value = savedPtCustom;
  }

  const dateFormatSelect = document.getElementById('dateFormatSelect');
  if (dateFormatSelect) {
    dateFormatSelect.value = getActiveDateFormat();
  }

  // Recalculate derived salary/payslip figures if page has calculation logic
  if (typeof autoCalculatePayslip === 'function') {
    const annualCTCVal = localStorage.getItem(SHARED_KEYS.annualCTC);
    if (annualCTCVal) {
      autoCalculatePayslip('ctc');
    } else {
      autoCalculatePayslip();
    }
  }
  if (typeof autoCalculateSalary === 'function') {
    const annualCTCVal = localStorage.getItem(SHARED_KEYS.annualCTC);
    if (annualCTCVal) {
      autoCalculateSalary('ctc');
    } else {
      autoCalculateSalary('gross');
    }
  }
  if (typeof onAttendanceOrCtcChange === 'function') {
    onAttendanceOrCtcChange();
  }
  if (typeof recalcHike === 'function') {
    recalcHike();
  }

  syncRolePresetWithDesignation();

  updateHeaderDocTitle();

  if (typeof updatePreview === 'function') {
    updatePreview();
  }
}

function navigateDocType(targetUrl) {
  if (targetUrl) {
    saveSharedProfile();
    window.location.href = targetUrl;
  }
}

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

function syncRolePresetWithDesignation() {
  const desigInput = document.getElementById('designation');
  const presetSelect = document.getElementById('rolePresetSelect');
  const deptInput = document.getElementById('department');
  const dutiesInput = document.getElementById('dutiesTextarea');
  if (!presetSelect || !desigInput) return;

  const currentVal = desigInput.value.trim();
  if (currentVal in ROLE_PRESETS) {
    presetSelect.value = currentVal;
    if (deptInput && (!deptInput.value || Object.values(ROLE_PRESETS).some(p => p.department === deptInput.value))) {
      deptInput.value = ROLE_PRESETS[currentVal].department;
    }
    if (dutiesInput) {
      const isAnotherPreset = !dutiesInput.value || Object.keys(ROLE_PRESETS).some(k => k !== currentVal && ROLE_PRESETS[k].duties.trim() === dutiesInput.value.trim());
      if (isAnotherPreset && ROLE_PRESETS[currentVal].duties) {
        dutiesInput.value = ROLE_PRESETS[currentVal].duties;
      }
    }
  } else if (currentVal !== '') {
    presetSelect.value = 'Custom';
  }
}

function onRoleSelectChange() {
  const select = document.getElementById('rolePresetSelect');
  if (!select) return;
  const selectedRole = select.value;
  const desigInput = document.getElementById('designation');
  const deptInput = document.getElementById('department');
  const dutiesInput = document.getElementById('dutiesTextarea');
  const traineeRoleInput = document.getElementById('traineeRoleTitle');
  const confirmedRoleInput = document.getElementById('confirmedRoleTitle');

  if (selectedRole in ROLE_PRESETS) {
    if (desigInput) desigInput.value = selectedRole;
    if (deptInput && ROLE_PRESETS[selectedRole].department) {
      deptInput.value = ROLE_PRESETS[selectedRole].department;
    }
    if (dutiesInput && ROLE_PRESETS[selectedRole].duties) {
      dutiesInput.value = ROLE_PRESETS[selectedRole].duties;
    }
    if (traineeRoleInput) {
      traineeRoleInput.value = `${selectedRole} Trainee`;
    }
    if (confirmedRoleInput) {
      confirmedRoleInput.value = selectedRole;
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

function onCustomDesignationInput() {
  const desigInput = document.getElementById('designation');
  const select = document.getElementById('rolePresetSelect');
  const deptInput = document.getElementById('department');
  const dutiesBox = document.getElementById('dutiesTextarea');
  const traineeRoleInput = document.getElementById('traineeRoleTitle');
  const confirmedRoleInput = document.getElementById('confirmedRoleTitle');
  if (!desigInput) return;
  const val = desigInput.value.trim();

  if (traineeRoleInput && (!traineeRoleInput.value || traineeRoleInput.value.endsWith('Trainee'))) {
    traineeRoleInput.value = val ? `${val} Trainee` : '';
  }
  if (confirmedRoleInput) {
    confirmedRoleInput.value = val;
  }

  if (select) {
    if (val in ROLE_PRESETS) {
      select.value = val;
      if (deptInput && (!deptInput.value || Object.values(ROLE_PRESETS).some(p => p.department === deptInput.value))) {
        deptInput.value = ROLE_PRESETS[val].department;
      }
      if (dutiesBox) {
        const isAnotherPreset = !dutiesBox.value || Object.keys(ROLE_PRESETS).some(k => k !== val && ROLE_PRESETS[k].duties.trim() === dutiesBox.value.trim());
        if (isAnotherPreset && ROLE_PRESETS[val].duties) {
          dutiesBox.value = ROLE_PRESETS[val].duties;
        }
      }
    } else {
      select.value = 'Custom';
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

function setupDesignationControls() {
  const desigInput = document.getElementById('designation');
  if (!desigInput) return;

  desigInput.addEventListener('input', onCustomDesignationInput);

  let presetSelect = document.getElementById('rolePresetSelect');

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
    { file: 'stipend_payslip.html', label: 'Stipend Payslip', num: '10' },
    { file: 'confirmation_letter.html', label: 'Confirmation Letter', num: '11' },
    { file: 'resignation_acceptance.html', label: 'Acceptance of Resignation', num: '12' },
    { file: 'termination_letter.html', label: 'Termination Letter', num: '13' },
    { file: 'lop_letter.html', label: 'Loss of Pay Letter', num: '14' },
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

  const isPreviewRole = isCurrentRolePreview();

  const headerHTML = `
  <header class="top-nav-suite">
    <div class="top-bar">
            <div class="brand-title" style="display: flex; align-items: center; gap: 10px;">
        <img src="${(typeof window.getDecryptedAsset === 'function' && window.getDecryptedAsset('Logo.png')) || 'Logo.png'}" alt="Dilshaj Infotech Logo" style="height: 32px; width: auto; object-fit: contain; display: block;">
        <div id="headerDocPill" class="header-doc-pill" style="display: inline-flex; align-items: center; gap: 6px; background: rgba(13, 98, 242, 0.08); border: 1px solid rgba(13, 98, 242, 0.2); padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; color: #0d62f2; white-space: nowrap;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <span id="headerEmpDocTitle">Offer Letter</span>
        </div>
      </div>

            <div class="top-actions">
        <div class="toolbar-group">
          ${!isPreviewRole ? `
          <div class="top-toggle-item">
            <span>BG</span>
            <label class="switch">
              <input type="checkbox" id="bgToggle" onchange="toggleBackground()">
              <span class="slider"></span>
            </label>
          </div>
          <div style="width: 1px; height: 16px; background: var(--border-color-light);"></div>
          ` : ''}
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
                <button class="btn-sm btn-action-docx" id="btnDownloadDocx" onclick="generateDOCX()" title="Export document as Microsoft Word (.docx)" style="display: none;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <line x1="10" y1="9" x2="8" y2="9"></line>
          </svg>
          <span id="btnDocxText">Download DOCX</span>
        </button>

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

        <nav class="doc-tabs-bar">
      ${tabsHTML}
    </nav>
  </header>
  `;

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

  document.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', debouncedSaveSharedProfile);
    el.addEventListener('change', saveSharedProfile);
  });
}

if (typeof window !== 'undefined' && typeof window.addEventListener === 'function' && !window._hrStorageListenerAttached) {
  window._hrStorageListenerAttached = true;
  window.addEventListener('storage', (e) => {
    if (e.key && (e.key.startsWith('shared_') || e.key.startsWith('hr_doc_'))) {
      if (typeof loadSharedProfile === 'function') {
        loadSharedProfile();
      }
    }
  });
}

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

  document.addEventListener('mousedown', (e) => {
    if (popover.style.display !== 'none' && !popover.contains(e.target) && !e.target.closest('.date-picker-btn') && !e.target.closest('.date-input-wrapper')) {
      closeUniversalDatePicker();
    }
  });

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
const DEFAULT_DATE_FORMAT = 'DD Mon YYYY';

function getActiveDateFormat() {
  return localStorage.getItem(DATE_FORMAT_KEY) || DEFAULT_DATE_FORMAT;
}

function parseExistingDate(val) {
  if (!val || typeof val !== 'string') return null;
  val = val.trim();

  let match = val.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (match) {
    return new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]));
  }

  match = val.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (match) {
    return new Date(parseInt(match[3]), parseInt(match[2]) - 1, parseInt(match[1]));
  }

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
  const monShort = MONTH_NAMES_SHORT[monthIndex];
  const monthFull = MONTH_NAMES_FULL[monthIndex];

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

      return `${d} ${monShort} ${year}`;
  }
}

function formatChosenDate(day, monthIndex, year, originalVal, inputType) {
  const pad = n => String(n).padStart(2, '0');

  if (inputType === 'date') {
    return `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
  }

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
    if (id.includes('candidate') || name.includes('candidate')) return;
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

  const rect = targetInput.getBoundingClientRect();
  let top = rect.bottom + window.scrollY + 6;
  let left = rect.left + window.scrollX;

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

function setupUniversalDatePickers() {
  const explicitSelectors = getAllDateFieldSelectors();
  const allInputs = document.querySelectorAll('input');
  const targetInputs = new Set();

  document.querySelectorAll(explicitSelectors.join(', ')).forEach(el => targetInputs.add(el));

  allInputs.forEach(input => {
    const id = (input.id || '').toLowerCase();
    const name = (input.name || '').toLowerCase();
    if (id.includes('candidate') || name.includes('candidate')) return;
    if (id.includes('date') || id.includes('doj') || id.includes('dol') || name.includes('date')) {
      targetInputs.add(input);
    }
  });

  targetInputs.forEach(input => {

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

        openUniversalDatePicker(input, btn);
      });
    }

    wrapper.appendChild(btn);
  });
}

function initDataBinding() {
  const syncField = (key, value) => {
    document.querySelectorAll(`[data-bind="${key}"]`).forEach(el => {
      const format = el.getAttribute('data-bind-format');
      const prefix = el.getAttribute('data-bind-prefix') || '';
      const suffix = el.getAttribute('data-bind-suffix') || '';
      let displayVal = value;
      if (format === 'inr') {
        displayVal = FormatUtils.formatINR(value);
      } else if (format === 'inr-words') {
        displayVal = FormatUtils.numberToWordsINR(value);
      }
      el.textContent = value ? (prefix + displayVal + suffix) : (el.getAttribute('data-bind-default') || '');
    });
  };

  document.querySelectorAll('input, select, textarea').forEach(input => {
    const key = input.getAttribute('data-model') || input.id;
    if (!key) return;
    const handler = () => {
      syncField(key, input.value);
    };
    input.addEventListener('input', handler);
    input.addEventListener('change', handler);
    if (input.value) {
      syncField(key, input.value);
    }
  });
}
window.initDataBinding = initDataBinding;

const initHeaderSuite = () => {
  injectPrintStyles();
  renderCentralHeader();
  setupDesignationControls();
  loadSharedProfile();
  setupUniversalDatePickers();
  initDataBinding();

  const activeFormat = getActiveDateFormat();
  const explicitSelectors = getAllDateFieldSelectors();
  const allInputs = document.querySelectorAll('input');
  const targetInputs = new Set();
  document.querySelectorAll(explicitSelectors.join(', ')).forEach(el => targetInputs.add(el));
  allInputs.forEach(input => {
    const id = (input.id || '').toLowerCase();
    const name = (input.name || '').toLowerCase();
    if (id.includes('candidate') || name.includes('candidate')) return;
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
  updateHeaderDocTitle();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeaderSuite);
} else {
  initHeaderSuite();
}

// Legacy alias to centralized FormatUtils
window.numberToWordsINR = FormatUtils.numberToWordsINR;

function resetForm() {
  if (confirm('Reset form fields to defaults?')) {
    location.reload();
  }
}
window.resetForm = resetForm;

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

    const empName = getActiveEmployeeName();

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
        { file: 'stipend_payslip.html', label: 'Stipend_Payslip' },
        { file: 'confirmation_letter.html', label: 'Confirmation_Letter' },
        { file: 'resignation_acceptance.html', label: 'Resignation_Acceptance' },
        { file: 'termination_letter.html', label: 'Termination_Letter' },
        { file: 'lop_letter.html', label: 'LOP_Letter' }
      ].find(d => currentFile === d.file.toLowerCase() || (d.file === 'index.html' && (currentFile === '' || currentFile === 'index.html')));
      docTitle = docEntry ? docEntry.label : 'HR_Document';
    }

    for (let i = 0; i < pages.length; i++) {
      const pageEl = pages[i];

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

      const imgData = canvas.toDataURL('image/jpeg', 0.92);

      if (i > 0) {
        pdf.addPage(pageSize, 'portrait');
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidthMM, pageHeightMM, undefined, 'FAST');
    }

    const cleanEmp = empName.replace(/\s+/g, '_');
    const filename = `${cleanEmp}_${docTitle}_${pageSize.toUpperCase()}.pdf`;
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

async function convertImageToPngBase64(imgEl) {
  return new Promise((resolve) => {
    const src = imgEl.getAttribute('src') || imgEl.src;
    if (!src) return resolve(null);

    const srcLower = src.toLowerCase();

    let targetW = 140;
    let targetH = 50;

    if (srcLower.includes('signature')) {
      targetW = 125;
      targetH = 42;
    } else if (srcLower.includes('stamp')) {
      targetW = 75;
      targetH = 75;
    } else if (srcLower.includes('logo')) {
      targetW = 170;
      targetH = 40;
    } else if (srcLower.includes('offer letter') || srcLower.includes('offer_letter')) {
      targetW = 794;
      targetH = 1123;
    } else {
      targetW = imgEl.naturalWidth || imgEl.width || imgEl.offsetWidth || 140;
      targetH = imgEl.naturalHeight || imgEl.height || imgEl.offsetHeight || 50;
      if (targetW > 240) targetW = 240;
      if (targetH > 100) targetH = 100;
    }

    if (src.startsWith('data:image/png') || src.startsWith('data:image/jpeg')) {
      return resolve({ dataUrl: src, width: targetW, height: targetH });
    }

    const tempImg = new Image();
    tempImg.crossOrigin = 'Anonymous';

    tempImg.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const scale = 2;

        canvas.width = targetW * scale;
        canvas.height = targetH * scale;

        const ctx = canvas.getContext('2d');
        ctx.scale(scale, scale);
        ctx.drawImage(tempImg, 0, 0, targetW, targetH);

        const pngDataUrl = canvas.toDataURL('image/png');
        resolve({ dataUrl: pngDataUrl, width: targetW, height: targetH });
      } catch (err) {
        console.warn('Canvas conversion failed, fallback fetch:', err);
        fallbackFetchImageBlob(src).then(dataUrl => resolve({ dataUrl, width: targetW, height: targetH }));
      }
    };

    tempImg.onerror = () => {
      fallbackFetchImageBlob(src).then(dataUrl => resolve({ dataUrl, width: targetW, height: targetH }));
    };

    tempImg.src = src;
  });
}

async function fallbackFetchImageBlob(url) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    return null;
  }
}

async function preparePageForWord(page) {
  const clone = page.cloneNode(true);

  clone.querySelectorAll('.date-picker-btn, .no-print, button, script, iframe, .field-toggle-btn, .doc-page-footer').forEach(el => el.remove());

  const images = Array.from(clone.querySelectorAll('img'));
  for (let img of images) {
    const srcLower = (img.getAttribute('src') || img.src || '').toLowerCase();

    if (srcLower.includes('offer letter') || srcLower.includes('offer_letter')) {
      img.remove();
      continue;
    }

    try {
      const res = await convertImageToPngBase64(img);
      if (res && res.dataUrl) {
        img.src = res.dataUrl;
        img.setAttribute('width', String(res.width));
        img.setAttribute('height', String(res.height));
        img.style.cssText = `width: ${res.width}px !important; height: ${res.height}px !important; max-width: ${res.width}px !important; max-height: ${res.height}px !important; object-fit: contain; display: inline-block; border: none; margin: 0;`;
      }
    } catch (err) {
      console.warn('Error embedding image in Word:', err);
    }
  }

  const sigContainers = Array.from(clone.querySelectorAll('.signature-container, div[style*="display: flex"]')).filter(c => {
    return c.querySelector('.signature-box, .signature-line, img[src*="Signature"], img[src*="Stamp"]');
  });

  const processedBoxes = new Set();

  sigContainers.forEach(container => {
    const childBoxes = Array.from(container.children).filter(c => c.tagName !== 'SCRIPT');
    if (childBoxes.length >= 2) {
      childBoxes.forEach(b => processedBoxes.add(b));

      const table = document.createElement('table');
      table.setAttribute('width', '100%');
      table.setAttribute('border', '0');
      table.setAttribute('cellpadding', '0');
      table.setAttribute('cellspacing', '0');
      table.style.cssText = 'width: 100%; border-collapse: collapse; margin-top: 14pt; margin-bottom: 8pt; mso-table-lspace: 0pt; mso-table-rspace: 0pt;';

      let trHtml = '<tr>';
      const colWidth = Math.floor(92 / childBoxes.length);

      childBoxes.forEach((box, idx) => {
        const sigImg = box.querySelector('img[src*="data:image"], img[src*="Signature"], img.doc-signature-img, img[alt*="Signature"]');
        const stampImg = box.querySelector('img[src*="Stamp"], img.doc-stamp-img, img[alt*="Stamp"]');

        const boxClone = box.cloneNode(true);
        boxClone.querySelectorAll('img, .sig-seal-wrap').forEach(el => el.remove());

        const sigLine = boxClone.querySelector('.signature-line');
        if (sigLine) {
          sigLine.remove();
        }

        const topHeaderHtml = boxClone.innerHTML.trim() || (idx === 0 ? 'For <strong>Dilshaj Infotech Private Limited</strong>' : 'Accepted by:');
        const sigLineHtml = sigLine ? sigLine.innerHTML : '';

        const sigImgSrc = sigImg ? sigImg.src : '';
        const stampImgSrc = stampImg ? stampImg.src : '';

        trHtml += `
          <td width="${colWidth}%" valign="top" style="width: ${colWidth}%; vertical-align: top; padding: 0;">
            <div style="font-size: 9.5pt; font-family: Aptos, Calibri, Arial, sans-serif; color: #0f172a; margin-bottom: 4pt;">${topHeaderHtml}</div>
            <div style="min-height: 48px; margin-top: 4pt; margin-bottom: 4pt;">
              ${sigImgSrc ? `<img src="${sigImgSrc}" width="120" height="40" style="width: 120px; height: 40px; display: inline-block; vertical-align: middle; border: none; margin-right: 6px;" />` : ''}
              ${stampImgSrc ? `<img src="${stampImgSrc}" width="70" height="70" style="width: 70px; height: 70px; display: inline-block; vertical-align: middle; border: none;" />` : ''}
            </div>
            <div style="border: none; border-top: none; width: 170pt; padding-top: 2pt; font-size: 9pt; line-height: 1.3; font-family: Aptos, Calibri, Arial, sans-serif;">
              ${sigLineHtml}
            </div>
          </td>
        `;

        if (idx < childBoxes.length - 1) {
          trHtml += `<td width="8%" style="width: 8%;"></td>`;
        }
      });

      trHtml += '</tr>';
      table.innerHTML = trHtml;
      container.parentNode.replaceChild(table, container);
    }
  });

  const standaloneBoxes = Array.from(clone.querySelectorAll('.signature-box')).filter(b => !processedBoxes.has(b));
  standaloneBoxes.forEach(box => {
    const sigImg = box.querySelector('img[src*="data:image"], img[src*="Signature"], img.doc-signature-img, img[alt*="Signature"]');
    const stampImg = box.querySelector('img[src*="Stamp"], img.doc-stamp-img, img[alt*="Stamp"]');

    const boxClone = box.cloneNode(true);
    boxClone.querySelectorAll('img, .sig-seal-wrap').forEach(el => el.remove());

    const sigLine = boxClone.querySelector('.signature-line');
    if (sigLine) {
      sigLine.remove();
    }

    const topHeaderHtml = boxClone.innerHTML.trim() || 'For <strong>Dilshaj Infotech Private Limited</strong>';
    const sigLineHtml = sigLine ? sigLine.innerHTML : '';

    const sigImgSrc = sigImg ? sigImg.src : '';
    const stampImgSrc = stampImg ? stampImg.src : '';

    const table = document.createElement('table');
    table.setAttribute('width', '100%');
    table.setAttribute('border', '0');
    table.setAttribute('cellpadding', '0');
    table.setAttribute('cellspacing', '0');
    table.style.cssText = 'width: 100%; border-collapse: collapse; margin-top: 16pt; margin-bottom: 8pt; mso-table-lspace: 0pt; mso-table-rspace: 0pt;';

    table.innerHTML = `
      <tr>
        <td width="55%" valign="top" style="width: 55%; vertical-align: top; padding: 0;">
          <div style="font-size: 9.5pt; font-family: Aptos, Calibri, Arial, sans-serif; color: #0f172a; margin-bottom: 4pt;">${topHeaderHtml}</div>
          <div style="min-height: 48px; margin-top: 4pt; margin-bottom: 4pt;">
            ${sigImgSrc ? `<img src="${sigImgSrc}" width="125" height="42" style="width: 125px; height: 42px; display: inline-block; vertical-align: middle; border: none; margin-right: 8px;" />` : ''}
            ${stampImgSrc ? `<img src="${stampImgSrc}" width="72" height="72" style="width: 72px; height: 72px; display: inline-block; vertical-align: middle; border: none;" />` : ''}
          </div>
          <div style="border: none; border-top: none; width: 180pt; padding-top: 2pt; font-size: 9.5pt; line-height: 1.3; font-family: Aptos, Calibri, Arial, sans-serif;">
            ${sigLineHtml}
          </div>
        </td>
        <td width="45%" style="width: 45%;"></td>
      </tr>
    `;

    box.parentNode.replaceChild(table, box);
  });

  const detailsGrids = clone.querySelectorAll('.details-grid, .meta-grid, .two-col-grid');
  detailsGrids.forEach(grid => {
    const kids = Array.from(grid.children).filter(c => c.tagName !== 'SCRIPT');
    if (kids.length >= 2 && !grid.closest('table')) {
      const table = document.createElement('table');
      table.setAttribute('width', '100%');
      table.setAttribute('border', '0');
      table.setAttribute('cellpadding', '2');
      table.setAttribute('cellspacing', '0');
      table.style.cssText = 'width: 100%; border-collapse: collapse; margin-top: 4pt; margin-bottom: 4pt; mso-table-lspace: 0pt; mso-table-rspace: 0pt;';

      const tr = document.createElement('tr');
      kids.forEach(kid => {
        const td = document.createElement('td');
        td.setAttribute('width', Math.floor(100 / kids.length) + '%');
        td.setAttribute('valign', 'top');
        td.style.cssText = 'vertical-align: top; padding: 2pt 4pt; font-size: 9.5pt;';
        td.appendChild(kid.cloneNode(true));
        tr.appendChild(td);
      });
      table.appendChild(tr);
      grid.parentNode.replaceChild(table, grid);
    }
  });

  clone.querySelectorAll('table, .annexure-table, .payslip-table, .details-table').forEach(tbl => {
    tbl.setAttribute('width', '100%');
    tbl.setAttribute('cellpadding', '4');
    tbl.setAttribute('cellspacing', '0');
    const isBordered = tbl.classList.contains('annexure-table') || tbl.classList.contains('payslip-table');
    tbl.setAttribute('border', isBordered ? '1' : '0');
    tbl.style.cssText += 'width: 100% !important; border-collapse: collapse !important; margin-top: 4pt; margin-bottom: 6pt; mso-table-lspace: 0pt; mso-table-rspace: 0pt;';

    tbl.querySelectorAll('th, td').forEach(cell => {
      const isHeader = cell.tagName.toLowerCase() === 'th' || (cell.parentElement && cell.parentElement.classList.contains('category-header')) || (cell.parentElement && cell.parentElement.classList.contains('total-row'));
      let inlineCss = 'padding: 3.5pt 5pt; font-size: 9.5pt; font-family: Aptos, Calibri, Arial, sans-serif; vertical-align: top; ';
      if (isBordered) {
        inlineCss += 'border: 1pt solid #cbd5e1; ';
      }
      if (isHeader) {
        inlineCss += 'background-color: #f1f5f9; font-weight: bold; color: #0f172a; ';
      }
      cell.style.cssText = inlineCss + cell.style.cssText;
    });
  });

  clone.querySelectorAll('[style*="pre-line"], #prev_address, #prev_dutiesParagraph, p, div').forEach(el => {
    if (el.children.length === 0 && el.textContent.includes('\n')) {
      el.innerHTML = el.textContent.trim().replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>');
    }
  });

  return clone.innerHTML;
}

async function generateUniversalDOCX(customDocPrefix = '') {
  const btnDocx = document.getElementById('btnDownloadDocx');
  const btnText = document.getElementById('btnDocxText');
  if (btnDocx) btnDocx.disabled = true;
  if (btnText) btnText.innerText = 'Rendering DOCX...';
  showToast('Preparing Word document (.docx)...');

  try {

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

    let bgBase64 = null;
    try {
      const dummyBg = document.createElement('img');
      dummyBg.src = (typeof window.getDecryptedAsset === 'function' && window.getDecryptedAsset('New Offer Letter.png')) || 'New Offer Letter.png';
      const bgRes = await convertImageToPngBase64(dummyBg);
      if (bgRes && bgRes.dataUrl) {
        bgBase64 = bgRes.dataUrl;
      }
    } catch (err) {
      console.warn('Could not load letterhead background for Word:', err);
    }

    const empName = getActiveEmployeeName();

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
        { file: 'stipend_payslip.html', label: 'Stipend_Payslip' },
        { file: 'confirmation_letter.html', label: 'Confirmation_Letter' },
        { file: 'resignation_acceptance.html', label: 'Resignation_Acceptance' },
        { file: 'termination_letter.html', label: 'Termination_Letter' },
        { file: 'lop_letter.html', label: 'LOP_Letter' }
      ].find(d => currentFile === d.file.toLowerCase() || (d.file === 'index.html' && (currentFile === '' || currentFile === 'index.html')));
      docTitle = docEntry ? docEntry.label : 'HR_Document';
    }

    let pagesHtml = '';
    for (let index = 0; index < pages.length; index++) {
      const pageContent = await preparePageForWord(pages[index]);
      if (index > 0) {
        pagesHtml += '<div style="page-break-before: always; mso-break-type: section-break;"></div>';
      }
      pagesHtml += `<div class="word-page">${pageContent}</div>`;
    }

    const wordHtml = `
      <!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml"
            xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:w="urn:schemas-microsoft-com:office:word"
            xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
            xmlns="http://www.w3.org/TR/REC-html40">
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
            margin: ${bgBase64 ? '40mm 18mm 12mm 18mm' : '18mm 18mm 12mm 18mm'};
            mso-page-orientation: portrait;
            mso-header-margin: 0pt;
            mso-footer-margin: 0pt;
            mso-header: h1;
          }
          @page Section1 {
            size: 210mm 297mm;
            margin: ${bgBase64 ? '40mm 18mm 12mm 18mm' : '18mm 18mm 12mm 18mm'};
            mso-page-orientation: portrait;
            mso-header-margin: 0pt;
            mso-footer-margin: 0pt;
            mso-header: h1;
          }
          div.Section1 {
            page: Section1;
          }
          p.MsoHeader, div.MsoHeader {
            margin: 0pt !important;
            padding: 0pt !important;
            line-height: 0pt !important;
          }
          * {
            font-family: 'Aptos', 'Calibri', Arial, sans-serif !important;
            mso-ascii-font-family: 'Aptos';
            mso-hansi-font-family: 'Aptos';
            mso-bidi-font-family: 'Aptos';
          }
          body {
            font-family: 'Aptos', 'Calibri', Arial, sans-serif !important;
            font-size: 9.5pt !important;
            mso-ansi-font-size: 9.5pt !important;
            line-height: 114% !important;
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
            font-size: 9.5pt !important;
            line-height: 114% !important;
            mso-line-height-rule: exactly;
            color: #0f172a !important;
            margin-top: 0pt !important;
            margin-bottom: 2.5pt !important;
            mso-para-margin-top: 0pt !important;
            mso-para-margin-bottom: 2.5pt !important;
          }
          b, strong, .font-bold, .section-heading, .subject-title, .doc-title-bar, .term-subject-line, th, td.label-col {
            font-weight: bold !important;
            mso-bidi-font-weight: bold !important;
            color: #0f172a !important;
          }
          .doc-paragraph {
            margin-top: 0pt !important;
            margin-bottom: 3pt !important;
            mso-para-margin-top: 0pt !important;
            mso-para-margin-bottom: 3pt !important;
            text-align: justify !important;
            line-height: 114% !important;
            mso-line-height-rule: exactly;
          }
          .doc-title-bar, .subject-title {
            font-size: 11.5pt !important;
            font-weight: bold !important;
            text-align: center !important;
            margin-top: 2pt !important;
            margin-bottom: 6pt !important;
            mso-para-margin-top: 2pt !important;
            mso-para-margin-bottom: 6pt !important;
            text-transform: uppercase !important;
            letter-spacing: 0.5px !important;
            color: #0f172a !important;
          }
          .term-subject-line {
            font-size: 10pt !important;
            font-weight: bold !important;
            color: #0f172a !important;
            margin-top: 4pt !important;
            margin-bottom: 4pt !important;
            mso-para-margin-top: 4pt !important;
            mso-para-margin-bottom: 4pt !important;
            text-decoration: underline !important;
          }
          .recipient-address-block, .meta-block {
            margin-top: 0pt !important;
            margin-bottom: 5pt !important;
            mso-para-margin-top: 0pt !important;
            mso-para-margin-bottom: 5pt !important;
            line-height: 114% !important;
            mso-line-height-rule: exactly;
          }
          .meta-line {
            margin-top: 0pt !important;
            margin-bottom: 1.5pt !important;
            mso-para-margin-top: 0pt !important;
            mso-para-margin-bottom: 1.5pt !important;
          }
          ol, ul, .term-ordered-list, .bullet-list {
            margin-top: 2pt !important;
            margin-bottom: 3pt !important;
            mso-para-margin-top: 2pt !important;
            mso-para-margin-bottom: 3pt !important;
            padding-left: 16pt !important;
            margin-left: 0pt !important;
            mso-para-margin-left: 16pt !important;
          }
          li, .term-ordered-list li, .bullet-list li {
            margin-top: 0pt !important;
            margin-bottom: 2pt !important;
            mso-para-margin-top: 0pt !important;
            mso-para-margin-bottom: 2pt !important;
            line-height: 114% !important;
            mso-line-height-rule: exactly;
            text-align: justify !important;
            font-size: 9pt !important;
            font-family: 'Aptos', 'Calibri', Arial, sans-serif !important;
          }
          table {
            border-collapse: collapse !important;
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
            margin-top: 2pt !important;
            margin-bottom: 4pt !important;
            mso-para-margin-top: 2pt !important;
            mso-para-margin-bottom: 4pt !important;
          }
          table.details-table td {
            border: none !important;
            padding: 1.5pt 3pt !important;
            font-size: 9pt !important;
            line-height: 114% !important;
            vertical-align: top !important;
          }
          table.annexure-table td, table.annexure-table th,
          table.payslip-table td, table.payslip-table th {
            border: 1pt solid #cbd5e1 !important;
            padding: 2.5pt 4pt !important;
            font-size: 9pt !important;
            vertical-align: top !important;
            line-height: 112% !important;
          }
          table.annexure-table th, table.payslip-table th {
            background-color: #f1f5f9 !important;
            font-weight: bold !important;
            mso-bidi-font-weight: bold !important;
            color: #0f172a !important;
          }
          .signature-box, .signature-container {
            margin-top: 8pt !important;
            mso-para-margin-top: 8pt !important;
            page-break-inside: avoid !important;
          }
          .signature-line {
            margin-top: 6pt !important;
            mso-para-margin-top: 6pt !important;
            border: none !important;
            border-top: none !important;
            width: 170pt !important;
            padding-top: 0pt !important;
            line-height: 112% !important;
          }
        </style>
      </head>
      <body>
        ${bgBase64 ? `
        <div style="mso-element:header" id="h1">
          <p class="MsoHeader" style="margin:0pt;padding:0pt;line-height:0pt;mso-line-height-rule:exactly;">
            <!--[if gte mso 9]>
            <v:rect id="LetterheadBg"
              style="position:absolute;left:0pt;top:0pt;width:210mm;height:297mm;z-index:-1000;mso-wrap-style:none;mso-position-horizontal:left;mso-position-horizontal-relative:page;mso-position-vertical:top;mso-position-vertical-relative:page;mso-width-relative:page;mso-height-relative:page;"
              stroked="f" filled="t" coordsize="21600,21600">
              <v:fill type="frame" aspect="ignore" src="${bgBase64}" />
            </v:rect>
            <![endif]-->
          </p>
        </div>
        ` : ''}
        <div class="Section1">
          ${pagesHtml}
        </div>
      </body>
      </html>
    `;

    const topMarginDxa = bgBase64 ? 2268 : 1020;
    const converted = window.htmlDocx.asBlob(wordHtml, {
      orientation: 'portrait',
      margins: { top: topMarginDxa, right: 1020, bottom: 680, left: 1020 },
      width: 11906,
      height: 16838
    });

    const cleanEmp = empName.replace(/\s+/g, '_');
    const filename = `${cleanEmp}_${docTitle}.docx`;

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

    if (inputId === 'companyName') previewSelector = '#prev_companyName, #prev_compName, #prev_compName2, #prev_sigComp';
    else if (inputId === 'companyCin') previewSelector = '#prev_companyCin';
    else if (inputId === 'companyType') previewSelector = '#prev_companyType';
    else if (inputId === 'companyAddress') previewSelector = '#prev_companyAddress';
    else if (inputId === 'sigName' || inputId === 'signatoryName') previewSelector = '#prev_signatory, #prev_signatoryName, #prev_signatoryName_annex';
    else if (inputId === 'sigDesig' || inputId === 'signatoryDesignation') previewSelector = '#prev_signatoryDesig, #prev_signatoryDesig_annex';
    else if (inputId === 'sigContact') previewSelector = '#prev_sigContact, #prev_companyContact';
    else if (inputId === 'hrContactName' || inputId === 'grievanceName') previewSelector = '#prev_grievanceName, #prev_hrContactName';
    else if (inputId === 'hrContactDesig' || inputId === 'grievanceDesignation') previewSelector = '#prev_grievanceDesignation, #prev_hrContactDesig';
    else if (inputId === 'hrContactEmail' || inputId === 'grievanceEmail') previewSelector = '#prev_grievanceEmail, #prev_hrContactEmail';
    else if (inputId === 'hrContactPhone' || inputId === 'grievancePhone') previewSelector = '#prev_grievancePhone, #prev_hrContactPhone';
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

function autoScaleMobilePreview() {
  const container = document.getElementById('pdf-export-container');
  if (!container) return;

  const viewportWidth = window.innerWidth;
  if (viewportWidth < 840) {
    const padding = 16;
    const targetWidth = 794;
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

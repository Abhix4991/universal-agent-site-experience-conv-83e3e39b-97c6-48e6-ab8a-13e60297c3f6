// TOGGLE HERO PREVIEW VIEW (SPECIMEN VS SCHEMATIC)
const toggleBtns = document.querySelectorAll('.toggle-btn');
const layerSpecimen = document.getElementById('layer-specimen');
const layerGrid = document.getElementById('layer-grid');

toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    toggleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const view = btn.getAttribute('data-view');
    if (view === 'specimen') {
      layerSpecimen.classList.add('active-layer');
      layerGrid.classList.remove('active-layer');
    } else {
      layerGrid.classList.add('active-layer');
      layerSpecimen.classList.remove('active-layer');
    }
  });
});

// INTERACTIVE SLIDER - BINDING TO SVG PARAMS & IMAGE MATRIX SCALE
const slider = document.getElementById('param-slider');
const valWeight = document.getElementById('val-weight');
const valContrast = document.getElementById('val-contrast');
const calloutKern = document.getElementById('callout-kern-val');
const svgStem = document.getElementById('svg-stem');
const svgArch = document.getElementById('svg-arch');
const svgCircle = document.getElementById('svg-circle');
const specimenImg = document.querySelector('.specimen-img');

slider.addEventListener('input', (e) => {
  const val = e.target.value;
  valWeight.textContent = `${val}pt`;
  const ratio = (val / 23).toFixed(1);
  valContrast.textContent = `${ratio}:1`;
  calloutKern.textContent = `PUNCH KERN: ${(val * 0.001).toFixed(2)}mm`;

  // Bind to SVG vector attributes
  if (svgStem) svgStem.setAttribute('stroke-width', (val / 30).toFixed(1));
  if (svgArch) svgArch.setAttribute('stroke-width', (val / 45).toFixed(1));
  if (svgCircle) svgCircle.setAttribute('r', 120 + (val * 0.4));
  
  // Bind visual scale trigger to macro image specimen
  if (specimenImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const scale = 1 + ((val - 50) / 600);
    specimenImg.style.transform = `scale(${scale})`;
  }
});

// MOBILE BOTTOM STICKY DRAWER TOGGLE
const drawer = document.getElementById('interactive-drawer');
const drawerHandle = document.getElementById('drawer-toggle');

if (drawerHandle && drawer) {
  drawerHandle.addEventListener('click', () => {
    drawer.classList.toggle('open');
    if (drawer.classList.contains('open')) {
      drawerHandle.textContent = '▼ CLOSE PREVIEW MATRIX';
    } else {
      drawerHandle.textContent = '▲ INTERACTIVE MATRIX PREVIEW';
    }
  });
}

// MODULE NAVIGATION SWITCHER
const modItems = document.querySelectorAll('.mod-nav-item');
const modPanels = document.querySelectorAll('.mod-panel');

modItems.forEach(item => {
  item.addEventListener('click', () => {
    modItems.forEach(i => i.classList.remove('active'));
    modPanels.forEach(p => p.classList.remove('active'));
    
    item.classList.add('active');
    const modId = item.getAttribute('data-mod');
    document.getElementById(`mod-panel-${modId}`).classList.add('active');
  });
});

// SYLLABUS TABLE ROW CLICK
const tableRows = document.querySelectorAll('.index-table tbody tr');
tableRows.forEach((row, idx) => {
  row.addEventListener('click', () => {
    tableRows.forEach(r => r.classList.remove('active-row'));
    row.classList.add('active-row');
    
    if (modItems[idx]) {
      modItems[idx].click();
    }
  });
});

// PRIMARY SOURCE READER SWITCHER
const docData = {
  '1': {
    id: 'DOC #1572-PLN',
    date: 'DATE: ANTVWERPIAE, 1572',
    text: '"Type is carved in hard steel by master punches. The proportion of the stem to the serif must not follow simple division, but rather the optical weight of ink upon damp rag paper. When struck into copper matrix, the displacement creates a micro-bevel that catches light, demanding compensation in the final cut."'
  },
  '2': {
    id: 'DOC #1928-FUT',
    date: 'DATE: FRANKFURT, 1928',
    text: '"The modern letter must strip away all handwriting residue. Circle, square, and triangle provide sufficient primitive base. The optical corrections for junction thickness must be calculated using geometric projection rather than subjective eye judgment."'
  },
  '3': {
    id: 'DOC #1985-PS',
    date: 'DATE: MOUNTAIN VIEW, 1985',
    text: '"A outline description represents glyph contours using mathematical cubic Bezier curves. Hints are executed sequentially to collapse fractional pixel boundaries on 300 DPI laser printing engines before scan conversion occurs."'
  }
};

const docLinks = document.querySelectorAll('.doc-link');
const docIdEl = document.getElementById('doc-id');
const docDateEl = document.getElementById('doc-date');
const docContentEl = document.getElementById('doc-content');

docLinks.forEach(link => {
  link.addEventListener('click', () => {
    docLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    
    const key = link.getAttribute('data-doc');
    const doc = docData[key];
    docIdEl.textContent = doc.id;
    docDateEl.textContent = doc.date;
    docContentEl.textContent = doc.text;
  });
});

// MODAL DIALOG CONTROLS
const modal = document.getElementById('modal');
const enrollBtnMain = document.getElementById('enroll-btn');
const heroEnrollBtn = document.getElementById('hero-enroll-btn');
const modalClose = document.getElementById('modal-close');
const enrollForm = document.getElementById('enroll-form');

[enrollBtnMain, heroEnrollBtn].forEach(btn => {
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  }
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
});

enrollForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Registration submitted. Academic verification email sent.');
  modal.classList.remove('active');
});
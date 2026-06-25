window.escapeHTML = (str) => {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>'"]/g, match => {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' };
    return map[match];
  });
};

window.hashString = async (str) => {
  if (!str) return null;
  const msgBuffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer); // Oprava z SHA-265
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
};

window.exportMedCardPDF = () => {
  const tInfo = translations[window.currentLang];
  const pMeno = window.escapeHTML(localStorage.getItem('userProfile_meno') || '-');
  const pPriezvisko = window.escapeHTML(localStorage.getItem('userProfile_priezvisko') || '-');
  const pVaha = window.escapeHTML(localStorage.getItem('userProfile_vaha') ? localStorage.getItem('userProfile_vaha') + ' kg' : '-');
  const pVyska = window.escapeHTML(localStorage.getItem('userProfile_vyska') ? localStorage.getItem('userProfile_vyska') + ' cm' : '-');

  const pdfWrapper = document.createElement('div');
  pdfWrapper.style.padding = '30px';
  pdfWrapper.style.backgroundColor = '#ffffff';
  pdfWrapper.style.color = '#000000';
  pdfWrapper.style.fontFamily = 'Arial, sans-serif';
  pdfWrapper.style.position = 'relative';
  pdfWrapper.style.minHeight = '277mm';

  const watermark = document.createElement('img');
  watermark.src = 'img/icon_v2.png';
  watermark.style.position = 'absolute';
  watermark.style.top = '138.5mm';
  watermark.style.left = '50%';
  watermark.style.transform = 'translate(-50%, -50%)';
  watermark.style.opacity = '0.1';
  watermark.style.width = '75%';
  watermark.style.maxWidth = '400px';
  watermark.style.zIndex = '999';
  watermark.style.pointerEvents = 'none';
  pdfWrapper.appendChild(watermark);

  const header = document.createElement('h2');
  header.innerText = tInfo.medicationCardPh || 'Karta liekov';
  header.innerText = tInfo.pdfMedTitle || 'Môj prehľad liekov';
  header.style.textAlign = 'center';
  header.style.marginBottom = '20px';
  header.style.borderBottom = '2px solid #eee';
  header.style.paddingBottom = '10px';
  pdfWrapper.appendChild(header);

  const infoDiv = document.createElement('div');
  infoDiv.innerHTML = `<p style="margin: 5px 0;"><strong>${tInfo.namePhProfile}:</strong> ${pMeno}</p><p style="margin: 5px 0;"><strong>${tInfo.surnamePhProfile}:</strong> ${pPriezvisko}</p><p style="margin: 5px 0;"><strong>${tInfo.weightPhProfile.replace(' (kg)', '')}:</strong> ${pVaha}</p><p style="margin: 5px 0;"><strong>${tInfo.heightPhProfile.replace(' (cm)', '')}:</strong> ${pVyska}</p>`;
  infoDiv.style.marginBottom = '25px';
  infoDiv.style.fontSize = '14px';
  pdfWrapper.appendChild(infoDiv);

  const medsTitle = document.createElement('h3');
  medsTitle.innerText = 'Zoznam:';
  medsTitle.style.marginBottom = '10px';
  pdfWrapper.appendChild(medsTitle);

  const kartaText = localStorage.getItem('userProfile_karta') || '';
  const lieky = kartaText.split('\n').filter(l => l.trim() !== '');
  
  if (lieky.length > 0) {
    const ul = document.createElement('ul');
    ul.style.listStyleType = 'none';
    ul.style.paddingLeft = '0';
    lieky.forEach(liek => {
      const cistyLiek = liek.replace(/^•\s*/, '');
      const li = document.createElement('li');
      li.innerText = '• ' + cistyLiek;
      li.style.padding = '8px 0';
      li.style.borderBottom = '1px solid #f5f5f5';
      ul.appendChild(li);
    });
    pdfWrapper.appendChild(ul);
  } else {
    const emptyMsg = document.createElement('p');
    emptyMsg.innerText = 'Žiadne lieky.';
    emptyMsg.style.fontStyle = 'italic';
    emptyMsg.style.color = '#666';
    pdfWrapper.appendChild(emptyMsg);
  }

  const opt = {
    margin: 10,
    filename: `Karta_liekov_${pMeno}_${pPriezvisko}.pdf`.replace(/\s+/g, '_'),
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  const generatePdf = () => html2pdf().set(opt).from(pdfWrapper).save();

  if (watermark.complete) {
    generatePdf();
  } else {
    watermark.onload = generatePdf;
    watermark.onerror = generatePdf;
  }
};

// Cache pre záznamy, aby sme ich neťahali z Firebase pri každom prepnutí okna
window.zaznamy = [];
window.loadRecords = async function() {
  if (!window.user) return;
  const localKey = 'zaznamy_historia_' + window.user.uid;
  let stored = localStorage.getItem(localKey);
  window.zaznamy = stored ? JSON.parse(stored) : [];

  
  if (document.getElementById('archiv').style.display === 'block') window.zobrazArchiv();
};

window.skrytVsetko = () => {
  ['formular', 'archiv', 'viewProfileModal', 'editProfileModal', 'editMedicationModal', 'infoModal', 'manualModal', 'settingsModal', 'languageModal', 'monthlyArchiveListModal', 'monthDetailModal', 'archivVahyModal', 'termsModal'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.style.display = 'none';
  });
};

window.getVahaHistory = () => {
  if (!window.user) return [];
  const localKey = 'vaha_historia_' + window.user.uid;
  let stored = localStorage.getItem(localKey);
  let history = stored ? JSON.parse(stored) : [];
  
  return history;
};

const translations = {
  sk: {
    login: "Prihlásiť sa", register: "Registrácia", titleLogin: "Prihlásenie", titleReg: "Nový účet", namePh: "Tvoje meno", pinPh: "PIN (6 číslic)", 
    pinConfPh: "Zopakuj PIN", createBtn: "Vytvoriť účet", menuArchive: "📄 Archív", menuManual: "➕ Manuálny záznam", menuInfo: "ℹ️ Informácie",
    menuSettings: "📜 Podmienky", menuLogout: "🚪 Odhlásiť sa", addBtn: "Pridať záznam", backBtn: "Späť na formulár", saveBtn: "Uložiť", 
    closeBtn: "Zatvoriť", titleArchive: "Archív záznamov", titleManual: "Manuálny záznam", titleInfo: "Informácie o hodnotách", titleSettings: "Nastavenia",
    menuLang: "Jazyk", selectLang: "Vybrať jazyk", menuToggleBp: "Prepnúť na: Iba Tlak", menuToggleFull: "Prepnúť na: INR + Tlak", userPrefix: "Používateľ",
    infoTab: "Tabletka (počet tabletiek)", infoLow: "Nízky", infoNorm: "Normálny", infoHigh: "Vysoký", btnExportPdf: "Exportovať PDF", menuToggleBp: "🩺 Režim: Iba Tlak", menuToggleFull: "❤️ Režim: INR + Tlak",
    saved: "Uložené", msgOccupied: "Meno už je obsadené.", msgUserNotFound: "Používateľ neexistuje.", msgWrongPin: "Nesprávny PIN kód.",
    confirmDel: "Naozaj chcete vymazať tento záznam?", confirmLogout: "Ste si istý, že sa chcete odhlásiť?",
    confirmDelMed: "Naozaj chcete vymazať tento liek?",
    confirmPdf: "Ste si istý, že chcete stiahnuť PDF?",
    infoInrNote: "(Štandardné rozmedzie. Individuálne cieľové hodnoty stanovuje ošetrujúci lekár.)",
    legendTitle: "Vysvetlenie farieb:",
    menuProfile: "👤 Profil",
    titleProfile: "Môj Profil",
    namePhProfile: "Meno",
    surnamePhProfile: "Priezvisko",
    weightPhProfile: "Váha (kg)",
    heightPhProfile: "Výška (cm)",
    medicationCardPh: "Karta liekov",
    editMedBtn: "Pridať lieky",
    saveBtnProfile: "Uložiť profil",
    titleViewProfile: "Môj Profil",
    titleEditProfile: "Upraviť Profil",
    editBtnProfile: "Upraviť profil",
    titleEditMed: "Pridať lieky",
    legPurple: "Fialová – neutrálne (cieľové hodnoty stanovuje lekár)",
    legYellow: "Žltá – neutrálne (hodnoty stanovuje lekár)",
    legGreen: "Zelená – hodnoty sú v poriadku",
    legRed: "Červená – vysoké hodnoty",
    legBlue: "Modrá – nízke hodnoty",
    updateReady: "Nová verzia (v2.30) je pripravená:",
    updateChanges: "• CHORE: Vrátené späť zmeny zobrazenia na celú obrazovku.",
    btnMonthlyArchive: "Mesačný archív",
    confirmModeChange: "Ste si istý, že chcete prepnúť režim?",
    menuForceUpdate: "🔄 Vynútiť aktualizáciu",
    msgCheckUpdate: "Vymazávam cache a aktualizujem...",
    pdfMedTitle: "Môj prehľad liekov",
    btnWeightArchive: "Archív váhy",
    titleWeightArchive: "Archív váhy",
    newWeightPh: "Nová váha (kg)",
    addBtnShort: "Pridať",
    termsMenu: "📜 Podmienky",
    termsTitle: "Podmienky používania a Ochrana súkromia",
    t1T: "1. Lokálne úložisko:", t1D: "Vaše zdravotné záznamy sú ukladané výhradne vo vašom zariadení. Aplikácia neodosiela ani nezálohuje vaše dáta na externé servery.",
    t2T: "2. Riziko straty dát:", t2D: "Ak vymažete vyrovnávaciu pamäť prehliadača (cache), odinštalujete aplikáciu alebo stratíte zariadenie, vaše údaje budú natrvalo stratené a nebude možné ich obnoviť.",
    t3T: "3. Zálohovanie:", t3D: "Za zálohovanie svojich údajov (napríklad pomocou pravidelného exportu do PDF) ste plne zodpovedný vy.",
    t4T: "4. Zdravotné upozornenie:", t4D: "Aplikácia slúži výlučne na informatívne účely a evidenciu hodnôt. Nenahrádza odbornú lekársku starostlivosť.",
    btnUnderstand: "Rozumiem / Zatvoriť",
    eomReminderTitle: "Pripomienka zálohy",
    eomReminderText: "Blíži sa koniec mesiaca. Nezabudli ste si zálohovať svoje záznamy pomocou PDF exportu? Dáta sú uložené iba v tomto zariadení."
  },
  de: {
    login: "Anmelden", register: "Registrierung", titleLogin: "Login", titleReg: "Neues Konto", namePh: "Dein Name", pinPh: "PIN (6 Stellen)",
    pinConfPh: "PIN wiederholen", createBtn: "Konto erstellen", menuArchive: "📄 Archiv", menuManual: "➕ Manueller Eintrag", menuInfo: "ℹ️ Informationen",
    menuSettings: "📜 Bedingungen", menuLogout: "🚪 Abmelden", addBtn: "Eintrag hinzufügen", backBtn: "Zurück zum Formular", saveBtn: "Speichern", 
    closeBtn: "Schließen", titleArchive: "Eintragshistorie", titleManual: "Manueller Eintrag", titleInfo: "Informationen zu Werten", titleSettings: "Einstellungen",
    menuLang: "Sprache", selectLang: "Sprache wählen", menuToggleBp: "Nur Blutdruck", menuToggleFull: "INR + Blutdruck", userPrefix: "Benutzer",
    infoTab: "Tablette (Anzahl der Tabletten)", infoLow: "Niedrig", infoNorm: "Normal", infoHigh: "Hoch", btnExportPdf: "PDF Exportieren", menuToggleBp: "🩺 Modus: Nur Blutdruck", menuToggleFull: "❤️ Modus: INR + Blutdruck",
    saved: "Gespeichert", msgOccupied: "Name bereits vergeben.", msgUserNotFound: "Benutzer existiert nicht.", msgWrongPin: "Falscher PIN-Code.",
    infoInrNote: "(Standardbereich. Individuelle Zielwerte werden vom behandelnden Arzt festgelegt.)",
    legendTitle: "Farberklärung:",
    legPurple: "Violett – neutral (Zielwerte werden vom Arzt festgelegt)",
    menuProfile: "👤 Profil",
    titleProfile: "Mein Profil",
    namePhProfile: "Vorname",
    surnamePhProfile: "Nachname",
    weightPhProfile: "Gewicht (kg)",
    heightPhProfile: "Größe (cm)",
    medicationCardPh: "Medikamentenkarte",
    editMedBtn: "Medikamente hinzufügen",
    saveBtnProfile: "Profil speichern",
    titleViewProfile: "Mein Profil",
    titleEditProfile: "Profil bearbeiten",
    editBtnProfile: "Profil bearbeiten",
    titleEditMed: "Medikamente hinzufügen",
    legYellow: "Gelb – neutral (Werte werden vom Arzt festgelegt)",
    legGreen: "Grün – Werte sind in Ordnung",
    legRed: "Rot – hohe Werte",
    legBlue: "Blau – niedrige Werte",
    confirmDel: "Diesen Eintrag wirklich löschen?",
    confirmLogout: "Möchten Sie sich wirklich abmelden?", 
    confirmPdf: "Sind Sie sicher, dass Sie das PDF herunterladen möchten?", 
    updateReady: "Neue Version (v2.30) ist bereit:",
    updateChanges: "• CHORE: Vollbild-Layout-Änderungen zurückgesetzt.",
    btnMonthlyArchive: "Monatsarchiv",
    confirmModeChange: "Sind Sie sicher, dass Sie den Modus wechseln möchten?",
    menuForceUpdate: "🔄 Update erzwingen",
    msgCheckUpdate: "Cache leeren und aktualisieren...",
    pdfMedTitle: "Meine Medikamentenübersicht",
    btnWeightArchive: "Gewichtsarchiv",
    titleWeightArchive: "Gewichtsarchiv",
    newWeightPh: "Neues Gewicht (kg)",
    addBtnShort: "Hinzufügen",
    termsMenu: "📜 Bedingungen",
    termsTitle: "Nutzungsbedingungen & Datenschutz",
    t1T: "1. Lokaler Speicher:", t1D: "Ihre Gesundheitsdaten werden ausschließlich auf Ihrem Gerät gespeichert. Die App sendet oder sichert keine Daten auf externen Servern.",
    t2T: "2. Risiko von Datenverlust:", t2D: "Wenn Sie den Browser-Cache löschen, die App deinstallieren oder das Gerät verlieren, gehen Ihre Daten dauerhaft verloren und können nicht wiederhergestellt werden.",
    t3T: "3. Datensicherung:", t3D: "Sie sind für die Sicherung Ihrer Daten (z. B. durch regelmäßigen PDF-Export) selbst verantwortlich.",
    t4T: "4. Medizinischer Hinweis:", t4D: "Die App dient ausschließlich zu Informationszwecken und ersetzt keine professionelle medizinische Betreuung.",
    btnUnderstand: "Verstanden / Schließen",
    eomReminderTitle: "Sicherungserinnerung",
    eomReminderText: "Das Monatsende naht. Haben Sie daran gedacht, Ihre Aufzeichnungen per PDF-Export zu sichern? Die Daten werden nur auf diesem Gerät gespeichert."
  }
};

const UPDATE_ACKNOWLEDGED_KEY = 'bp_inr_update_acknowledged_v2';

window.isBpOnly = localStorage.getItem('zdravie_bp_only') === 'true';
window.currentLang = localStorage.getItem('zdravie_lang') || 'sk';

if (window.isBpOnly) document.body.classList.add('bp-only');

window.updateUI = () => {
  const t = translations[window.currentLang] || translations.sk;

  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (t[key]) el.innerText = t[key];
  });

  document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
    const key = el.getAttribute('data-translate-placeholder');
    if (t[key]) el.placeholder = t[key];
  });

  if (document.getElementById('toggleBtn')) document.getElementById('toggleBtn').innerText = window.isBpOnly ? t.menuToggleFull : t.menuToggleBp;
  document.getElementById('userDisplay').innerText = window.userName ? `${t.userPrefix}: ${window.userName}` : '';

  ['inr','tab','sys','dia','pulse'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.placeholder = id.toUpperCase();
  });
};

window.changeLanguage = (lang) => {
  window.currentLang = lang;
  localStorage.setItem('zdravie_lang', lang);
  window.updateUI();
  window.zavrietJazyk();
};

window.toggleViewMode = () => {
  window.showConfirm(translations[window.currentLang].confirmModeChange, () => {
    window.isBpOnly = !window.isBpOnly;
    localStorage.setItem('zdravie_bp_only', window.isBpOnly);
    document.body.classList.toggle('bp-only', window.isBpOnly);
    window.updateUI();
    if (document.getElementById('archiv').style.display === 'block') window.zobrazArchiv();
  });
};

window.otvoritNastavenia = () => document.getElementById('settingsModal').style.display = 'flex';
window.zavrietNastavenia = () => document.getElementById('settingsModal').style.display = 'none';
window.otvoritJazyk = () => { document.getElementById('settingsModal').style.display = 'none'; document.getElementById('languageModal').style.display = 'flex'; };
window.zavrietJazyk = () => { document.getElementById('languageModal').style.display = 'none'; document.getElementById('settingsModal').style.display = 'flex'; };

window.otvoritTerms = () => document.getElementById('termsModal').style.display = 'flex';
window.zavrietTerms = () => document.getElementById('termsModal').style.display = 'none';

window.showAlert = (msg) => {
  const dialog = document.getElementById('customDialog');
  document.getElementById('dialogTitle').innerText = 'BP & INR';
  document.getElementById('dialogMessage').innerText = msg;
  document.getElementById('dialogCancelBtn').style.display = 'none';
  document.getElementById('dialogOkBtn').onclick = () => dialog.style.display = 'none';
  dialog.style.display = 'flex';
};

window.showConfirm = (msg, onOk) => {
  const dialog = document.getElementById('customDialog');
  document.getElementById('dialogTitle').innerText = 'BP & INR';
  document.getElementById('dialogMessage').innerText = msg;
  document.getElementById('dialogCancelBtn').style.display = 'block';
  document.getElementById('dialogCancelBtn').onclick = () => dialog.style.display = 'none';
  document.getElementById('dialogOkBtn').onclick = () => {
    dialog.style.display = 'none';
    onOk();
  };
  dialog.style.display = 'flex';
};

window.showLogin = () => { document.getElementById('loginForm').style.display = 'block'; document.getElementById('registerForm').style.display = 'none'; document.getElementById('loginError').innerText = ''; };
window.showRegister = () => { document.getElementById('loginForm').style.display = 'none'; document.getElementById('registerForm').style.display = 'block'; document.getElementById('regError').innerText = ''; };

window.registerUser = async function() {
  const name = document.getElementById('regName').value.trim();
  const pin = document.getElementById('regPin').value;
  const confirmPin = document.getElementById('regPinConfirm').value;
  const errorEl = document.getElementById('regError');
  errorEl.innerText = '';

  if (!name || pin.length < 4) return window.showAlert('Meno a PIN (min 4 číslice)!');
  if (!name || pin.length !== 6) return window.showAlert('Meno a PIN (presne 6 číslic)!');
  if (pin !== confirmPin) return window.showAlert('PIN sa nezhodujú!');
  try {
    const nameLower = name.toLowerCase();
    const localAccounts = JSON.parse(localStorage.getItem('bp_inr_local_accounts') || '{}');
    
    if (localAccounts[nameLower]) {
      errorEl.innerText = translations[window.currentLang].msgOccupied;
      return window.showAlert(translations[window.currentLang].msgOccupied);
    }
    
    window.isRegistering = true;
    const uid = 'local_' + Date.now().toString();
    const hashedPin = await window.hashString(pin);
    
    const role = (nameLower === 'superadmin') ? 'admin' : 'user';
    localAccounts[nameLower] = { uid: uid, name: name, pin: hashedPin, role: role };
    localStorage.setItem('bp_inr_local_accounts', JSON.stringify(localAccounts));
    localStorage.setItem('currentUserUid', uid);

    document.getElementById('regName').value = '';
    document.getElementById('regPin').value = '';
    document.getElementById('regPinConfirm').value = '';
    document.getElementById('loginName').value = name; 
    
    window.isRegistering = false;
    window.showLogin();
    window.showAlert('Účet úspešne vytvorený! Teraz sa môžete prihlásiť.');
  } catch (e) { window.isRegistering = false; errorEl.innerText = 'Chyba pri registrácii.'; window.showAlert(e.message); }
};

window.loginUser = async function() {
  const name = document.getElementById('loginName').value.trim();
  const pin = document.getElementById('loginPin').value;
  const errorEl = document.getElementById('loginError');
  errorEl.innerText = '';

  try {
    const nameLower = name.toLowerCase();
    const localAccounts = JSON.parse(localStorage.getItem('bp_inr_local_accounts') || '{}');
    const userDoc = localAccounts[nameLower];
    
    if (!userDoc) {
      errorEl.innerText = translations[window.currentLang].msgUserNotFound;
      return window.showAlert(translations[window.currentLang].msgUserNotFound);
    }
    
    const hashedPin = await window.hashString(pin);
    let isPinCorrect = false;

    if (userDoc.pin === null) {
      userDoc.pin = hashedPin;
      localAccounts[nameLower] = userDoc;
      localStorage.setItem('bp_inr_local_accounts', JSON.stringify(localAccounts));
      isPinCorrect = true;
    } else if (userDoc.pin === pin) {
      // Backward compatibility pre starých používateľov - ak sa prihlásia starým PINom, uložíme ho už ako hash
      userDoc.pin = hashedPin;
      localAccounts[nameLower] = userDoc;
      localStorage.setItem('bp_inr_local_accounts', JSON.stringify(localAccounts));
      isPinCorrect = true;
    } else if (userDoc.pin === hashedPin) {
      isPinCorrect = true;
    }

    if (!isPinCorrect) {
      errorEl.innerText = translations[window.currentLang].msgWrongPin;
      return window.showAlert(translations[window.currentLang].msgWrongPin);
    }
    
    localStorage.setItem('currentUserUid', userDoc.uid);
    window.onLocalAuthStateChanged(userDoc);
  } catch (e) { 
    errorEl.innerText = 'Chyba pri prihlasovaní.';
    window.showAlert(e.message); 
  }
};

window.onLocalAuthStateChanged = (user) => {
  if (window.isRegistering) return;

  document.getElementById('splashScreen').style.opacity = '0';
  setTimeout(() => document.getElementById('splashScreen').style.display = 'none', 500);
  if (user) {
    window.user = user;
    window.userName = user.name;
    window.userRole = user.role || 'user';

    const storedUid = localStorage.getItem('userProfile_uid');
    if (storedUid && storedUid !== user.uid) {
      localStorage.removeItem('userProfile_meno');
      localStorage.removeItem('userProfile_priezvisko');
      localStorage.removeItem('userProfile_vaha');
      localStorage.removeItem('userProfile_vyska');
      localStorage.removeItem('userProfile_karta');
    }
    localStorage.setItem('userProfile_uid', user.uid);

    const storedMeno = localStorage.getItem('userProfile_meno');
    const storedPriezvisko = localStorage.getItem('userProfile_priezvisko');

    if (!storedMeno && !storedPriezvisko && window.userName) {
      const nameParts = window.userName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      localStorage.setItem('userProfile_meno', firstName);
      localStorage.setItem('userProfile_priezvisko', lastName);
    }
    
    document.getElementById('btn_import').style.display = (window.userRole === 'admin') ? 'block' : 'none';
    document.getElementById('btn_admin_menu').style.display = (window.userRole === 'admin') ? 'block' : 'none';
    
    document.getElementById('authScreen').style.display = 'none';
    document.querySelector('header').style.display = 'grid';
    document.getElementById('formular').style.display = 'block';
    window.loadRecords();
    window.updateUI();

    window.checkEndOfMonthReminder();

    setTimeout(() => {
      const dialog = document.getElementById('customDialog');
      if (dialog && dialog.style.display === 'flex') return; // Neprepisuj, ak už svieti iné okno

      const currentAppVersion = 'v2.30';
      if (localStorage.getItem('bp_inr_last_seen_version') !== currentAppVersion) {
        const t = translations[window.currentLang];
        document.getElementById('dialogTitle').innerText = window.currentLang === 'sk' ? 'Aktualizácia úspešná 🎉' : 'Update erfolgreich 🎉';
        
        let msg = t.updateReady.replace(' je pripravená:', ' bola úspešne nainštalovaná.') + '\n\n' + t.updateChanges.replace(/\\n/g, '\n');
        if (window.currentLang === 'de') msg = t.updateReady.replace(' ist bereit:', ' wurde erfolgreich installiert.') + '\n\n' + t.updateChanges;
        
        document.getElementById('dialogMessage').innerText = msg;
        document.getElementById('dialogCancelBtn').style.display = 'none';
        document.getElementById('dialogOkBtn').onclick = () => {
          localStorage.setItem('bp_inr_last_seen_version', currentAppVersion);
          dialog.style.display = 'none';
        };
        dialog.style.display = 'flex';
      }
    }, 800);

setTimeout(() => {
  const inIframe = () => {
    try { return window.self !== window.top; } catch (e) { return true; }
  };
  if (inIframe()) {
    const t = translations[window.currentLang] || translations['sk'];
    const msg = window.currentLang === 'de' ? "⚠️ Die App läuft in einer maskierten Domain (Iframe). Browser BLOCKIEREN die Installation in diesem Modus. Bitte öffnen Sie die Originaladresse." : "⚠️ Aplikácia beží v maskovanej doméne (Iframe). Prehliadače v tomto režime z bezpečnostných dôvodov BLOKUJÚ inštaláciu aplikácie. Otvorte priamo originálnu adresu (GitHub Pages).";
    window.showAlert(msg);
  }
}, 2500);
  } else {
    window.user = null; 
    window.userName = null;
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('btn_admin_menu').style.display = 'none';
    document.getElementById('btn_import').style.display = 'none';
    document.querySelector('header').style.display = 'none';
    document.getElementById('formular').style.display = 'none';
    document.getElementById('archiv').style.display = 'none';
    document.getElementById('viewProfileModal').style.display = 'none';
    document.getElementById('editProfileModal').style.display = 'none';
    document.getElementById('editMedicationModal').style.display = 'none';
    document.getElementById('infoModal').style.display = 'none';
    window.skrytVsetko();
    window.updateUI();
  }
};

setTimeout(() => {
  const currentUid = localStorage.getItem('currentUserUid');
  if (currentUid) {
    const localAccounts = JSON.parse(localStorage.getItem('bp_inr_local_accounts') || '{}');
    const foundUser = Object.values(localAccounts).find(acc => acc.uid === currentUid);
    window.onLocalAuthStateChanged(foundUser || null);
  } else {
    window.onLocalAuthStateChanged(null);
  }
}, 100);

window.updateUI(); 

window.pridatZaznam = async function() {
  const data = {
    userId: window.user.uid,
    datum: window.formatDatum(),
    inr: document.getElementById('inr').value,
    tab: document.getElementById('tab').value,
    sys: document.getElementById('sys').value,
    dia: document.getElementById('dia').value,
    pulse: document.getElementById('pulse').value,
    mode: window.isBpOnly ? 'bp' : 'full'
  };
  if (![data.inr, data.tab, data.sys, data.dia, data.pulse].some(v => v.trim() !== '')) return;
  data.id = Date.now().toString();
  window.zaznamy.push(data);
  localStorage.setItem('zaznamy_historia_' + window.user.uid, JSON.stringify(window.zaznamy));
  
  ['inr','tab','sys','dia','pulse'].forEach(id => document.getElementById(id).value = '');
  window.showToast(translations[window.currentLang].saved || 'Uložené');
  if (document.getElementById('archiv').style.display === 'block') window.zobrazArchiv();
};

window.pridatVahu = async function() {
  try {
    const val = document.getElementById('novaVaha').value.trim();
    if (!val) return;
    
    let history = window.getVahaHistory();
    const novyDatum = window.formatDatum();
    const dParts = novyDatum.split(' ')[0].split('.');
    const aktualnyMesiacRok = `${dParts[1]}.${dParts[2]}`;
    
    let existujeVmesiaci = false;
    for (let i = 0; i < history.length; i++) {
      const p = history[i].datum.split(' ')[0].split('.');
      if (p.length >= 3) {
        let m = p[1].padStart(2, '0');
        let y = p[2].length === 2 ? '20' + p[2] : p[2];
        if (`${m}.${y}` === aktualnyMesiacRok) {
          history[i].vaha = val;
          history[i].datum = novyDatum;
          existujeVmesiaci = true;
          break;
        }
      }
    }
    
    if (!existujeVmesiaci) {
      const data = { id: Date.now().toString(), datum: novyDatum, vaha: val };
      history.push(data);
    }
    localStorage.setItem('vaha_historia_' + window.user.uid, JSON.stringify(history));
    
    document.getElementById('novaVaha').value = '';
    localStorage.setItem('userProfile_vaha', val); 
    if (document.getElementById('viewProfileVaha')) document.getElementById('viewProfileVaha').innerText = val + ' kg';
    window.showToast(translations[window.currentLang].saved || 'Uložené');
    if (document.getElementById('archivVahyModal').style.display !== 'none') {
      window.vykreslitArchivVahy();
    }
  } catch(e) {
    window.showAlert("Chyba pri ukladaní váhy: " + e.message);
  }
};

window.vymazatVahu = async function(id) {
  window.showConfirm(translations[window.currentLang].confirmDel, async () => {
    try {
      let history = window.getVahaHistory();
      history = history.filter(h => h.id !== id);
      localStorage.setItem('vaha_historia_' + window.user.uid, JSON.stringify(history));
      
      if (history.length > 0) {
         const sorted = history.sort((a, b) => parseInt(b.id) - parseInt(a.id));
         localStorage.setItem('userProfile_vaha', sorted[0].vaha);
      } else {
         localStorage.removeItem('userProfile_vaha');
      }
      if (document.getElementById('viewProfileVaha')) document.getElementById('viewProfileVaha').innerText = localStorage.getItem('userProfile_vaha') ? localStorage.getItem('userProfile_vaha') + ' kg' : '-';
      window.vykreslitArchivVahy();
    } catch(e) {
      window.showAlert("Chyba pri mazaní: " + e.message);
    }
  });
};

window.otvoritArchivVahy = function() {
  window.skrytVsetko();
  window.vykreslitArchivVahy();
  document.getElementById('archivVahyModal').style.display = 'block';
};

window.zavrietArchivVahy = function() {
  document.getElementById('archivVahyModal').style.display = 'none';
  window.otvoritProfil();
};

window.vykreslitArchivVahy = function() {
  const list = document.getElementById('archivVahyList');
  const vahaZaznamy = window.getVahaHistory();
  
  if (vahaZaznamy.length === 0) {
     list.innerHTML = '<div class="empty-records">Žiadne záznamy</div>';
     return;
  }
  const sorted = vahaZaznamy.sort((a, b) => {
    const parse = (s) => {
      if (!s || typeof s !== 'string') return 0;
      const parts = s.split(' ');
      const d = parts[0] || "";
      const t = parts[1] || '00:00';
      const [dd, mm, yy] = d.split('.').map(Number);
      const [hh, mi] = t.split(':').map(Number);
      if (!dd || !mm) return 0;
      const year = yy < 100 ? 2000 + yy : yy;
      return new Date(year, mm - 1, dd, hh, mi).getTime();
    };
    return parse(b.datum) - parse(a.datum);
  });

  let html = '<div class="archive-header weight-row"><div>Dátum/Čas</div><div>Váha (kg)</div><div></div></div>';
  for (let i = 0; i < sorted.length; i++) {
    const r = sorted[i];
    let trend = '';
    
    if (i < sorted.length - 1) {
      const currentVaha = parseFloat(r.vaha.replace(',', '.'));
      const prevVaha = parseFloat(sorted[i+1].vaha.replace(',', '.'));
      if (!isNaN(currentVaha) && !isNaN(prevVaha)) {
        if (currentVaha > prevVaha) {
          trend = ' <span class="trend-up">↑</span>';
        } else if (currentVaha < prevVaha) {
          trend = ' <span class="trend-down">↓</span>';
        } else {
          trend = ' <span class="trend-flat">=</span>';
        }
      }
    }

    html += `<div class="record-row weight-row">
      <div>${window.escapeHTML(r.datum)}</div>
      <div class="weight-val">${window.escapeHTML(r.vaha)}${trend}</div>
      <div class="weight-del" onclick="window.vymazatVahu('${r.id}')">🗑️</div>
    </div>`;
  }
  list.innerHTML = html;
};

window.spustitImport = async function() {
  let targetUserId = window.user.uid;

  if (window.userRole === 'admin') {
    const targetName = prompt("Zadajte lokálne MENO používateľa v tomto zariadení (nechajte prázdne pre seba):");
    if (targetName && targetName.trim() !== "") {
      const localAccounts = JSON.parse(localStorage.getItem('bp_inr_local_accounts') || '{}');
      const targetUser = localAccounts[targetName.trim().toLowerCase()];
      if (!targetUser) return window.showAlert("Používateľ v tomto zariadení neexistuje!");
      targetUserId = targetUser.uid;
    }
  }

  const rawData = prompt("Sem vložte textové záznamy. Vzor: 07.08.2025 — INR: 2.4 | TAB: 1 | SYS: 95 | DIA: 65 | PULZ: 86");
  if (!rawData) return;
  
  try {
    window.showToast("Importujem...");
    const lines = rawData.split(/\r?\n/);
    let count = 0;

    for (let line of lines) {
      line = line.trim();
      const parts = line.split(/\s+[-—]\s+/);
      if (parts.length < 2) continue;

      const datePart = parts[0].trim();
      const valuesPart = parts[1].trim();

      let formattedDate = datePart;
      const dateBits = datePart.split('.');
      if (dateBits.length === 3) {
        const yy = dateBits[2];
        formattedDate = `${dateBits[0].padStart(2, '0')}.${dateBits[1].padStart(2, '0')}.${yy.length === 2 ? '20' + yy : yy} 12:00`;
      }

      const record = {
        userId: targetUserId,
        datum: formattedDate,
        inr: '', tab: '', sys: '', dia: '', pulse: '',
        mode: 'bp'
      };

      valuesPart.split('|').forEach(p => {
        const [key, val] = p.split(':').map(s => s.trim());
        if (!key || !val) return;
        const k = key.toLowerCase();
        if (k === 'inr') { record.inr = val; record.mode = 'full'; }
        else if (k === 'tab') { record.tab = val; record.mode = 'full'; }
        else if (k === 'sys') record.sys = val;
        else if (k === 'dia') record.dia = val;
        else if (k === 'pulz' || k === 'pulse') record.pulse = val;
      });

      record.id = Date.now().toString() + count; // Lokálne ID
      window.zaznamy.push(record);
      count++;
    }
    
    localStorage.setItem('zaznamy_historia_' + targetUserId, JSON.stringify(window.zaznamy));
    window.showAlert(`Import úspešne dokončený! Pridaných ${count} záznamov.`);
    if (document.getElementById('archiv').style.display === 'block') window.zobrazArchiv();
  } catch (e) {
    window.showAlert("Chyba pri importe: " + e.message);
  }
};

window.getColorClass = (valStr, type) => {
  const val = parseFloat(valStr?.replace(',','.'));
  if (isNaN(val)) return '';

  if (type === 'inr') return 'val-purple';
  if (type === 'tab') return 'val-yellow';

  let low, high;
  if (type === 'sys') { low = 90; high = 140; }
  else if (type === 'dia') { low = 60; high = 90; }
  else if (type === 'pulse') { low = 60; high = 100; }
  else return '';
  if (val < low) return 'val-blue';
  if (val > high) return 'val-red';
  return 'val-green';
};

window.zobrazArchiv = function() {
  window.lastActiveView = 'archiv';
  document.getElementById('formular').style.display = 'none';
  window.skrytVsetko();
  document.getElementById('archiv').style.display = 'block';
  const list = document.getElementById('archivList');
  list.innerHTML = '';
  
  const monthNames = {
    sk: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"],
    de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
  };

  const now = new Date();
  const currentM = String(now.getMonth() + 1).padStart(2, '0');
  const currentY = String(now.getFullYear());
  const currentMonthKey = `${currentM}.${currentY}`;

  window.groupedOlder = {}; 
  let currentMonthHtml = '';

  window.zaznamy.filter(r => {
    const recordMode = r.mode || (r.inr || r.tab ? 'full' : 'bp');
    return recordMode === (window.isBpOnly ? 'bp' : 'full');
  }).sort((a, b) => {
    const parse = (s) => {
      if (!s || typeof s !== 'string') return 0;
      const parts = s.split(' ');
      const d = parts[0] || "";
      const t = parts[1] || '00:00';
      const [dd, mm, yy] = d.split('.').map(Number);
      const [hh, mi] = t.split(':').map(Number);
      if (!dd || !mm) return 0;
      const year = yy < 100 ? 2000 + yy : yy;
      return new Date(year, mm - 1, dd, hh, mi).getTime();
    };
    return parse(b.datum) - parse(a.datum);
  }).forEach(r => {
    const dateParts = (r.datum || "").split(' ')[0].split('.');
    const m = dateParts[1] || "01";
    const y = dateParts[2] || "";
    const fullYear = (y && y.length === 2) ? `20${y}` : (y || new Date().getFullYear().toString());
    const monthKey = `${m.padStart(2, '0')}.${fullYear}`;
    
    if (monthKey !== currentMonthKey) {
      if (!window.groupedOlder[monthKey]) {
         const monthName = monthNames[window.currentLang][parseInt(m) - 1];
         window.groupedOlder[monthKey] = { title: `${monthName} ${fullYear}`, html: '' };
         window.groupedOlder[monthKey].html += '<div class="archive-header"><div>Dátum/Čas</div><div class="col-inr">INR</div><div class="col-tab">Tab</div><div>Sys</div><div>Dia</div><div>Pulz</div><div></div></div>';
      }
    }

    if (monthKey === currentMonthKey && !currentMonthHtml.includes('archive-header')) {
      const monthName = monthNames[window.currentLang][parseInt(m) - 1];
      currentMonthHtml += `<div class="month-header">
        <h3>${monthName} ${fullYear}</h3>
        <button class="main pdf-export-btn" onclick="window.potvrditExportPDF(true, '${currentMonthKey}')">PDF Export</button>
      </div>`;
      currentMonthHtml += '<div class="archive-header"><div>Dátum/Čas</div><div class="col-inr">INR</div><div class="col-tab">Tab</div><div>Sys</div><div>Dia</div><div>Pulz</div><div></div></div>';
    }

    const rowHtml = `<div class="record-row">
      <div>${window.escapeHTML(r.datum)}</div>
      <div class="col-inr ${window.getColorClass(r.inr,'inr')}">${window.escapeHTML(r.inr)||'-'}</div>
      <div class="col-tab ${window.getColorClass(r.tab,'tab')}">${window.escapeHTML(r.tab)||'-'}</div>
      <div class="col-sys ${window.getColorClass(r.sys,'sys')}">${window.escapeHTML(r.sys)||'-'}</div>
      <div class="col-dia ${window.getColorClass(r.dia,'dia')}">${window.escapeHTML(r.dia)||'-'}</div>
      <div class="${window.getColorClass(r.pulse,'pulse')}">${window.escapeHTML(r.pulse)||'-'}</div>
      <div class="delete-icon" onclick="window.vymazatZaznam('${r.id}')">🗑️</div>
    </div>`;

    if (monthKey === currentMonthKey) {
      currentMonthHtml += rowHtml;
    } else {
      window.groupedOlder[monthKey].html += rowHtml;
    }
  });

  list.innerHTML = currentMonthHtml;

  // Pridanie spodnej lišty s tlačidlami
  const footer = document.getElementById('archivFooter');
  const hasOlderRecords = Object.keys(window.groupedOlder).length > 0;
  const monthlyArchiveBtn = `<button class="info-icon-btn" style="background-color: #2196F3;" onclick="window.otvoritMesacnyArchivList()" title="${translations[window.currentLang].btnMonthlyArchive}">📅</button>`;
  const infoBtn = `<button class="info-icon-btn" onclick="window.otvoritInfo()" title="${translations[window.currentLang].titleInfo}">i</button>`;

  const footerHtml = `<div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
    ${monthlyArchiveBtn}
    ${infoBtn}
  </div>`;
  
  if (footer) footer.innerHTML = footerHtml;
};

window.otvoritMesacnyArchivList = () => {
  const container = document.getElementById('monthlyArchiveButtons');
  container.innerHTML = '';
  const olderKeys = Object.keys(window.groupedOlder).sort((a,b) => {
    const [ma, ya] = a.split('.').map(Number);
    const [mb, yb] = b.split('.').map(Number);
    return (yb*12+mb) - (ya*12+ma);
  });

  const byYear = {};
  olderKeys.forEach(key => {
    const year = key.split('.')[1];
    if (!byYear[year]) byYear[year] = [];
    byYear[year].push(key);
  });

  const sortedYears = Object.keys(byYear).sort((a,b) => b - a);
  
  sortedYears.forEach(year => {
    container.innerHTML += `<button class="main" style="background-color: #555; margin-bottom: 0.3rem; margin-top: 0.5rem; text-align: left; padding-left: 1rem;" onclick="window.toggleYear('${year}')">📁 ${year}</button>`;
    let monthsHtml = `<div id="year_${year}" style="display: none; flex-direction: column; gap: 0.3rem; padding-left: 1rem; border-left: 2px solid #555; margin-bottom: 0.5rem;">`;
    byYear[year].forEach(key => {
      const title = window.groupedOlder[key].title.replace(' ' + year, '');
      monthsHtml += `<button class="main month-btn" onclick="window.otvoritMesacnyDetail('${key}')">${title}</button>`;
    });
    monthsHtml += `</div>`;
    container.innerHTML += monthsHtml;
  });

  if (sortedYears.length > 0) {
    setTimeout(() => window.toggleYear(sortedYears[0]), 50);
  }
  document.getElementById('monthlyArchiveListModal').style.display = 'flex';
};

window.toggleYear = (year) => {
  const el = document.getElementById('year_' + year);
  if (el) {
    el.style.display = (el.style.display === 'none') ? 'flex' : 'none';
  }
};

window.zavrietMesacnyArchivList = () => document.getElementById('monthlyArchiveListModal').style.display = 'none';

window.otvoritMesacnyDetail = (key) => {
  window.currentExportMonthKey = key;
  const data = window.groupedOlder[key];
  document.getElementById('monthDetailTitle').innerText = data.title;
  document.getElementById('monthDetailContent').innerHTML = data.html;
  document.getElementById('monthDetailModal').style.display = 'flex';
  window.zavrietMesacnyArchivList();
};

window.zavrietMesacnyDetail = () => document.getElementById('monthDetailModal').style.display = 'none';

window.potvrditExportPDF = (isCurrent, key = null) => {
  if (key) window.currentExportMonthKey = key;
  window.showConfirm(translations[window.currentLang].confirmPdf, () => window.exportToPDF(isCurrent));
};

window.exportToPDF = (isCurrent = false) => {
  let title, sourceNode;
  if (isCurrent === true) {
     title = document.querySelector('#archivList h3') ? document.querySelector('#archivList h3').innerText : 'Archív';
     sourceNode = document.getElementById('archivList');
  } else {
     title = document.getElementById('monthDetailTitle').innerText;
     sourceNode = document.getElementById('monthDetailContent');
  }
  const userName = window.userName || '';
  
  const pdfWrapper = document.createElement('div');
  pdfWrapper.style.padding = '20px';
  pdfWrapper.style.backgroundColor = '#ffffff';
  pdfWrapper.style.color = '#000000';
  pdfWrapper.style.fontFamily = 'Arial, sans-serif';
  pdfWrapper.style.position = 'relative';
  pdfWrapper.style.minHeight = '277mm'; 

  const watermark = document.createElement('img');
  watermark.src = 'img/icon_v2.png';
  watermark.style.position = 'absolute';
  watermark.style.top = '138.5mm'; 
  watermark.style.left = '50%';
  watermark.style.transform = 'translate(-50%, -50%)';
  watermark.style.opacity = '0.1'; 
  watermark.style.width = '75%';
  watermark.style.maxWidth = '400px';
  watermark.style.zIndex = '999'; 
  watermark.style.pointerEvents = 'none';
  pdfWrapper.appendChild(watermark);

  const h1 = document.createElement('h2');
  h1.innerText = title;
  h1.style.textAlign = 'center';
  h1.style.marginBottom = '5px';
  pdfWrapper.appendChild(h1);

  const tInfo = translations[window.currentLang];
  const pMeno = localStorage.getItem('userProfile_meno') || '';
  const pPriezvisko = localStorage.getItem('userProfile_priezvisko') || '';
  
  let pVaha = '-';
  if (window.currentExportMonthKey) {
    const history = window.getVahaHistory();
    const monthWeights = history.filter(h => {
      const parts = h.datum.split(' ')[0].split('.'); 
      if (parts.length === 3) {
        const y = parts[2].length === 2 ? '20' + parts[2] : parts[2];
        return `${parts[1]}.${y}` === window.currentExportMonthKey;
      }
      return false;
    });
    if (monthWeights.length > 0) {
      monthWeights.sort((a,b) => parseInt(b.id) - parseInt(a.id));
      pVaha = monthWeights[0].vaha + ' kg';
      } else {
        const [em, ey] = window.currentExportMonthKey.split('.').map(Number);
        const exportMonthNum = ey * 12 + em;
        const prevWeights = history.filter(h => {
          const parts = h.datum.split(' ')[0].split('.');
          if (parts.length === 3) {
            const y = parts[2].length === 2 ? '20' + parts[2] : parts[2];
            return (Number(y) * 12 + Number(parts[1])) < exportMonthNum;
          }
          return false;
        });
        if (prevWeights.length > 0) {
          prevWeights.sort((a,b) => parseInt(b.id) - parseInt(a.id));
          pVaha = prevWeights[0].vaha + ' kg';
        }
    }
  } else {
    pVaha = localStorage.getItem('userProfile_vaha') ? localStorage.getItem('userProfile_vaha') + ' kg' : '-';
  }
  
  const pVyska = localStorage.getItem('userProfile_vyska') ? localStorage.getItem('userProfile_vyska') + ' cm' : '-';
  let fullName = `${pMeno} ${pPriezvisko}`.trim();
  if (!fullName) fullName = userName || '-';

  const sub = document.createElement('div');
  sub.innerHTML = `<strong>${tInfo.namePhProfile}:</strong> ${fullName} &nbsp;|&nbsp; <strong>${tInfo.weightPhProfile.replace(' (kg)', '')}:</strong> ${pVaha} &nbsp;|&nbsp; <strong>${tInfo.heightPhProfile.replace(' (cm)', '')}:</strong> ${pVyska}`;
  sub.style.fontSize = '12px';
  sub.style.textAlign = 'left';
  sub.style.marginBottom = '15px';
  sub.style.borderBottom = '1px solid #eee';
  sub.style.paddingBottom = '5px';
  pdfWrapper.appendChild(sub);

  const tableClone = sourceNode.cloneNode(true);
  tableClone.style.border = '1px solid #eee';
  
  if (isCurrent === true) {
     tableClone.querySelectorAll('.month-header, button, .main').forEach(el => el.remove());
  }
  
  tableClone.querySelectorAll('.record-row, .archive-header').forEach(row => {
    row.style.backgroundColor = row.classList.contains('archive-header') ? '#f0f0f0' : '#ffffff';
    row.style.color = '#000000';

    if (window.isBpOnly) {
      row.querySelectorAll('.col-inr, .col-tab').forEach(el => el.remove());
    }

    const cells = Array.from(row.children);
    if (cells.length > 0) cells[cells.length - 1].remove(); 
    row.style.gridTemplateColumns = window.isBpOnly ? '40% 20% 20% 20%' : '30% 14% 14% 14% 14% 14%';
  });

  pdfWrapper.appendChild(tableClone);

  const t = translations[window.currentLang];
  const legendDiv = document.createElement('div');
  legendDiv.style.marginTop = '15px';
  legendDiv.style.padding = '10px';
  legendDiv.style.border = '1px solid #eee';
  legendDiv.style.fontSize = '10px';
  legendDiv.style.lineHeight = '1.4';

  const legHeader = document.createElement('div');
  legHeader.style.fontWeight = 'bold';
  legHeader.style.marginBottom = '5px';
  legHeader.innerText = t.legendTitle;
  legendDiv.appendChild(legHeader);

  let colors = [{c:'#9c27b0', l:t.legPurple}, {c:'#ffeb3b', l:t.legYellow}, {c:'#00e676', l:t.legGreen}, {c:'#ff1744', l:t.legRed}, {c:'#2196F3', l:t.legBlue}];
  if (window.isBpOnly) {
    colors = colors.filter(c => c.c !== '#9c27b0' && c.c !== '#ffeb3b');
  }
  colors.forEach(item => {
    const row = document.createElement('div');
    row.innerHTML = `<span style="color:${item.c}; font-size: 12px; vertical-align: middle;">■</span> ${item.l}`;
    legendDiv.appendChild(row);
  });
  pdfWrapper.appendChild(legendDiv);

  const opt = {
    margin: [10, 5, 10, 5],
    filename: `Zaznamy_${title.replace(/\s+/g, '_')}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  const generatePdf = () => html2pdf().set(opt).from(pdfWrapper).save();

  if (watermark.complete) {
    generatePdf();
  } else {
    watermark.onload = generatePdf;
    watermark.onerror = generatePdf; 
  }
};

window.vymazatZaznam = (id) => {
  window.showConfirm(translations[window.currentLang].confirmDel, async () => {
    window.zaznamy = window.zaznamy.filter(r => r.id !== id);
    localStorage.setItem('zaznamy_historia_' + window.user.uid, JSON.stringify(window.zaznamy));
    
    window.zobrazArchiv();
  });
};

window.formatDatum = () => { 
  const d = new Date(); 
  const date = `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getFullYear())}`;
  const time = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  return `${date} ${time}`;
};
window.skrytArchiv = () => { window.skrytVsetko(); document.getElementById('formular').style.display = 'block'; };

window.logout = () => {
  window.showConfirm(translations[window.currentLang].confirmLogout, () => {
    localStorage.removeItem('currentUserUid');
      window.onLocalAuthStateChanged(null);
  });
};

window.toggleDropdown = () => { const d = document.getElementById('dropdown'); d.style.display = (d.style.display === 'flex') ? 'none' : 'flex'; };
window.otvoritModal = () => {
  window.skrytVsetko();
  document.getElementById('manualModal').style.display = 'block';
};
window.zavrietModal = () => {
  window.skrytVsetko();
  document.getElementById('formular').style.display = 'block';
};
window.otvoritInfo = () => {
  window.skrytVsetko();
  document.getElementById('infoModal').style.display = 'block';
};
window.zavrietInfo = () => {
  document.getElementById('infoModal').style.display = 'none';
  if (window.lastActiveView === 'archiv') {
    document.getElementById('archiv').style.display = 'block';
  } else {
    document.getElementById('formular').style.display = 'block';
  }
};
window.showToast = (m) => { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 3000); };

window.ulozitManual = async () => {
  const dateStr = document.getElementById('manualDatum').value;
  const datePattern = /^(\d{2})\.(\d{2})\.(\d{2,4}) (\d{2}):(\d{2})$/;
  const match = dateStr.match(datePattern);

  if (!match) {
    return window.showAlert('Dátum a čas musí byť v tvare dd.mm.rr hh:mm (napr. 25.12.24 14:30)');
  }

  const day = parseInt(match[1]);
  const month = parseInt(match[2]);
  let year = match[3];
  const hour = parseInt(match[4]);
  const min = parseInt(match[5]);

  if (day < 1 || day > 31 || month < 1 || month > 12 || hour > 23 || min > 59) {
    return window.showAlert('Neplatné údaje v dátume alebo čase!');
  }
  if (year.length === 2) year = "20" + year;

  const data = { userId: window.user.uid, datum: `${match[1]}.${match[2]}.${year} ${match[4]}:${match[5]}`, inr: document.getElementById('manualInr').value, tab: document.getElementById('manualTab').value, sys: document.getElementById('manualSys').value, dia: document.getElementById('manualDia').value, pulse: document.getElementById('manualPulse').value, mode: window.isBpOnly ? 'bp' : 'full' };
  if (![data.inr, data.tab, data.sys, data.dia, data.pulse].some(v => v.trim() !== '')) return;

  data.id = Date.now().toString();
  window.zaznamy.push(data);
  localStorage.setItem('zaznamy_historia_' + window.user.uid, JSON.stringify(window.zaznamy));
  
  ['manualDatum','manualInr','manualTab','manualSys','manualDia','manualPulse'].forEach(id => document.getElementById(id).value = '');
  window.zavrietModal(); window.showToast(translations[window.currentLang].saved);
  if (document.getElementById('archiv').style.display === 'block') window.zobrazArchiv();
};

window.otvoritProfil = () => {
  const t = translations[window.currentLang];
  document.getElementById('viewProfileMeno').innerText = localStorage.getItem('userProfile_meno') || '-';
  document.getElementById('viewProfilePriezvisko').innerText = localStorage.getItem('userProfile_priezvisko') || '-';
  document.getElementById('viewProfileVaha').innerText = (localStorage.getItem('userProfile_vaha') ? localStorage.getItem('userProfile_vaha') + ' kg' : '-');
  document.getElementById('viewProfileVyska').innerText = (localStorage.getItem('userProfile_vyska') ? localStorage.getItem('userProfile_vyska') + ' cm' : '-');
  
  const kartaContainer = document.getElementById('viewProfileKarta');
  kartaContainer.innerHTML = ''; 
  const kartaText = localStorage.getItem('userProfile_karta') || '';

  if (kartaText) {
    const lieky = kartaText.split('\n').filter(l => l.trim() !== '');
    lieky.forEach((liek, index) => {
      const cistyLiek = liek.replace(/^•\s*/, ''); 
      const liekElement = document.createElement('div');
      liekElement.className = index % 2 === 0 ? 'med-item even' : 'med-item odd';

      const textSpan = document.createElement('span');
      textSpan.innerText = cistyLiek;

      const deleteSpan = document.createElement('span');
      deleteSpan.innerHTML = '&times;'; 
      deleteSpan.className = 'med-delete-btn';
      deleteSpan.title = 'Vymazať liek';
      deleteSpan.onclick = () => window.vymazatLiek(index);

      liekElement.appendChild(textSpan);
      liekElement.appendChild(deleteSpan);
      kartaContainer.appendChild(liekElement);
    });
  } else {
    kartaContainer.innerHTML = '<div class="empty-meds">Žiadne lieky. (Dvojklik pre pridanie)</div>';
  }
  document.getElementById('formular').style.display = 'none';
  document.getElementById('archiv').style.display = 'none';
  window.skrytVsetko();
  document.getElementById('viewProfileModal').style.display = 'block';
};

window.otvoritEditProfil = () => {
  document.getElementById('profileMeno').value = localStorage.getItem('userProfile_meno') || '';
  document.getElementById('profilePriezvisko').value = localStorage.getItem('userProfile_priezvisko') || '';
  document.getElementById('profileVaha').value = localStorage.getItem('userProfile_vaha') || '';
  document.getElementById('profileVyska').value = localStorage.getItem('userProfile_vyska') || '';
  document.getElementById('viewProfileModal').style.display = 'none'; 
  document.getElementById('editProfileModal').style.display = 'block'; 
};

window.otvoritEditKartu = () => {
  document.getElementById('medName').value = '';
  document.getElementById('medQty').value = '';
  document.getElementById('medMg').value = '';
  document.getElementById('medUnit').value = 'mg';
  document.getElementById('medDosage').value = '';
  document.getElementById('viewProfileModal').style.display = 'none';
  document.getElementById('editMedicationModal').style.display = 'block';
};

window.zavrietEditKartu = () => {
  document.getElementById('editMedicationModal').style.display = 'none';
  window.otvoritProfil();
};

window.ulozitKartu = () => {
  const name = document.getElementById('medName').value.trim();
  const qty = document.getElementById('medQty').value.trim();
  const mg = document.getElementById('medMg').value.trim();
  const unit = document.getElementById('medUnit').value;
  const dosage = document.getElementById('medDosage').value;
  if (!name) return window.showAlert("Zadajte aspoň názov lieku!");
  
  let novyLiek = name;
  if (qty && qty.length > 0) novyLiek += ` - ${qty} ks`;
  if (mg && mg.length > 0) novyLiek += ` (${mg} ${unit})`;
  if (dosage && dosage.length > 0) novyLiek += ` [${dosage}]`;
  
  let staraKarta = localStorage.getItem('userProfile_karta') || '';
  let novaKarta = staraKarta ? staraKarta + '\n' + novyLiek : novyLiek;
  localStorage.setItem('userProfile_karta', novaKarta);
  if (window.user) localStorage.setItem('userProfile_uid', window.user.uid);
  window.showToast(translations[window.currentLang].saved || 'Uložené');
  window.zavrietEditKartu();
};

window.vymazatLiek = (index) => {
  const t = translations[window.currentLang];
  window.showConfirm(t.confirmDelMed || "Naozaj chcete vymazať tento liek?", () => {
    let kartaText = localStorage.getItem('userProfile_karta') || '';
    let lieky = kartaText.split('\n').filter(l => l.trim() !== '');
    lieky.splice(index, 1);
    localStorage.setItem('userProfile_karta', lieky.join('\n'));
    window.otvoritProfil();
  });
};

window.zavrietViewProfil = () => {
  document.getElementById('viewProfileModal').style.display = 'none';
  window.skrytVsetko();
  document.getElementById('formular').style.display = 'block';
};
window.zavrietEditProfil = () => {
  document.getElementById('editProfileModal').style.display = 'none';
  window.otvoritProfil();
};

window.ulozitProfil = () => {
  const t = translations[window.currentLang];
  if (window.user) localStorage.setItem('userProfile_uid', window.user.uid);
  
  const staraVaha = localStorage.getItem('userProfile_vaha') || '';
  const novaVaha = document.getElementById('profileVaha').value.trim();
  
  localStorage.setItem('userProfile_meno', document.getElementById('profileMeno').value.trim());
  localStorage.setItem('userProfile_priezvisko', document.getElementById('profilePriezvisko').value.trim());
  localStorage.setItem('userProfile_vaha', novaVaha);
  localStorage.setItem('userProfile_vyska', document.getElementById('profileVyska').value.trim());
  
  if (novaVaha && novaVaha !== staraVaha && window.user) {
    let history = window.getVahaHistory();
    const novyDatum = window.formatDatum();
    const dParts = novyDatum.split(' ')[0].split('.');
    const aktualnyMesiacRok = `${dParts[1]}.${dParts[2]}`;
    
    let existujeVmesiaci = false;
    for (let i = 0; i < history.length; i++) {
      const p = history[i].datum.split(' ')[0].split('.');
      if (p.length >= 3) {
        let m = p[1].padStart(2, '0');
        let y = p[2].length === 2 ? '20' + p[2] : p[2];
        if (`${m}.${y}` === aktualnyMesiacRok) {
          history[i].vaha = novaVaha;
          history[i].datum = novyDatum;
          existujeVmesiaci = true;
          break;
        }
      }
    }
    
    if (!existujeVmesiaci) {
      const data = { id: Date.now().toString(), datum: novyDatum, vaha: novaVaha };
      history.push(data);
    }
    localStorage.setItem('vaha_historia_' + window.user.uid, JSON.stringify(history));
  }
  
  window.showToast(t.saved || 'Uložené');
  window.zavrietEditProfil(); 
};

window.otvoritAdminTestModal = () => document.getElementById('adminTestModal').style.display = 'flex';
window.zavrietAdminTestModal = () => document.getElementById('adminTestModal').style.display = 'none';

window.checkEndOfMonthReminder = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-11
  const day = now.getDate();

  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const reminderKey = `eom_reminder_shown_${year}-${month + 1}`;

  // Spustiť iba v posledné 2 dni v mesiaci A ak ešte nebola zobrazená tento mesiac
  if ((day === lastDayOfMonth || day === lastDayOfMonth - 1) && !localStorage.getItem(reminderKey)) {
    const t = translations[window.currentLang];
    window.showAlert(t.eomReminderText, t.eomReminderTitle);
    localStorage.setItem(reminderKey, 'true');
  }
};

window.testEomReminder = () => {
  // Vráti na formulár a po 2 sekundách zobrazí notifikáciu
  window.zavrietAdminTestModal();
  window.skrytVsetko();
  document.getElementById('formular').style.display = 'block';
  setTimeout(() => {
    const t = translations[window.currentLang];
    window.showAlert(t.eomReminderText, t.eomReminderTitle);
  }, 2000);
};

window.forceUpdateCheck = () => {
  const t = translations[window.currentLang];
  window.showToast(t.msgCheckUpdate || "Vymazávam cache...");
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (let reg of registrations) {
        reg.unregister();
      }
      setTimeout(() => {
        window.location.href = window.location.pathname + '?v=' + new Date().getTime();
      }, 1000);
    });
  } else {
    window.location.href = window.location.pathname + '?v=' + new Date().getTime();
  }
};

if ('serviceWorker' in navigator) {
  // Agresívne vyčistenie starých PWA chýb z prehliadača (Zabitie ducha verzie 1.99)
  const FORCE_CLEAR_KEY = 'bp_inr_force_clear_v2.18';
  if (!localStorage.getItem(FORCE_CLEAR_KEY)) {
    localStorage.setItem(FORCE_CLEAR_KEY, 'done');
    navigator.serviceWorker.getRegistrations().then(regs => {
      for (let r of regs) r.unregister();
    });
    if (window.caches) {
      caches.keys().then(keys => {
        keys.forEach(k => caches.delete(k));
      });
    }
    setTimeout(() => window.location.reload(true), 500);
    // Zastavíme ďalšie vykonávanie skriptu, kým sa stránka nereštartuje nacisto
    throw new Error('Prebieha tvrdý reštart a vymazanie starej PWA cache...');
  }

  if (sessionStorage.getItem(UPDATE_ACKNOWLEDGED_KEY) === 'true') {
    setTimeout(() => sessionStorage.removeItem(UPDATE_ACKNOWLEDGED_KEY), 1000);
  }

  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      window.location.href = window.location.pathname + '?updated=true';
      refreshing = true;
    }
  });

  navigator.serviceWorker.register('./sw.js?v=2.30').then(reg => {
    setInterval(() => { reg.update().catch(()=>{}); }, 1000 * 60 * 60);
    reg.update().catch(()=>{});

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        reg.update().catch(()=>{});
      }
    });

    if (reg.waiting) {
      window.showUpdateUI(reg);
    }

    reg.onupdatefound = () => {
      const installingWorker = reg.installing;
      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
          window.showUpdateUI(reg);
        }
      };
    };
  }).catch(err => {
    console.warn('Zaseknutý Service Worker detegovaný, prebieha auto-oprava...', err);
    navigator.serviceWorker.getRegistrations().then(regs => {
      for (let r of regs) r.unregister();
      setTimeout(() => window.location.reload(), 500);
    });
  });
}

window.showUpdateUI = (reg) => {
  if (sessionStorage.getItem(UPDATE_ACKNOWLEDGED_KEY) === 'true') {
    return;
  }
  const dialog = document.getElementById('customDialog');
  const t = translations[window.currentLang];
  document.getElementById('dialogTitle').innerText = 'Nová verzia';
  document.getElementById('dialogMessage').innerText = t.updateReady + '\n' + t.updateChanges;
  document.getElementById('dialogCancelBtn').style.display = 'none';
  document.getElementById('dialogOkBtn').onclick = () => {
    sessionStorage.setItem(UPDATE_ACKNOWLEDGED_KEY, 'true');
    dialog.style.display = 'none';
    if (reg && reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
    else window.location.href = window.location.pathname + '?updated=true';
  };
  dialog.style.display = 'flex';
};

// --- Gesto: Krok späť (potiahnutie zľava doprava) ---
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].screenX;
  const touchEndY = e.changedTouches[0].screenY;
  
  const distanceX = touchEndX - touchStartX;
  const distanceY = Math.abs(touchEndY - touchStartY);

  // Podmienky pre krok späť:
  // 1. Vzdialenosť potiahnutia doprava je viac ako 60px nezávisle od toho, kde začalo
  // 2. Nešlo o výrazný posun hore/dole (menej ako 50px vertikálne - ignoruje scrollovanie)
  if (distanceX > 60 && distanceY < 50) {
    window.goBackOneStep();
  }
}, { passive: true });

window.goBackOneStep = () => {
  const dialog = document.getElementById('customDialog');
  if (dialog && dialog.style.display === 'flex') return; // Zablokuje krok späť, kým používateľ nepotvrdí/nezruší alert okno

  const dropdown = document.getElementById('dropdown');
  if (dropdown && dropdown.style.display === 'flex') {
    window.toggleDropdown();
    return;
  }

  const uiLayers = [
    { id: 'adminTestModal', closeFunc: window.zavrietAdminTestModal },
    { id: 'languageModal', closeFunc: window.zavrietJazyk },
    { id: 'settingsModal', closeFunc: window.zavrietNastavenia },
    { id: 'termsModal', closeFunc: window.zavrietTerms },
    { id: 'monthDetailModal', closeFunc: window.zavrietMesacnyDetail },
    { id: 'monthlyArchiveListModal', closeFunc: window.zavrietMesacnyArchivList },
    { id: 'editMedicationModal', closeFunc: window.zavrietEditKartu },
    { id: 'editProfileModal', closeFunc: window.zavrietEditProfil },
    { id: 'archivVahyModal', closeFunc: window.zavrietArchivVahy },
    { id: 'viewProfileModal', closeFunc: window.zavrietViewProfil },
    { id: 'infoModal', closeFunc: window.zavrietInfo },
    { id: 'manualModal', closeFunc: window.zavrietModal }
  ];

  for (const layer of uiLayers) {
    const el = document.getElementById(layer.id);
    if (el && (el.style.display === 'block' || el.style.display === 'flex')) {
      layer.closeFunc();
      return;
    }
  }

  const archiv = document.getElementById('archiv');
  if (archiv && archiv.style.display === 'block') {
    window.skrytArchiv();
    return;
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm && registerForm.style.display === 'block') {
    window.showLogin();
    return;
  }
};

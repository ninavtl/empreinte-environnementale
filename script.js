// --- FACTEURS D'ÉMISSIONS ---
// utilisation (par heure)
const em_tel = 0.04;      // kg CO2 / h
const em_ordi = 0.05;     // kg CO2 / h
const em_tablette = 0.08; // kg CO2 / h

// fabrication totale (kg CO2)
const emf_tel = 80;
const emf_ordi = 100;
const emf_tablette = 60;

// réseau (kg CO2 / Go)
const em_fibre = 0.02;
const em_ADSL  = 0.05;
const em_4G    = 0.10;
const em_5G    = 0.15;

// lire le réseau choisi pour un appareil
function lireReseau(name) {
    let r = document.querySelector(`input[name="${name}"]:checked`);
    if (!r) return null;
    return r.value;
}

// convertir réseau → facteur CO2
function facteurReseau(type) {
    switch(type) {
        case "fibre": return em_fibre;
        case "ADSL": return em_ADSL;
        case "4G": return em_4G;
        case "5G": return em_5G;
        default: return 0;
    }
}

function traiterValeur() {

    // ---------- TELEPHONE ----------
    let tps_tel = parseFloat(document.getElementById("tps_téléphone").value);
    let vie_tel = parseFloat(document.getElementById("duré_vie_tel").value);
    let go_tel = parseFloat(document.getElementById("go_utilisé_tel").value);
    let reseau_tel = lireReseau("reseau_tel");
    let facteur_tel = facteurReseau(reseau_tel);

    let fab_tel_annuelle = emf_tel / vie_tel;
    let utilisation_tel = tps_tel * em_tel * 365;
    let reseau_tel_em = go_tel * 12 * facteur_tel;

    let total_tel = utilisation_tel + fab_tel_annuelle + reseau_tel_em;


    // ---------- ORDINATEUR ----------
    let tps_ordi = parseFloat(document.getElementById("tps_ordinateur").value);
    let vie_ordi = parseFloat(document.getElementById("duré_vie_ordi").value);
    let go_ordi = parseFloat(document.getElementById("go_utilisé_ordi").value);
    let reseau_ordi = lireReseau("reseau_ordi");
    let facteur_ordi = facteurReseau(reseau_ordi);

    let fab_ordi_annuelle = emf_ordi / vie_ordi;
    let utilisation_ordi = tps_ordi * em_ordi * 365;
    let reseau_ordi_em = go_ordi * 12 * facteur_ordi;

    let total_ordi = utilisation_ordi + fab_ordi_annuelle + reseau_ordi_em;


    // ---------- TABLETTE ----------
    let tps_tab = parseFloat(document.getElementById("tps_tablette").value);
    let vie_tab = parseFloat(document.getElementById("duré_vie_tablette").value);
    let go_tab = parseFloat(document.getElementById("go_utilisé_tablette").value);
    let reseau_tab = lireReseau("reseau_tablette");
    let facteur_tab = facteurReseau(reseau_tab);

    let fab_tab_annuelle = emf_tablette / vie_tab;
    let utilisation_tab = tps_tab * em_tablette * 365;
    let reseau_tab_em = go_tab * 12 * facteur_tab;

    let total_tab = utilisation_tab + fab_tab_annuelle + reseau_tab_em;


    // ---------- AFFICHAGE ----------
    document.getElementById("affichage").innerHTML =
        "Téléphone : " + total_tel.toFixed(2) + " kg CO₂/an<br>" +
        "Ordinateur : " + total_ordi.toFixed(2) + " kg CO₂/an<br>" +
        "Tablette : " + total_tab.toFixed(2) + " kg CO₂/an<br><br>" +
        "<strong>Total : " + (total_tel + total_ordi + total_tab).toFixed(2) + " kg CO₂/an</strong>";
}

var saldo = 1000;
var liczba_dola = 0;
var kurs_dola = 4.01;

function updateKurs() {
  console.log("a");
  var dirProb = Math.floor(Math.random() * 100);
  var changeSizeProb = Math.random();
  if(dirProb <= 41) {
    kurs_dola -= 0.136391*Math.pow(changeSizeProb, 3.46092);
  } else {
    kurs_dola += 0.113587*Math.pow(changeSizeProb, 4.21578);
  }

  document.getElementById('convertedPrice').value = kurs_dola.toFixed(2) + " ZŁ";
  document.getElementById('convertedPrice').style.fontSize = "24px";


}

// Funkcja kupna kryptowaluty
function kup() {
  if (saldo >= kurs_dola) {
    saldo -= kurs_dola;
    liczba_dola++;
    // Aktualizacja wartości na stronie
    document.getElementById('numSaldoPLN').textContent = saldo.toFixed(2);
    document.getElementById('numSaldoUSD').textContent = liczba_dola;
  } else {
    alert("Za mało środków na koncie");
  }
}

// Funkcja sprzedaży kryptowaluty
function sprzedaj() {
  if (liczba_dola > 0) {
    saldo += kurs_dola;
    liczba_dola--;
    // Aktualizacja wartości na stronie
    document.getElementById('numSaldoPLN').textContent = saldo.toFixed(2);
    document.getElementById('numSaldoUSD').textContent = liczba_dola;
  } else {
    alert("Brak dolarów do sprzedaży");
  }
}

// Funkcje na 'Kup Wszystko' i 'Sprzedaj Wszystko' – przykładowe:
function kup_w() {
  var ile_moge_kupic = Math.floor(saldo / kurs_dola);
  saldo -= ile_moge_kupic * kurs_dola;
  liczba_dola += ile_moge_kupic;
  document.getElementById('numSaldoPLN').textContent = saldo.toFixed(2);
  document.getElementById('numSaldoUSD').textContent = liczba_dola;
}

function sprzedaj_w() {
  saldo += liczba_dola * kurs_dola;
  liczba_dola = 0;
  document.getElementById('numSaldoPLN').textContent = saldo.toFixed(2);
  document.getElementById('numSaldoUSD').textContent = liczba_dola;
}

addEventListener('load', (e) => {
  updateKurs();
  setInterval(updateKurs, 2000);
  setInterval(display, 2000);
});

addEventListener('beforeunload', (e) => {
  document.cookie = "saldoPLN=" + saldo;
  document.cookie = "saldoUSD=" + liczba_dola;
  document.cookie = "savedPrice=" + kurs_dola;
  return null;
});

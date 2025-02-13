var saldo = 1000;
var liczba_dola = 0;
var kurs_dola = 4.01;

function updateKurs() {
  var a = Math.floor(Math.random() * 5);
  if (a == 0) {
    kurs_dola -= 0.05; // mocno maleje
  } else if (a == 1) {
    kurs_dola -= 0.05; // lekko maleje
  } else if (a == 2) {
    // nie zmienia się
  } else if (a == 3) {
    kurs_dola += 0.05; // lekko rośnie
  } else if (a == 4) {
    kurs_dola += 0.05; // mocno rośnie
  }

  document.getElementById('przeliczanie').value = kurs_dola.toFixed(2) + " ZŁ";
  document.getElementById('przeliczanie').style.fontSize = "24px";


}

setInterval(updateKurs, 2000);

function przelicz() {
  var waluta = document.getElementById('waluta').value;
  var przeliczony = 0;
  if (waluta === "ZŁ") {
    // Przeliczamy z dolara na złote
    przeliczony = liczba_dola * kurs_dola;
    document.getElementById('przeliczanie').value = przeliczony.toFixed(2) + " ZŁ";
  } else if (waluta === "USD") {
    // Przeliczamy ze złotówek na dolary
    przeliczony = saldo / kurs_dola;
    document.getElementById('przeliczanie').value = przeliczony.toFixed(2) + " USD";
  }
}

// Funkcja kupna kryptowaluty
function kup() {
  if (saldo >= kurs_dola) {
    saldo -= kurs_dola;
    liczba_dola++;
    // Aktualizacja wartości na stronie
    document.getElementById('wartosc_saldo').textContent = saldo.toFixed(2);
    document.getElementById('ilosc_k').textContent = liczba_dola;
    przelicz();  // Przeliczamy po każdej zmianie salda
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
    document.getElementById('wartosc_saldo').textContent = saldo.toFixed(2);
    document.getElementById('ilosc_k').textContent = liczba_dola;
    przelicz();  // Przeliczamy po każdej zmianie salda
  } else {
    alert("Brak dolarów do sprzedaży");
  }
}

// Funkcje na 'Kup Wszystko' i 'Sprzedaj Wszystko' – przykładowe:
function kup_w() {
  var ile_moge_kupic = Math.floor(saldo / kurs_dola);
  saldo -= ile_moge_kupic * kurs_dola;
  liczba_dola += ile_moge_kupic;
  document.getElementById('wartosc_saldo').textContent = saldo.toFixed(2);
  document.getElementById('ilosc_k').textContent = liczba_dola;
  przelicz();  // Przeliczamy po każdej zmianie salda
}

function sprzedaj_w() {
  saldo += liczba_dola * kurs_dola;
  liczba_dola = 0;
  document.getElementById('wartosc_saldo').textContent = saldo.toFixed(2);
  document.getElementById('ilosc_k').textContent = liczba_dola;
  przelicz();  // Przeliczamy po każdej zmianie salda
}

// Funkcja wywołująca przeliczenie po zmianie waluty
document.getElementById('waluta').addEventListener('change', przelicz);

// Na początku ustawiamy kurs kryptowaluty oraz przeliczenie
updateKurs();
przelicz();  // Początkowe przeliczenie na podstawie domyślnej waluty

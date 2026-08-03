/**
 * ============================================================
 * Google Apps Script — Form Handler & Webhook Revalidation
 * ============================================================
 */

// ===== KONFIGURASI WEBHOOK =====
// URL website Anda yang sudah di-deploy di Vercel
const WEBSITE_URL = "https://website-wisata-kembang.vercel.app/";

// Token rahasia yang sama dengan REVALIDATE_TOKEN di .env.local
const SECRET_TOKEN = "wisata-kembang-revalidate-2026";
// ===============================


function onFormSubmit(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var values = e.values; 
  var kategori = values[1]; // Kolom B (Kategori)
  
  if (kategori === "Wisata") {
    var target = sheet.getSheetByName("Wisata");
    
    var nama = values[2];       // Kolom C
    var desc_id = values[3];    // Kolom D
    var desc_en = values[4];    // Kolom E
    var harga = values[5];      // Kolom F
    var jam = values[6];        // Kolom G
    var maps = values[7];       // Kolom H
    var instagram = values[8];  // Kolom I
    var gambar = values[9];     // Kolom J
    
    // Urutan Tab Wisata: 
    // A(Nama), B(Desc_ID), C(Desc_EN), D(Harga), E(Jam), F(Maps), G(Gambar), H(Instagram), I(Tampil)
    target.appendRow([nama, desc_id, desc_en, harga, jam, maps, gambar, instagram, "Ya"]);
  } 
  
  else if (kategori === "Kuliner") {
    var target = sheet.getSheetByName("Kuliner");
    
    var nama = values[10];      // Kolom K
    var desc_id = values[11];   // Kolom L
    var desc_en = values[12];   // Kolom M
    var harga = values[13];     // Kolom N
    var jam = values[14];       // Kolom O
    var instagram = values[15]; // Kolom P
    var maps = values[16];      // Kolom Q
    var gambar = values[17];    // Kolom R
    
    // Urutan Tab Kuliner:
    // A(Nama), B(Desc_ID), C(Desc_EN), D(Harga), E(Jam), F(Instagram), G(Gambar), H(Maps), I(Tampil)
    target.appendRow([nama, desc_id, desc_en, harga, jam, instagram, gambar, maps, "Ya"]);
  }

  else if (kategori === "Penginapan") {
    var target = sheet.getSheetByName("Penginapan");
    
    var nama = values[18];      // Kolom S
    var desc_id = values[19];   // Kolom T
    var desc_en = values[20];   // Kolom U
    var wa = values[21];        // Kolom V
    var maps = values[22];      // Kolom W
    var instagram = values[23]; // Kolom X
    var gambar = values[24];    // Kolom Y
    var harga = values[25];     // Kolom Z 
    
    // Urutan Tab Penginapan:
    // A(Nama), B(Desc_ID), C(Desc_EN), D(Harga), E(WA), F(Maps), G(Gambar), H(Instagram), I(Tampil)
    target.appendRow([nama, desc_id, desc_en, harga, wa, maps, gambar, instagram, "Ya"]);
  }

  // PANGGIL WEBHOOK KE VERCEL SETELAH DATA DITAMBAHKAN!
  onSheetEdit(null);
}

/**
 * Fungsi yang dipanggil setiap kali ada perubahan manual di Sheets,
 * ATAU dipanggil oleh fungsi onFormSubmit di atas.
 * Mengirim POST request ke API revalidate website.
 */
function onSheetEdit(e) {
  const url = WEBSITE_URL + "/api/revalidate?secret=" + SECRET_TOKEN;

  try {
    const response = UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      muteHttpExceptions: true,
    });

    const code = response.getResponseCode();
    const body = response.getContentText();

    if (code === 200) {
      console.log("✅ Revalidasi berhasil:", body);
    } else {
      console.error("❌ Revalidasi gagal (HTTP " + code + "):", body);
    }
  } catch (error) {
    console.error("❌ Error saat mengirim webhook:", error);
  }
}

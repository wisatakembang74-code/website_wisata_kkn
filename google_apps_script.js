/**
 * ============================================================
 * Google Apps Script — Webhook Revalidation
 * ============================================================
 *
 * CARA PAKAI:
 * 1. Buka Google Sheets Anda.
 * 2. Klik menu "Extensions" > "Apps Script".
 * 3. Hapus semua kode default di editor.
 * 4. Salin-tempel (copy-paste) SELURUH kode di bawah ini.
 * 5. Ganti variabel WEBSITE_URL dan SECRET_TOKEN di bawah
 *    dengan nilai yang sesuai.
 * 6. Klik tombol "Save" (ikon disket).
 * 7. Klik menu "Triggers" (ikon jam) di sidebar kiri.
 * 8. Klik "+ Add Trigger" di pojok kanan bawah.
 * 9. Atur konfigurasi:
 *    - Choose which function to run: onSheetEdit
 *    - Choose which deployment should run: Head
 *    - Select event source: From spreadsheet
 *    - Select event type: On edit
 * 10. Klik "Save", lalu izinkan akses jika diminta.
 *
 * Setelah ini, setiap kali Anda mengedit sel apa pun di Sheets,
 * skrip ini akan otomatis mengirim sinyal ke website Anda
 * agar datanya diperbarui secara instan.
 * ============================================================
 */

// ===== KONFIGURASI — Ganti dengan nilai Anda =====

// URL website Anda yang sudah di-deploy di Vercel
// Contoh: "https://wisata-nanggulan.vercel.app"
const WEBSITE_URL = "https://website-wisata-kembang.vercel.app/";

// Token rahasia yang sama dengan REVALIDATE_TOKEN di .env.local
const SECRET_TOKEN = "wisata-nanggulan-revalidate-2026";

// ==================================================

/**
 * Fungsi yang dipanggil setiap kali ada perubahan di Sheets.
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

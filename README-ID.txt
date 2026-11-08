NAILONG APP - PROYEK APK ANDROID

Paket ini adalah proyek Android siap-build yang membungkus Nailong App dalam Android WebView. Permainan lokal, kuis, misi, dan progres disimpan pada perangkat. APK belum dikompilasi di lingkungan ini karena Android SDK/Gradle tidak tersedia.

CARA PALING MUDAH MEMBUAT APK DENGAN GITHUB ACTIONS
1. Ekstrak ZIP ini di komputer.
2. Buat repository baru di GitHub, misalnya nailong-app-android.
3. Unggah SEMUA ISI folder proyek ini (bukan folder luarnya) ke repository.
4. Buka tab Actions. Jika diminta, aktifkan workflow.
5. Pilih workflow "Build Nailong APK" lalu tekan Run workflow.
6. Setelah proses selesai, buka hasil run dan unduh artifact bernama "Nailong-App-APK".
7. Ekstrak artifact tersebut; di dalamnya ada app-debug.apk.
8. Kirim APK ke HP Android, buka file tersebut, lalu izinkan pemasangan dari sumber itu jika Android meminta.

Catatan:
- Ini APK debug untuk uji coba pribadi, bukan rilis Play Store.
- Data permainan tersimpan lokal di perangkat.
- Fitur yang membutuhkan layanan server/akun online tidak disertakan sebagai fitur backend.
- Build perlu akses internet di GitHub Actions untuk mengunduh dependensi Android.

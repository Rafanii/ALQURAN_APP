<template>
  <div
    class="d-flex justify-content-center align-items-center vh-100"
    style="background: linear-gradient(to right, rgba(209, 225, 228, 0.8), rgba(255, 255, 255, 0.8)),
           url('/images/back-ground.svg') center/cover no-repeat;"
  >
    <div class="text-center p-5 rounded shadow-lg bg-white w-100" style="max-width: 600px;">
      <!-- Judul Arab dengan warna hijau islami -->
      <h1 class="display-4 fw-bold text-success" style="font-family: 'Amiri', serif;">القرآن</h1>
      <p class="mt-3 text-muted">Selamat datang di Alquran Digital</p>

      <!-- Tombol Navigasi dengan warna hijau islami -->
      <div class="d-grid gap-3 mt-4">
        <router-link
          to="/surah"
          class="btn btn-success rounded-pill py-2 px-4 fs-5"
        >
          📖 BACA QUR'AN
        </router-link>

        <router-link
          to="/terakhir-baca"
          class="btn btn-success rounded-pill py-2 px-4 fs-5"
        >
          🕓 TERAKHIR BACA
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<template>
  <div class="container mt-5">
    <div class="p-4 shadow rounded bg-white text-center">
      <h2 class="mb-3 text-success">📖 Terakhir Dibaca</h2>

      <div v-if="terakhirDibaca">
        <p><strong>Surah:</strong> {{ terakhirDibaca.namaSurah }}</p>
        <p><strong>Ayat:</strong> {{ terakhirDibaca.ayat }}</p>
        <router-link
          :to="`/surah/${terakhirDibaca.surahId}`"
          class="btn btn-success mt-3"
        >
          Lanjutkan Membaca
        </router-link>
      </div>

      <div v-else>
        <p>Belum ada data terakhir dibaca.</p>
        <router-link to="/surah" class="btn btn-outline-secondary mt-3">
          Mulai Membaca
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const terakhirDibaca = ref(null)

onMounted(() => {
  const saved = localStorage.getItem('terakhirDibaca')
  if (saved) {
    try {
      terakhirDibaca.value = JSON.parse(saved)
    } catch (e) {
      console.error('Data localStorage tidak valid:', e)
    }
  }
})
</script>

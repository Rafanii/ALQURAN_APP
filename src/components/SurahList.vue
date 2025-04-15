<template>
  <div class="container mt-4">
    <h2 class="text-center text-success fw-bold">Daftar Surah</h2>

    <div class="mt-3">
      <div v-if="activeTab === 'surah'" class="row">
        <div
          v-for="(surah, index) in surahs"
          :key="surah.id"
          class="col-md-6 mb-3"
        >
          <div class="card bg-light border border-success shadow-sm">
            <div class="d-flex align-items-start p-3">
              
              <div
                class="me-3 d-flex justify-content-center align-items-center bg-success text-white fw-bold rounded-circle"
                style="width: 50px; height: 50px;"
              >
                {{ surah.id }}
              </div>

              <div class="flex-grow-1">
                <a
                  @click="goToSurah(surah.id)"
                  class="text-decoration-none text-success"
                  style="cursor: pointer;"
                >
                 
                  <div class="fw-bold d-flex justify-content-between align-items-center">
                    <div>{{ surah.name_simple }}</div>
                    <div class="arabic-font-kanan">{{ surah.name_arabic }}</div>
                  </div>

                
                  <div class="d-flex justify-content-between align-items-center mt-2">
                    <div class="text-muted small">
                      Arti: {{ surah.translated_name.name }}
                      <span v-if="surah.translation_english">
                        ({{ surah.translation_english }})
                      </span>
                    </div>
                    <div class="text-muted small text-end">
                      {{ surah.revelation_place }} | {{ surah.verses_count }} Ayat
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const activeTab = ref('surah')
const surahs = ref([])

const router = useRouter()

const goToSurah = (id) => {
  router.push(`/surah/${id}`)
}

onMounted(async () => {
  try {
    const resSurah = await fetch('https://api.quran.com/api/v4/chapters?language=id')
    const dataSurah = await resSurah.json()

    const resSurahEn = await fetch('https://api.quran.com/api/v4/chapters?language=en')
    const dataSurahEn = await resSurahEn.json()

    surahs.value = dataSurah.chapters.map((item, index) => ({
      ...item,
      translation_english: dataSurahEn.chapters[index]?.translated_name?.name || '',
      name_arabic: dataSurahEn.chapters[index]?.name_arabic || ''
    }))
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Scheherazade+New&display=swap');

.arabic-font-kanan {
  font-family: 'Scheherazade New', serif;
  font-size: 1.5rem;
  direction: rtl;
  text-align: right;
}
</style>

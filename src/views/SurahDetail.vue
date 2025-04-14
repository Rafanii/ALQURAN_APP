<template>
  <div class="container mt-4">
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else>
      <h2 class="text-center mb-4">{{ surahName }}</h2>

      <!-- Tampilkan Bismillah hanya jika bukan surah ke-1 dan ke-9 -->
      <div v-if="showBismillah" class="text-center mb-4 fs-3 fw-bold" style="font-family: 'Scheherazade', serif;">
        ﷽
      </div>

      <div v-for="verse in verses" :key="verse.id" class="card mb-3 p-4">
        <div class="card-body">
          <p class="text-end fs-4">{{ verse.text_indopak }}</p>
          <p class="text-muted">Ayat {{ verse.verse_number }}</p>
          <p class="fst-italic">
            {{ verse.translation_id }} <br />
            <small class="text-secondary">({{ verse.translation_en }})</small>
          </p>
          <!-- Tombol Tandai per ayat -->
          <button
            @click="markAsLastRead(verse.verse_number)"
            class="btn btn-outline-success btn-sm mt-2"
          >
            ✅ Tandai Ayat Ini
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SurahDetail',
  data() {
    return {
      verses: [],
      loading: true,
      surahName: '',
      totalAyat: 0,
      showBismillah: true
    };
  },
  async mounted() {
    const surahId = this.$route.params.id;

    // Bismillah hanya ditampilkan jika bukan Surah ke-1 dan ke-9
    this.showBismillah = surahId !== '1' && surahId !== '9';

    const [responseId, responseEn] = await Promise.all([ 
      fetch(`https://api.quran.com/api/v4/verses/by_chapter/${surahId}?language=id&fields=text_indopak&translations=33&limit=300`), 
      fetch(`https://api.quran.com/api/v4/verses/by_chapter/${surahId}?language=en&translations=20&limit=300`) 
    ]);

    const dataId = await responseId.json();
    const dataEn = await responseEn.json();

    const mergedVerses = dataId.verses.map(verseId => {
      const verseEn = dataEn.verses.find(v => v.verse_key === verseId.verse_key);
      return {
        ...verseId,
        translation_id: verseId.translations[0]?.text.replace(/<[^>]+>/g, '') || '',
        translation_en: verseEn?.translations[0]?.text.replace(/<[^>]+>/g, '') || ''
      };
    });

    this.verses = mergedVerses;
    this.surahName = `Surah ke-${surahId}`;
    this.totalAyat = mergedVerses.length;
    this.loading = false;
  },
  methods: {
    markAsLastRead(ayat) {
      const surahId = this.$route.params.id;

      localStorage.setItem('terakhirDibaca', JSON.stringify({
        surahId,
        namaSurah: this.surahName,
        ayat
      }));

      alert(`Ayat ${ayat} berhasil ditandai sebagai terakhir dibaca!`);
    }
  }
};
</script>

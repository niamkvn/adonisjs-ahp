"use strict";

var math = require("mathjs");

/* Random Consistency Index */
const RI_MAP = {
  2: 0,
  3: 0.58,
  4: 0.9,
  5: 1.12,
  6: 1.24,
  7: 1.32,
  8: 1.41,
  9: 1.45,
  10: 1.49
};

class Ahp {
  constructor() {
    this.kriteria = [];
    this.kriteriaBanding = [];
  }
  tambahKriteria(kriteria) {
    let originalLength = this.kriteria.length;
    this.kriteria.push.apply(this.kriteria, kriteria);

    for (let row of this.kriteriaBanding) {
      row.push.apply(row, Array(kriteria.length).fill(0));
    }
    kriteria.forEach((krit, i) => {
      let newRow = Array(this.kriteria.length).fill(0);
      newRow[originalLength + i] = 1;
      this.kriteriaBanding.push(newRow);
    });

    return this;
  }

  hitungKriteria(preferences) {
    let preferredCriterion, comparingCriterion, scale;

    for (let prefer of preferences) {
      if (Array.isArray(prefer)) {
        [preferredCriterion, comparingCriterion, scale] = prefer;
      } else {
        preferredCriterion = prefer.preferredCriterion;
        comparingCriterion = prefer.comparingCriterion;
        scale = prefer.scale;
      }
      let kritAIndex = this.kriteria.indexOf(preferredCriterion);
      let kritBIndex = this.kriteria.indexOf(comparingCriterion);
      if (kritAIndex >= 0 && kritBIndex >= 0) {
        this.kriteriaBanding[kritAIndex][kritBIndex] = scale;
        this.kriteriaBanding[kritBIndex][kritAIndex] = 1 / scale;
      }
    }
  }

  run() {
    // Additive Normalization
    // proses 3.a Menjumlahkan nilai dari setiap kolom dalam matriks perbandingan berpasangan
    // proses 3.b Membagi setiap nilai dari kolom dengan total kolom yang bersangkutan untuk memperoleh normalisasi matriks
    let matriksNormalisasi = []; //bobot kriteria
    for (let i = 0; i < this.kriteriaBanding.length; i++) {
      let row = [];
      for (let j = 0; j < this.kriteriaBanding.length; j++) {
        row.push(this.kriteriaBanding[i][j]);
      }
      matriksNormalisasi.push(row);
    }
    // proses 3.c Menjumlahkan semua nilai setiap baris dari matriks yang telah dinormalisasi dan membaginya dengan jumlah elemen.
    let vekTotalNormalisasi = []
    for (let i = 0; i < this.kriteriaBanding.length; i++) {
      let colWeightFactor = 1 / math.sum(this.kriteriaBanding.map(row => row[i]));
      for (let j = 0; j < this.kriteriaBanding.length; j++) {
        matriksNormalisasi[j][i] = this.kriteriaBanding[j][i] * colWeightFactor;
      }
    }
    matriksNormalisasi.map(row => vekTotalNormalisasi.push(math.sum(row)))
    let vektorBobot = matriksNormalisasi.map(row => math.mean(row));

    let bobotKriteria = [];
    this.kriteria.forEach((item, i) => {
      bobotKriteria.push({
        nama: this.kriteria[i],
        bobot: vektorBobot[i]
      });
    });

    // proses 4.a Menghitung nilai lamb maks
    let vektorKonsistensi = math.multiply(this.kriteriaBanding, vektorBobot);
    let pengukuranKonsistensi = [];
    for (let i = 0; i < vektorBobot.length; i++) {
      pengukuranKonsistensi[i] = vektorKonsistensi[i] / vektorBobot[i];
    }
    let avgConsistencyMeasures = math.mean(pengukuranKonsistensi);
    let ci =
      (avgConsistencyMeasures - this.kriteriaBanding.length) /
      (this.kriteriaBanding.length - 1);
    let ri = RI_MAP[this.kriteriaBanding.length];
    let cr = ri > 0 ? ci / ri : 0;
    let pesan = "";
    if (cr > 0.1) {
      pesan = `CR > 0.1, Prioritas kriteria tidak konsisten!`;
    } else {
      pesan = `CR <= 0.1, Prioritas kriteria konsisten.`;
    }

    return {
      kriteria: this.kriteria,
      matriksPerbandingan: this.kriteriaBanding,
      matriksNormalisasi,
      vekTotalNormalisasi,
      bobotKriteria_eigenVektor: bobotKriteria,
      lambdaMax: avgConsistencyMeasures,
      ci,
      ri,
      cr,
      pesan
    };
  }
}

module.exports = Ahp;

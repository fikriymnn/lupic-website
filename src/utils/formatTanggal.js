export function formatTanggalIndonesia(tanggalString) {
  // Format input: "DD/MM/YYYY"
  const [day, month, year] = tanggalString.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  const namaHari = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const namaBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const hari = namaHari[date.getDay()];
  const bulan = namaBulan[date.getMonth()];

  return `${hari}, ${day} ${bulan} ${year}`;
}
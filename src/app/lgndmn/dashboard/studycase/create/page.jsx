"use client";
import { useState } from 'react';
import { ChevronLeft, Trash2 } from 'lucide-react';

const useCase =   {
    _id: '3',
    judulKasus: 'Integrasi Materi IPA: Siklus Air dan Perubahan Wujud',
    deskripsi: 'Pembelajaran IPA terpadu mengenai siklus air dengan konsep perubahan wujud zat',
    jenjang: 'SD',
    topikIPA: 'IPA Terpadu',
    kompetensiGuru: 'Pedagogik',
    narasiLengkap: 'Guru SD mengintegrasikan pembelajaran tentang siklus air dengan materi perubahan wujud zat. Melalui demonstrasi sederhana dan video animasi, siswa memahami bagaimana air menguap, mengembun, dan turun kembali sebagai hujan. Pembelajaran ini menggabungkan aspek fisika dan biologi.',
    pertanyaanAnalisis: [
      'Apa keuntungan pembelajaran IPA terpadu untuk siswa SD?',
      'Media apa saja yang efektif untuk materi ini?'
    ],
    pembahasan: 'Pembelajaran IPA terpadu membantu siswa melihat keterkaitan antar konsep sehingga lebih bermakna. Media seperti video animasi, demonstrasi langsung, dan model 3D sangat efektif untuk memvisualisasikan proses yang abstrak.'
  }



export default function AddUseCase() {
  const [editingUseCase, setEditingUseCase] = useState(null);
  const [formData, setFormData] = useState(useCase || {
    judulKasus: '',
    deskripsi: '',
    jenjang: 'SD',
    topikIPA: 'Fisika',
    kompetensiGuru: 'Pedagogik',
    narasiLengkap: '',
    pertanyaanAnalisis: ['', '', ''],
    pembahasan: ''
  });

  const handleChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...formData.pertanyaanAnalisis];
    newQuestions[index] = value;
    setFormData({...formData, pertanyaanAnalisis: newQuestions});
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      pertanyaanAnalisis: [...formData.pertanyaanAnalisis, '']
    });
  };

  const removeQuestion = (index) => {
    const newQuestions = formData.pertanyaanAnalisis.filter((_, i) => i !== index);
    setFormData({...formData, pertanyaanAnalisis: newQuestions});
  };

      const onSave = (formData) => {
    console.log('Saving:', formData);
    alert(editingUseCase ? 'Kasus berhasil diupdate!' : 'Kasus baru berhasil ditambahkan!');
    setCurrentPage('admin');
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            className="p-2 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-4xl font-bold text-gray-800">
            {useCase ? 'Edit Kasus' : 'Tambah Kasus Baru'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Judul Kasus *
            </label>
            <input
              type="text"
              required
              value={formData.judulKasus}
              onChange={(e) => handleChange('judulKasus', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Deskripsi Singkat
            </label>
            <textarea
              value={formData.deskripsi}
              onChange={(e) => handleChange('deskripsi', e.target.value)}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jenjang *
              </label>
              <select
                required
                value={formData.jenjang}
                onChange={(e) => handleChange('jenjang', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Topik IPA *
              </label>
              <select
                required
                value={formData.topikIPA}
                onChange={(e) => handleChange('topikIPA', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="Fisika">Fisika</option>
                <option value="Biologi">Biologi</option>
                <option value="IPA Terpadu">IPA Terpadu</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Kompetensi Guru *
              </label>
              <select
                required
                value={formData.kompetensiGuru}
                onChange={(e) => handleChange('kompetensiGuru', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="Pedagogik">Pedagogik</option>
                <option value="Profesional">Profesional</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Narasi Lengkap *
            </label>
            <textarea
              required
              value={formData.narasiLengkap}
              onChange={(e) => handleChange('narasiLengkap', e.target.value)}
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                Pertanyaan Analisis *
              </label>
              <button
                type="button"
                onClick={addQuestion}
                className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition"
              >
                + Tambah Pertanyaan
              </button>
            </div>
            {formData.pertanyaanAnalisis.map((question, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  placeholder={`Pertanyaan ${index + 1}`}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                {formData.pertanyaanAnalisis.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pembahasan
            </label>
            <textarea
              value={formData.pembahasan}
              onChange={(e) => handleChange('pembahasan', e.target.value)}
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              {useCase ? 'Update Kasus' : 'Simpan Kasus'}
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
import React from 'react';

export default function AdminCardNews({ judul, deskripsi, tanggal, id, gambar }) {
  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + " ...";
    }
    return text;
  };

  const onDelete = async (e) => {
    e.preventDefault();
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      
      if (data === "success") {
        alert("Berhasil menghapus berita");
        window.location.reload();
      }
    } catch (err) {
      console.error("Error deleting news:", err);
      alert("Gagal menghapus berita");
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    window.location.href = `/lgndmn/dashboard/news/${id}`;
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {/* Image Container */}
        <div className="relative w-full h-48 overflow-hidden bg-gray-100">
          <img
            src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${gambar}`}
            alt={judul}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content Container */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-lg text-blue-600 mb-2 line-clamp-2 min-h-[3.5rem]">
            {truncateText(judul, 9)}
          </h3>

          {/* Date */}
          <p className="text-blue-400 text-xs mb-3">{tanggal}</p>

          {/* Description */}
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {truncateText(deskripsi, 12)}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={handleEdit}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
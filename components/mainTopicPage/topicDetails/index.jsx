"use client";
import { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 4;

const TopicDetails = ({ selectedTopic }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTopic]);

  if (!selectedTopic) {
    return (
      <div className="text-gray-500 text-sm">Lütfen bir ana başlık seçin.</div>
    );
  }

  const totalItems = selectedTopic.subTopics.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedTopics = selectedTopic.subTopics.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col h-full min-h-[550px]">
      {/* İçerik alanı */}
      <div className="flex-1 overflow-auto space-y-4">
        <div className="min-h-[400px] flex flex-col space-y-4">
          {paginatedTopics.map((subTopic, index) => (
            <div
              key={subTopic.id}
              className="flex gap-1 md:gap-3 lg:gap-4 items-start border border-tertiary-50 bg-white py-6 px-2 md:px-4 rounded-lg shadow-md"
            >
              {/* Sıra Numarası */}
              <div className="flex items-center justify-center size-4 md:size-8 rounded-[4px] text-tertiary-800 bg-customLila p-3 font-bold">
                {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
              </div>
              {/* İçerik */}
              <div className="flex flex-col gap-5">
                <h4 className="font-Inter font-semibold md:font-bold lg:leading-10 text-base lg:text-[24px] text-tertiary-800">
                  {subTopic.title}
                </h4>
                <p
                  className="font-lexend font-medium leading-6 text-[16px] text-gray-500"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {subTopic.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Alanı */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-6 mt-6 border-t border-gray-100">
          <button
            className="cursor-pointer text-sm px-4 py-2 rounded-md border transition-all duration-200 bg-tertiary-400 hover:bg-tertiary-500 text-white disabled:cursor-default disabled:bg-gray-100 disabled:text-black disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Önceki
          </button>
          <span className="text-sm text-gray-600">
            Sayfa {currentPage} / {totalPages}
          </span>
          <button
            className="cursor-pointer text-sm px-4 py-2 rounded-md border transition-all duration-200 bg-tertiary-400 hover:bg-tertiary-500 text-white disabled:cursor-default disabled:bg-gray-100 disabled:text-black disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Sonraki
          </button>
        </div>
      )}
    </div>
  );
};

export default TopicDetails;

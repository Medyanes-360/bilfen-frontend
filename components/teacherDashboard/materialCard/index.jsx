"use client";
import { Modal } from "@/components/modal";
import { useModalCompletion } from "@/hooks/useModalCompletion";
import { getFileExtension } from "@/lib/utils";
import { IconByTypeInfo } from "@/public/icons/TeacherMaterialIcons";
import { useMemo, useState } from "react";
import ReactPlayer from "react-player";

const MaterialCard = ({ material }) => {
  const typeInfo = useMemo(
    () => new IconByTypeInfo(material.type),
    [material?.type]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { onOpen, onClose } = useModalCompletion(async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${material?.id}?isComplete=true`;
      await fetch(url, {
        method: "PATCH",
      });
      console.log("Materyal güncellendi");
    } catch (error) {
      console.log("Hata: ", error);
    }
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    onOpen();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <>
      <div className="group flex border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-blue-200">
        <div className="w-1.5 bg-blue-600 group-hover:w-2 transition-all duration-300" />

        <div className="flex flex-1 flex-col sm:flex-row p-4 gap-3 sm:gap-0">
          <div
            className={`mr-0 sm:mr-4 ${typeInfo.bgColor} ${typeInfo.color} p-3 rounded-lg flex items-center justify-center border ${typeInfo.borderColor} h-full group-hover:shadow-md transition-all duration-300 ease-in-out group-hover:scale-105 w-fit self-start`}
          >
            <div className="transform transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
              {typeInfo.icon}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="min-w-0 pr-1">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base flex items-center flex-wrap gap-1 truncate group-hover:text-blue-700 transition-colors duration-300">
                  <span className="break-words whitespace-normal">
                    {material.title}
                  </span>
                  {material.viewed && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full whitespace-nowrap group-hover:bg-green-200 transition-colors duration-300">
                      ✓ İncelendi
                    </span>
                  )}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                  {material.description}
                </p>
              </div>
              <div
                className={`text-xs px-2 py-1 rounded-full ${typeInfo.bgColor} ${typeInfo.color} font-medium whitespace-nowrap group-hover:shadow-sm group-hover:scale-105 transition-all duration-300 w-fit uppercase`}
              >
                {getFileExtension(material.fileUrl)}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-3 sm:gap-0">
              <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 gap-4 group-hover:text-gray-700 transition-colors duration-300">
                <span className="flex items-center whitespace-nowrap">
                  📅 {material?.publishDateTeacher}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:w-auto">
                <button
                  onClick={handleOpenModal}
                  className="cursor-pointer w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded flex items-center justify-center text-xs sm:text-sm font-medium hover:bg-blue-700 shadow-sm hover:shadow active:shadow-inner active:scale-95 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  {typeInfo.buttonIcon}
                  <span className="ml-1">{typeInfo.buttonText}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && material && (
        <Modal onClose={handleCloseModal} className="max-w-5xl">
          <div className="space-y-6">
            <div className="border-b pb-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                {/* Icon alanı */}
                <div
                  className={`w-fit self-start ${typeInfo.bgColor} ${typeInfo.color} p-3 rounded-lg flex items-center justify-center border ${typeInfo.borderColor} group-hover:shadow-md transition-all duration-300 ease-in-out group-hover:scale-105`}
                >
                  <div className="transform transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
                    {typeInfo.icon}
                  </div>
                </div>

                {/* Başlık + Açıklama */}
                <div className="text-start">
                  <h2 className="text-xl sm:text-2xl font-bold mb-1 break-words whitespace-normal">
                    {material.title}
                  </h2>
                  {material.description && (
                    <p className="text-sm text-gray-600">
                      {material.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-md overflow-hidden">
              {material.type === "video" && (
                <div className="w-full h-[200px] sm:h-[400px] md:h-[500px]">
                  <ReactPlayer
                    url={material.fileUrl}
                    className="rounded"
                    controls
                    width="100%"
                    height="100%"
                    config={{
                      file: {
                        attributes: {
                          controlsList: "nodownload",
                          disablePictureInPicture: true,
                          playsInline: true,
                          preload: "auto",
                        },
                      },
                    }}
                  />
                </div>
              )}

              {material.type === "document" && (
                <div className="w-full h-[400px] sm:h-[500px]">
                  <iframe
                    src={material.fileUrl}
                    className="w-full h-full border rounded"
                    title="Doküman Önizleme"
                  />
                </div>
              )}
            </div>

            {/* Kapat Butonu */}
            <div className="flex justify-end border-t pt-2">
              <button
                onClick={handleCloseModal}
                className="cursor-pointer px-4 py-2 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                Kapat
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MaterialCard;

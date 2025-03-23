const TopicDetails = ({ selectedTopic }) => {
  if (!selectedTopic) {
    return (
      <div className="text-gray-500 text-sm">Lütfen bir ana başlık seçin.</div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 h-full">
      {selectedTopic.subTopics.map((subTopic, index) => (
        <div
          key={index}
          className="flex gap-1 md:gap-3 lg:gap-4 items-start border border-tertiary-50 bg-white py-6 px-2 md:px-4 rounded-lg shadow-md"
        >
          {/* Sıra Numarası */}
          <div className="flex items-center justify-center size-4 md:size-8 rounded-[4px] text-tertiary-800 bg-customLila p-3 font-bold">
            {index + 1}
          </div>
          {/* İçerik */}
          <div className="flex flex-col gap-5">
            {/* SubTopic Title */}
            <h4 className="font-Inter font-semibold md:font-bold lg:leading-10 text-base lg:text-[24px] text-tertiary-800">
              {subTopic.title}
            </h4>
            {/* SubTopic Description */}
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
  );
};

export default TopicDetails;

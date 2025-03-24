"use client";
import { useEffect, useState } from "react";

const MainTopic = ({ onTopicSelect, activeId, topics }) => {
  const [activeTopic, setActiveTopic] = useState(activeId || null);

  useEffect(() => {
    if (activeId) setActiveTopic(activeId);
  }, [activeId]);

  const handleTopicClick = (topic) => {
    setActiveTopic(topic.id);
    onTopicSelect(topic);
  };

  return (
    <div
      className="flex flex-col w-full h-full gap-4 lg:gap-8 rounded-lg bg-white border border-tertiary-50"
      style={{
        boxShadow: "0px 12px 24px -4px #919EAB29",
      }}
    >
      <h2 className="font-Inter font-bold text-2xl lg:text-3xl leading-[54px] text-center lg:text-start text-tertiary-800 p-6 pb-0">
        Ana Topikler
      </h2>
      <div className="flex flex-col space-y-4 w-full mb-10 md:mb-0">
        {/* Ana Topikler */}
        {topics.map((topic, index) => (
          <div
            key={index}
            onClick={() => handleTopicClick(topic)}
            className={`flex items-center gap-3 cursor-pointer px-6 md:px-4 lg:px-6 rounded-md ${
              activeTopic === topic.id ? "bg-white" : "hover:bg-purple-100"
            }`}
            style={{ position: "relative" }}
          >
            {activeTopic === topic.id && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "5px",
                  height: "42px",
                  backgroundColor: "#915DFF",
                  borderRadius: "0px 12px 12px 0px",
                }}
              />
            )}
            <div className="size-16 text-3xl flex items-center justify-center rounded-full bg-white m-2 p-2 drop-shadow-custom-combined leading-none aspect-square">
              {topic.icon}
            </div>
            <div
              className={`font-lexend font-bold text-start text-sm lg:text-base ${
                activeTopic === topic.id
                  ? "text-tertiary-400"
                  : "text-tertiary-800"
              }`}
            >
              {topic.mainTopic}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainTopic;

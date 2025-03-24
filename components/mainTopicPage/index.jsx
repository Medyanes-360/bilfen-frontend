"use client";
import PageContainer from "@/containers/pageContainer";
import { useEffect, useState } from "react";
import TopicDetails from "./topicDetails";
import MainTopic from "./mainTopic";
import mainTopicMockData from "@/data/mainTopicMockData";

const MainTopicPage = ({ searchTerm }) => {
  const [filteredTopics, setFilteredTopics] = useState(mainTopicMockData);
  const [selectedTopic, setSelectedTopic] = useState(mainTopicMockData[0]);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  useEffect(() => {
    const term = searchTerm?.toLowerCase() || "";

    if (!term) {
      setFilteredTopics(mainTopicMockData);
      setSelectedTopic(mainTopicMockData[0]);
      return;
    }

    const result = mainTopicMockData
      .map((mainTopic) => {
        const matchingSubTopics = mainTopic.subTopics.filter(
          (sub) =>
            sub.title.toLowerCase().includes(term) ||
            sub.description.toLowerCase().includes(term)
        );

        if (matchingSubTopics.length > 0) {
          return {
            ...mainTopic,
            subTopics: matchingSubTopics,
          };
        }
        return null;
      })
      .filter(Boolean);

    setFilteredTopics(result);
    setSelectedTopic(result[0] || null);
  }, [searchTerm]);

  return (
    <section className="my-6 z-20">
      <PageContainer
        style={{
          boxShadow:
            "-20px 20px 40px -4px #919EAB3D, 0px 0px 2px 0px #919EAB3D",
        }}
        className="bg-[#fff] rounded-3xl p-6 z-20"
      >
        {filteredTopics.length === 0 && searchTerm ? (
          <div className="w-full flex flex-col items-center justify-center py-20 text-center gap-4 text-gray-500">
            <p className="text-lg font-semibold">Sonuç bulunamadı</p>
            <p className="text-sm text-gray-400">
              Aramanızla eşleşen herhangi bir içerik bulunamadı.
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:basis-[35%]">
              <MainTopic
                onTopicSelect={setSelectedTopic}
                activeId={selectedTopic?.id}
                topics={filteredTopics}
              />
            </div>
            <div className="w-full md:basis-[65%]">
              <TopicDetails
                selectedTopic={selectedTopic}
                searchTerm={searchTerm}
              />
            </div>
          </div>
        )}
      </PageContainer>
    </section>
  );
};

export default MainTopicPage;

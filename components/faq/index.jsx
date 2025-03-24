import PageContainer from "@/containers/pageContainer";
import FaqAmico from "./faqAmico";
import FaqSearch from "./faqSearch";

const FaqPage = ({ onSearch }) => {
  return (
    <PageContainer className="!bg-[#f9f9f9] !rounded-[39px]">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start py-6 gap-4 sm:gap-0 sm:!p-10">
        <div className="flex w-full justify-center sm:justify-start sm:w-1/3">
          <FaqAmico />
        </div>
        <div className="w-full sm:w-2/3">
          <FaqSearch onSearch={onSearch} />
        </div>
      </div>
    </PageContainer>
  );
};

export default FaqPage;

import { Button } from "antd";
import React from "react";
// import SectionFormModal from "./curriculum-components/section-form-modal";
import SectionFormModal from "./curriculum-components/SectionFormModal";
// import SectionData from "./curriculum-components/section-data";
import SectionData from "./curriculum-components/SectionData";

function CurriculumTab({
  sections,
  setSections,
}: {
  sections: any[];
  setSections: (sections: any[]) => void;
}) {
  const [showSectionFormModal, setShowSectionFormModal] = React.useState(false);
  const handleAddSection = () => {
    setShowSectionFormModal(true);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button type="primary" onClick={handleAddSection}>
          Add Section
        </Button>
      </div>

      <div className="flex flex-col gap-5 mt-5">
        {sections.map((section, index) => (
          <SectionData
            key={index}
            section={section}
            setSections={setSections}
            sectionIndex={index}
          />
        ))}
      </div>

      {showSectionFormModal && (
        <SectionFormModal
          showSectionFormModal={showSectionFormModal}
          setShowSectionFormModal={setShowSectionFormModal}
          setSections={setSections}
        />
      )}
    </div>
  );
}

export default CurriculumTab;

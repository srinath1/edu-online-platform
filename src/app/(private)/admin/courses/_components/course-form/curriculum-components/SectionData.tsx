import { Edit2, MoreVertical, PlusIcon, Trash2 } from "lucide-react";
import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import React from "react";
import ActionItem from "./ActionItem";
import SectionFormModal from "./SectionFormModal";
import LessonFormModal from "./LessonFormModal";
import LessonData from "./LessonData";

const SectionData = ({
  section,
  setSections,
  sectionIndex,
}: {
  section: any;
  setSections: any;
  sectionIndex: number;
}) => {
  const [showSectionFormModel, setShowSectionFormModel] = React.useState(false);
  const [showLessonFormModal, setShowLessonFormModal] = React.useState(false);
  const handleDeleteSection = () => {
    setSections((prev: any) => {
      const updatedSections = [...prev];
      updatedSections.splice(sectionIndex, 1);
      return updatedSections;
    });
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <ActionItem
          title="Edit"
          icon={<Edit2 size={15} />}
          onClick={() => setShowSectionFormModel(true)}
        />
      ),
    },
    {
      key: "2",
      label: (
        <ActionItem
          title="Delete"
          icon={<Trash2 size={15} />}
          onClick={() => handleDeleteSection}
        />
      ),
    },
    {
      key: "3",
      label: (
        <ActionItem
          title="Add Lesson"
          icon={<PlusIcon size={15} />}
          onClick={() => setShowLessonFormModal(true)}
        />
      ),
    },
  ];

  return (
    <div className="border p-5 border-gray-400 mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-bold">
          Section {sectionIndex + 1}:{section.name}
        </h1>
        <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
          <Button className="border-none" size="small">
            <MoreVertical size={20} />
          </Button>
        </Dropdown>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        {section?.lessons?.map((lesson: any, lessonIndex: number) => {
          return (
            <LessonData
              lesson={lesson}
              lessionIndex={lessonIndex}
              setSections={setSections}
              key={lessonIndex}
              sectionIndex={sectionIndex}
            />
          );
        })}
      </div>
      {showSectionFormModel && (
        <SectionFormModal
          showSectionFormModal={showSectionFormModel}
          setShowSectionFormModal={setShowSectionFormModel}
          setSections={setSections}
          selectedSection={section}
          sectionIndex={sectionIndex}
          type="edit"
        />
      )}
      {showLessonFormModal && (
        <LessonFormModal
          showLessonFormModal={showLessonFormModal}
          setShowLessonFormModal={setShowLessonFormModal}
          setSections={setSections}
          type="add"
          // selectedLesson={null}
          // lessonIndex={0}
          sectionIndex={sectionIndex}
        />
      )}
    </div>
  );
};

export default SectionData;

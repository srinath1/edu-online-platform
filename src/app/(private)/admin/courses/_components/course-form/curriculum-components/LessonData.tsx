import React from "react";
import { Edit2, MoreVertical, Trash2 } from "lucide-react";
import ActionItem from "./ActionItem";
import { Dropdown, MenuProps, Button } from "antd";
import LessonFormModal from "./LessonFormModal";

const LessonData = ({
  lesson,
  lessionIndex,
  sectionIndex,
  setSections,
}: {
  lesson: any;
  lessionIndex: number;
  sectionIndex: number;
  setSections: any;
}) => {
  const [showLessonFormModal, setShowLessonFormModal] = React.useState(false);
  const handleDeleteLesson = () => {
    setSections((prev: any) => {
      const updatedSections = [...prev];
      updatedSections[sectionIndex].lessons.splice(lessionIndex, 1);
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
          onClick={() => setShowLessonFormModal(true)}
        />
      ),
    },
    {
      key: "2",
      label: (
        <ActionItem
          title="Delete"
          icon={<Trash2 size={15} />}
          onClick={() => handleDeleteLesson()}
        />
      ),
    },
  ];
  return (
    <div key={lessionIndex} className="bg-gray-100 p-2 border border-gray-200">
      <div className="flex justify-between items-center">
        <h1 className="text-sm">
          {lessionIndex + 1}:{lesson.name}
        </h1>
        <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
          <Button className="border-none" size="small">
            <MoreVertical size={20} />
          </Button>
        </Dropdown>
      </div>
      {showLessonFormModal && (
        <LessonFormModal
          selectedLesson={lesson}
          lessonIndex={lessionIndex}
          sectionIndex={sectionIndex}
          setShowLessonFormModal={setShowLessonFormModal}
          showLessonFormModal={showLessonFormModal}
          type="edit"
          setSections={setSections}
        />
      )}
    </div>
  );
};

export default LessonData;

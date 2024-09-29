import React from "react";
import { Modal, Input, Select, message, Button } from "antd";
import mediaGlobalStore, { ImediaGlobalStore } from "@/store/media-store";

const LessonFormModal = ({
  showLessonFormModal,
  setShowLessonFormModal,
  setSections,
  type,
  selectedLesson,
  lessonIndex,
  sectionIndex,
}: {
  showLessonFormModal: boolean;
  setShowLessonFormModal: (showLessonFormModal: any) => void;
  setSections: (section: any) => void;
  type: "add" | "edit";
  selectedLesson?: any;
  lessonIndex?: number;
  sectionIndex: number;
}) => {
  const [name, setname] = React.useState("");
  const [video, setVideo] = React.useState("");

  const { media } = mediaGlobalStore() as ImediaGlobalStore;
  React.useEffect(() => {
    if (type === "edit") {
      setname(selectedLesson.name);
      setVideo(selectedLesson.video);
    }
  }, []);
  const handleSave = () => {
    try {
      if (type === "add") {
        setSections((prev: any) => {
          const updatedSections = [...prev];
          updatedSections[sectionIndex].lessons.push({
            name,
            video,
          });
          return updatedSections;
        });
      } else {
        setSections((prev: any) => {
          const updatedSections = [...prev];
          updatedSections[sectionIndex].lessons[lessonIndex!] = { name, video };
          return updatedSections;
        });
      }
      message.success("Lessons saved Successfully");
      setShowLessonFormModal(false);
    } catch (error: any) {
      message.error("Failed to Save lesson");
    }
  };

  return (
    <Modal
      open={showLessonFormModal}
      onCancel={() => setShowLessonFormModal(false)}
      title={type === "add" ? "Add Lesson" : "Edit Lesson"}
      centered
      footer={null}
    >
      <hr />
      <div className="mt-5">
        <label htmlFor="name">Lesson Name</label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          placeholder="Pls enter  Lesson name"
          required
        />
      </div>
      <div className="mt-5 flex flex-col">
        <label htmlFor="name">Select Video</label>
        <Select value={video} onChange={(value) => setVideo(value)}>
          {media.map((item: any) => {
            return (
              <Select.Option value={item.url} key={item._id}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </div>
      <div className="flex justify-end gap-5 mt-5">
        <Button>Cancel</Button>
        <Button type="primary" onClick={() => handleSave()} disabled={!name}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default LessonFormModal;

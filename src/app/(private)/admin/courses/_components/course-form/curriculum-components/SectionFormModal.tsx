import React from "react";
import { Button, Input, Modal, message } from "antd";

const SectionFormModal = ({
  showSectionFormModal,
  setShowSectionFormModal,
  type = "add",
  setSections,
  selectedSection,
  sectionIndex,
}: {
  showSectionFormModal: boolean;
  setShowSectionFormModal: (setShowSectionFormModal: boolean) => void;
  type?: "add" | "edit";
  setSections: (sections: any) => void;
  selectedSection?: any;
  sectionIndex?: number;
}) => {
  const [name, setName] = React.useState("");
  const handleSave = () => {
    try {
      if (type === "add") {
        setSections((prev: any) => [...prev, { name, lessons: [] }]);
      } else {
        setSections((prev: any) => {
          const updatedSections = [...prev];
          updatedSections[sectionIndex!] = {
            ...updatedSections[sectionIndex!],
            name,
          };
          return updatedSections;
        });
      }
      setShowSectionFormModal(false);
      setName("");
      message.success(
        type === "add"
          ? "Section Added successfully"
          : "Section updated successfully"
      );
    } catch (error: any) {
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    if (type === "edit") {
      setName(selectedSection?.name);
    }
  }, []);
  return (
    <div>
      <Modal
        title={type === "add" ? "Add Section" : "Edit Section"}
        open={showSectionFormModal}
        onCancel={() => setShowSectionFormModal(false)}
        centered
        footer={null}
      >
        <div>
          <label htmlFor="name">Section Name</label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex justify-end mt-5 gap-5">
          <Button
            onClick={() => {
              setShowSectionFormModal(false);
              setName("");
            }}
          >
            Cancel
          </Button>
          <Button type="primary" onClick={handleSave} disabled={!name}>
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SectionFormModal;

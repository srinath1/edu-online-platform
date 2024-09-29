import { Modal, Input, Upload, Button, message, Progress } from "antd";
import React from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import firebaseApp from "@/config/firebaseConfig";
import { saveMedia } from "@/server-actions/media-library";

const MediaUplaodModal = ({
  showMediaUploadModal,
  setShowMediaUploadModal,
  reloadData,
}: {
  showMediaUploadModal: boolean;
  setShowMediaUploadModal: (show: boolean) => void;
  reloadData: () => void;
}) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [name, setName] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [progressDone, setProgressDone] = React.useState<number>(0);

  const upload = async () => {
    try {
      const storage = getStorage(firebaseApp);
      const storageRef = ref(storage, `media/${selectedFile?.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile!);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setLoading(true);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressDone(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          setLoading(false);
          throw error;
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            message.success("Media Uploaded Successfully");

            const response = await saveMedia({
              name: name,
              url: downloadURL,
              type: selectedFile?.type,
            } as any);
            if (response.success) {
              reloadData();
              setShowMediaUploadModal(false);
              setLoading(false);
              message.success("Media saved Successfully");
            } else {
              setLoading(false);
              message.error(response.message);
            }
          });
        }
      );
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={showMediaUploadModal}
      onCancel={() => setShowMediaUploadModal(false)}
      title="Upload Media"
      footer={null}
      centered
    >
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="Name"></label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </div>
        <div>
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setSelectedFile(file);
              return false;
            }}
            onRemove={() => setSelectedFile(null)}
            maxCount={1}
          >
            <span className="text-xs">
              {selectedFile ? "Change Video" : "Upload Video"}
            </span>
          </Upload>
        </div>
        {loading && (
          <Progress
            percent={Number(progressDone.toFixed(2))}
            status="active"
            showInfo={true}
          />
        )}
        <div className="flex justify-end gap-5">
          <Button onClick={() => setShowMediaUploadModal(false)}>Cancel</Button>
          <Button
            disabled={!name || !selectedFile}
            loading={loading}
            onClick={() => upload()}
          >
            Upload
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MediaUplaodModal;

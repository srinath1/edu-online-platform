"use client";
import PageTitle from "@/components/PageTitle";
import React from "react";
import { Button, message, Table, Tooltip } from "antd";
import MediaUplaodModal from "./_components/MediaUplaodModal";
import { IMedia } from "@/interfaces";
import { deleteMedia, getAllMedia } from "@/server-actions/media-library";
import { getDateTimeFormat } from "@/helpers/date-time-format";
import { PlayCircle, Trash2 } from "lucide-react";
import PreviewMediaModal from "./_components/preview-media-modal";

const MediaLibrary = () => {
  const [showMediaUploadModal, setShowMediaUploadModal] = React.useState(false);
  const [media, setMedia] = React.useState<IMedia[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showPreviewModal, setShowPrewviewModal] = React.useState(false);
  const [selectMedia, setSelectMedia] = React.useState<IMedia | null>(null);
  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllMedia();
      if (response.success) {
        setMedia(response.data);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Type", dataIndex: "type", key: "type" },
    {
      title: "Uploaded At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "Action",
      dataIndex: "action",
      kay: "action",
      render: (text: string, record: IMedia) => (
        <div className="flex gap-5">
          <Button
            size="small"
            onClick={() => {
              deleteMediaHandler(record._id);
            }}
          >
            <Trash2 size={14} />
          </Button>
          <Tooltip title="Preview">
            <Button
              size="small"
              onClick={() => {
                setSelectMedia(record);
                setShowPrewviewModal(true);
              }}
            >
              <PlayCircle size={14} />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const deleteMediaHandler = async (id: string) => {
    try {
      setLoading(true);
      const response = await deleteMedia(id);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {}
  };
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Media Library" />
        <Button onClick={() => setShowMediaUploadModal(true)}>
          {" "}
          Uplaod New Media
        </Button>
      </div>
      <Table dataSource={media} columns={columns} loading={loading} />
      {showMediaUploadModal && (
        <MediaUplaodModal
          showMediaUploadModal={showMediaUploadModal}
          setShowMediaUploadModal={setShowMediaUploadModal}
          reloadData={getData}
        />
      )}
      {showPreviewModal && (
        <PreviewMediaModal
          selectedMedia={selectMedia!}
          showPreviewModal={showPreviewModal}
          setShowPreviewModal={setShowPrewviewModal}
        />
      )}
    </div>
  );
};

export default MediaLibrary;

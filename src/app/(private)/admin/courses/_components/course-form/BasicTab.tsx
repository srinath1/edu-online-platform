import { Form, Input, Select, Upload } from "antd";
import React from "react";
export const categories = [
  { label: "Web Dev", value: "web-development" },
  { label: "Mobile Development", value: "mobile-development" },
  { label: "Game Development", value: "game-development" },
  { label: "Data Science", value: "data-science" },
  { label: "Machine Learning", value: "Machine-learning" },
];

const BasicTab = ({
  coverImage,
  setCoverImage,
  promoVideo,
  setPromoVideo,
}: {
  coverImage: File | null | string;
  setCoverImage: (file: File) => void;
  promoVideo: File | null | string;
  setPromoVideo: (file: File) => void;
}) => {
  let FileListOfCoverImage: any[] = [];
  console.log("CoverIm", coverImage);
  if (coverImage && typeof coverImage === "string") {
    FileListOfCoverImage = [
      {
        uid: coverImage,
        name: coverImage,
        url: coverImage,
        type: "image/jpeg",
      },
    ];
    console.log("FileListCoverImage", FileListOfCoverImage);
  }
  if (coverImage && typeof coverImage === "object") {
    FileListOfCoverImage = [
      {
        ...coverImage,
        url: URL.createObjectURL(coverImage),
      },
    ];
    console.log("FileListCoverImage", FileListOfCoverImage);
  }

  let FileListOfpromoVideo: any[] = [];
  if (promoVideo && typeof promoVideo === "string") {
    FileListOfpromoVideo = [
      { uid: promoVideo, name: "video/mp4", url: promoVideo },
    ];
    console.log("FileListpromoVideo", FileListOfpromoVideo);
  }
  if (promoVideo && typeof promoVideo === "object") {
    FileListOfpromoVideo = [
      {
        ...promoVideo,
        url: URL.createObjectURL(promoVideo),
      },
    ];
    console.log("FileListpromoVideo", FileListOfpromoVideo);
  }
  return (
    <div className="flex flex-col gap-5">
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please Enter Course Title" }]}
      >
        <Input placeholder="Please Enter Title" />
      </Form.Item>
      <Form.Item
        label="SubTitle"
        name="subTitle"
        rules={[{ required: true, message: "Please Enter Course Subtitle" }]}
      >
        <Input placeholder="Please Enter SubTitle" />
      </Form.Item>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please Enter Course price" }]}
        >
          <Input placeholder="Please Enter Price" type="number" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please Enter category" }]}
        >
          <Select placeholder="Please enter category">
            {categories.map((c) => {
              return (
                <Select.Option key={c.value} value={c.value}>
                  {c.label}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Form.Item name="coverImage" label="Cover Image">
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setCoverImage(file);
              return false;
            }}
            accept="image/*"
            fileList={FileListOfCoverImage}
          >
            <span className="text-sm">Uplaod an Image</span>
          </Upload>
        </Form.Item>
        <Form.Item name="promoVideo" label="Promo Video">
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              setPromoVideo(file);
              return false;
            }}
            accept="video/*"
            fileList={FileListOfpromoVideo}
          >
            <span className="text-sm">Uplaod a Video</span>
          </Upload>
        </Form.Item>
      </div>
    </div>
  );
};

export default BasicTab;

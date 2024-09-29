"use client";
import React from "react";
import { Tabs, Form, message, Button } from "antd";
import BasicTab from "./BasicTab";
import DescriptionTab from "./DescriptionTab";
import CurriculumTab from "./CurriculumTab";
import mediaGlobalStore, { ImediaGlobalStore } from "@/store/media-store";
import { getAllMedia } from "@/server-actions/media-library";
import { uploadFileToFirebaseAndGetUrl } from "@/helpers/firebase-upload";
import { createCourse, editCourse } from "@/server-actions/course";
import { useRouter } from "next/navigation";

const CourseForm = ({
  type = "add",
  courseData = {},
}: {
  type?: "edit" | "add";
  courseData?: any;
}) => {
  const [activeTab, setActiveTab] = React.useState("1");
  const [coverImage, setCoverImage] = React.useState<File | null | string>(
    courseData?.coverImage || null
  );
  const [promoVideo, setPromoVideo] = React.useState<File | null | string>(
    courseData?.promoVideo || null
  );
  const [description, setDescription] = React.useState(
    courseData?.description || ""
  );
  const [sections, setSections] = React.useState<any[]>(
    courseData?.sections || []
  );
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  console.log("courseData", courseData);

  const onFinish = async (formValues: any) => {
    console.log("Form Values", formValues);
    try {
      setLoading(true);
      const payload = {
        ...formValues,
        coverImage,
        promoVideo,
        description,
        sections,
      };
      if (coverImage && typeof coverImage === "object") {
        payload.coverImage = await uploadFileToFirebaseAndGetUrl(coverImage);
      }
      if (promoVideo && typeof promoVideo === "object") {
        payload.promoVideo = await uploadFileToFirebaseAndGetUrl(promoVideo);
      }

      let response: any = null;
      if (type === "edit") {
        response = await editCourse(courseData._id, payload);
      } else {
        response = await createCourse(payload);
      }
      console.log("Payload", payload);
      if (response?.success) {
        message.success(response.message);
        router.push("/admin/courses");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to save course");
    } finally {
      setLoading(false);
    }
  };

  const { setMedia } = mediaGlobalStore() as ImediaGlobalStore;
  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getAllMedia();
      if (response.success) {
        setMedia(response.data);
      } else {
        setMedia([]);
      }
    } catch (error) {
      setMedia([]);
    }
  };
  return (
    <div className="mt-7">
      <Form onFinish={onFinish} layout="vertical" initialValues={courseData}>
        <Tabs
          defaultActiveKey="1"
          activeKey={activeTab}
          onTabClick={(key) => setActiveTab(key)}
        >
          <Tabs.TabPane tab="Basic" key="1">
            <BasicTab
              coverImage={coverImage}
              setCoverImage={setCoverImage}
              promoVideo={promoVideo}
              setPromoVideo={setPromoVideo}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Description" key="2">
            <DescriptionTab
              description={description}
              setDescription={setDescription}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Curriculum" key="3">
            <CurriculumTab sections={sections} setSections={setSections} />
          </Tabs.TabPane>
        </Tabs>
        <div className="flex justify-end gap-5 mt-5">
          <Button
            disabled={loading}
            onClick={() => router.push("/admin/courses")}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CourseForm;

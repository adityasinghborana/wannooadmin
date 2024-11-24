"use client";
import Container from "@/app/ui/dashboard/container/Container";
import ImageUploadModal from "@/app/ui/dashboard/SingleImageModal/CustomSingleImageUpload";
import { Button } from "@/components/ui/button";
import { UploadBackgroundImage } from "@/lib/services";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const BlogEditor: React.FC = () => {
  const [id, setId] = useState<number>(1);
  const [subject, setSubject] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const handleBodyChange = (value: string) => {
    setBody(value);
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
  ];

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
        [{ align: [] }],
        ["clean"],
      ],
    },
  };

  useEffect(() => {
    const getValues = async () => {};
    // getValues();
  }, []);

  const handleConfirm = async () => {
    let formData = new FormData();
    formData.append("image", selectedImage);
    let imgData = await UploadBackgroundImage(formData);
    // Assuming you're storing image paths in a field named "imagepaths"
    setSelectedImage(imgData?.path);
    setIsModalOpen(false);
  };

  const handleImageSelect = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        //@ts-ignore
        setImagePreview(reader?.result);
        setSelectedImage(file);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToPost = {
      id,
      subject,
      body,
      selectedImage
    };

    try {
      console.log("Blog added:", dataToPost);
    } catch (error) {
      console.error("Failed to add Blog:", error);
    }
  };


  return (
    <Container className="items-center p-2">
      <div
        className="overflow-y-auto"
        style={{ height: "calc(100vh - 10rem)" }}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded p-8 w-[90%] mx-auto"
        >
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-gray-700 font-bold mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor="image-upload"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Upload Thumbnail
            </label>
            <div>
              <input
                type="file"
                id="image-upload"
                
                value={""}
                style={{ display: "none" }}
                onChange={(e) => {
                  handleImageSelect(e);
                }}
              />

              <Button
                variant={"outline"}
                type="button"
                className="bg-primary text-white py-2 px-4 rounded"
                onClick={() =>
                  document?.getElementById("image-upload")?.click()
                }
              >
                {" "}
                Upload Thumbnail
              </Button>
              <ImageUploadModal
                name="image-upload"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
                imagePreview={imagePreview}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="body"
              className="block text-gray-700 font-bold mb-2"
            >
              Body
            </label>
            <ReactQuill
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              theme="snow"
              value={body}
              onChange={handleBodyChange}
              modules={modules}
              formats={formats}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </Container>
  );
};

export default BlogEditor;

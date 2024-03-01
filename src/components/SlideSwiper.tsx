import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import ReactPlayer from "react-player";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import { contendData } from "@/moks/slideData";
import { Modal } from "./Modal";
import { slideDataTypes } from "@/common/types";

export default function SlideSwiper() {
  const [open, setOpen] = useState<boolean>(false);
  const [slideData, setSlideData] = useState<slideDataTypes | null>(null);
  const [playVideo, setPlayVideo] = useState<boolean>(true);

  const openModal = (data: slideDataTypes) => {
    setOpen(true);
    setSlideData(data);
    setPlayVideo(true);

    console.log(data);
  };

  const handleClose = () => {
    setPlayVideo(!playVideo);
    setOpen(false);
  };

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
        className="mySwiper"
      >
        {contendData.map((data) => (
          <SwiperSlide key={data.id}>
            <div className=" w-[80%] h-[580px] p-6">
              <h2 className="mb-3 text-4xl font-bold">{data.title}</h2>
              <div className="flex items-center justify-center text-left h-full">
                {data.image && data.imagePosition !== "right" ? (
                  <div className={`w-[40%] p-4`}>
                    <img
                      className={`object-cover h-full w-full max-w-full z-10 ${
                        data.expand ? "z-10 cursor-pointer hover:scale-150" : ""
                      }`}
                      src={data.image}
                      alt="slide"
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="w-[60%]">
                  {data.text ? (
                    <div
                      className="indent-7"
                      dangerouslySetInnerHTML={{ __html: data.text }}
                    />
                  ) : (
                    ""
                  )}
                  {data.listName ? (
                    <p className="mt-2 font-bold">{data.listName}</p>
                  ) : (
                    ""
                  )}
                  <ul className="indent-7">
                    {data.list
                      ? data.list.map((item, index) => (
                          <li
                            key={index}
                            className="text-left p-1"
                            dangerouslySetInnerHTML={{ __html: item }}
                          />
                        ))
                      : ""}
                  </ul>
                  {data.additionalInformation && (
                    <button
                      onClick={() => openModal(data)}
                      className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
                    >
                      Read more
                    </button>
                  )}
                </div>
                {data.image && data.imagePosition === "right" ? (
                  <div className="w-[40%] p-4">
                    <img
                      className={`object-cover h-full w-full max-w-full ${
                        data.expand ? "z-10 cursor-pointer hover:scale-150" : ""
                      }`}
                      src={data.image}
                      alt="slide"
                    />
                  </div>
                ) : (
                  ""
                )}
                {data.youTubeLink ? (
                  <div className="w-[40%] p-4">
                    <ReactPlayer
                      width="460px"
                      controls={true}
                      muted={true}
                      url={data.youTubeLink}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Modal open={open} onClose={handleClose}>
        <div className="flex flex-col items-center h-auto max-w-[850px] max-h-[500px] overflow-auto ">
          {slideData && slideData.additionalVideo ? (
            <div className="mb-4">
              <ReactPlayer
                controls={true}
                playing={playVideo}
                muted={true}
                url={slideData.additionalVideo}
              />
            </div>
          ) : (
            ""
          )}
          {slideData && slideData.additionalVideo_2 ? (
            <div className="mb-4 mt-6">
              <ReactPlayer
                controls={true}
                playing={playVideo}
                muted={true}
                url={slideData.additionalVideo_2}
              />
            </div>
          ) : (
            ""
          )}
          {slideData && slideData.additionalContent ? (
            <ul className="indent-7 text-white self-start">
              {slideData.additionalContent.map((content, index) => (
                <li
                  key={index}
                  className="text-left p-1"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
      </Modal>
    </>
  );
}

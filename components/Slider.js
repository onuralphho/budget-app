import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
const Slider = () => {

  return (
    <Swiper
      spaceBetween={100}
      slidesPerView={1}
      cssMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Navigation]}
    >
      <SwiperSlide>
        <div className="col-11 bg-white shadow  rounded-4 m-3 mb-5 " >
          <div className="row justify-content-between " >
            <div className="col-md-5 align-self-center p-5 d-none d-md-block">
              <p>Do not be afraid!</p>
              <h2>Feel free to try.</h2>
              <button
                className="btn text-white rounded-5 mt-5 fs-5 "
                style={{ background: "rgb(169, 151, 199)" }}
              >
                Discover
              </button>
            </div>
            <div className="col-12 col-md-7 ">
              <Image
                
                width={900}
                height={900}
                className="img-fluid rounded-4 border border-5 border-white"
                src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                alt="slider pic"
              />
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="col-11 bg-white shadow  rounded-4 m-3 mb-5 " >
          <div className="row justify-content-between ">
            <div className="col-md-5 align-self-center p-5 d-none d-md-block">
              <p>Do not be afraid!</p>
              <h2>Feel free to try.</h2>
              <button
                className="btn text-white rounded-5 mt-5 fs-5 "
                style={{ background: "rgb(169, 151, 199)" }}
              >
                {" "}
                Discover
              </button>
            </div>
            <div className="col-md-7 ">
              <Image
                width={900}
                height={900}
                className="img-fluid rounded-4 border border-5 border-white"
                src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                alt="slider pic"
              />
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="col-11 bg-white shadow  rounded-4 m-3 mb-5 " >
          <div className="row justify-content-between ">
            <div className="col-md-5 align-self-center p-5 d-none d-md-block">
              <p>Do not be afraid!</p>
              <h2>Feel free to try.</h2>
              <button
                className="btn text-white rounded-5 mt-5 fs-5 "
                style={{ background: "rgb(169, 151, 199)" }}
              >
                {" "}
                Discover
              </button>
            </div>
            <div className="col-md-7 ">
              <Image
                width={900}
                height={900}
                className="img-fluid rounded-4 border border-5 border-white"
                src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                alt="slider pic"
              />
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;

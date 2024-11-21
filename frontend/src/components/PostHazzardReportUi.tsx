import React, { useState } from "react";
import profilePic from "../assets/images/postHazzardReportUi/profilePic.png";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ASSETS } from "../assets/assets";
import HazardForm from "./HazardForm";

const PostHazzardReportUi: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="lg:w-[45vw] md:w-[45vw] w-[100vw] lg:h-[16vh] flex-grow bg-white mx-auto"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-[90%] h-[100%] mx-auto flex justify-between py-[20px]">
          {/* Start Avatar Section */}
          <div className="lg:w-[7%] h-[100%] flex items-start justify-end">
            <div className="w-[50px] h-[50px] rounded-[50px] overflow-hidden">
              <img
                src={profilePic}
                alt="profile picture"
                className="h-[100%] w-[100%]"
              />
            </div>
          </div>
          {/* End Avatar Section */}

          <div className="w-[91%] h-[100%] flex flex-col gap-y-[1rem] justify-between">
            <div className="h-[47%] w-[100%] ">
              <input
                type="text"
                className="lg:h-[100%] h-auto w-[100%] text-[1.2rem] px-[25px] rounded-[50px] bg-[#F2F2F2]"
                placeholder="Type here"
                onClick={() => setIsOpen(true)}
              />
            </div>
            <div className="h-[47%] w-[100%] flex lg:flex-row items-center lg:justify-between md:justify-between flex-col gap-y-[1rem]">
              <div id="icons" className="flex gap-x-[1.5rem]">
                <img
                  src={ASSETS.icons.imageIcon}
                  alt="image upload icon"
                  className="w-[25px]"
                />
                <img
                  src={ASSETS.icons.mapIcon}
                  alt="map icon"
                  className="w-[25px]"
                />
                <img
                  src={ASSETS.icons.paperClipIcon}
                  alt="attach file icon"
                  className="w-[25px]"
                />
                <img
                  src={ASSETS.icons.smileyFaceIcon}
                  alt="emotion icon"
                  className="w-[25px]"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="py-[10px] px-[30px] rounded-[10px] bg-black text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="max-w-xl flex flex-col gap-y-[1.5rem] space-y-4 bg-white p-12 rounded-[10px]">
            <div>
              <DialogTitle className="text-[1.4rem] font-bold">
                Report Environmental Hazards
              </DialogTitle>
              <Description className="text-[#9B9B9B]">
                Submit report on pollution by providing details, photos, and
                location to help us track and address environmental concerns{" "}
              </Description>
            </div>
            <div className="w-[100%]">
              <HazardForm onSuccess={() => setIsOpen(false)} />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default PostHazzardReportUi;

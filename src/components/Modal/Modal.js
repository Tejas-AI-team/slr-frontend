import React from "react";

export default function Modal({
  show = false,
  title = "",
  content = "",
  onClose,
  children,
}) {
  const [showModal, setShowModal] = React.useState(show);

  React.useEffect(() => {
    setShowModal(show);
  }, [show]);

  const closeModal = () => {
    setShowModal(false);
    if (onClose) onClose();
  };

  const outsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={outsideClick}
          >
            <div className="relative w-auto my-6 mx-auto max-w-6xl">
              {/* Modal content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{title}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/* Body */}
                <div className="relative p-6 flex-auto h-screen-60 overflow-y-auto">
                  {children ? (
                    children
                  ) : (
                    <p
                      className="my-4 text-blueGray-500 text-lg leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: content }}
                    ></p>
                  )}
                </div>
                {/* Footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Overlay */}
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

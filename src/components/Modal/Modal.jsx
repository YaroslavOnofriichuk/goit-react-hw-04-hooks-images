import React, { useEffect } from "react";
import PropTypes from "prop-types";

function Modal ({largeImageSrc, closeModal}) {

    const onClose = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onEsc = (e) => {
        if (e.code === "Escape") {
            closeModal();
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", onEsc);
        return () => {
            window.removeEventListener("keydown", onEsc);
          }
    }, [onEsc]);

        return (
            <div className="Overlay" onClick={onClose}>
                <div className="Modal">
                    <img src={largeImageSrc} alt="" />
                </div>
            </div>
        );
};

Modal.propTypes = {
    largeImageSrc: PropTypes.string,
    closeModal: PropTypes.func,
};

export default Modal;
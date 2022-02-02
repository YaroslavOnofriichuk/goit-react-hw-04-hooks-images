import React, { useState, useEffect } from "react";
import getImages from "./services/imageAPI";
import checkEmptyObject from "./services/checkEmptyObject";
import isButtonCheck from "./services/checkHits";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";

function App () {
  const [searchImage, setSearchImage] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isButton, setIsButton] = useState(true);
  const [largeImage, setLargeImage] = useState(null);

  useEffect(() => {
    if (searchImage.trim() === "") {
      return;
    } else {
      setIsLoading(true)

      getImages(searchImage, page)
        .then(data => {
          setImages(prevImages => [...prevImages, ...data.hits])
          return data;
        })
        .then(data => setIsButton(isButtonCheck(data, page)))
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false));
    };
  }, [searchImage, page]);
  

  const handleSubmit = (searchQuery) => {
    if (searchQuery.trim() === "") {
      window.alert("Enter a search word");
    } else {
      setSearchImage(searchQuery);
      setPage(1);
      setImages([]);
    };
  };


  const onLoadMoreClick = () => {
    setPage(page + 1);
  };


  const openModal = (largeImageSrc) => {
    setLargeImage(largeImageSrc);
  };

  const closeModal = () => {
    setLargeImage(null);
  };

    const isImages = !images || !checkEmptyObject(images) ? false : true;
    const renderButton = isImages && isButton ? true : false;

    return (
      <>
        <Searchbar onSubmit={handleSubmit}/>
        {isImages && <ImageGallery images={images} onClick={openModal}/>}
        {isLoading && <Loader />}
        {renderButton && <Button onClick={onLoadMoreClick}/>}
        {largeImage && <Modal largeImageSrc={largeImage} closeModal={closeModal}/>}
      </>
    );

}

export default App;

import { useState, useEffect } from "react";
import axios from "axios";

const useInitialImages = () => {
  const [initialImages, setInitialImages] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [initialDataError, setInitialDataError] = useState(false);

  useEffect(() => {
    async function setInitialData() {
      try {
        setInitialDataError(false);
        setIsLoading(true);
        const headers = {
          Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`,
        };
        const options = {
          headers: headers,
        };
        const initialImagesRes = await axios.get(
          `${process.env.REACT_APP_UNSPLASH_BASE_URL}/photos?per_page=${pageSize}`,
          options
        );
        const images = initialImagesRes.data.map((img: any) => {
          return {
            key: img.id,
            src: img.urls.small,
            width: img.width,
            height: img.height,
          };
        });
        setInitialImages(images);
        setIsLoading(false);
      } catch (error) {
        setInitialDataError(true);
      }
    }
    setInitialData();
  }, []);

  return { initialImages, isLoading, initialDataError };
};

export default useInitialImages;

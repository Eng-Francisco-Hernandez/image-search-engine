import { useState, useEffect } from "react";
import axios from "axios";

const useInitialImages = () => {
  const [initialImages, setInitialImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const headers = {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`,
    };
    const options = {
      headers: headers,
    };
    async function setInitialData() {
      setIsLoading(true);
      const initialImagesRes = await axios.get(
        `${process.env.REACT_APP_UNSPLASH_BASE_URL}/photos`,
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
    }
    setInitialData();
  }, []);

  return { initialImages, isLoading };
};

export default useInitialImages;

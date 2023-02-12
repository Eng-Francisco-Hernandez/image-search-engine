import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { ImageGrid, SearchBar } from "../../components";
import useInitialImages from "../../custom-hooks/useInitialImages";

export default function Landing() {
  const [searchValue, setSearchValue] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { initialImages, isLoading, initialDataError } = useInitialImages();
  const [rateLimitReached, setRateLimitReached] = useState(false);

  const searchImages = async () => {
    try {
      setRateLimitReached(false);
      setCurrentImages([]);
      setCurrentPage(1);
      setSearchLoading(true);
      const headers = {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`,
      };
      const options = {
        headers: headers,
      };
      const imagesRes = await axios.get(
        `${
          process.env.REACT_APP_UNSPLASH_BASE_URL
        }/search/photos?page=1&per_page=${pageSize}&query=${searchValue.trim()}`,
        options
      );
      const images = imagesRes.data.results.map((img: any) => {
        return {
          key: img.id,
          src: img.urls.small,
          width: img.width,
          height: img.height,
        };
      });
      setCurrentImages(images);
      setSearchValue((prevVal) => prevVal.trim());
      setSearchLoading(false);
    } catch (error) {
      setRateLimitReached(true);
    }
  };

  const showMore = async () => {
    try {
      setRateLimitReached(false);
      const headers = {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`,
      };
      const options = {
        headers: headers,
      };
      const imagesRes = await axios.get(
        `${process.env.REACT_APP_UNSPLASH_BASE_URL}/search/photos?page=${
          currentPage + 1
        }&per_page=${pageSize}&query=${searchValue.trim()}`,
        options
      );
      const images = imagesRes.data.results.map((img: any) => {
        return {
          key: img.id,
          src: img.urls.small,
          width: img.width,
          height: img.height,
        };
      });
      setCurrentImages((prevVal) => prevVal.concat(images));
      setCurrentPage((prevVal) => prevVal + 1);
    } catch (error) {
      setRateLimitReached(true);
    }
  };

  const onEnter = (e: any) => {
    if (e.key === "Enter") {
      searchImages();
    }
  };

  return (
    <Container fluid="lg" className="mb-5">
      <SearchBar
        searchValue={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => onEnter(e)}
        onClearButton={() => setSearchValue("")}
        onSearchButton={searchImages}
      />
      {rateLimitReached || initialDataError ? (
        <Card className="mt-3">
          <Card.Body>
            <h3>
              The free limit rate from Unsplash API has been reached. Please try
              again when a new hour of your clock starts.
            </h3>
          </Card.Body>
        </Card>
      ) : isLoading || searchLoading ? (
        <Card className="mt-3">
          <Card.Body>
            <h3>... Loading ...</h3>
          </Card.Body>
        </Card>
      ) : (
        <ImageGrid
          showMore={showMore}
          images={currentImages.length ? currentImages : initialImages}
        />
      )}
    </Container>
  );
}

import { ReactReader, ReactReaderStyle } from "react-reader";
import { memo, useState } from "react";
import { useRouter } from "next/router";

const Reader = () => {
  const router = useRouter();

  const [location, setLocation] = useState("epubcfi(/6/2[cover]!/6)");

  const { dlUrl, title } = router.query;
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <ReactReader
        url={`/api/dl/${dlUrl}`}
        title={title}
        location={location}
        locationChanged={(epubcifi) => setLocation(epubcifi)}
        styles={newStyle}
      />
    </div>
  );
};

const newStyle = {
  ...ReactReaderStyle,
  titleArea: {
    ...ReactReaderStyle.titleArea,
    top: 15,
    fontSize: 10,
  },
  arrow: {
    ...ReactReaderStyle.arrow,
    padding: 5,
  },
};

export default memo(Reader);

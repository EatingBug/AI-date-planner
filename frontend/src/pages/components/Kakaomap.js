import { Map, MapMarker } from "react-kakao-maps-sdk";
import Script from "next/script";
const Kakaomap = ({ lat, lng }) => {
    const addr = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&libraries=services,clusterer&autoload=false`;

    return (
        <>
            <Script src={addr} strategy="beforeInteractive" />
            <Map
                center={{ lat, lng }}
                style={{ width: "400px", height: "400px" }}
                level={3}
            >
                <MapMarker position={{ lat, lng }}></MapMarker>
            </Map>
        </>
    );
};

export default Kakaomap;

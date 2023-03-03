// this is a GET request to get the address of the user using Daum Postcode API

import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import Kakaomap from "./Kakaomap";
import axios from "axios";
import Recommend from "./recommend";

const GetUsersAddress = () => {
    const [openPostcode, setOpenPostcode] = useState(false);
    const [address, setAddress] = useState("");
    const [zonecode, setZonecode] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [opneRecommend, setOpenRecommend] = useState(false);
    const [myDateCourse, setMyDateCourse] = useState([
        {
            id: 1,
            title: "",
            explanation: "",
            diagram: "",
        },
        {
            id: 2,
            title: "",
            explanation: "",
            diagram: "",
        },
        {
            id: 3,
            title: "",
            explanation: "",
            diagram: "",
        },
    ]);

    const handler = {
        onClick: () => {
            setOpenPostcode(!openPostcode);
        },

        onComplete: async (data) => {
            setAddress(data.address);
            setZonecode(data.zonecode);

            const { lat, lng } = await axios
                .post("/api/user/map/getUsersPosition", {
                    address: data.address,
                })
                .then((res) => res.data);

            setLat(lat);
            setLng(lng);

            setOpenPostcode(false);
        },
        talkToChatGPT: async () => {
            if (!opneRecommend) {
                const { dateCourse } = await axios
                    .get("/api/getPrompt")
                    .then((res) => res.data);

                setMyDateCourse([
                    {
                        id: 1,
                        title: dateCourse[0].title,
                        explanation: dateCourse[0].explanation,
                        diagram: dateCourse[0].diagram,
                    },
                    {
                        id: 2,
                        title: dateCourse[1].title,
                        explanation: dateCourse[1].explanation,
                        diagram: dateCourse[1].diagram,
                    },
                    {
                        id: 3,
                        title: dateCourse[2].title,
                        explanation: dateCourse[2].explanation,
                        diagram: dateCourse[2].diagram,
                    },
                ]);

                console.log(myDateCourse);
                setOpenRecommend(true);
            } else {
                setOpenRecommend(false);
            }
        },
    };

    return (
        <div className="addr">
            <div>
                <button
                    style={{
                        width: "130px",
                        height: "40px",
                        backgroundColor: "white",
                        border: "1px solid black",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "18px",
                    }}
                    onClick={handler.onClick}
                >
                    주소검색
                </button>
                {openPostcode && (
                    <DaumPostcode
                        onComplete={handler.onComplete}
                        autoClose={false}
                        defaultQuery="강남구 강남대로 156길 16"
                    />
                )}
            </div>
            {address && zonecode && (
                <div>
                    <div>
                        <p>
                            주소 : {address}, {zonecode}
                        </p>
                    </div>
                    <div>
                        <Kakaomap lat={lat} lng={lng} />
                    </div>
                </div>
            )}
            <p></p>
            {address && zonecode && (
                <button
                    style={{
                        width: "180px",
                        height: "40px",
                        backgroundColor: "white",
                        border: "1px solid black",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "18px",
                    }}
                    onClick={handler.talkToChatGPT}
                >
                    데이트 코스 추천받기
                </button>
            )}

            <div
                style={
                    opneRecommend
                        ? {
                              //   display: "flex",
                              width: "430px",
                          }
                        : { display: "none" }
                }
            >
                <div className="resultBox">
                    <h4>{myDateCourse[0].title}</h4>
                    <p>{myDateCourse[0].diagram}</p>
                    <p>{myDateCourse[0].explanation}</p>
                </div>
                <div className="resultBox">
                    <h4>{myDateCourse[1].title}</h4>
                    <p>{myDateCourse[1].diagram}</p>
                    <p>{myDateCourse[1].explanation}</p>
                </div>
                <div className="resultBox">
                    <h4>{myDateCourse[2].title}</h4>
                    <p>{myDateCourse[2].diagram}</p>
                    <p>{myDateCourse[2].explanation}</p>
                </div>
            </div>

            <style jsx>
                {`
                    .addr {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                    }
                    .resultBox {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;

                        border: 1px solid black;
                        margin: 10px;

                        background-color: #fff0f0;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

                        padding: 12px;
                    }
                `}
            </style>
        </div>
    );
};

export default GetUsersAddress;

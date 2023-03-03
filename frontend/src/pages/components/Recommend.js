// this is the component that renders the ChatGPT's response
// the 3 date courses will be rendered in this component and the user can choose one of them
// if the user chooses one of the date courses, the date course will update the map above.

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

async function Recommend() {
    // const [dateCourse, setDateCourse] = useState([]);
    const [partialText, setpartialText] = useState("");

    const { text } = await axios.get("/api/getPrompt").then((res) => res.data);
    console.log(text);
    setpartialText(text);

    return <div>{partialText}</div>;
}

export default Recommend;

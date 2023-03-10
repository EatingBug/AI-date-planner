// this is the component for the box that contains the text and the image
// this component will show Today's Date course recommendations
// Today's Date Course Recommendations component will get the array of the Date course recommendations from parent component
// the Date course recommendation will be shown in the order of the array that is passed to the component

import React from "react";
import Link from "next/link";

const TodayRecommends = ({ todayRecommends }) => {
    return (
        <div className="todayRecommends">
            {todayRecommends.map((todayRecommend) => (
                <div className="todayRecommends__box">
                    <Link href={todayRecommend.link}>
                        <div className="todayRecommends__box__content">
                            <img
                                src={todayRecommend.image}
                                className="todayRecommends__box__content__image"
                            />
                            <h2 className="todayRecommends__box__content__title">
                                {todayRecommend.title}
                            </h2>
                        </div>
                    </Link>
                </div>
            ))}

            <style jsx>{`
                .todayRecommends {
                    width: 28%;
                    height: 180px;
                    left: 32px;
                    top: 222px;

                    background: #fbf4ff;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    border-radius: 20px;
                }
                .todayRecommends__box {
                    width: 97px;
                    height: 52px;
                    left: 46px;
                    top: 238px;

                    font-family: "IBM Plex Sans Hebrew";
                    font-style: normal;
                    font-weight: 400;
                    font-size: 20px;
                    line-height: 26px;

                    color: #000000;
                }
                .todayRecommends__box__content {
                    width: 97px;
                    height: 52px;
                    left: 46px;
                    top: 238px;

                    font-family: "IBM Plex Sans Hebrew";
                    font-style: normal;
                    font-weight: 400;
                    font-size: 20px;
                    line-height: 26px;

                    color: #000000;
                }
                .todayRecommends__box__content__image {
                    width: 67px;
                    height: 63px;
                    left: 105px;
                    top: 290px;
                }
            `}</style>
        </div>
    );
};

export default TodayRecommends;

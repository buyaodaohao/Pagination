import React, {useState, useEffect} from "react";
import "./PageComponent.less";


interface PageComponentProps {
    pageCount: number; //总页数，总页数小于或等于8时，页码完全展示
    tapSelectOnePage: (selectPage: number) => void; //选中某一页触发
}

const PageComponent = (props: PageComponentProps) => {
    const [currentPage, setCurrentPage] = useState<string>("1");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [pageList, setPageList] = useState<string[]>([]);
    let tapPage: string = currentPage;
    let tapIndex: number = currentIndex;

    const totalPage: number = props.pageCount; //外部传入的总页数
    if (pageList.length === 0) {
        initPageComponent();
    }

    function _tapOnePage(item: string, index: number, event: any) {
        event.stopPropagation();
        tapPage = item;
        tapIndex = index;
        setCurrentIndex(index);
        // 当总数据少于或等于10条时
        if (totalPage <= 10 && totalPage > 8) {
            if (item === "..." && index == 6) {
                //点击省略号
                let tempPageList: string[] = ["1", "..."];
                tempPageList.push((totalPage - 5).toLocaleString());
                tempPageList.push((totalPage - 4).toLocaleString());
                tempPageList.push((totalPage - 3).toLocaleString());
                tempPageList.push((totalPage - 2).toLocaleString());
                tempPageList.push((totalPage - 1).toLocaleString());
                tempPageList.push(totalPage.toLocaleString());
                setPageList(tempPageList);
                return;
            }
            if (item === "..." && index == 1) {
                //点击省略号
                let tempPageList: string[] = ["1", "2", "3", "4", "5", "6", "..."];

                tempPageList.push(totalPage.toLocaleString());
                setPageList(tempPageList);
                return;
            }
            if (item != "...") {
                setCurrentPage(item);
                props.tapSelectOnePage(parseInt(item));
                //情况1，只有左侧有省略号，右侧没有的时候,而且总页数在10以内
                if (index === 2) {
                    let tempPageList: string[] = ["1", "2", "3", "4", "5", "6", "..."];
                    tempPageList.push(totalPage.toLocaleString());
                    setPageList(tempPageList);
                    return;
                }
                //情况2，只有右侧有省略号，左侧没有的时候,而且总页数在10以内
                if (index === 5) {
                    let tempPageList: string[] = ["1", "..."];
                    tempPageList.push((totalPage - 5).toLocaleString());
                    tempPageList.push((totalPage - 4).toLocaleString());
                    tempPageList.push((totalPage - 3).toLocaleString());
                    tempPageList.push((totalPage - 2).toLocaleString());
                    tempPageList.push((totalPage - 1).toLocaleString());
                    tempPageList.push(totalPage.toLocaleString());
                    setPageList(tempPageList);
                }
                if (index === 0) {
                    tapToResetPage();
                }
            }

        }
        // 当总数据少于或等于10条时
        else if (totalPage > 10) {
            // 点击右侧省略号，此时省略号功能作为向后翻页
            if (item === "...") {
                if (index === 6) {
                    tapToGetNextPages();
                }
                //    点击左侧省略号，向前翻页
                if (index === 1) {
                    tapToGetLastPages();
                }
            } //点击的具体页码
            else {
                //先看下左侧有无省略号
                let secondItem: string = pageList[1];
                let sevenItem: string = pageList[pageList.length - 2];
                if (secondItem != "...") {
                    //此时基本就处于前几页
                    //那么点击前几个页码就不必做翻页操作
                    if (index <= 4) {
                        setCurrentPage(item);
props.tapSelectOnePage(parseInt(item));
                        return;
                    }
                    if (index === 5) {
                        //向后翻页
                        tapToGetNextPages();
                    }
                    if (index === 0) {
                        //点击第一页
                        tapToResetPage();
                    } else if (index === 7) {
                        //点击最后一页
                        tapToTheEndPages();
                    } else {
                        setCurrentPage(item);
                      props.tapSelectOnePage(parseInt(item));
                    }
                } //这时候前面有省略号了，有翻页操作了要
                else {
                    if (sevenItem === "...") {
                        //后面也有省略号
                        if (index === 0) {
                            //点击第一页
                            tapToResetPage();
                        } else if (index === 7) {
                            //点击最后一页
                            tapToTheEndPages();
                        } else if (index === 2) {
                            //向前翻页
                            tapToGetLastPages();
                        } else if (index === 5) {
                            //向后翻页
                            tapToGetNextPages();
                        } else {
                            setCurrentPage(item);
                          props.tapSelectOnePage(parseInt(item));
                        }
                    } else {
                        if (index === 0) {
                            //点击第一页
                            tapToResetPage();
                        } else if (index === 7) {
                            //点击最后一页
                            tapToTheEndPages();
                        } else if (index === 2) {
                            //向前翻页
                            tapToGetLastPages();
                        } else {
                            setCurrentPage(item);
                          props.tapSelectOnePage(parseInt(item));
                        }
                    }
                }
            }
        } else {
            setCurrentPage(item);
          props.tapSelectOnePage(parseInt(item));
        }
    }

    function initPageComponent() {
        setCurrentPage("1");

        let tempPageList: string[] = [];
        if (totalPage <= 8) {
            //页码完全展示
            for (let i = 0; i < totalPage; i++) {
                tempPageList.push(String(i + 1));
            }
        } else {
            tempPageList = ["1", "2", "3", "4", "5", "6", "..."];

            tempPageList.push(totalPage.toLocaleString());
        }

        setPageList(tempPageList);
    }

    //恢复初始化，点击第一页的时候
    function tapToResetPage() {
        setCurrentPage("1");

        let tempPageList: string[] = [];
        if (totalPage <= 8) {
            //页码完全展示
            for (let i = 0; i < totalPage; i++) {
                tempPageList.push(String(i + 1));
            }
        } else {
            tempPageList = ["1", "2", "3", "4", "5", "6", "..."];

            tempPageList.push(totalPage.toLocaleString());
        }

        setPageList(tempPageList);
        props.tapSelectOnePage(1);
    }

    //直接翻到最后几页，就是点击最后一页时触发
    function tapToTheEndPages() {
        setCurrentPage(totalPage.toLocaleString());

        let tempPageList: string[] = ["1", "..."];

        tempPageList.push((totalPage - 5).toLocaleString());
        tempPageList.push((totalPage - 4).toLocaleString());
        tempPageList.push((totalPage - 3).toLocaleString());
        tempPageList.push((totalPage - 2).toLocaleString());
        tempPageList.push((totalPage - 1).toLocaleString());
        tempPageList.push(totalPage.toLocaleString());
        setPageList(tempPageList);
        props.tapSelectOnePage(totalPage);
    }

    //向后翻页
    function tapToGetNextPages() {
        let tempPage: number;

        if (tapPage === "...") {
            tempPage = parseInt(currentPage);
            tempPage = tempPage + 4;
            setCurrentIndex(4);
        } else {
            tempPage = parseInt(tapPage);
        }

        if (tempPage >= totalPage || tempPage + 4 >= totalPage) {
            //基本上就翻到最后几页了
            setCurrentPage(tempPage.toLocaleString());

            let tempPageList: string[] = ["1", "..."];
            tempPageList.push((totalPage - 5).toLocaleString());
            tempPageList.push((totalPage - 4).toLocaleString());
            tempPageList.push((totalPage - 3).toLocaleString());
            tempPageList.push((totalPage - 2).toLocaleString());
            tempPageList.push((totalPage - 1).toLocaleString());
            tempPageList.push((totalPage).toLocaleString());
            setPageList(tempPageList);

        } else //未到底
        {

            setCurrentPage(tempPage.toString());
            let tempPageList: string[] = ["1", "..."];
            tempPageList.push((tempPage - 2).toLocaleString());
            tempPageList.push((tempPage - 1).toLocaleString());
            tempPageList.push((tempPage).toLocaleString());
            tempPageList.push((tempPage + 1).toLocaleString());
            tempPageList.push("...");
            tempPageList.push((totalPage).toLocaleString());
            setPageList(tempPageList);

        }
        props.tapSelectOnePage(tempPage);
    }

    //点击箭头，向前翻一页
    function tapArrowToLastOnePage(event: any) {

        event.stopPropagation();
        let tempPage: number = parseInt(currentPage);
        let tempIndex: number = currentIndex;
        if (currentPage === "1") {
            return;
        }
        if (totalPage <= 8) {
            setCurrentPage((tempPage - 1).toLocaleString());
            setCurrentIndex(currentIndex - 1);

        } else {
            //如果从最后一页开始，那么
            let secondItem: string = pageList[1];
            let sevenItem: string = pageList[pageList.length - 2];
            if (sevenItem != "...")//后面无省略号
            {
                if (currentIndex >= 4) {
                    if (tempPage > 4) {

                        setCurrentIndex(currentIndex - 1);
                        setCurrentPage((tempPage - 1).toLocaleString());




                    }
                } else {
                    if (tempPage > 4) {
                        let tempPageList: string[] = ["1", "..."];
                        tempPageList.push((tempPage - 2).toLocaleString());
                        tempPageList.push((tempPage - 1).toLocaleString());
                        tempPageList.push(tempPage.toLocaleString());
                        tempPageList.push((tempPage + 1).toLocaleString());
                        tempPageList.push("...");
                        tempPageList.push(totalPage.toLocaleString());

                        setCurrentIndex(3);
                        setCurrentPage((tempPage - 1).toLocaleString());
                        setPageList(tempPageList);
                    } else {
                        let tempPageList: string[] = [];
                        tempPageList = ["1", "2", "3", "4", "5", "6", "..."];

                        tempPageList.push(totalPage.toLocaleString());
                        setCurrentIndex(currentIndex - 1);
                        setCurrentPage((tempPage - 1).toLocaleString());
                        setPageList(tempPageList);
                    }
                }
            } else {
                if (currentIndex >= 4) {
                    if (tempPage > 4) {
                        setCurrentIndex(currentIndex - 1);
                        setCurrentPage((tempPage - 1).toLocaleString());
                    } else {
                        let tempPageList: string[] = [];
                        tempPageList = ["1", "2", "3", "4", "5", "6", "..."];

                        tempPageList.push(totalPage.toLocaleString());
                        setCurrentIndex(currentIndex - 1);
                        setCurrentPage((tempPage - 1).toLocaleString());
                        setPageList(tempPageList);
                    }
                } else {
                    if (tempPage > 4) {
                        let tempPageList: string[] = ["1", "..."];
                        tempPageList.push((tempPage - 2).toLocaleString());
                        tempPageList.push((tempPage - 1).toLocaleString());
                        tempPageList.push(tempPage.toLocaleString());
                        tempPageList.push((tempPage + 1).toLocaleString());
                        tempPageList.push("...");
                        tempPageList.push(totalPage.toLocaleString());

                        setCurrentIndex(3);
                        setCurrentPage((tempPage - 1).toLocaleString());
                        setPageList(tempPageList);
                    } else {
                        let tempPageList: string[] = ["1", "2", "3", "4", "5", "6", "..."];

                        tempPageList.push(totalPage.toLocaleString());
                        setCurrentIndex(currentIndex - 1);
                        setCurrentPage((tempPage - 1).toLocaleString());
                        setPageList(tempPageList);
                    }
                }
            }
        }
        props.tapSelectOnePage(tempPage - 1);
    }

    //点击箭头，向后翻一页
    function tapArrowToNextOnePage(event: any) {
        event.stopPropagation();
        let tempPage: number = parseInt(currentPage);
        let tempIndex: number = currentIndex;
        if (currentPage === String(totalPage)) {
            return;
        }
        if (totalPage <= 8) {
            setCurrentPage((tempPage + 1).toLocaleString());
            setCurrentIndex(currentIndex + 1);
        } else {
            //如果从最第一页开始，那么
            let secondItem: string = pageList[1];
            let sevenItem: string = pageList[pageList.length - 2];
            if (secondItem != "...") {
                //前面无省略号
                if (currentIndex <= 4) {
                    if (tempPage < 5) {
                        setCurrentIndex(currentIndex + 1);
                        setCurrentPage((tempPage + 1).toLocaleString());
                    } else {
                        let tempPageList: string[] = ["1", "..."];
                        tempPageList.push((tempPage - 1).toLocaleString());
                        tempPageList.push(tempPage.toLocaleString());
                        tempPageList.push((tempPage + 1).toLocaleString());
                        tempPageList.push((tempPage + 2).toLocaleString());
                        tempPageList.push("...");
                        tempPageList.push(totalPage.toLocaleString());

                        setCurrentIndex(4);
                        setCurrentPage((tempPage + 1).toLocaleString());
                        setPageList(tempPageList);
                    }
                } else {
                }
            } //前面有省略号
            else {
                if (sevenItem != "...") {
                    //后面无省略号
                    setCurrentIndex(currentIndex + 1);
                    setCurrentPage((tempPage + 1).toLocaleString());
                }
                if (currentIndex < 4) {
                    setCurrentIndex(currentIndex + 1);
                    setCurrentPage((tempPage + 1).toLocaleString());
                } else {
                    if (tempPage < totalPage - 4) {
                        let tempPageList: string[] = ["1", "..."];
                        tempPageList.push((tempPage - 1).toLocaleString());
                        tempPageList.push(tempPage.toLocaleString());
                        tempPageList.push((tempPage + 1).toLocaleString());
                        tempPageList.push((tempPage + 2).toLocaleString());
                        tempPageList.push("...");
                        tempPageList.push(totalPage.toLocaleString());

                        setCurrentIndex(4);
                        setCurrentPage((tempPage + 1).toLocaleString());
                        setPageList(tempPageList);
                    } else {
                        let tempPageList: string[] = ["1", "..."];
                        tempPageList.push((totalPage - 5).toLocaleString());
                        tempPageList.push((totalPage - 4).toLocaleString());
                        tempPageList.push((totalPage - 3).toLocaleString());
                        tempPageList.push((totalPage - 2).toLocaleString());
                        tempPageList.push((totalPage - 1).toLocaleString());
                        tempPageList.push(totalPage.toLocaleString());

                        setCurrentIndex(4);
                        setCurrentPage((tempPage + 1).toLocaleString());
                        setPageList(tempPageList);
                    }
                }
            }
        }

        props.tapSelectOnePage(tempPage + 1);
        return;
    }

    //向前翻页
    function tapToGetLastPages() {
        let tempPage: number;
        let tempIndex: number = tapIndex;
        if (tapPage === "...") {
            tempPage = parseInt(currentPage);
            tempPage = tempPage - 4;
            tapIndex = tapIndex - 4;
        } else {
            tempPage = parseInt(tapPage);
        }

        if (tempPage <= 1 || tempPage - 4 <= 1) {
            //基本上就翻到第一页了
            setCurrentPage(tempPage.toLocaleString());
            setCurrentIndex(tempIndex);
            let tempPageList: string[] = ["1", "2", "3", "4", "5", "6", "..."];
            tempPageList.push(totalPage.toLocaleString());
            setPageList(tempPageList);
        } //还没到第一页
        else {
            setCurrentPage(tempPage.toLocaleString());
            setCurrentIndex(tempIndex);
            let tempPageList: string[] = ["1", "..."];
            tempPageList.push((tempPage - 2).toLocaleString());
            tempPageList.push((tempPage - 1).toLocaleString());
            tempPageList.push(tempPage.toLocaleString());
            tempPageList.push((tempPage + 1).toLocaleString());
            tempPageList.push("...");
            tempPageList.push(totalPage.toLocaleString());
            setPageList(tempPageList);
        }
        props.tapSelectOnePage(tempPage);
    }

    return (
        <div className="bottom-switch-page-btn-container">
            <div
                className="little-fangkuai"
                style={{marginLeft: "13px"}}
                onClick={(event) => tapArrowToLastOnePage(event)}
            >
                <img
                    className="switch-page-arrow"
                    src={`${process.env.PUBLIC_URL}/images/back-black-arrow.png`}
                />
            </div>
            <div
                className="page-number-fangkuai-container"
                id="page-number-fangkuai-container"
            >
                {pageList.map((item, index) => (
                    <div
                        className={
                            currentPage === item
                                ? "little-fangkuai-selected"
                                : "little-fangkuai"
                        }
                        onClick={(event) => _tapOnePage(item, index, event)}
                        key={index}
                    >
                        {item}
                    </div>
                ))}
            </div>
            <div
                className="little-fangkuai"
                style={{marginRight: "13px"}}
                onClick={(event) => tapArrowToNextOnePage(event)}
            >
                <img
                    className="switch-page-arrow"
                    src={`${process.env.PUBLIC_URL}/images/right-black-arrow.png`}
                />
            </div>


        </div>
    );
};
export default PageComponent;

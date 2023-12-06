import React from "react";
import styled from "styled-components"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Toaster,toast } from "react-hot-toast";

const qnaArr = [
    {
        id: 1,
        question: `안녕하세요!\n 방문을 환영합니다.`,
        options: [],
    },
    {
        id: 2,
        question: "원하는 고용 형태는 무엇인가요?",
        options: ["정규직","계약직","프리랜서"],
    },
    {
        id: 3,
        question: "인재가 담당할 직무는 무엇인가요?",
        options: ["웹 FE 개발자","웹 퍼블리셔"],
    },
    {
        id: 4,
        question: "인재가 보유했으면 하는 기술 스택은 무엇인가요?",
        options: ["JavaScript","TypeScript","React","HTML5","SCSS","CSS3","Next.js","node.js","firbase","MySQL","Git"],
    }
];

const Warpper = styled.main`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    @media screen and (max-width: 1024px){
        overflow: hidden auto;
    }
`;

const ProgressBar = styled.nav<{$progress: number}>`
    width: 100%;
    height: 2px;
    background-color: #ffffff;
    margin: 100px 0 120px;
    > span{
        display: block;
        width: ${(props) => props.$progress}%;
        height: 100%;
        background-color: #000000;
        transition: .4s;
    }
    @media screen and (max-width: 1400px){
        margin: 50px 0 70px;
    }
    @media screen and (max-width: 560px){
        margin: 20px 0 30px;
    }
`;

const ContentBox = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: calc(100% - 222px);
    @media screen and (max-width: 1400px){
        height: calc(100% - 122px);
    }
    @media screen and (max-width: 560px){
        height: calc(100% - 52px);
    }
`;

const Question = styled.article`
    width: 100%;
    padding: 0 100px;
    &.question-exit,&.question-exit-done{
        display: none;
    }
    &.question-enter, &.question-appear{
        .num,.textQ{
            margin-left: 60px;
            opacity: 0;
        }
    }
    &.question-enter-done, &.question-appear-done{
        .num,.textQ{
            margin-left: 0;
            opacity: 1;
        }
    }
    .num{
        font-size: 20px;
        font-weight: 600;
        transition: .4s;
    }
    .textQ{
        font-size: 54px;
        font-weight: 400;
        line-height: 1.3;
        margin-top: 24px;
        transition: .4s;
    }
    @media screen and (max-width: 1400px){
        padding: 0 50px;
        .textQ{
            font-size: 44px;
            margin-top: 15px;
        }
    }
    @media screen and (max-width: 560px){
        padding: 0 10px;
        .num{
            font-size: 16px;
        }
        .textQ{
            font-size: 28px;
            margin-top: 10px;
        }
    }
`;

const Option = styled.article<{$beforeBgColor: number}>`
    position: relative;
    width: 100%;
    height: 339px;
    padding: 0 100px;
    &.option-exit{
        .inner{
            .Textarea{
                display: none;
            }
        }
    }
    &.option-enter,&.option-appear{
        height: 0;
        overflow: hidden;
        &::before{
            height: 0;
        }
        .inner{
            &::before{
                width: 0;
            }
            .BtnArea{
                top: 0;
                opacity: 0;
            }
            .Textarea{
                textarea{
                    width: 200px;
                    opacity: 0;
                }
                p{
                    opacity: 0;
                }
            }
            .selectArea{
                top: 50px;
                p, >button{
                    opacity: 0;
                }
            }
        }
    }
    &.option-enter-done,&.option-appear-done{
        height: 339px;
        &::before{
            height: ${(props) => props.$beforeBgColor}%;
        }
        .inner{
            &::before{
                width: 100%;
            }
            .BtnArea{
                top: -20px;
                opacity: 1;
            }
            .Textarea{
                textarea{
                    width: 100%;
                    opacity: 1;
                }
                p{
                    opacity: 1;
                }
            }
            .selectArea{
                top: 0;
                p, >button{
                    opacity: 1;
                }
            }
        }
    }
    &::before{
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 9;
        width: 100%;
        height: 0;
        background-color: #ffffff;
        transition: .6s;
    }
    .inner{
        position: relative;
        z-index: 10;
        width: 100%;
        height: 100%;
        &::before{
            content: "";
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: 1px;
            background-color: #ffffff;
            transition: width .6s;
        }
        .BtnArea{
            position: absolute;
            left: 0;
            top: -20px;
            transform: translateY(-100%);
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
            transition: opacity .6s;
            > button{
                padding: 0;
                background-color: transparent;
                border: none;
                font-size: 20px;
                font-weight: 400;
                color: #ffffff;
                transition: .2s;
            }
        }
        .Textarea{
            textarea,p{
                transition: opacity 1s ease-out .6s, width 1s ease-out .6s;
            }
            textarea{
                position: relative;
                font-family: 'Pretendard';
                height: 164px;
                border: 1px solid #A4A4A4;
                border-radius: 4px;
                padding: 20px;
                margin: 28px auto;
                font-size: 20px;
                font-weight: 400;
                color: #A4A4A4;
                resize: none;
                &::placeholder{
                    font-size: 20px;
                    font-weight: 400;
                    color: #A4A4A4;
                }
                &:focus {
                    outline: none;
                    border: 2px solid #F97D3C;
                }
            }
            p{
                font-size: 16px;
                font-weight: 400;
                line-height: 1.3;
                color: #A4A4A4;
            }
        }
        .selectArea{
            position: relative;
            display: flex;
            flex-wrap: wrap;
            gap: 28px 42px;
            padding-top: 28px;
            transition: .6s;
            p{
                width: 100%;
                font-size: 16px;
                font-weight: 400;
                line-height: 1.3;
                transition: .6s;
            }
            > button{
                position: relative;
                padding: 14px 28px;
                border: 1px solid #ffffff;
                border-radius: 36px;
                font-size: 20px;
                font-weight: 400;
                background-color: transparent;
                color: #ffffff;
                overflow: hidden;
                transition: .6s;
                &.select{
                    background-color: #ffffff;
                    color: #000000;
                }
                &::before{
                    content: "";
                    position: absolute;
                    right: -1px;
                    top: -1px;
                    transform: translateY(0);
                    z-index: -1;
                    width: 0;
                    height: calc(100% + 2px);
                    background-color: #ffffff;
                    border-radius: 36px;
                    transition: .4s;
                }
                &:hover{
                    color: #000000;
                    &::before{
                        left: -1px;
                        width: calc(100% + 2px);
                    }
                }
            }
        }
    }
    @media screen and (max-width: 1400px){
        height: 300px;
        padding: 0 50px;
        &.option-enter-done,&.option-appear-done{
            height: 300px;
        }
        .inner{
            .selectArea{
                gap: 28px 30px;
            }
        }
    }
    @media screen and (max-width: 1024px){
        .inner{
            .selectArea > button:hover{
                opacity: .8;
                &::before{
                    display: none;
                }
            }
        }
    }
    @media screen and (max-width: 560px){
        height: auto;
        padding: 0 10px;
        &.option-enter-done,&.option-appear-done{
            height: auto;
            .inner .BtnArea{
                top: -10px;
            }
        }
        .inner{
            padding: 10px 0 30px;
            .BtnArea{
                top: -10px;
                > button{
                    font-size: 16px;
                }
            }
            .Textarea{
                textarea{
                    height: 60px;
                    padding: 10px;
                    margin: 0 auto 15px;
                    font-size: 16px;
                    &::placeholder{
                        font-size: 16px;
                    }
                }
                p{
                    font-size: 13px;
                }
            }
            .selectArea{
                gap: 12px;
                padding-top: 15px;
                p{
                    font-size: 14px;
                }
                > button{
                    padding: 7px 14px;
                    border: 1px solid #ffffff;
                    font-size: 16px;
                }
            }
        }
    }
`;
const PageButton = styled.button<{$beforeText: string}>`
    position: relative;
    &::before{
        content: "${(props) => props.$beforeText}";
        position: absolute;
        left: 0;
        top: 0;
        color: #000000;
        width: 0;
        overflow: hidden;
        transition: .4s;
    }
    &:hover{
        &::before{
            width: 100%;
        }
    }
`;

const ConfirmBox = styled.section`
    width: 100%;
    height: calc(100% - 221px);
    padding: 0 100px;
    &.confirm-enter{
        p,> button{
            opacity: 0;
        }
    }
    &.confirm-enter-done{
        p,> button{
            opacity: 1;
        }
    }
    p{
        font-size: 54px;
        font-weight: 400;
        line-height: 1.4;
        transition: opacity .6s;
        color: #000000;
        span{
            font-weight: 600;
            color: #ffffff;
        }
    }
    > button{
        position: relative;
        display: block;
        width: 186px;
        padding: 14px 5px;
        border: 1px solid #ffffff;
        background-color: transparent;
        border-radius: 36px;
        font-size: 20px;
        font-weight: 400;
        text-align: center;
        margin-top: 90px;
        overflow: hidden;
        color: #ffffff;
        transition: .6s;
        &::before{
            content: "";
            position: absolute;
            right: -1px;
            top: -1px;
            transform: translateY(0);
            z-index: -1;
            width: 0;
            height: calc(100% + 2px);
            background-color: #ffffff;
            border-radius: 36px;
            transition: .4s;
        }
        &:hover{
            color: #000000;
            &::before{
                left: -1px;
                width: calc(100% + 2px);
            }
        }
    }
    @media screen and (max-width: 1400px){
        height: calc(100% - 122px);
        padding: 0 50px;
        p{
            font-size: 42px;
        }
    }
    @media screen and (max-width: 1024px){
        p{
            font-size: 35px;
        }
    }
    @media screen and (max-width: 560px){
        height: calc(100% - 52px);
        padding: 0 10px 30px;
        p{
            font-size: 25px;
            br{
                margin-top: 10px;
            }
        }
        > button{
            width: auto;
            padding: 7px 14px;
            margin-top: 20px;
            font-size: 16px;
        }
    }
`;

interface ISelectOption {
    pageId: number,
    options: string[],
}

export default function Home() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [currentCname, setCurrentCname] = useState("");
    const [selectedOptions, setSelectedOptions] = useState<ISelectOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const progressMath = (currentPage / qnaArr.length * 100);
    const backOnClick = () => {
        setCurrentPage(prev => prev - 1);
    }
    const nextOnClick = () => {
        if (currentPage === 0) {
            if (currentCname === "") {
                toast.success("안녕하세요 담당자님! \n인재 찾기 설문을 시작합니다.");
            }else{
                toast.success(`안녕하세요 ${currentCname} 담당자님! \n인재 찾기 설문을 시작합니다.`);
            }
            handleOptionClick(currentCname);
            setCurrentPage(1);
        }else{
            if (qnaArr.length === currentPage) return;
            const currOption = selectedOptions.find(item => item.pageId === currentPage);
            if (currentPage > 0 && (currOption === undefined || currOption.options.length === 0)) { // 첫 번째 페이지는 스킵 가능 && 현재 페이지에서 답변을 선택한 적이 없거나, 선택을 모두 취소한 경우
                toast.error("1개 이상의 답변을 선택해주세요.");
            }else{
                toast.success("정상적으로 선택되었습니다!");
                setCurrentPage(prev => prev + 1);
            }
        }
    }
    const textAreaChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentCname(e.target.value);
    }
    const handleOptionClick = (option: string) => {
        setSelectedOptions(prev => {
            const currentPageOptions = prev.find(item => item.pageId === currentPage);
            if (currentPage === 0) { // currentPage가 0일 때
                return [{ pageId: currentPage, options: [option] }, ...prev.slice(1)]; // 첫 번째 요소를 currentCname으로 업데이트하고 나머지 요소는 그대로 유지
            }
            if (currentPageOptions) { // 현재 페이징 번호를 가진 배열이 존재하는 경우
                if (currentPageOptions.options.includes(option)) { // 선택된 옵션이 있을 경우
                    return prev.map(item =>
                        item.pageId === currentPage
                        ? {...item, options: item.options.filter(del => del !== option)}
                        : item
                    );
                }else{
                    return prev.map(item => 
                        item.pageId === currentPage 
                        ? { ...item, options: [...item.options, option] } 
                        : item
                    );
                }
            }else {
                return [...prev, { pageId: currentPage, options: [option] }];
            }
        });
    }
    const resultOnClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigate("/profile");
            setIsLoading(false);
        }, 3000);
    }
    return (
        <>
            {isLoading ?
            <Loading />
            :
            <Warpper>
                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 1500,
                    }}
                />
                <ProgressBar $progress={progressMath}>
                    <h2 className="blind">현재 진행률 : {progressMath}%, 현재 페이지 : {currentPage}번</h2>
                    <span></span>
                </ProgressBar>
                    {currentPage < 4 ?
                    (<ContentBox>
                        <TransitionGroup>
                            <CSSTransition
                                key={currentPage}
                                timeout={500}
                                classNames="question"
                                appear
                            >
                                <Question>
                                    <p className="num">0{qnaArr[currentPage].id}.</p>
                                    <p className="textQ">
                                        {qnaArr[currentPage].question.split('\n').map((line, index) => (
                                            <React.Fragment key={index}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </p>
                                </Question>
                            </CSSTransition>
                        </TransitionGroup>
                        <TransitionGroup>
                            <CSSTransition
                                key={currentPage}
                                timeout={500}
                                classNames="option"
                                appear
                            >
                                <Option $beforeBgColor={currentPage === 0 ? 100:0}>
                                    <div className="inner">
                                        <div className="BtnArea">
                                            {currentPage !== 0 ? <PageButton type="button" onClick={backOnClick} $beforeText="BACK">BACK</PageButton> : <div></div>}
                                            <PageButton type="button" onClick={nextOnClick} $beforeText={(currentPage === 0 && currentCname.length <= 0) ? "SKIP" : "NEXT"}>{(currentPage === 0 && currentCname.length <= 0) ? "SKIP" : "NEXT"}</PageButton>
                                        </div>
                                        {currentPage === 0 ?
                                        (<div className="Textarea">
                                            <textarea onChange={textAreaChange} maxLength={20} placeholder="귀사의 상호명을 적어주세요." value={currentCname}></textarea>
                                            <p>귀사의 상호는 제작자의 포트폴리오 확인에 있어 사용되며 외부 노출 및 저장에는 일절 사용되지 않습니다.</p>
                                        </div>)
                                        :
                                        (<div className="selectArea">
                                           {currentPage !== 0 && <p>※ 다중 선택 가능</p>}
                                            {qnaArr[currentPage].options.map((item) => <button key={item} onClick={() => handleOptionClick(item)} className={selectedOptions.find((x) => x.pageId === currentPage && x.options.includes(item)) ? "select":""}>{item}</button>)}
                                        </div>)
                                        }
                                    </div>
                                </Option>
                            </CSSTransition>
                        </TransitionGroup>
                    </ContentBox>)
                    :
                    (<ConfirmBox>
                        <p><span>{selectedOptions[0].options[0] !== "" ? selectedOptions[0].options:"귀사"}</span>의 담당자님께서는 <br />
                        <span>{selectedOptions[2].options.join(", ")}</span>를 <span>{selectedOptions[1].options.join(", ")}</span>으로 채용할 계획이 있으며, <br />
                        해당 <span>{selectedOptions[2].options.join(", ")}</span>가 필수로 갖추어야 할 기술 스택으로는 <br />
                        <span>{selectedOptions[3].options.join(", ")}</span>로 총 <span>{selectedOptions[3].options.length}</span>개 입니다. <br />
                        해당 조건으로 인재를 검색 하시겠습니까?
                        </p>
                        <button onClick={() => {setSelectedOptions([]); setCurrentCname(""); resultOnClick();}}>인재 검색하기</button>
                    </ConfirmBox>)
                    }
            </Warpper>
            }
        </>
    )
}
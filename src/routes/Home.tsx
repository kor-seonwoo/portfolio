import styled from "styled-components"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

const qnaArr = [
    {
        id: 1,
        question: `안녕하세요! 방문을 환영합니다.`,
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
]

const Warpper = styled.main`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    /* > div{
        height: calc(100% - 224px);
    } */
`;

const ProgressBar = styled.nav<{$progress: number}>`
    width: 100%;
    height: 4px;
    background-color: #ffffff;
    margin: 100px 0 120px;
    > span{
        display: block;
        width: ${(props) => props.$progress}%;
        height: 100%;
        background-color: #000000;
        transition: .4s;
    }
`;

const ContentBox = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: calc(100% - 224px);
    /* height: 100%; */
    &.fade-enter-done{
        
    }
`;

const Question = styled.article`
    width: 100%;
    padding: 0 100px;
    .num{
        font-size: 20px;
        font-weight: 600;
    }
    .textQ{
        font-size: 62px;
        font-weight: 400;
        line-height: 1.3;
        margin-top: 23px;
    }
`;

const Option = styled.article`
    position: relative;
    width: 100%;
    height: 339px;
    padding: 0 100px;
    &.active{
        &::before{
            height: 100%;
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
        transition: .5s;
    }
    .inner{
        position: relative;
        z-index: 10;
        border-top: 4px solid #ffffff;
        width: 100%;
        height: 100%;
        .BtnArea{
            position: absolute;
            left: 0;
            top: -24px;
            transform: translateY(-100%);
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
            > button{
                background-color: transparent;
                border: none;
                font-size: 20px;
                font-weight: 400;
                color: #ffffff;
            }
        }
        .Textarea{
            position: relative;
            left: 50px;
            opacity: 0;
            visibility: hidden;
            height: 0;
            &.active{
                left: 0;
                opacity: 1;
                visibility: visible;
                height: auto;
                transition: 1s ease-out .5s;
            }
            textarea{
                width: 100%;
                height: 164px;
                border: 1px solid #A4A4A4;
                border-radius: 18px;
                padding: 24px;
                margin: 28px auto;
                font-size: 24px;
                font-weight: 400;
                color: #A4A4A4;
                resize: none;
                &::placeholder{
                    font-size: 24px;
                    font-weight: 400;
                    color: #A4A4A4;
                }
                &:focus {
                    outline: none;
                    border-color: #F97D3C;
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
            display: flex;
            flex-wrap: wrap;
            gap: 28px 42px;
            margin-top: 28px;
            > button{
                padding: 14px 28px;
                border: 1px solid #ffffff;
                border-radius: 36px;
                font-size: 24px;
                font-weight: 400;
                background-color: transparent;
                color: #ffffff;
                &.select{
                    background-color: #ffffff;
                    color: #000000;
                }
            }
            p{
                width: 100%;
                font-size: 16px;
                font-weight: 400;
                line-height: 1.3;
            }
        }
    }
`;

const ConfirmBox = styled.section`
    width: 100%;
    height: calc(100% - 224px);
    padding: 0 100px;
    p{
        font-size: 52px;
        font-weight: 400;
        line-height: 1.4;
        span{
            font-weight: 600;
            color: greenyellow;
        }
    }
    > button{
        display: block;
        width: 186px;
        padding: 14px 5px;
        border: 1px solid #ffffff;
        border-radius: 36px;
        font-size: 24px;
        font-weight: 400;
        text-align: center;
        margin-top: 90px;
        &:hover,&:focus{
            background-color: #ffffff;
            color: #000000;
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
            handleOptionClick(currentCname);
            setCurrentPage(1);
        }else{
            if (qnaArr.length === currentPage) return;
            const currOption = selectedOptions.find(item => item.pageId === currentPage);
            if (currentPage > 0 && (currOption === undefined || currOption.options.length === 0)) { // 첫 번째 페이지는 스킵 가능 && 현재 페이지에서 답변을 선택한 적이 없거나, 선택을 모두 취소한 경우
                alert("최소 1개 이상의 답변을 선택 부탁드리겠습니다.");
            }else{
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
                <ProgressBar $progress={progressMath}>
                    <h2 className="blind">현재 진행률 : {progressMath}%</h2>
                    <span></span>
                </ProgressBar>
                {/* <TransitionGroup>
                    <CSSTransition
                        key={currentPage}
                        timeout={500}
                        classNames="fade"
                    >
                    </CSSTransition>
                </TransitionGroup> */}
                {currentPage < 4 ?
                (<ContentBox>
                    <Question>
                        <p className="num">0{qnaArr[currentPage].id}.</p>
                        <p className="textQ">{qnaArr[currentPage].question}</p>
                    </Question>
                    <Option className={currentPage === 0 ? "active" : ""}>
                        <div className="inner">
                            <div className="BtnArea">
                                {currentPage !== 0 ? <button type="button" onClick={backOnClick}>BACK</button> : <div></div>}
                                <button type="button" onClick={nextOnClick}>{(currentPage === 0 && currentCname.length <= 0) ? "SKIP" : "NEXT"}</button>
                            </div>
                            <div className={`Textarea ${currentPage === 0 && "active"}`}>
                                <textarea onChange={textAreaChange} maxLength={20} placeholder="귀사의 상호명을 적어주세요."></textarea>
                                <p>귀사의 상호는 제작자의 포트폴리오 확인에 있어 사용되며 외부 노출 및 저장에는 일절 사용되지 않습니다.</p>
                            </div>
                            <div className={`selectArea ${currentPage !== 0 && "active"}`}>
                                <p>※ 다중 선택 가능</p>
                                {qnaArr[currentPage].options.map((item) => <button key={item} onClick={() => handleOptionClick(item)} className={selectedOptions.find((x) => x.pageId === currentPage && x.options.includes(item)) ? "select":""}>{item}</button>)}
                            </div>
                        </div>
                    </Option>
                </ContentBox>)
                :
                (<ConfirmBox>
                    <p><span>{selectedOptions[0].options.length < 0 ? selectedOptions[0].options:"귀사"}</span>의 담당자님께서는 <br />
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
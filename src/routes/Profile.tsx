import { Link } from "react-router-dom";
import styled from "styled-components";

const Warpper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    .inner{
        width: calc(100% - 20px);
        padding: 40px 20px;
        max-width: 1024px;
        background-color: #ffffff;
        box-shadow: 2px 2px 25px rgba(42,42,42,0.6);
        border-radius: 4px;
        color: #000000;
    }
    @media screen and (max-width: 560px){
        height: auto;
        padding: 40px 0;
        .inner{
            padding: 20px 10px;
        }
    }
`;

const Article = styled.section`
    &:nth-child(n + 2){
        margin-top: 30px;
    }
    h2{
        font-size: 34px;
        font-weight: 600;
    }
    hr{
        width: 100%;
        height: 0;
        border-top: 1px solid #a4a4a4;
        margin: 10px auto;
    }
    p{
        line-height: 1.4;
        &.name{
            font-size: 20px;
            a{
                display: inline-block;
                padding: 2px 5px 1px;
                background-color: #F97D3C;
                border-radius: 4px;
                font-size: 17px;
                margin-left: 15px;
                &:hover{
                    opacity: .8;
                }
            }
        }
        &.dis{
            font-size: 18px;
            font-weight: 400;
            margin-top: 10px;
        }
    }
    ul{
        margin-top: 20px;
        > li{
            font-size: 18px;
            font-weight: 400;
            &:nth-child(n + 2){
                margin-top: 8px;
            }
            a:hover{
                color: #F97D3C;
            }
            span{
                display: inline-block;
                width: 30px;
                text-align: center;
            }
        }
    }
    .dlArea{
        dl{
            &:nth-child(n + 2){
                margin-top: 10px;
            }
        }
        dt{
            display: inline-block;
            padding: 1px 5px;
            background-color: #F97D3C;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 8px;
        }
        dd{
            font-size: 18px;
            font-weight: 400;
            line-height: 1.3;
        }
    }
    @media screen and (max-width: 560px){
        &:nth-child(n + 2){
            margin-top: 20px;
        }
        h2{
            font-size: 25px;
        }
        p{
            &.name{
                font-size: 18px;
                span{
                    display: block;
                    margin-top: 7px;
                    a{
                        font-size: 16px;
                        margin-left: 0;
                        &:nth-child(n + 2){
                            margin-left: 10px;
                        }
                    }
                }
            }
            &.dis{
                font-size: 16px;
            }
        }
        ul{
            > li{
                font-size: 15px;
            }
        }
        .dlArea{
            dt{
                font-size: 17px;
            }
            dd{
                font-size: 15px;
            }
        }
    }
`;

const HomeMove = styled.div`
    margin-top: 40px;
    a{
        position: relative;
        display: inline-block;
        padding: 14px 25px;
        border: 1px solid #ffffff;
        border-radius: 36px;
        font-size: 20px;
        font-weight: 400;
        overflow: hidden;
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
    @media screen and (max-width: 560px){
        margin-top: 20px;
        a{
            padding: 7px 15px;
            font-size: 18px;
        }
    }
`;

export default function Profile() {
    return (
        <Warpper>
            <div className="inner">
                <Article>
                    <h2>About</h2>
                    <hr />
                    <p className="name">이름 : 이선우 <span><a href={process.env.PUBLIC_URL + "/assets/pdf/vitae.pdf"} target="_blank" rel="noopener noreferrer">이력서</a><a href={process.env.PUBLIC_URL + "/assets/pdf/career.pdf"} target="_blank" rel="noopener noreferrer">경력기술서</a><a href={process.env.PUBLIC_URL + "/assets/pdf/portfolio.pdf"} target="_blank" rel="noopener noreferrer">포트폴리오</a></span></p>
                    <p className="dis">프론트엔드 개발자로 JavaScript와 React에 대한 관심이 많으며 기초가 단단해지기 위해 
                        한국방송통신대학교 컴퓨터과학과에서 CS 관련 지식을 공부하고 있다. 업무를 진행할 땐 성
                        실한 스케줄링과 맡은 업무를 책임감과 꼼꼼함으로 완수해내는 강점을 보유하고 있다.
                    </p>
                    <ul>
                        <li><a href="https://github.com/kor-seonwoo" target="_blank" rel="noopener noreferrer"><span>✔</span> Github: https://github.com/kor-seonwoo</a></li>
                        <li><a href="https://velog.io/@kor-seonwoo" target="_blank" rel="noopener noreferrer"><span>✔</span> Blog : https://velog.io/@kor-seonwoo</a></li>
                        <li><span>💬</span> Email : tjsdn_9624@naver.com</li>
                    </ul>
                </Article>
                <Article>
                    <h2>Skills</h2>
                    <hr />
                    <div className="dlArea">
                        <dl>
                            <dt>Strong</dt>
                            <dd>JavaScript&TypeScript / React / HTML5 / SCSS,CSS3</dd>
                        </dl>
                        <dl>
                            <dt>knowledgeable</dt>
                            <dd>next.js / firbase / MySQL</dd>
                        </dl>
                        <dl>
                            <dt>ETC</dt>
                            <dd>Git</dd>
                        </dl>
                    </div>
                </Article>
            </div>
            <HomeMove>
                <Link to="/">인재 다시 찾기</Link>
            </HomeMove>
        </Warpper>
    )
}
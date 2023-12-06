import { BallTriangle } from "react-loader-spinner";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    text-align: center;
    svg{
        width: 150px;
        height: 150px;
    }
    p{  
        font-size: 20px;
        font-weight: 400;
        line-height: 1.4;
        margin-top: 30px;
    }
    @media screen and (max-width: 560px){
        svg{
            width: 100px;
            height: 100px;
        }
        p{  
            font-size: 17px;
            margin-top: 20px;
        }
    }
`;

export default function Loading() {
    return (
        <Wrapper>
            <BallTriangle
                color="#ffffff"
            />
            <p>인재를 찾고 있습니다. <br /> 잠시만 기다려주세요.</p>
        </Wrapper>
    );
}
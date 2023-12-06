import { BallTriangle } from "react-loader-spinner";
import styled from "styled-components";

const Wrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    text-align: center;
    p{  
        font-size: 20px;
        font-weight: 400;
        line-height: 1.4;
        margin-top: 30px;
    }
`;

export default function Loading() {
    return (
        <Wrapper>
            <BallTriangle
                color="#ffffff"
                width={130}
                height={130}
            />
            <p>인재를 찾고 있습니다. <br /> 잠시만 기다려주세요.</p>
        </Wrapper>
    );
}
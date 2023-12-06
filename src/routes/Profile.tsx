import styled from "styled-components"

const Warpper = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    p{
        font-size: 22px;
        font-weight: 400;
    }
`;

export default function Profile() {
    return (
        <Warpper>
            <p>접니다 그게</p>
        </Warpper>
    )
}
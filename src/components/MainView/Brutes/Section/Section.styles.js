import styled from '@emotion/styled';

export const SectionContainer = styled.div`
    width: 80%;
    height: 200px;
    margin: 20px auto 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SectionImage = styled.img`
    width: 50%auto;
    height: 200px;
    background: url(${p => p.img});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
`
export const SectionDescription = styled.div`
    width: 45%;
`
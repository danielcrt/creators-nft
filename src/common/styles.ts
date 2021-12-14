import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    padding-right: calc(1.5rem/2);
    padding-left: calc(1.5rem/2);
    margin-right: auto;
    margin-left: auto;
  
    @media (min-width: 576px) {
        max-width: 540px;
    }

    @media (min-width: 768px) {
        max-width: 720px;
    }

    @media (min-width: 992px) {
        max-width: 960px;
    }


    @media (min-width: 1200px){
        max-width: 1140px;
    }

    @media screen and (max-width: 1400px) {
        max-width: 1200px;
    }
`;

export const TextInput = styled.input`
    background: 0 0;
    color: #232226;
    background-color: #f2f7fa;
    border: 1px solid transparent;
    width: 100%;
    padding: 15px;
    line-height: 1.5;
    font-weight: 400;
    font-size: inherit;
    border-radius: 12px;
    position: relative;
    -webkit-appearance: none;
    transition: all .4s cubic-bezier(.4,0,.2,1);
    outline: 0;
`;

export const HR = styled.div`
    height: 1px;
    width: 100%;
    background: #e2eef1;
    margin-top: 10px;
    margin-bottom: 10px;
`;
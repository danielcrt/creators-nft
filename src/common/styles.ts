import { InputHTMLAttributes } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { hexToRgb } from './utils';

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

export const Error = styled.span`
  color: red;
`;

type TagProps = {
    color: string;
    theme: DefaultTheme;
}

export const Tag = styled.span<TagProps>`
    background: ${props => props.color ? props.color : props.theme.colors.primary};
    color: ${props => {
        const rgb = hexToRgb(props.color);
        if (!rgb) return '#fff';
        return ((rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 186) ? '#000000' : '#ffffff';
    }};
    transition: 0.4s;
    padding: 6px;
    border-radius: 5px;
    font-size: 16px;

    &:hover {
        opacity: 0.8;
    }
`;
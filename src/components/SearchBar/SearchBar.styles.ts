import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { TextInput } from "../../common/styles";

export const Wrapper = styled.div`
  background: #e2eef1;
  height: 3rem;
  width: 20rem;
  border-radius: 100px;
  position: relative;
  transition: all .2s ease-in-out;
  border: 1px
  solid transparent;
`;

export const Input = styled(TextInput)`
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  padding-left: 2rem;
`;

export const Icon = styled.div`
  border: none;
  background: ${props => props.theme.colors.primary};
  border-radius: 200px;
  height: 2.4rem;
  width: 2.4rem;
  position: absolute;
  right: 2px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: .25s cubic-bezier(.4,0,.2,1);
  text-decoration: none!important;

  svg {
    position: relative;
    color: #fff;
    top: 8px;
  }

  &:hover {
    opacity: 0.8;
  }
`;
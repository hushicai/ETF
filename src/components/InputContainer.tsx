import styled from 'styled-components';

export const InputContainer = styled.div`
  display: inline-flex;
  color: rgba(0, 0, 0, 0.87);
  flex: 1;
  input[type='text'] {
    -webkit-appearance: none;
    max-width: 100%;
    text-align: left;
    color: rgba(0, 0, 0, 0.87);
    padding: 0.5em 1em;
    background: rgb(255, 255, 255);
    border-width: 1px;
    border-style: solid;
    border-color: rgba(34, 36, 38, 0.15);
    border-radius: 5px;
    transition: box-shadow 0.1s ease 0s, border-color 0.1s ease 0s;
    flex: 1;
  }
  input:read-only {
    background: #eee;
    cursor: default;
  }
`;

export const UnitInputContainer = styled(InputContainer)`
  input[type='text'] {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-right-color: transparent;
  }
  div {
    font-weight: 700;
    border-radius: 5px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    color: rgba(0, 0, 0, 0.87);
    background: none rgb(255, 255, 255);
    border-width: 1px;
    border-style: solid;
    border-color: rgba(34, 36, 38, 0.15);
    height: 30px;
    width: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

export const FlexendInputContainer = styled(InputContainer)`
  justify-content: flex-end;
  input[type='checkbox'] {
    margin-right: 14px;
  }
`;

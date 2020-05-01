import React from 'react'
import styled from 'styled-components'

const InputBox = styled.textarea`
  width: 100%;
  height: 100px;
  box-shadow: ${({ theme }) => theme.basicBoxShadow};
  border-radius: ${({ theme }) => theme.normalBorderRadius};
  font-size: ${({ theme }) => theme.mediumFontSize};
  resize: vertical;
  border: none;
  padding: 0;
  :focus {
    outline: none;
  }
`

const FeedInput = () => <InputBox placeholder="hello" />

export { FeedInput }

import React, { useState } from "react"
import _ from "lodash/fp"
import styled from "styled-components"

import { MaterialIcon } from "./MaterialIcon"

const StyledFeedBlockContainer = styled.div`
  padding: 2px;
`

const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledTitleContainer = styled.div`
  font-size: ${({ theme }) => theme.mediumFontSize};
`

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledPaddingTextColumn = styled.div`
  height: 100%;
  width: 10px;
`

const StyledFooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const StyledLikesContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledLikesCount = styled.div`
  align-self: center;
  cursor: pointer;
`

interface IFeedBlockProps {
  text: string
  location: string
  postType: string
  title: string
}

const FeedBlock: React.FC<IFeedBlockProps> = ({ text, title }) => {
  const [isLiked, setLike] = useState(false)
  const [likeCount, setLikeCount] = useState(_.random(0, 100))

  const handleLike = () => {
    setLike((isCurrentlyLiked) => {
      if (isCurrentlyLiked) {
        setLikeCount((currentLikeCount) => currentLikeCount - 1)
      } else {
        setLikeCount((currentLikeCount) => currentLikeCount + 1)
      }
      return !isCurrentlyLiked
    })
  }
  return (
    <StyledFeedBlockContainer>
      <StyledHeaderContainer>
        <StyledTitleContainer>{title}</StyledTitleContainer>
        <MaterialIcon
          name="save"
          size="18px"
          onClick={() => console.log("save post")}
        />
      </StyledHeaderContainer>
      <StyledTextContainer>
        <StyledPaddingTextColumn />
        {text}
        <StyledPaddingTextColumn />
      </StyledTextContainer>
      <StyledFooterContainer>
        <MaterialIcon
          name="record_voice_over"
          size="18px"
          onClick={() => console.log("repost")}
        />
        <StyledLikesContainer>
          <StyledLikesCount>{likeCount}</StyledLikesCount>
          <MaterialIcon
            name={isLiked ? "emoji_objects" : "emoji_objects_outlined"}
            size="20px"
            onClick={handleLike}
          />
        </StyledLikesContainer>
      </StyledFooterContainer>
    </StyledFeedBlockContainer>
  )
}

export { FeedBlock }

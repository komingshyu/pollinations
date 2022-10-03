import React from 'react'
import { Link } from '@material-ui/core'
import Icon from './atoms/Icon'
import { COLORS } from '../_globalConfig/colors'
import { SOCIAL_LINKS } from '../_globalConfig/socialLinks'
import styled from '@emotion/styled'
import { MOBILE_BREAKPOINT } from '../styles/global'

export const SocialPostStatus = ({ results }) =>
  Object.keys(results).map(
    (platform) => results[platform] && PostResultLink(results[platform], platform)
  )

export const SocialLinks = ({ small, hideOnMobile, gap }) => (
  <SocialStyle small={small} hideOnMobile={hideOnMobile} gap={gap}>
    {Object.keys(SOCIAL_LINKS).map(PlatformLink)}
  </SocialStyle>
)
const SocialStyle = styled.div`
grid-area: social;
align-self: center;
display: flex;
justify-content: flex-end;
align-items: center;
gap: ${props => props.gap || '0em'};
a {
  width: ${props => props.small ? '30px' : '50px'} !important;
  height: ${props => props.small ? '30px' : '50px'} !important;
}
@media only screen and (max-width: ${MOBILE_BREAKPOINT}){
  display: ${props => props.hideOnMobile ? 'none' : ''};
}
`

const PlatformLink = (platform) => {
  const { icon, url } = SOCIAL_LINKS[platform]
  return (
    <Link
      key={`plt_link_${platform}`}
      href={url}
      style={{ 
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      target="_blank"
      title={platform}
    >
      {typeof icon === 'string' ? (
        <Icon path={SOCIAL_LINKS[platform].icon} color={COLORS.font.default} size={35} />
      ) : (
        SOCIAL_LINKS[platform].icon
      )}
    </Link>
  )
}

const PostResultLink = ({ status, message, errors, postIds, errorMessage }, platform) => {
  const errorMsg = errorMessage || message || (errors && errors[0] && errors[0].message)
  const color = status === 'error' || errorMsg ? 'error' : 'inherit'

  const postURL = postIds && postIds[0]?.postUrl

  return (
    <Link key={`link_${platform}`} href={postURL} target="_blank" color={color} title={errorMsg}>
      {SOCIAL_LINKS[platform].icon}
    </Link>
  )
}

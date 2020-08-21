import React from 'react';
import ReplyIcon from '@material-ui/icons/Reply';
import { LinkBtn } from '../ui/LinkBtn/LinkBtn'


function HomeBtn(props) {
  return (
   
    <LinkBtn colour="blue" icon={<ReplyIcon />} link="/">Home</LinkBtn>

  );
}

export default HomeBtn;


import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Collapse } from '@material-ui/core';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import WebIcon from '@material-ui/icons/Web';
import TCCard from '../../ui/TCCard/TCCard';
import NewsListItem from '../../ui/NewsListItem/NewsListItem';

export class NewsBlock extends Component {

    /*
    content: "<a href="https://www.psychologytoday.com/ca/blog/dont-delay/202003/the-corona-virus-and-travel-procrastination" target="_blank">The Corona Virus And Travel Procrastination</a>&nbsp;&nbsp;<font color="#6f6f6f">Psychology Today</font>"
    contentSnippet: "The Corona Virus And Travel Procrastination&nbsp;&nbsp;Psychology Today"
    isoDate: "2020-03-09T16:06:05.000Z"
    link: "https://www.psychologytoday.com/ca/blog/dont-delay/202003/the-corona-virus-and-travel-procrastination"
    pubDate: "Mon, 09 Mar 2020 16:06:05 GMT"
    title: "The Corona Virus And Travel Procrastination - Psychology Today"
    */

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({open: !this.state.open})
    }
    

    render() {
        const { item } = this.props
        return (

            <div  className="w-70-ns w-90 center mid-gray mv3">
                <TCCard>
                    <NewsListItem handleOnClick={this.handleClick} className="listItem">
                        <h1 className="f5 mid-gray">
                            {item.title}
                        </h1>
                        {this.state.open ? <ExpandLess style={{"color":"cornflowerblue"}}/> :
                        <ExpandMore style={{"color":"cornflowerblue"}}/>}
                    </NewsListItem>
           
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <NewsListItem className="listItemInner">
                                <ListItemIcon>
                                    <WebIcon />
                                </ListItemIcon>                            
                                <ListItemText primary={item.publisher} className="mid-gray"/>
                            </NewsListItem>

                            <a href={item.link} target="_blank">
                                <NewsListItem className="listItemInner">
                                    <ListItemIcon>
                                            <LinkOutlinedIcon/>
                                        </ListItemIcon>                            
                                    <ListItemText primary="Go to article" />
                                </NewsListItem>
                             </a>
                             
                            <NewsListItem className="listItemInner">
                                <ListItemIcon>
                                        <AccessTimeIcon/>
                                    </ListItemIcon>                            
                                <ListItemText primary={item.pubDate} className="mid-gray"/>
                            </NewsListItem>
                        </List>

                    </Collapse>

                </TCCard>
            </div>



        );
    }
}

export default NewsBlock;

import React, { Component } from 'react';
import './NewsBlock.css'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Collapse } from '@material-ui/core';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import WebIcon from '@material-ui/icons/Web';

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

            <div className="tl br3 mid-gray ma3 ph4 pv2 w-70-ns w-90 center ba b--light-silver bg-white">
                <ListItem button onClick={this.handleClick} className="listItem">
          
                    <h1 className="f4">{item.title}</h1>
                    {this.state.open ? <ExpandLess style={{"color":"cornflowerblue"}}/> :
                    <ExpandMore style={{"color":"cornflowerblue"}}/>}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className="listItemInner">
                            <ListItemIcon>
                                <WebIcon />
                            </ListItemIcon>                            
                            <ListItemText primary={item.publisher} />
                        </ListItem>
                        <a href={item.link} target="_blank">
                            <ListItem button className="listItemInner">
                                <ListItemIcon>
                                    <LinkOutlinedIcon/>
                                </ListItemIcon>                            
                                <ListItemText primary="Go to article" />
                            </ListItem>
                        </a>
                        <ListItem button className="listItemInner">
                            <ListItemIcon>
                                <AccessTimeIcon/>
                            </ListItemIcon>                            
                            <ListItemText primary={item.pubDate} />
                        </ListItem>
                    </List>

                </Collapse>

            </div>
        
        // <div>
        //     <a href={item.link} className="no-hv-underline">
        //     <div className="tl shadow-1 br2 mid-gray ma3 ph4 pv3 w-90 center ba bw1 news_block">
                
        //         <div>
        //             <h2 className="f5 b gray">{item.publisher}</h2>
        //             <h1 className="f4">{item.title}</h1>

        //             <h1 className="f6 gray pt2">{item.pubDate}</h1>
                
        //         </div>

        //     </div>
        //     </a>
        // </div>

        );
    }
}

export default NewsBlock;

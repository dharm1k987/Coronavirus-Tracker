import React, { Component } from 'react';
import moment from "moment";
import './NewsBlock.css'
export class NewsBlock extends Component {

    /*
    content: "<a href="https://www.psychologytoday.com/ca/blog/dont-delay/202003/the-corona-virus-and-travel-procrastination" target="_blank">The Corona Virus And Travel Procrastination</a>&nbsp;&nbsp;<font color="#6f6f6f">Psychology Today</font>"
    contentSnippet: "The Corona Virus And Travel Procrastination&nbsp;&nbsp;Psychology Today"
    isoDate: "2020-03-09T16:06:05.000Z"
    link: "https://www.psychologytoday.com/ca/blog/dont-delay/202003/the-corona-virus-and-travel-procrastination"
    pubDate: "Mon, 09 Mar 2020 16:06:05 GMT"
    title: "The Corona Virus And Travel Procrastination - Psychology Today"
    */

    render() {
        const { item } = this.props
        return (<div>
            <a href={item.link} className="no-hv-underline">
            <div className="tl shadow-1 br2 mid-gray ma3 ph4 pv3 w-90 center ba bw1 news_block">
                
                <div>
                    <h2 className="f5 b gray">{item.publisher}</h2>
                    <h1 className="f4">{item.title}</h1>

                    <h1 className="f6 gray pt2">{item.pubDate}</h1>
                
                </div>

            </div>
            </a>
        </div>

        );
    }
}

export default NewsBlock;

import React, { Component } from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { SourceImage } from '../ui/SourceImage/SourceImage'
import { v4 as uuidv4 } from 'uuid';
import HomeBtn from '../HomeBtn/HomeBtn';
import { TCCard } from '../ui/TCCard/TCCard'


const listings = [
    {
        title: "WHO",
        description: `We use WHO to get the latest qualitative information about the Pandemic. WHO aggregates data from more than 190 countries and provides up to date information about how to deal with COVID-19, the growing situation, and what are the most effective steps which can be taken to protect against the virus. More specifically, WHO data is used in providing an accurate list of action items which you are greeted with in the COVID-19 Pandemic Readiness Test.`,
        image: "/sources/logo_who.jpg",
        website: "https://www.who.int/"
    },
    {
        title: "Johns Hopkins University",
        description: "We use JHU to get the latest qualitative information over a certain time period. JHU allows us not only to cross-verify our data, but it allows us to see how deaths, recoveries and cases have changed since the start. This data is visually displayed as a line graph on majority of the countries. If the line graph is missing, this is because JHU did not contain this information. You can go to any country, say Canada, and see the line graph.",
        image: "/sources/logo_jhu.png",
        website: "https://github.com/CSSEGISandData/COVID-19"
    },
    {
        title: "Worldometer",
        description: "We use Worldometer in addition with other sources to provide the most up-to-date numbers about the Pandemic. We know that this pandemic is a very fast-changing situation, and we have made it goal to provide all visitors with the latest number updates. To stay up to date with the latest numbers, we query sources such as Worldometer every couple of minutes to stay up to date and provide you a simple, succinct glimpse of the current state of different parts of the world.",
        image: "/sources/logo_worldometers.png",
        website: "https://worldometers.info/coronavirus/"
    },
    {
        title: "Wikipedia",
        description: "We use Wikipedia to further gain insight about the pandemic and provide useful and accurate information to the site's users. Wikipedia information has helped in the readiness quiz, and also informing users what they need to know (for instance in guide). This information generally comes from credited sources like WHO, so the information provided here is well defined.",
        image: "/sources/logo_wikipedia.png",
        website: "https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_pandemic_by_country_and_territory"
    },
    {
        title: "News",
        description: "We use Google News’ API to bring in news articles filtered by country for an optimal experience for the user. By providing the latest news, users stay updated on how their country is tackling the current situation with the outbreak. The latest news is updated in real-time with the most recent articles appearing on top. Clicking on the drop down button provides further details on the articles such as the name of the publisher, the link to the publisher’s site and time at which the article was published.",
        image: "/sources/logo_google.png",
        website: "https://news.google.com/topstories?hl=en-CA&gl=CA&ceid=CA:en"
    }
]
export class Sources extends Component {
    render() {
        return (
            <div className="center w-90 w-70-ns">

              <HomeBtn />            
              <h1 className="f2 tc mv2 b">Data Sources</h1>
              <h2 className="tc">The following cards indicate which sources are used on this website to provide the most accurate COVID-19 information.
              In each card is also listed how the information is being used, for your convenience.
              </h2>


              <div className="flex flex-row flex-column-ns flex-wrap items-center justify-center mb3">
                {
                    listings.map(e => {
                        return (
                            <div className="mt3 mh3-ns w-40-ns w-90-m" key={uuidv4()}>
                                <TCCard>
                                
                                    <CardActionArea disabled>
                                        <SourceImage image={e.image} />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" className="mid-gray tc">
                                            {e.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {e.description}
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        {/* Leave this one as well */}
                                        <Button size="small" color="primary" onClick={() => window.open(e.website, '_blank')}>
                                        Learn More
                                        </Button>
                                    </CardActions>
                                </TCCard>
                            </div>
                        )
                    })
                }

              </div>
            </div>
        );
    }
}

export default Sources;

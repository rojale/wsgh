//creates a simple list of (defined in here) bg cards that can be assigned a clickable action | card onClick returns the bg object to props.onClick

import React from 'react';

class ClickList extends React.Component {

    constructor(props){
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        this.handleInfoClick = this.handleInfoClick.bind(this);
    }

    handleClick(i, event){
        const bg_object = this.props.bgList[i];
        this.props.cardClick(bg_object);
        this.props.onClose();
    }

    handleInfoClick(i, event){
        console.log(i);
    }


    render(){

        const gifList = this.props.gifList;
        
        const listItems = gifList.map((gif, i) =>
       
            <div key={i} className="media gif-card" style={{textAlign:"left"}} >
                <div className="media-left">
                    <img className="mr-3 gif-bg" style = {{height: "auto", width: 200 }} src={gif.main_url} alt="no thumbnail"/>
                </div>
                <div className="media-body gif-body">
                    <div className="gif-top">
                        <div style={{textAlign: "center"}}>
                            <a href={gif.page_url} target="_blank"><h3 style={{margin:0, padding:0}} className="mt-0">{gif.title} <span className="glyphicon glyphicon-share"/></h3> </a>
                        </div>
                        <div style={{justifySelf: "right"}}>
                            <p className="mt-0">{gif.rating}
                            <span className = "glyphicon glyphicon-arrow-up" onClick = {this.props.upvoteHandler.bind(this, i)}/>
                            <span className = "glyphicon glyphicon-arrow-down" onClick = {this.props.downvoteHandler.bind(this, i)} />
                            </p>
                        </div>
                    </div>
                    <button className="btn btn-default" onClick={this.props.detailHandler.bind(this, i)}>
                        Info <span className="glyphicon glyphicon-info-sign" />
                    </button>
                    <button className="btn btn-danger" onClick={this.props.removeHandler.bind(this, i)}>
                        Remove <span className="glyphicon glyphicon-minus-sign" onClick={this.props.removeHandler.bind(this, i)}/>
                    </button>
                </div>
            </div>


        );

        return listItems;

    }




}

const emptyclick = function(){
    alert("no function bound to card click");
    }

ClickList.defaultProps = {
    gifList:[

    {
        "id": "zdIGTIdD1mi4",
        "title": "Summoner Wars: Guild Dwarves vs Cave Goblins",
        "preview": "https://media3.giphy.com/media/zdIGTIdD1mi4/giphy-preview.gif",
        "main_url": "https://media3.giphy.com/media/zdIGTIdD1mi4/giphy.gif",
        "embed_url": "https://giphy.com/embed/zdIGTIdD1mi4",
        "rating": 20,
        "page_url": "https://giphy.com/gifs/ryan-gosling-eating-girlfriends-zdIGTIdD1mi4",
        "user": "cheezburger",
    },
    {
        "id": "jHF49Bz9btG1O",
        "title": "ryan gosling friend GIF",
        "preview": "https://media3.giphy.com/media/zdIGTIdD1mi4/giphy-preview.gif",
        "main_url": "https://media3.giphy.com/media/zdIGTIdD1mi4/giphy.gif",
        "embed_url": "https://giphy.com/embed/zdIGTIdD1mi4",
        "rating": 25,
        "page_url": "https://giphy.com/gifs/ryan-gosling-eating-girlfriends-zdIGTIdD1mi4",
        "user": "cheezburger",
       
    }

],
    cardClick: emptyclick,
};

export default ClickList;


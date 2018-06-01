//creates a simple list of (defined in here) bg cards that can be assigned a clickable action | card onClick returns the bg object to props.onClick

import React from 'react';

class ClickList extends React.Component {

    constructor(props){
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        this.handleInfoClick = this.handleInfoClick.bind(this);
        this.checkboxHandler = this.checkboxHandler.bind(this);
    }

    handleClick(i, event){
        const bg_object = this.props.bgList[i];
        this.props.cardClick(bg_object);
        this.props.onClose();
    }

    handleInfoClick(i, event){
        console.log(i);
    }

    checkboxHandler(i, event){
        this.props.checkboxAction(i);
    }


    render(){

        const gifList = this.props.gifList;
        
        const listItems = gifList.map((gif, i) =>
       
            <div key={i} className="media gif-card" style={{textAlign:"left"}} >
                <div style={{width:80}} className="media-left">
                    <img className="mr-3 gif-bg" style = {{height: "auto", width: 200 }} src={gif.main_url} alt="no thumbnail"/>
                </div>
                <div className="media-body">
                    <a href={gif.page_url} target="_blank"><h3 className="mt-0">{gif.title}</h3></a>
                </div>
                <div className="media-right">
                    <input type="checkbox" onClick = {this.checkboxHandler.bind(this,i)}/>
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
        "isChecked": false,
    },
    {
        "id": "jHF49Bz9btG1O",
        "title": "ryan gosling friend GIF",
        "preview": "https://media3.giphy.com/media/zdIGTIdD1mi4/giphy-preview.gif",
        "main_url": "https://media3.giphy.com/media/zdIGTIdD1mi4/giphy.gif",
        "embed_url": "https://giphy.com/embed/zdIGTIdD1mi4",
        "rating": 25,
        "isChecked": false,
       
    }

],
    cardClick: emptyclick,
};

export default ClickList;


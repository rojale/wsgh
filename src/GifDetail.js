import React from 'react';

class GifDetail extends React.Component {
    constructor(props) {
        super(props);



    }


    render () {

        return (
            <div className="detailContainer">
                <span className="glyphicon glyphicon-minus" onClick={this.props.closeHandler} />
                <div className="gif-container">
                    <img src={this.props.gifDetail.main_url} alt="no source available"/>
                </div>
                <a href={this.props.gifDetail.page_url} target="_blank"><h3>{this.props.gifDetail.title} <span className="glyphicon glyphicon-share" /></h3></a>
                <p>User: {this.props.gifDetail.user}</p>
                    <p> Rating: {this.props.gifDetail.rating}</p>
            </div>

        )

    }


}


GifDetail.defaultProps = {
    gifDetail: {
        "id": "zdIGTIdD1mi4",
        "title": "Summoner Wars: Guild Dwarves vs Cave Goblins",
        "preview": "https://media3.giphy.com/media/zdIGTIdD1mi4/giphy-preview.gif",
        "main_url": "https://media3.giphy.com/media/zdIGTIdD1mi4/giphy.gif",
        "embed_url": "https://giphy.com/embed/zdIGTIdD1mi4",
        "rating": 20,
        "user": "cheezburger",
        },

}

export default GifDetail

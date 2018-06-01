//basic search bar| pass in search action via props.onSearchClick | can add an onchange via props.onChange

import React from 'react';


const ENTER_KEY = 13;

class SearchField extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '',
    };

    this.onChangeBound = this.onChangeBound.bind(this);
    this.onEnterBound = this.onEnterBound.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.ddchangeHandler = this.ddchangeHandler.bind(this);
    }

    onChangeBound(event) {

        this.setState({
            value: event.target.value,
        });
          
     }

    onEnterBound(event){

        const isEnterPressed = event.which === ENTER_KEY || event.ketCode === ENTER_KEY;
        if (isEnterPressed){

            this.onSearchClick();

        }

    }

    onSearchClick() {

        this.props.onSearchClick(this.state.value,0);

    }

    ddchangeHandler(event){
        this.props.ddchangeHandler(parseInt(event.target.value));
    }


    render() {

        return (

            <div className="search_bar">
                <div>
                <input
                    className="form-control"
                    onChange = {this.onChangeBound}
                    onKeyPress={this.onEnterBound}
                    type="text"
                    value={this.state.value}
                    id = "searchBarText"
                />
                </div>
                <div>
                <button
                    type="button"
                    onClick = {this.onSearchClick}
                    className="btn btn-primary"
                >
                    {this.props.buttonText}
                </button>
                </div>
                <div/>
                <div>
                    <span>
                        <select onChange={this.ddchangeHandler}>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={100}>100</option>
                        </select>
                        results per page
                    </span>
                </div>


            </div>
        );
    }
}

let defaultAlert = function(){
    alert("no action assigned to search button");
}


SearchField.defaultProps = {

    onSearchClick: defaultAlert,
    buttonText: "Search"

}

export default SearchField


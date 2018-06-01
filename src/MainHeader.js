import React from 'react';

class MainHeader extends React.Component {
    constructor(props) {
        super(props);
        this.sortNameAsc = this.sortNameAsc.bind(this);
        this.sortNameDesc = this.sortNameDesc.bind(this);
        this.sortRatAsc = this.sortRatAsc.bind(this);
        this.sortRatDesc = this.sortRatDesc.bind(this);
    }



    sortNameAsc(){
        this.props.sortHandler("nameAsc");
    }

    sortNameDesc(){
        this.props.sortHandler("nameDesc");
    }

    sortRatAsc(){
        this.props.sortHandler("ratAsc");
    }

    sortRatDesc(){
        this.props.sortHandler("ratDesc");
    }

    render () {

        let nameUp={color: "grey"};
        let nameDown={color: "grey"};
        let ratUp={color: "grey"};
        let ratDown={color: "grey"};

        const sortOrder = this.props.sortOrder;

        if (sortOrder==="nameAsc"){
            nameUp={color: "black"};
        } else if (sortOrder==="nameDesc"){
            nameDown={color: "black"};
        } else if (sortOrder==="ratAsc"){
          ratUp={color:"black"};
        } else if (sortOrder==="ratDesc"){
          ratDown={color:"black"};
        }

       return (

            <div className="mainHeader">

                <div>
                    <button style={{width:"100%"}} className="btn btn-primary" onClick = {this.props.plusHandler}>
                       Add gif
                    </button>
                </div>
                <div className="column-header">
                    <p>Name
                    <span style={nameUp}  className="glyphicon glyphicon-chevron-up sort-icon" onClick={this.sortNameAsc}/>
                    <span style={nameDown} className="glyphicon glyphicon-chevron-down sort-icon" onClick={this.sortNameDesc} /> </p>
                </div>
                <div className="column-header">
                    <p>Rating
                    <span style={ratUp} className="glyphicon glyphicon-chevron-up sort-icon" onClick={this.sortRatAsc}/>
                    <span style={ratDown} className="glyphicon glyphicon-chevron-down sort-icon" onClick={this.sortRatDesc}/></p>
                </div>

            </div>

        )


    }


}

const noAction = () => {
    alert("No action assigned");
}

MainHeader.defaultProps = {
    sortOrder: "nameAsc",
    plusHandler: noAction
};

export default MainHeader

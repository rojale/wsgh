import React from 'react';

class SearchHeader extends React.Component {

    constructor(props){
        super(props);
        this.state = {value: 10};
        this.pageRight = this.pageRight.bind(this);
        this.pageLeft = this.pageLeft.bind(this);

    }

    pageRight(){
        this.props.pageHandler("forward");
    }

    pageLeft(){
        this.props.pageHandler("backward");
    }

    render() {

        let paging_display = {
            display: "none"
        };

        if (this.props.showPaging){
            paging_display = { display: "" }
        }

        return (
            <div className="searchHeader">
                <div>
                    <button className="btn btn-success"onClick = {this.props.addHandler}> Add Selection </button>
                    <button className="btn btn-danger" onClick = {this.props.cancelHandler}> Cancel </button>
                    <div className="pageContainer" style={paging_display}>
                        <div className="pagingContainer" cassName="pageScroll" onClick={this.pageLeft}>
                            <span className="glyphicon glyphicon-chevron-left"/>
                            <span className="glyphicon glyphicon-chevron-left"/>
                        </div>
                        <div style={{textAlign:"center"}}>
                            <p>{this.props.list_start} - {this.props.list_end} of {this.props.results_length}</p>
                        </div>
                        <div className="pagingContainer" onClick = {this.pageRight}>
                            <span className="glyphicon glyphicon-chevron-right"/>
                            <span className="glyphicon glyphicon-chevron-right"/>
                        </div>
                    </div>

                </div>

            </div>

        );


    }



}

SearchHeader.defaultProps = {
    list_start: null,
    list_end: null,
    results_length: null
}

export default SearchHeader

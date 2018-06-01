import React from 'react';

import SearchBar from './SearchBar';
import ClickableList from './ClickableList';
import CheckboxList from './CheckboxList';
import MainHeader from './MainHeader';
import SearchHeader from './SearchHeader';
import GifDetail from './GifDetail';

class Container extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            gifList: [],
            searchList: [],
            sortOrder: "nameAsc",
            gifDetail: {},
            list_start: 0,
            list_end: 25,
            results_length: 2000,
            search_offset: 25,
            show_search: false,
            show_detail: false,
            displayed_results: 10,
            current_search: '',
            show_paging: false,

        };
        this.toggleSearch = this.toggleSearch.bind(this);
        this.searchGifs = this.searchGifs.bind(this);
        this.toggleCheck = this.toggleCheck.bind(this);
        this.addGifs = this.addGifs.bind(this);
        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
        this.removeGif = this.removeGif.bind(this);
        this.switchDetail = this.switchDetail.bind(this);
        this.reOrder = this.reOrder.bind(this);
        this.sendDetail = this.sendDetail.bind(this);
        this.closeDetail = this.closeDetail.bind(this);
        this.searchGeneral = this.searchGeneral.bind(this);
        this.changeDisplayedResults = this.changeDisplayedResults.bind(this);
        this.changePage = this.changePage.bind(this);
        

    }
    
    changePage(direction){
        if (direction==="forward"){

            console.log(this.state.current_search);
            console.log(this.state.search_offset);
            console.log(this.state.displayed_results);

            this.searchGeneral(this.state.current_search, this.state.search_offset+this.state.displayed_results);
        } else if(direction==="backward"){
            this.searchGeneral(this.state.current_search, Math.max(0, this.state.search_offset-this.state.displayed_results))
        }

    }

    changeDisplayedResults(displayed_results){
        this.searchGeneral(this.state.current_search, 0, displayed_results);
        this.setState({
            displayed_results: displayed_results
        });

    }

    closeDetail(){
        this.setState({
            show_detail: false
        });
    }

    sendDetail(objectIndex){
        this.setState({
            gifDetail: this.state.gifList[objectIndex],
            show_detail: true
        });
    }

    reOrder(sortOrder){
        let gifList = this.state.gifList;
        if (sortOrder==="nameAsc"){
            gifList.sort(function(a, b){
                var textA = a.title.toUpperCase();
                var textB = b.title.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        } else if (sortOrder ==="nameDesc"){
            gifList.sort(function(a,b){
                var textA = a.title.toUpperCase();
                var textB = b.title.toUpperCase();
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            });
        } else if (sortOrder==="ratAsc"){
            gifList.sort(function(a,b){
                var ratA = a.rating;
                var ratB = b.rating;
                return (ratA < ratB) ? -1 : (ratA > ratB ) ? 1 : 0;
            }); 
        } else if (sortOrder==="ratDesc"){
            gifList.sort(function(a,b){
                var ratA = a.rating;
                var ratB = b.rating;
                return (ratA > ratB) ? -1 : (ratA < ratB ) ? 1 : 0;
            }); 
        }

       

        this.setState({
           gifList: gifList,
           sortOrder: sortOrder
 
        });



    }
    
    switchDetail(object_index){
        const new_object = this.state.gifList[object_index];
        this.setState({
            gifDetail: new_object,
            show_detail: true
        });
        

    }

    removeGif(object_index){
        let gifList = this.state.gifList;
        gifList.splice(object_index, 1);
        this.setState({
            gifList: gifList
        });

    }


    upvote(object_index){
        let gifList = this.state.gifList;
        gifList[object_index].rating += 1;
        this.setState({
            gifList: gifList
        });
    }
 
    downvote(object_index){
        let gifList = this.state.gifList;
        gifList[object_index].rating -= 1;
        this.setState({
            gifList: gifList
        });
    }
   
    addGifs(){
        let currentIds = [];
        this.state.gifList.forEach(function (gifObject) {

            currentIds.push(gifObject.id);

        });

        let passedItems = [];

        this.state.searchList.forEach(function(gifObject) {
            if (gifObject.isChecked) {
                passedItems.push(gifObject);
            }
        });

        let gifList = this.state.gifList;

        passedItems.forEach(function(gifObject) {
            if (currentIds.indexOf(gifObject.id)<0){
                gifList.push(gifObject);
            }
        });

        this.setState({
            gifList: gifList,
            show_search: false
        })

    }

    toggleCheck(object_index){
        let searchList = this.state.searchList;
        searchList[object_index].isChecked = !searchList[object_index].isChecked;
        this.setState({
            searchList: searchList
        });
    }

    searchGifs(search_string){
        var self=this;
        this.setState({
            searchList: []
        });

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {
    
                var json = JSON.parse(xhttp.responseText);
                console.log(json);
                var data = json.data;
                var pagination = json.pagination;
                let newSearchList = [];
                data.forEach(function (gifObject) {

                    let newSearchObject = {
                        id: gifObject.id,
                        title: gifObject.title,
                        rating: 0,
                        isChecked: false,
                        main_url: gifObject.images.original.url,
                        user: gifObject.username,
                        page_url: gifObject.url,
                    };
                    newSearchList.push(newSearchObject);
                    
                });
                self.setState({
                    searchList: newSearchList,
                    list_start: pagination.offset+1,
                    list_end: pagination.offset+pagination.count,
                    results_length: pagination.total_count
                    
                });

                

            }
        };
        const search_value = search_string.replace(/\s/g, "+");
        var search_url = "http://api.giphy.com/v1/gifs/search?q="+search_value+"&api_key=dgS6NzHMQ5MwLs6f6eczIZmK4YG520fv&limit=5";
        xhttp.open("GET", search_url, true);
        xhttp.send();

    }


    searchGeneral(search_string, offset, displayed_results){
        var self=this;
        const num_results = displayed_results ||  this.state.displayed_results;
        this.setState({
            searchList: []
        });

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {

            if (this.readyState == 4 && this.status == 200) {
    
                var json = JSON.parse(xhttp.responseText);
                console.log(json);
                var data = json.data;
                var pagination = json.pagination;
                let newSearchList = [];
                data.forEach(function (gifObject) {

                    let newSearchObject = {
                        id: gifObject.id,
                        title: gifObject.title,
                        rating: 0,
                        isChecked: false,
                        main_url: gifObject.images.original.url,
                        user: gifObject.username,
                        page_url: gifObject.url,
                    };
                    newSearchList.push(newSearchObject);
                    
                });
                self.setState({
                    searchList: newSearchList,
                    list_start: pagination.offset+1,
                    list_end: pagination.offset+pagination.count,
                    results_length: pagination.total_count,
                    current_search: search_string,
                    search_offset: parseInt(pagination.offset),
                    show_paging: true
                });

                

            }
        };
        const search_value = search_string.replace(/\s/g, "+");
        console.log(search_value);
        var search_url = "http://api.giphy.com/v1/gifs/search?q="+search_value+"&api_key=dgS6NzHMQ5MwLs6f6eczIZmK4YG520fv&limit="+num_results+"&offset="+offset;
        xhttp.open("GET", search_url, true);
        xhttp.send();

    }

    
    toggleSearch() {
        this.setState({
            show_search: !this.state.show_search
        });
    }


    render() {

        let display_search = {
            display: "none"
        };


        if (this.state.show_search) {
            display_search = {
                display: ""
            };
        }
        let display_detail = {
            display: "none"
        };
        let main_columns = {
            gridTemplateColumns: "1fr 5fr 1fr"
        };

        if (this.state.show_detail) {
            display_detail = { display: "" };
            main_columns = {
                gridTemplateColumns: "0px 1fr 1fr"
            };
        }

        //forcing gif detail view to become a modal under certain window width

        const window_width = window.innerWidth;

        //const width_threshold = 1035;
        const width_threshold = 600;

        if (window.innerWidth<=width_threshold){
            display_detail['position']="fixed";
            display_detail['top']="50px";
            main_columns = { gridTemplateColumns: "1ft 5fr 1fr" };
        }

        //window height adjustment for overflow containers

        const window_height = window.innerHeight;
        const clickable_container_height = {
            height: window_height-176
        };
        const checkable_container_height = {
            height: window_height-202
        };

        return (
            <div>
            <div className="main-header">
                <h1> WSGH </h1>
                <p> By James Zhang </p>
            </div>
               <div style={main_columns} className="mainApp">
                   <div>
                   </div>
                   <div className="appLeft">
                       <div style={{marginBottom:10, textAlign:"center"}}>
                           <MainHeader plusHandler = {this.toggleSearch} sortHandler={this.reOrder} sortOrder = {this.state.sortOrder}/>
                       </div>
                       <div className="overflow-container" style={clickable_container_height}>
                           <ClickableList gifList = {this.state.gifList} upvoteHandler={this.upvote} downvoteHandler={this.downvote} removeHandler = {this.removeGif} detailHandler={this.switchDetail} detailHandler = {this.sendDetail}/>
                       </div>
                   </div>
                   <div style={display_detail} className="appRight">
                       <GifDetail gifDetail = {this.state.gifDetail} upvoteHandler={this.upvote} downvoteHandler={this.downvote} closeHandler={this.closeDetail} windowHeight = {window_height}/>
                   </div>
               </div>


               <div style = {display_search} className="searchView">
                   <div className="searchBuffer" onClick={this.toggleSearch}>
                   </div>
                   <div className="searchModal">
                       <div className="searchBuffer" onClick={this.toggleSearch}>
                       </div>
                       <div className="searchContainer">
                           <SearchBar onSearchClick={this.searchGeneral} ddchangeHandler = {this.changeDisplayedResults}/> 
                           <SearchHeader cancelHandler = {this.toggleSearch} addHandler={this.addGifs} list_start={this.state.list_start} list_end={this.state.list_end} results_length={this.state.results_length} pageHandler={this.changePage} showPaging={this.state.show_paging}/>
                           <div className="overflow-container" style={checkable_container_height}>
                               <CheckboxList gifList = {this.state.searchList} checkboxAction = {this.toggleCheck} />
                           </div>
                       </div>
                       <div className="searchBuffer" onClick={this.toggleSearch}>
                       </div>
                   </div>
                   <div className="searchBuffer" onClick={this.toggleSearch}>
                   </div>
               </div> 


            </div>


        )

    }




}

export default Container;

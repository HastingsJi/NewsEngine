import React from 'react';
import './NewsPanel.css';
import NewsCard from '../NewsCard/NewsCard';
// import _ from 'lodash';
import { connect } from 'react-redux';

class NewsPanel extends React.Component {
    constructor(props){
        super(props);                        // no props because on props taken as params 
        this.state = { news:null, pageNum:1, loadedAll:false, source:'', num: 0};        // news exsit as Newspanel's child and saved as json list
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.searchTerm);
        // console.log(this.state.source);
        this.setState({source: nextProps.searchTerm}, function(){
            console.log(this.state.source);
            this.loadMoreNews();
            this.loadNumNews();
        });
        
    }



    componentDidMount() {
        // this.setState({source: this.props.searchTerm})
        // console.log(this.props.searchTerm)
        console.log('zzz')
        this.loadNumNews();
        // this.loadMoreNews = _.debounce(this.loadMoreNews, 1000);
        // window.addEventListener('scroll', () => this.handleScroll());
    }

    loadNumNews(){
        console.log('num of news')
        const news_url = 'http://' + window.location.hostname + ':3000' +
        '/news/source/' + this.state.source ;

        const request = new Request(
        encodeURI(news_url),
        {
            method:'GET',
            // headers: {
            //   'Authorization': 'bearer ' + Auth.getToken(),
            // }
        });

        fetch(request)
        .then(res => res.json())
        .then(num => {
            // if (!news || news.length == 0) {
            // this.setState({loadedAll:true});
            // }

            this.setState({
            // news: this.state.news ? this.state.news.concat(news) : news,
            // pageNum: this.state.pageNum + 1,
            num: num
            });
            console.log(num)
        });
    }

    loadMoreNews() {
        // console.log('yyy')
        // if (this.state.loadedAll == true) {
        //   return;
        // }
    
        const news_url = 'http://' + window.location.hostname + ':3000' +
            '/news/source/' + this.state.source + '/pageNum/' + this.state.pageNum;
    
        const request = new Request(
          encodeURI(news_url),
          {
            method:'GET',
            // headers: {
            //   'Authorization': 'bearer ' + Auth.getToken(),
            // }
          });
    
        fetch(request)
          .then(res => res.json())
          .then(news => {
            if (!news || news.length == 0) {
              this.setState({loadedAll:true});
            }
    
            this.setState({
              news: this.state.news ? this.state.news.concat(news) : news,
              pageNum: this.state.pageNum + 1,
            });
          });

          
      }

    renderNews(){
        const news_list = this.state.news.map(news => {
            return(
                <a className='list-group-item' key={news.digest} href='#'>
                    <NewsCard news={news} />
                </a>
            )
        });

        return(
            <div className='container-fluid'>
                <div className='list-group'>
                {news_list}
                </div>
            </div>
        );
    }

    

    render() {
        if (this.state.news){
            return (
                <div>
                   
                    {this.renderNews()}
                </div>
            );
        } else{
            return(
                <div>
                    {/* {props.searchTerm} */}
                    Loading...
                </div>
            );
        }
    }

}

// export default NewsPanel;

export default connect(mapStateToProps)(NewsPanel);

function mapStateToProps(state){
    return{
        searchTerm: state.searchTerm
    }
}
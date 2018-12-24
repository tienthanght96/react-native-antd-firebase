import React, { Component } from 'react';
import { isEmpty, map } from 'lodash';
import { getListReplyComment, addNewReplyComment, removeReplyComment  } from '../lib/firebase/database';
const initContextValue = {
  totalReply: 0,
  listReply: [],
  isReloading: false,
  article_id: null,
  comment_id: null,
  handleAddReply: null,
  handleDeleteReply: null,
  isLoading: false,
};

const { Provider, Consumer } = React.createContext(initContextValue);

class ReplyCommentProvider extends Component {
  
  constructor(props){
    super(props);
    this.state = {
     ...initContextValue,
     handleAddReply: this.handleAddReply,
     handleDeleteReply: this.handleDeleteReply,
    }
  }

  componentDidMount() {
    this.handleGetListReplyComment();
  }

  componentDidUpdate(prevProps) {
    if(
      (prevProps.comment_id !== this.props.comment_id) ||
      (this.props.refreshing && (prevProps.refreshing !== this.props.refreshing))
    ){
      this.handleGetListReplyComment();
    }
  }
  
  handleGetListReplyComment = async () => {
    const { article_id, comment_id } = this.props;
    if(+article_id && comment_id){
      try {
        this.setState({ isLoading: true });
        const response = await getListReplyComment(article_id, comment_id);
        console.log('response', response)
        if(response && !isEmpty(response)){
          const listReply = map(response, (reply, reply_id) => ({ ...reply, reply_id }));
          const totalReply = listReply.length;
          console.log('listReply', listReply)
          if(this.isUnmounted) return;
          this.setState({ listReply, totalReply, isLoading: false });
          return;
        }
        if(this.isUnmounted) return;
        this.setState({ listReply: [], totalReply: 0, isLoading: false })
      } catch (error) {
        if(this.isUnmounted) return;
        this.setState({ listReply: [], totalReply: 0, isLoading: false })
      }
    }
  }

  handleAddReply = async (reply, callbackReply) => {
    console.log('reply', reply)
    const { article_id, comment_id } = this.props;
    if(+article_id && comment_id && !isEmpty(reply)){
      try {
        const response = await addNewReplyComment(article_id, comment_id, reply );
        const { listReply } = this.state;
        if(response && response.status === 200) {
          const newListReply = listReply.concat([reply]).sort((first, second) => second.reply_date - first.reply_date);
          const totalReply = newListReply.length;
          if(this.isUnmounted) return;
          this.setState({ listReply: newListReply, totalReply });
          typeof callbackReply === 'function' && callbackReply(200);
        } else {
          typeof callbackReply === 'function' && callbackReply(404);
        }
      } catch (error) {
        console.log('error add reply', error)
        typeof callbackReply === 'function' && callbackReply(404);
      }
    }
  }

  handleDeleteReply = async (reply_id, callbackRemoveReply) => {
    const { article_id, comment_id } = this.props;
    if(+article_id && comment_id){
      try {
        const response = await removeReplyComment(article_id, comment_id, reply_id);
        const { listReply } = this.state;
        if(response && response.status === 200) {
          const newListReply = listReply.filter(reply => reply.reply_id !== reply_id);
          if(this.isUnmounted) return;
          this.setState({ listReply: newListReply });
          typeof callbackRemoveReply === 'function' && callbackRemoveReply();
        } else {
          typeof callbackRemoveReply === 'function' && callbackRemoveReply();
        }
      } catch (error) {
        typeof callbackRemoveReply === 'function' && callbackRemoveReply();
      }
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }
  
  render() {
    const value = {
      ...this.state,
      article_id: this.props.article_id,
      user: this.props.user,
      comment_id: this.props.comment_id
    };
    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    );
  }
}

export { ReplyCommentProvider, Consumer as ReplyConsumer };
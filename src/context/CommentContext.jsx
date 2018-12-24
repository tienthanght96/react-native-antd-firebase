import React, { Component } from 'react';
import { isEmpty, map } from 'lodash';
import { getListComment, addNewComment, removeComment } from '../lib/firebase/database';
const initContextValue = {
  totalComment: 0,
  listComment: [],
  isReloading: false,
  article_id: null,
  user: null,
  handleAddComment: null,
  handleDeleteComment: null,
  handleReplySuccess: null,
  handleAddCommentSuccess: null,
  isLoading: false,
};

const { Provider, Consumer } = React.createContext(initContextValue);


class CommentProvider extends Component {
  
  constructor(props){
    super(props);
    this.state = {
     ...initContextValue,
     handleAddComment: this.handleAddComment,
     handleDeleteComment: this.handleDeleteComment,
     handleReplySuccess: this.handleReplySuccess,
     handleAddCommentSuccess: this.handleAddCommentSuccess
    }
  }

  componentDidMount() {
    this.handleGetListComment();
  }

  componentDidUpdate(prevProps) {
    if(
      (prevProps.article_id !== this.props.article_id) ||
      (this.props.refreshing && (prevProps.refreshing !== this.props.refreshing))
    ){
      this.handleGetListComment();
    }
  }
  
  handleGetListComment = async () => {
    const { article_id } = this.props;
    if(+article_id){
      try {
        this.setState({ isLoading: true });
        const response = await getListComment(article_id);
        if(response && !isEmpty(response)){
          const listComment = map(response, (comment, comment_id) => ({ ...comment, comment_id }));
          const totalComment = listComment.length;
          if(this.isUnmounted) return;
          this.setState({ listComment, totalComment, isLoading: false });
          return;
        }
        if(this.isUnmounted) return;
        this.setState({ listComment: [], totalComment: 0, isLoading: false })
      } catch (error) {
        if(this.isUnmounted) return;
        this.setState({ listComment: [], totalComment: 0, isLoading: false })
      }
    }
  }

  handleAddComment = async (article_id = this.props.article_id, comment, callbackComment) => {
    if(!!article_id && !isEmpty(comment)){
      try {
        const response = await addNewComment(article_id, comment);
        const { listComment } = this.state;
        if(response && response.status === 200) {
          const newListComment = listComment.concat([comment]).sort((first, second) => second.comment_date - first.comment_date);
          const totalComment = newListComment.length;
          if(this.isUnmounted) return;
          this.setState({ listComment: newListComment, totalComment });
          typeof callbackComment === 'function' && callbackComment(200);
        } else {
          typeof callbackComment === 'function' && callbackComment(404);
        }
      } catch (error) {
        typeof callbackComment === 'function' && callbackComment(404);
      }
    }
  }

  handleReplySuccess = () => {
    this.handleGetListComment();
  }
  handleAddCommentSuccess = () => {
    this.handleGetListComment();
  }

  handleDeleteComment = async (article_id = this.props.article_id, comment_id, callbackRemoveComment) => {
    if(article_id && comment_id){
      try {
        const response = await removeComment(article_id, comment_id);
        const { listComment } = this.state;
        if(response && response.status === 200) {
          const newListComment = listComment.filter(comment => comment.comment_id !== comment_id);
          if(this.isUnmounted) return;
          this.setState({ listComment: newListComment });
          typeof callbackRemoveComment === 'function' && callbackRemoveComment();
        } else {
          typeof callbackRemoveComment === 'function' && callbackRemoveComment();
        }
      } catch (error) {
        typeof callbackRemoveComment === 'function' && callbackRemoveComment();
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
      user: this.props.user
    };
    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    );
  }
}

export { CommentProvider, Consumer as CommentConsumer };
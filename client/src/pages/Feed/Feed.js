import React, { Component, Fragment } from 'react';

import Post from '../../components/Feed/Post/Post';
import Button from '../../components/Button/Button';
import FeedEdit from '../../components/Feed/FeedEdit/FeedEdit';
import Input from '../../components/Form/Input/Input';
import Paginator from '../../components/Paginator/Paginator';
import Loader from '../../components/Loader/Loader';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';
import './Feed.css';

import axios from 'axios';

const Feed = () => {
  const INITIAL_STATE = {
    isEditing: false,
    posts: [],
    totalPosts: 0,
    editPost: null,
    status: '',
    postPage: 1,
    postsLoading: true,
    editLoading: false
  }
  const [state, setState] = INITIAL_STATE;

  useEffect(() {
    axios.get(`http://localhost:5000/auth/status/${auth_0_user}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch user status.');
        }
        return res.data;
      })
      .then((resData) => {
        setState({ status: resData.status });
      })
      .catch(catchError);

    loadPosts();
  })

  const loadPosts = (direction) => {
    if (direction) {
      setState({ postsLoading: true, posts: [] });
    }
    let page = state.postPage;
    if (direction === 'next') {
      page++;
      setState({ postPage: page });
    }
    if (direction === 'previous') {
      page--;
      setState({ postPage: page });
    }
    axios(`http://localhost:5000/feed/posts/${auth_0_user}?page=${page}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch posts.');
        }
        return res.json();
      })
      .then((resData) => {
        setState({
          posts: resData.posts.map((p) => {
            return {
              ...p,
              imagePath: p.imageUrl
            };
          }),
          totalPosts: resData.totalItems,
          postsLoading: false
        });
      })
      .catch(catchError);
  };

  const statusUpdateHandler = (event) => {
    event.preventDefault();
    axios(`http://localhost:5000/auth/status`, {
      headers: {
        Authorization: `Bearer ${props.token}`
      },
      method: 'PUT'
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Can't update status!");
        }
        return res.json(res);
      })
      .then((resData) => {
        console.log(resData);
      })
      .catch(catchError);
  };

  const newPostHandler = () => {
    setState({ isEditing: true });
  };

  const startEditPostHandler = (postId) => {
    setState((prevState) => {
      const loadedPost = { ...prevState.posts.find((p) => p._id === postId) };

      return {
        isEditing: true,
        editPost: loadedPost
      };
    });
  };

  const cancelEditHandler = () => {
    setState({ isEditing: false, editPost: null });
  };

  const finishEditHandler = (postData) => {
    setState({
      editLoading: true
    });
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    formData.append('image', postData.image);
    let url = 'http://localhost:5000/feed/post';
    let method = 'POST';
    if (state.editPost) {
      url = `http://localhost:5000/feed/post/${state.editPost._id}`;
      method = 'PUT';
    }

    axios(url, {
      method: method,
      body: formData,
      headers: {
        Authorization: `Bearer ${props.token}`
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Creating or editing a post failed!');
        }
        return res.json();
      })
      .then((resData) => {
        const updatedPost = {
          _id: resData.post._id,
          title: resData.post.title,
          content: resData.post.content,
          creator: resData.post.creator,
          createdAt: resData.post.createdAt
        };
        setState((prevState) => {
          return {
            isEditing: false,
            editPost: null,
            editLoading: false
          };
        });
      })
      .catch((err) => {
        console.log(err);
        setState({
          isEditing: false,
          editPost: null,
          editLoading: false,
          error: err
        });
      });
  };

  const statusInputChangeHandler = (input, value) => {
    setState({ status: value });
  };

  const deletePostHandler = (postId) => {
    setState({ postsLoading: true });
    axios.delete(`http://localhost:5000/feed/post/${postId}`)
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Deleting a post failed!');
        }
        return res.json();
      })
      .then((resData) => {
        loadPosts();
      })
      .catch((err) => {
        console.log(err);
        setState({ postsLoading: false });
      });
  };

  const errorHandler = () => {
    setState({ error: null });
  };

  const catchError = (error) => {
    setState({ error: error });
  };

    return (
      <>
        <ErrorHandler error={state.error} onHandle={errorHandler} />
        <FeedEdit
          editing={state.isEditing}
          selectedPost={state.editPost}
          loading={state.editLoading}
          onCancelEdit={cancelEditHandler}
          onFinishEdit={finishEditHandler}
        />
        <section className="feed__status">
          <form onSubmit={statusUpdateHandler}>
            <Input
              type="text"
              placeholder="Your status"
              control="input"
              onChange={statusInputChangeHandler}
              value={state.status}
            />
            <Button mode="flat" type="submit">
              Update
            </Button>
          </form>
        </section>
        <section className="feed__control">
          <Button mode="raised" design="accent" onClick={newPostHandler}>
            New Post
          </Button>
        </section>
        <section className="feed">
          {state.postsLoading && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Loader />
            </div>
          )}
          {state.posts.length <= 0 && !state.postsLoading ? (
            <p style={{ textAlign: 'center' }}>No posts found.</p>
          ) : null}
          {!state.postsLoading && (
            <Paginator
              onPrevious={loadPosts('previous')}
              onNext={loadPosts('next')}
              lastPage={Math.ceil(state.totalPosts / 2)}
              currentPage={state.postPage}
            >
              {state.posts.map((post) => (
                <Post
                  key={post._id}
                  id={post._id}
                  author={post.creator.name}
                  date={new Date(post.createdAt).toLocaleDateString('en-US')}
                  title={post.title}
                  image={post.imageUrl}
                  content={post.content}
                  onStartEdit={startEditPostHandler(post._id)}
                  onDelete={deletePostHandler(post._id)}
                />
              ))}
            </Paginator>
          )}
        </section>
      </>
    );
}

export default Feed;
